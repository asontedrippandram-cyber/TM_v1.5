/**
 * 车载软件测试进度看板 - 配置文件
 *
 * 使用说明：
 * 1. 修改本文件中的配置内容
 * 2. 确保 index1.html 同目录下有此文件
 * 3. 刷新页面即可看到效果
 *
 * 配置文件结构说明：
 * - project: 项目基本信息
 * - dimensions: 五维度定义（一般不需修改）
 * - executors: 执行人列表
 * - features: 特性树（包含子特性）
 * - vehicles: 车型列表（包含子车型和里程碑）
 */

// ========== 配置开始 ==========

const CONFIG = {

  // ========== 项目信息 ==========
  project: {
    id: 'p1',
    name: '智能化软件测试2026',
    // 项目启动日期（用于计算时间轴）
    startDate: '20260101',
    // 默认商用日期（当车型未设置时使用）
    defaultCommercial: '20260630'
  },

  // ========== 执行人列表 ==========
  // 用于新增用例时下拉选择
  executors: [
    'fanxiaochang',
    'caiwenshan',
    'yaochun',
    'qiaoxiaoyun'
  ],

  // ========== 特性树 ==========
  // 结构：特性 -> 子特性
  // 每个特性有 id 和 name
  // 每个子特性有 id 和 name
  features: [
    {
      id: 'f1',
      name: '互动游戏',
      subFeatures: [
        { id: 'sf1', name: '成语接龙' },
        { id: 'sf2', name: '诗词填空' },
        { id: 'sf3', name: '听歌识曲' }
      ]
    },
    {
      id: 'f2',
      name: '语音助手',
      subFeatures: [
        { id: 'sf4', name: '语音唤醒' },
        { id: 'sf5', name: '语音识别' },
        { id: 'sf6', name: '语义理解' }
      ]
    },
    {
      id: 'f3',
      name: '导航系统',
      subFeatures: [
        { id: 'sf7', name: '路径规划' },
        { id: 'sf8', name: '实时路况' }
      ]
    }
  ],

  // ========== 车型列表 ==========
  // 结构：品牌 -> 子车型
  // milestones: 关键时间节点（必填 commercial 商用日期）
  // features: 可选，每个子车型可独立定义自己的特性，不定义则使用公共特性
  vehicles: [
    {
      id: 'v1',
      name: '赛力斯',
      subVehicles: [
        {
          id: 'sv1',
          name: 'F2D',
          milestones: {
            commercial: '20260630',
            epRelease: '20260430',
            ppRelease: '20260531'
          },
          features: [
            { id: 'f1', name: '互动游戏', subFeatures: [{ id: 'sf1', name: '成语接龙' }, { id: 'sf2', name: '诗词填空' }] },
            { id: 'f2', name: '语音助手', subFeatures: [{ id: 'sf4', name: '语音唤醒' }] }
          ]
        },
        {
          id: 'sv2',
          name: 'F3',
          milestones: {
            commercial: '20260930',
            epRelease: '20260731',
            ppRelease: '20260831'
          }
        }
      ]
    },
    {
      id: 'v2',
      name: '上汽',
      subVehicles: [
        { id: 'sv3', name: 'SHA', milestones: { commercial: '20260815', epRelease: '20260615', ppRelease: '20260715' } },
        { id: 'sv4', name: 'SHB', milestones: { commercial: '20260901', epRelease: '20260701', ppRelease: '20260801' } }
      ]
    },
    {
      id: 'v3',
      name: '奇瑞',
      subVehicles: [
        { id: 'sv5', name: 'EHV', milestones: { commercial: '20260815', epRelease: '20260615', ppRelease: '20260715' } },
        { id: 'sv6', name: 'EHY', milestones: { commercial: '20260901', epRelease: '20260701', ppRelease: '20260801' } }
      ]
    },
    {
      id: 'v4',
      name: '北汽',
      subVehicles: [
        { id: 'sv7', name: 'X4W', milestones: { commercial: '20260815', epRelease: '20260615', ppRelease: '20260715' } },
        { id: 'sv8', name: 'X4U', milestones: { commercial: '20260901', epRelease: '20260701', ppRelease: '20260801' } }
      ]
    },
    {
      id: 'v5',
      name: '江淮',
      subVehicles: [
        { id: 'sv9', name: 'X6SH', milestones: { commercial: '20260815', epRelease: '20260615', ppRelease: '20260715' } },
        { id: 'sv10', name: 'X6M', milestones: { commercial: '20260901', epRelease: '20260701', ppRelease: '20260801' } }
      ]
    }
  ],

  // ========== 五维度定义 ==========
  // type: auto = 用例自动计算进度, manual = 纯手动填写
  // 一般不需修改
  dimensions: [
    { key: 'benchTest', name: '内部台架测试', index: 1, type: 'auto' },
    { key: 'vehicleTest', name: '内部实车测试', index: 2, type: 'auto' },
    { key: 'smokeTest', name: '集成冒烟测试', index: 3, type: 'manual' },
    { key: 'pointCheck', name: '实车点检', index: 4, type: 'manual' },
    { key: 'e2eTest', name: '整车E2E验证', index: 5, type: 'manual' }
  ],

  // ========== 初始进度数据 ==========
  // featureDimensions: 子车型-子特性 的五维度进度
  // 格式: "subVehicleId-subFeatureId": { dimensionKey: progress(0-100), ... }
  // featureDimensions: {},

  // ========== 初始测试用例 ==========
  // testCases: 初始测试用例数据（可选）
  // 格式: { id, title, featureId, subVehicleId, dimension, priority, status, assignee, date }
  // testCases: []

};

// ========== 配置结束 ==========


// ========== 示例：真实项目配置参考 ==========

/*
 * 真实项目配置示例：
 *
 * const CONFIG = {
 *   project: {
 *     id: 'p1',
 *     name: 'XXX车型车载娱乐系统 v2.0',
 *     startDate: '20251001',
 *     defaultCommercial: '20260630'
 *   },
 *   executors: [
 *     '张工', '李工', '王工', '陈工', '刘工'
 *   ],
 *   features: [
 *     {
 *       id: 'f1',
 *       name: '车载导航',
 *       subFeatures: [
 *         { id: 'sf1', name: '地图显示' },
 *         { id: 'sf2', name: '路径规划' },
 *         { id: 'sf3', name: '实时路况' },
 *         { id: 'sf4', name: '语音导航' }
 *       ]
 *     },
 *     {
 *       id: 'f2',
 *       name: '车载语音助手',
 *       subFeatures: [
 *         { id: 'sf5', name: '语音唤醒' },
 *         { id: 'sf6', name: '语音识别' },
 *         { id: 'sf7', name: '语音合成' }
 *       ]
 *     },
 *     {
 *       id: 'f3',
 *       name: '手机互联',
 *       subFeatures: [
 *         { id: 'sf8', name: 'CarPlay' },
 *         { id: 'sf9', name: 'CarLife' },
 *         { id: 'sf10', name: 'Android Auto' }
 *       ]
 *     },
 *     {
 *       id: 'f4',
 *       name: '车辆设置',
 *       subFeatures: [
 *         { id: 'sf11', name: '显示设置' },
 *         { id: 'sf12', name: '声音设置' },
 *         { id: 'sf13', name: '主题设置' }
 *       ]
 *     }
 *   ],
 *   vehicles: [
 *     {
 *       id: 'v1',
 *       name: '品牌A',
 *       subVehicles: [
 *         { id: 'sv1', name: '车型A1', milestones: { commercial: '20260930' } },
 *         { id: 'sv2', name: '车型A2', milestones: { commercial: '20261231' } }
 *       ]
 *     },
 *     {
 *       id: 'v2',
 *       name: '品牌B',
 *       subVehicles: [
 *         { id: 'sv3', name: '车型B1', milestones: { commercial: '20261130' } }
 *       ]
 *     }
 *   ],
 *   dimensions: [
 *     { key: 'benchTest', name: '内部台架测试', index: 1, type: 'auto' },
 *     { key: 'vehicleTest', name: '内部实车测试', index: 2, type: 'auto' },
 *     { key: 'smokeTest', name: '集成冒烟测试', index: 3, type: 'manual' },
 *     { key: 'pointCheck', name: '实车点检', index: 4, type: 'manual' },
 *     { key: 'e2eTest', name: '整车E2E验证', index: 5, type: 'manual' }
 *   ]
 * };
 */
