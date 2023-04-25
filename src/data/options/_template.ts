import { mappingFormItem } from '@/utils/formItemUtils';
// 元素属性配置
export const Options = {
    attributes: [
        mappingFormItem('Tabs', {
            children: [
                mappingFormItem('TabPane', {
                    name: '画面',
                    children: [
                        mappingFormItem('TabsCard', {
                            children: [
                                mappingFormItem('TabPane', {
                                    name: '基础',
                                    children: [
                                        mappingFormItem('Collapse', {
                                            children: [
                                                mappingFormItem('CollapsePane', {
                                                    name: '基础',
                                                    children: [
                                                        mappingFormItem('Slider', { attr: {
                                                                min: 1,
                                                                max: 100,
                                                                step: 1
                                                            }, name: '缩放', mappingKey: 'scale' }),
                                                        mappingFormItem('Flex', { attr: { col: 2 }, name: '位置', children: [
                                                                mappingFormItem('Number', { attr: {
                                                                        controlsPosition: 'right'
                                                                    }, name: 'x', mappingKey: 'position.x' }),
                                                                mappingFormItem('Number', { attr: {
                                                                        controlsPosition: 'right'
                                                                    }, name: 'y', mappingKey: 'position.y' })
                                                            ] }),
                                                        mappingFormItem('Number', { name: '旋转', mappingKey: 'position' }),
                                                        mappingFormItem('Color', { name: '背景颜色', mappingKey: 'color' }),
                                                        mappingFormItem('TextArea', { attr: {
                                                                autosize: {
                                                                    minRows: 1,
                                                                    maxRows: 4
                                                                },
                                                                placeholder: '请输入'
                                                            }, name: '文字', mappingKey: 'color1' }),
                                                        mappingFormItem('Boolean', { name: 'switch', mappingKey: 'color2' }),
                                                        mappingFormItem('String', { attr: { placeholder: '请输入数字' }, name: 'string', mappingKey: 'color3' }),
                                                        mappingFormItem('Radio', { name: 'Radio', mappingKey: 'color4', defaultValue: 'o1', children: [
                                                                mappingFormItem('RadioItem', { name: 'o1', value: 'o1' }),
                                                                mappingFormItem('RadioItem', { name: 'o2', value: 'o2' })
                                                            ]
                                                        }),
                                                        mappingFormItem('RadioButton', { name: 'Radio', mappingKey: 'color5', defaultValue: 'o1', children: [
                                                                mappingFormItem('RadioButtonItem', { name: 'o1', value: 'o1' }),
                                                                mappingFormItem('RadioButtonItem', { name: 'o2', value: 'o2' })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        mappingFormItem('Collapse', {
                                            children: [
                                                mappingFormItem('CollapsePane', {
                                                    name: '混合',
                                                    children: [
                                                        mappingFormItem('Slider', {
                                                            name: '不透明度',
                                                            mappingKey: 'opacity'
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                mappingFormItem('TabPane', {
                                    name: '背景',
                                    children: [
                                        mappingFormItem('FormItem', {
                                            name: '不透明度',
                                            dataType: 'Slider',
                                            mappingKey: 'opacity'
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                mappingFormItem('TabPane', {
                    name: '动画',
                    children: []
                })
            ]
        })
    ]
};