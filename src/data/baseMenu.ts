interface MenuItem {
  title: string,
  key: string,
  active?: boolean,
  icon: string
}
const menuData: MenuItem[] = [
  {
    title: '视频',
    key: 'video',
    icon: 'VideoIcon'
  },
  {
    title: '音频',
    key: 'audio',
    icon: 'AudioIcon'
  },
  {
    title: '文本',
    key: 'text',
    icon: 'TextIcon'
  },
  {
    title: '图片',
    key: 'image',
    icon: 'ImageIcon'
  },
  {
    title: '特效',
    key: 'effect',
    icon: 'EffectsIcon'
  },
  {
    title: '过渡',
    key: 'transition',
    icon: 'TransitionIcon'
  },
  {
    title: '滤镜',
    key: 'filter',
    icon: 'FilterIcon'
  }
];

export { menuData };
export type { MenuItem };