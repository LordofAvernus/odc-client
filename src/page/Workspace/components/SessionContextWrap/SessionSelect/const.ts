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

export const DEFALT_WIDTH = 320;
export const DEFALT_HEIGHT = 215 + 12;
/** SQL 顶部切换器自适应面板上限（显式传 width 的调用方不受此约束） */
export const MAX_PANEL_WIDTH = 720;
/** 视口边距，上限取 min(MAX_PANEL_WIDTH, viewport - VIEWPORT_MARGIN) */
export const VIEWPORT_MARGIN = 32;
/**
 * 树节点固定开销：展开箭头 / 图标 / title padding / 容器 padding。
 * 虚拟列表下宽度必须由数据+开销推导，不能靠 DOM 撑开。
 */
export const PANEL_CHROME_WIDTH = 72;
