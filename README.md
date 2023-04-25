|                                                                                   CcClip                                                                                    |                              打赏 :confetti_ball:                               | 
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:| 
| ![logo.png](https://github.com/Cc-Edit/CcClip/blob/master/public/user/logo.png) | ![打赏](https://github.com/Cc-Edit/CcClip/blob/master/public/user/img.png "感谢") |

# CcClip
## 简介
  > Vue 3 + FFmpeg 实现纯前端音视频编辑 <br/>
  > 如果有用请 Star 支持一下哟

## 特性
- 💪 Vue 3、Vue-Router 4、Vite、pnpm、esbuild、TypeScript
- ☀️ Pinia 状态管理
- 🌟 [完整的Eslint配置](https://github.com/Cc-Edit/CcClip/blob/main/.eslintrc.cjs)
- 🌪 Tailwind 原子css集成
- 💥 ffmpeg、wasm 底层音视频处理集成
- 🚙 [文件路由自动注册](https://github.com/Cc-Edit/CcClip/blob/main/src/plugins/installRouter.ts)
- 🚕 [Icon组件自动导入](https://github.com/Cc-Edit/CcClip/blob/main/src/plugins/installIcon.ts)
- 🚗 [API自动注册 + vue-hooks-plus 简化API调用维护](https://inhiblab-core.gitee.io/docs/hooks/)
- 🎁 [提供一个基于Vite的本地接口服务，用来提供一些简单的Mock接口](https://github.com/Cc-Edit/CcClip/blob/main/viteUtil/viteProxyServer/vite-plugin-proxy-server.ts)
- 🌓 暗色主题切换

## 功能
- 多轨道时间轴，支持帧缩放，时间缩放
- 支持多种类型轨道的添加删除
- 多功能轨道调节，支持音视频轨道内裁剪，支持轨道拖拽调整顺序、起止帧
- 可伸缩轨道列表，灵活调整轨道列表高度
- 可配置参数容器，轨道属性调节全部由配置文件生成
- ffmpeg 
  - 核心API封装管理
  - 调用队列封装，支持并发运行run
  - gif抽帧、视频抽帧、视频裁切、音视频分离、文件下载
  - 音频裁切、多音频合成、音频波形 

## 参考
- https://trac.ffmpeg.org/wiki/Waveform  
- https://github.com/chuxiaoguo/vue-sketch-ruler 时间轴参考此工具库实现
- 
## 脚本说明

```sh
pnpm install
```

### 本地开发

```sh
npm run dev
```

### 生产构建

```sh
npm run build
```


### 代码检查

```sh
npm run lint
```

### 代码检查与修复

```sh
npm run lint-fix
```

## 版权相关
  开源前已对项目进行版权过滤，将个人使用范围的素材替换为公共免费的素材。
  - icon svg 部分来自 [iconpark](https://iconpark.oceanengine.com/official)

如需帮助请联系： ccedit@126.com