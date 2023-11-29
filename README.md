## [【求职中】北京公司请联系我 😊(点击查看微信👉🏻)](https://github.com/Cc-Edit/Cc-Edit/blob/main/public/wechat.png)

|                                      学习讨论小组🍻                                      |   打赏（赠送学习资料：[webNote](https://github.com/Cc-Edit/webNote)） :confetti_ball:    | 
|:----------------------------------------------------------------------------------:|:---------------------------------------------------------------------:| 
| ![wechat.png](https://github.com/Cc-Edit/Cc-Edit/blob/main/public/CcClip.png) |     ![img.png](https://github.com/Cc-Edit/Cc-Edit/blob/main/public/img.png)  |


# CcClip

## 简介
Vue 3 + FFmpeg 实现纯前端音视频编辑 <br/>
如果有用请 🌟 Star 🌟 支持一下哟 🫣 <br/>

## 特性
- 💪 Vue 3、Vue-Router 4、Vite、pnpm、esbuild、TypeScript
- ☀️ Pinia 状态管理
- 🌟 [完整的Eslint配置](https://github.com/Cc-Edit/CcClip/blob/master/.eslintrc.cjs)
- 🌪 Tailwind 原子css集成
- 💥 ffmpeg、wasm 底层音视频处理集成
- 🚙 [文件路由自动注册](https://github.com/Cc-Edit/CcClip/blob/master/src/plugins/installRouter.ts)
- 🚕 [Icon组件自动导入](https://github.com/Cc-Edit/CcClip/blob/master/src/plugins/installIcon.ts)
- 🚗 [API自动注册 + vue-hooks-plus 简化API调用维护](https://inhiblab-core.gitee.io/docs/hooks/)
- 🎁 [提供一个基于Vite的本地接口服务，用来提供一些简单的Mock接口](https://github.com/Cc-Edit/CcClip/blob/master/viteUtil/viteProxyServer/vite-plugin-proxy-server.ts)
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

## 预览
![](coverImage/img.png)
![](coverImage/img_1.png)
![](coverImage/img_2.png)
![](coverImage/img_3.png)
![](coverImage/img_4.png)

## 常见问题
### 1. 获取视频时长信息、总帧数信息：
```shell
$ ffmpeg -hide_banner -i video_1.mp4  -f null -

# 输出：
# frame=  710 fps=0.0 q=-0.0 Lsize=N/A time=00:00:23.75 bitrate=N/A speed= 168x
# video:327kB audio:2046kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown
# frame 为当前视频文件总帧数
# time 为视频时长
# 注意一点，总帧数取决于视频fps，总帧数 = fps * 总时长
```
> ⚠️ 还有一点  
> 之前考虑将 ffprobe 也接入进来，可以直接获取视频的媒体信息，但这么做的结果是前端资源体积过于大  
> 所以 ffmpeg 将 ffprobe 抽离出去的原因也许就是为了保留一个最小可用集合  
> 综上，如果确实有需要获取资源详细信息的场景，我的建议是放到后台或者是单独页面处理   
> 在编辑页面只做结果的处理。  

> 建议的方案：   
> 服务器环境中安装完整的ffmpeg    
> 将获取视频媒体信息的命令封装为接口    
> 在文件上传后在服务器本地获取视频媒体信息，并保存     
> 不论是用户上传，还是管理后台上传，都是在上传完成后获取文件信息。   
> 只有文件信息获取完成后，资源才可以在编辑器中使用   

### 2. 如何使用 ip 地址访问
> 受 COOP 的限制，使用 ip 地址访问时依然不被信任，所以我们增加了 dev-ssl 命令  
> 执行 pnpm dev-ssl 即可通过 ip 地址访问  
> 注意 ⚠️ 使用 dev-ssl 启动之后访问地址更换为 https 开头  

### 3. 视频分割方案
> 视频分割我的想法是不操作原始数据  
> 只是通过控制轨道中元素的 start、end 数据，将一个视频元素拆分为两个   
> 整个链路中不对原始视频做分割，避免性能损耗   
> 导出与播放可以通过 ffmpeg 命令的时间段参数从原始视频中取出数据   

### 4. 视频导出方案
> 较复杂的方案是将轨道数据转换为ffmpeg命令   
> 根据命令性能考虑是前端执行还是放到后台接口中执行  
> 简单点的方案是将轨道参数编译为 [FFCreator](https://tnfe.github.io/FFCreator/#/) 参数    
> 可以直接利用现有的视频合成服务    

### 5. 滤镜、转场方案
> 滤镜转场特效抽象看就是 Shader   
> 通过参数控制 shader 生效的时间点  
> 参考：https://gl-transitions.com/   


## V 2.0 进行中...
- [ ] (视频合成导出)
- [ ] (转场)
- [ ] (滤镜)
- [ ] (特效)
> 暂时还在忙别的项目，抽不出时间迭代 2.0   
> 2.0 开发中...... ( ⭐️ Star 加速！)

## 参考
- https://trac.ffmpeg.org/wiki/Waveform
- https://github.com/chuxiaoguo/vue-sketch-ruler 时间轴参考此工具库实现


## 版权相关
  开源前已对项目进行版权过滤，将个人使用范围的素材替换为公共免费的素材。
  - icon svg 部分来自 [iconpark](https://iconpark.oceanengine.com/official)


如需帮助请联系： ccedit@126.com
