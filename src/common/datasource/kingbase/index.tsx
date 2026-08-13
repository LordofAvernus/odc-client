/*
 * Copyright 2023 OceanBase
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ConnectType, TaskType } from '@/d.ts';
import { IDataSourceModeConfig } from '../interface';
import { haveOCP } from '@/util/env';

/**
 * KingBase mode config (S2 §5 + S4 §5 + S5 §5).
 * Connection fields align with DM (host/port/defaultSchema, no Oracle sid).
 * S4 AC-4/5：sql.language 必须为 oboracle（禁达梦式 language:'sql' 弱路径）；
 * 关键字/函数高亮与补全复用 monaco-plugin-ob oboracle；对象补全走既有
 * getModelService → queryIdentities / 列元数据（schema→表→列）。
 * S5 AC-6/7：groupResourceTree + schema.table/func/proc 放开对象树；
 * sessionManage 放开 SessionSelect 切库（切换 SQL 由后端 SessionExtension 执行，
 * FE 禁止发达梦式 SET SCHEMA / ALTER SESSION CURRENT_SCHEMA）。
 * 表数据走既有 TablePage/queryTableOrViewData，无按类型「不支持」短路。
 */

const kingbaseTableConfig = {
  constraintEnableConfigurable: true,
  constraintDeferConfigurable: true,
  enableCheckConstraint: true,
  disableRangeColumnsPartition: true,
  disableListColumnsPartition: true,
  disableKeyPartition: true,
  disableLinearHashPartition: true,
  enableIndexScope: true,
  enableIndexVisible: true,
  type2ColumnType: {
    id: 'NUMBER',
    name: 'VARCHAR',
    date: 'DATE',
    time: 'TIMESTAMP'
  }
};

const functionConfig: IDataSourceModeConfig['schema']['func'] = {
  params: ['paramName', 'paramMode', 'dataType', 'defaultValue']
};

const items: Record<ConnectType.KINGBASE, IDataSourceModeConfig> = {
  [ConnectType.KINGBASE]: {
    connection: {
      address: {
        items: ['ip', 'port']
      },
      account: true,
      sys: false,
      ssl: false,
      defaultSchema: true,
      disableURLParse: true
    },
    features: {
      task: [TaskType.ASYNC],
      obclient: false,
      recycleBin: false,
      plRun: false,
      sessionManage: true,
      sqlExplain: false,
      sessionParams: false,
      groupResourceTree: true,
      sqlconsole: true,
      export: {
        fileLimit: false,
        snapshot: false
      }
    },
    schema: {
      table: kingbaseTableConfig,
      func: functionConfig,
      proc: functionConfig,
      innerSchema: ['SYS']
    },
    sql: {
      language: 'oboracle',
      escapeChar: '"',
      caseSensitivity: false
    }
  }
};

if (haveOCP()) {
  delete items[ConnectType.KINGBASE];
}

export default items;
