/* eslint-disable */
handler = (req, res) => {
  const { query: { type } } = url.parse(req.url, true);
  let data = [];
  if(type === 'video') {
    data = [
      {
        title: '用户上传',
        type: 'video',
        items: [
          {
            name: 'video_1',
            format: 'mp4',
            cover: '/image/video/video_1.png',
            source: '/video/video_1.mp4',
            width: 1232,
            height: 720,
            fps: 30,
            frameCount: 712
          },
          {
            name: 'video_2',
            format: 'mp4',
            cover: '/image/video/video_2.png',
            source: '/video/video_2.mp4',
            width: 1242,
            height: 652,
            fps: 30,
            frameCount: 150
          },
        ]
      },
      {
        title: '热门',
        type: 'video',
        items: [
          {
            name: 'video_3',
            format: 'mp4',
            cover: '/image/video/video_3.png',
            source: '/video/video_3.mp4',
            width: 1242,
            height: 652,
            fps: 30,
            frameCount: 150
          }
        ]
      },
      {
        title: '搞笑片段',
        type: 'video',
        items: [
          {
            name: 'video_4',
            format: 'mp4',
            cover: '/image/video/video_4.png',
            width: 650,
            height: 652,
            frameCount: 150,
            fps: 30,
            source: '/video/video_4.mp4'
          }
        ]
      }
    ]
  }else if(type === 'audio') {
    data = [
      {
        title: '抖音',
        type: 'audio',
        items: [
          {
            cover: '/image/audio/audio_0.png',
            time: 25000,
            format: 'mp3',
            name: '测试音频1',
            source: '/audio/audio_0.mp3'
          },
          {
            cover: '/image/audio/audio_1.png',
            time: 16000,
            format: 'mp3',
            name: '测试音频2',
            source: '/audio/audio_1.mp3'
          },
          {
            cover: '/image/audio/audio_2.png',
            time: 41000,
            format: 'mp3',
            name: '测试音频3',
            source: '/audio/audio_2.mp3'
          }
        ]
      },
      {
        title: '卡点',
        type: 'audio',
        items: [
          {
            cover: '/image/audio/audio_3.png',
            time: 14000,
            format: 'mp3',
            name: '测试音频4',
            source: '/audio/audio_3.mp3'
          },
          {
            cover: '/image/audio/audio_4.png',
            time: 25000,
            format: 'mp3',
            name: '测试音频5',
            source: '/audio/audio_4.mp3'
          }
        ]
      }
    ]
  }else if(type === 'text') {
    data = [
      {
        title: '热门',
        type: 'text',
        items: [
          {
            name: '文字1',
            templateId: 0,
            cover: '/image/text/text_0.png'
          },
          {
            name: '文字2',
            templateId: 0,
            cover: '/image/text/text_0.png'
          },
          {
            name: '文字3',
            templateId: 0,
            cover: '/image/text/text_0.png'
          },
          {
            name: '文字4',
            templateId: 0,
            cover: '/image/text/text_0.png'
          },
          {
            name: '文字5',
            templateId: 0,
            cover: '/image/text/text_0.png'
          },
          {
            name: '文字6',
            templateId: 1,
            cover: '/image/text/text_1.png'
          },
          {
            name: '文字7',
            templateId: 1,
            cover: '/image/text/text_1.png'
          },
          {
            name: '文字8',
            templateId: 1,
            cover: '/image/text/text_1.png'
          },
          {
            name: '文字9',
            templateId: 1,
            cover: '/image/text/text_1.png'
          },
          {
            name: '文字10',
            templateId: 1,
            cover: '/image/text/text_1.png'
          }
        ]
      }
    ]
  }else if(type === 'image') {
    data = [
      {
        title: '热门',
        type: 'image',
        items: [
          {
            name: '贴图1',
            cover: '/image/image/image_0.png',
            source: '/image/image/image_0.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 8,
          },
          {
            name: '贴图2',
            cover: '/image/image/image_0.png',
            source: '/image/image/image_0.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 8,
          },
          {
            name: '贴图3',
            cover: '/image/image/image_0.png',
            source: '/image/image/image_0.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 8,
          },
          {
            name: '贴图4',
            cover: '/image/image/image_0.png',
            source: '/image/image/image_0.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 8,
          },
          {
            name: '贴图5',
            cover: '/image/image/image_0.png',
            source: '/image/image/image_0.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 8,
          }
        ]
      },
      {
        title: '经典',
        type: 'image',
        items: [
          {
            name: '贴图6',
            cover: '/image/image/image_1.png',
            source: '/image/image/image_1.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 6,
          },
          {
            name: '贴图7',
            cover: '/image/image/image_1.png',
            source: '/image/image/image_1.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 6,
          },
          {
            name: '贴图8',
            cover: '/image/image/image_1.png',
            source: '/image/image/image_1.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 6,
          },
          {
            name: '贴图9',
            cover: '/image/image/image_1.png',
            source: '/image/image/image_1.gif',
            format: 'gif',
            width: 199,
            height: 200,
            sourceFrame: 6,
          }
        ]
      }
    ]
  }else if(type === 'effect') {
    data = [
      {
        title: '热门',
        type: 'effect',
        items: [
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          },
          {
            cover: '/image/effect/effect_0.gif',
            name: '特效',
            templateId: 0
          }
        ]
      },
      {
        title: '基础',
        type: 'effect',
        items: [
          {
            cover: '/image/effect/effect_1.gif',
            name: '特效',
            templateId: 1
          },
          {
            cover: '/image/effect/effect_1.gif',
            name: '特效',
            templateId: 1
          },
          {
            cover: '/image/effect/effect_1.gif',
            name: '特效',
            templateId: 1
          },
          {
            cover: '/image/effect/effect_1.gif',
            name: '特效',
            templateId: 1
          },
          {
            cover: '/image/effect/effect_1.gif',
            name: '特效',
            templateId: 1
          }
        ]
      }
    ]
  }else if(type === 'transition') {
    data = [
      {
        title: '热门',
        type: 'transition',
        items: [
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          }
        ]
      },
      {
        title: '叠化',
        type: 'transition',
        items: [
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          }
        ]
      },
      {
        title: '运镜',
        type: 'transition',
        items: [
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          },
          {
            cover: '/image/transition/transition_0.gif',
            name: '转场',
            templateId: 0
          }
        ]
      }
    ]
  }else if(type === 'filter') {
    data = [
      {
        title: '精选',
        type: 'filter',
        items: [
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 1
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 2
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 3
          },
          {
            cover: '/image/filter/empty.png',
            name: '亮肤',
            templateId: 4
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 5
          },
          {
            cover: '/image/filter/empty.png',
            name: '酷白',
            templateId: 6
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 7
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 8
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 9
          },
          {
            cover: '/image/filter/empty.png',
            name: '滤镜',
            templateId: 10
          }
        ]
      }
    ]
  }
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.write(JSON.stringify({
    status: 200,
    data: data
  }));
  res.end();
};