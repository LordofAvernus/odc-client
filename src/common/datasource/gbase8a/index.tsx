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
import MySQLColumnExtra from '../oceanbase/MySQLColumnExtra';
import { haveOCP } from '@/util/env';

/**
 * GBase-8a: independent ConnectType GBASE_8A; MySQL-family SQL experience.
 * Display label is exact "GBase-8a" (see ConnectTypeText). Phase-1 focuses on
 * identity + icon; Phase-2 expands SQL/object features.
 */

const tableConfig = {
  enableTableCharsetsAndCollations: true,
  enableConstraintOnUpdate: true,
  ColumnExtraComponent: MySQLColumnExtra,
  paritionNameCaseSensitivity: true,
  enableIndexesFullTextType: true,
  enableAutoIncrement: true,
  type2ColumnType: {
    id: 'int',
    name: 'varchar',
    date: 'datetime',
    time: 'timestamp'
  }
};

const functionConfig: IDataSourceModeConfig['schema']['func'] = {
  params: ['paramName', 'dataType', 'dataLength'],
  defaultValue: {
    dataLength: 45
  },
  dataNature: true,
  sqlSecurity: true,
  deterministic: true
};

const procedureConfig: IDataSourceModeConfig['schema']['proc'] = {
  params: ['paramName', 'paramMode', 'dataType', 'dataLength'],
  defaultValue: {
    dataLength: 45
  },
  dataNature: true,
  sqlSecurity: true,
  deterministic: true
};

const items: Record<ConnectType.GBASE_8A, IDataSourceModeConfig> = {
  [ConnectType.GBASE_8A]: {
    connection: {
      address: {
        items: ['ip', 'port']
      },
      account: true,
      sys: false,
      ssl: false,
      defaultSchema: true,
      jdbcDoc: 'https://www.gbase.cn/'
    },
    features: {
      task: [TaskType.ASYNC],
      obclient: false,
      recycleBin: false,
      sessionManage: true,
      sessionParams: true,
      groupResourceTree: true,
      sqlconsole: true,
      sqlExplain: true,
      export: {
        fileLimit: false,
        snapshot: false
      }
    },
    schema: {
      table: tableConfig,
      func: functionConfig,
      proc: procedureConfig,
      innerSchema: ['information_schema', 'gbase', 'mysql']
    },
    sql: {
      language: 'mysql',
      escapeChar: '`',
      caseSensitivity: true
    }
  }
};

if (haveOCP()) {
  delete items[ConnectType.GBASE_8A];
}

export default items;
