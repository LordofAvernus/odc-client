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

import { styled } from '@mui/material';
import { Tree } from 'antd';

/** 锁定面板外宽，避免虚拟树滚动/滚动条显隐撑开 Popover */
export const PanelRootStyleWrapper = styled('div')<{ $width: number | string }>`
  box-sizing: border-box;
  width: ${({ $width }) =>
    typeof $width === 'string' ? $width : `${$width}px`};
  max-width: 100vw;
  overflow: hidden;
`;

export const HeaderStyleWrapper = styled('div')<{ $width: number | string }>`
  display: flex;
  align-items: start;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;

  .database-select-tab {
    margin-right: 12px;
  }
`;

export const GroupIconStyleWrapper = styled('span')`
  margin-left: 12px;
`;

export const FooterStyleWrapper = styled('div')`
  border-top: 1px solid
    ${({ theme }) => theme.sharedTheme.uiToken.colorBorderSecondary};
`;

export const TreeContainerStyleWrapper = styled('div')<{
  $height: string | number;
  $width: string | number;
}>`
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0px 4px 12px 0;
  height: ${({ $height }) =>
    typeof $height === 'string' ? $height : `${$height}px`};
  width: 100%;

  /* 预留滚动条槽，上下滚动不挤占内容宽导致面板跳变 */
  .ant-tree-list-holder {
    scrollbar-gutter: stable;
  }
`;

export const TreeStyleWrapper = styled(Tree)`
  .databaseItem {
    display: flex;

    .textoverflow {
      max-width: 130px !important;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex-shrink: 0;
    }

    .dataSourceInfo {
      color: ${({ theme }) => theme.sharedTheme.uiToken.colorTextTertiary};
      margin-left: 8px;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      min-width: 0;
    }
  }

  .groupItem {
    width: 100%;
    min-width: 0;
    display: flex;
    overflow: hidden;

    .groupName {
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .tip {
      color: ${({ theme }) => theme.sharedTheme.uiToken.colorTextTertiary};
      padding-left: 5px;
      min-width: 0;
      flex-shrink: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .databaseIconContainer {
    margin-left: 7px;
    margin-right: 2px;
    display: flex;
    height: 100%;
    align-items: center;
  }

  .ant-tree-treenode {
    width: 100%;

    .ant-tree-switcher {
      margin-inline-end: 0px !important;
    }

    .ant-tree-checkbox {
      margin-right: 0;
    }
  }

  .ant-tree-treenode-leaf {
    .ant-tree-checkbox {
      margin-left: 25px;
    }
  }

  .ant-tree-switcher-noop {
    display: none;
  }

  .ant-tree-node-content-wrapper {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .ant-tree-iconEle {
      width: auto;
      min-width: 24px;
    }

    .ant-tree-title {
      flex: 1;
      padding-right: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .ant-badge {
    position: absolute;
    top: 0px;
    right: 4px;

    .ant-badge-status-dot {
      border-radius: 0px;
    }
  }
`;

export const DatabaseItemStyleWrapper = styled('div')`
  display: flex;
`;

export const TextOverflowStyleWrapper = styled('div')`
  max-width: 130px !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;

export const DataSourceInfoStyleWrapper = styled('div')`
  color: ${({ theme }) => theme.sharedTheme.uiToken.colorTextTertiary};
  margin-left: 8px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
`;

export const GroupItemStyleWrapper = styled('div')`
  width: 100%;
  display: flex;
`;

export const TipStyleWrapper = styled('div')`
  color: ${({ theme }) => theme.sharedTheme.uiToken.colorTextTertiary};
  padding-left: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const DatabaseIconContainerStyleWrapper = styled('div')`
  margin-left: 7px;
  margin-right: 2px;
  display: flex;
  height: 100%;
  align-items: center;
`;
