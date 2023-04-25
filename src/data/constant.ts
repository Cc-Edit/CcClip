// 全局常量
export const Constant = {
  TokenKey: 'access_token',
  Uid: 'uid',
  ThemeKey: 'dark'
};
// 文件类型
export const FileTypeMap = {
  bpm: 'image/bpm',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp3: 'audio/mp3',
  mp4: 'video/mpeg4',
  aac: 'audio/x-mei-aac'
};
export const defaultMoveOptions = {
  draggable: true,
  resizable: false,
  scalable: true,
  dragArea: false, // 开启 控制拖动区域
  origin: false, // 原点是否可见
  snappable: true, // 开启辅助线
  stopPropagation: true, // 阻止冒泡
  snapThreshold: 5,
  isDisplaySnapDigit: true, // 是否显示辅助线距离
  snapGap: true, // 画块辅助线
  snapElement: true, // 基于元素的辅助线
  snapCenter: true, // 中心辅助线
  snapDigit: 2, // 吸附距离
  snapVertical: true, // 垂直辅助线
  snapHorizontal: true, // 水平辅助线
  throttleDrag: 1,
  throttleResize: 1,
  throttleScale: 0.01,
  keepRatio: true, // 保持宽高比
  renderDirections: ['nw', 'ne', 'se', 'sw'], // 手柄锚点
  rotatable: false, // 是否可旋转
  throttleRotate: 0.2,
  elementGuidelines: [],
  pinchable: false // 捏合开关
};