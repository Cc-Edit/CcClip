/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const ISPROD = process.env.NODE_ENV === 'production';
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    'require': true
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'postcss.config.js',
    'tailwind.config.js',
    'viteUtil/viteProxyServer/vite-plugin-proxy-server.ts',
    'public/',
    'auto-imports.d.ts',
    'components.d.ts'
  ],
  rules: {
    'linebreak-style': ['error', 'unix'], // 缩进风格
    'no-constant-condition': 'error', // 允许条件中的常量表达式。 if(true) 无意义
    'no-undef': 'error', // 对未声明变量的任何引用都会导致警告, 应该逐个检查，不应该全局关闭
    'no-fallthrough': 'error', // case中没有break的场景不应该全局关闭，特例单独处理
    'no-case-declarations': 'error', // switch case 中的变量提升
    'no-inner-declarations': ['error', 'functions'], // 禁止在嵌套的语句块中出现变量或 function
    // 禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'error', // 禁止不必要的布尔类型转换（no-extra-boolean-cast）  'extends': 'eslint:recommended' 属性启用了此规则。
    'no-unused-vars': ['off', { // 禁止未使用过的变量
      vars: 'all', // 检测所有变量，包括全局环境中的变量。这是默认值。
      args: 'none' // 不检查参数
    }],
    'vue/no-unused-vars': 'error',
    'vue/no-parsing-error': 'error', // template解析错误报错，不应该关闭
    'vue/no-side-effects-in-computed-properties': 'error', // 不允许在计算属性中进行复杂操作，例如修改data，保持默认，不应该全局关闭

    /*
     * 20220504 - v8.14.0
     * 文档地址： https://eslint.org/docs/rules/ + [rule]
     */
    'array-callback-return': ['error', { allowImplicit: true }], // 在数组方法的回调中强制执行 return 语句
    'no-await-in-loop': 'error', // 不允许await出现在循环体内
    'no-constructor-return': 'error', // 不允许在构造函数中返回值
    'no-duplicate-imports': 'off', // 合并同一模块下的多个导入
    'no-promise-executor-return': 'error', // 不允许从Promise执行return返回
    'no-self-compare': 'error', // 禁止自身与自身相比较 x === x
    'no-template-curly-in-string': 'error', // 不允许在常规字符串中使用模板文字占位符语法。(双引号中不能出现字符串模板)
    'no-unmodified-loop-condition': 'error', // 不允许未经修改的循环条件。死循环
    'no-unreachable-loop': 'error', // 禁止带有仅允许一次迭代的主体的循环o-confusing-arro
    'no-unused-private-class-members': ISPROD ? 'error' : 'off', // 允许Class中有未使用的属性或方法成员，存在开发人员预先定义结构的场景。 发布前校验
    'no-use-before-define': 'error', // 不允许在定义变量前使用变量 !!!
    'require-atomic-updates': 'error', // 在分配可能基于过时值的情况下报告错误，异步陷阱
    'accessor-pairs': 'error', // 提供setter的同时要提供getter，提供getter的同时可以不提供setter
    'arrow-body-style': 'off', // 箭头函数体在多行场景下使用大括号，单行情况下不允许使用大括号(关闭，单行内常出现类型说明)
    'block-scoped-var': 'error', // 不允许在块级作用域中使用var
    'camelcase': 'error', // 命名变量时可以使用驼峰或者下划线
    'capitalized-comments': 'off', // 禁止注释的首字母大写
    'class-methods-use-this': ISPROD ? 'error' : 'off', // 强制类方法使用this,如果一个类方法不使用this，有时可以做成静态函数。 发布前校验
    'complexity': ['error', 100], // 最大if else层数 上限10
    'consistent-return': 'error', // 要求使用一致的 return 语句
    'consistent-this': ['error', 'that'], // that 只能用来承接this
    'curly': ['off', 'all'], // if, else 必须写大括号
    'default-case': 'error', // Switch 语句中必须有 Default 分支
    'default-case-last': 'error', // Switch 语句中的 Default 必须位于最后
    'default-param-last': 'off', // 函数中存在默认值的参数必须在最后，更规范的函数写法
    'dot-notation': 'error', // 能用.连接符取值时，优先使用.
    'eqeqeq': ['error', 'always'], // 强制使用 === 和 !==
    'func-name-matching': 'off', // 不强制要求接收函数的变量与函数同名
    'func-names': ['error', 'never'], // 省略多余的函数命名
    'func-style': ['off'], // 对函数定义的方式不做要求
    'grouped-accessor-pairs': ['error', 'getBeforeSet'], // 相同属性的getter与setter需要相邻， getter要在setter之前
    'guard-for-in': 'off', // 不对 for in 进行原型链检查
    'id-denylist': 'off', // 禁止使用指定的标识符
    'id-length': ['off', { exceptions: ['t', 'h', 'i', 'v', 'x', 'y', 'z', 'j', 'k', 'r', 'g', 'b', 'a'] }], // 强制标识符的最小长度为2
    'max-depth': ['error', 4], // 强制块可以嵌套的最大深度
    'max-lines': ['error', 4000], // 每个文件的最大行数
    'max-lines-per-function': ['error', 500], // 单个函数最大行数
    'max-nested-callbacks': ['error', 5], // 强制回调函数最大嵌套深度
    'max-params': ['error', 10], // 限制函数定义中最大参数个数
    'max-statements': ['error', 100], // 块内最大语句数
    'multiline-comment-style': 'off', // 不强制对多行注释使用特定风格
    'new-cap': ['error', { // 要求构造函数首字母大写
      newIsCap: true, // 要求调用 new 操作符时有首字母大小的函数。
      capIsNew: false //  允许调用首字母大写的函数时没有 new 操作符
    }],
    'no-alert': 'error', // 不允许有alert，使用 debugger 进行断点调试
    'no-array-constructor': 'error', // Array通常不鼓励使用构造函数来构造一个新数组，而是使用数组字面量表示法
    'no-bitwise': 'off', // 不允许使用位运算符，确需使用的补充注释后可按行忽略
    'no-caller': 'error', // 禁用 caller 或 callee (no-caller)
    'no-confusing-arrow': [
      'error',
      { allowParens: true, onlyOneSimpleParam: false }
    ], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-console': ISPROD ? 'error' : 'off', // 生产环境不能有console,开发环境可以有
    'no-continue': 'error', // 通过禁用continue提高代码健壮程度
    'no-else-return': 'off', // 允许在 else 前有 return
    'no-empty-function': 'off', // 不允许出现空函数，为空函数写一个清晰的注释是一个好习惯
    'no-eq-null': 'error', // 禁止与 null 进行 == 比较
    'no-eval': 'error', // 禁用 eval()
    'no-extend-native': 'error', // 禁止扩展原生对象
    'no-extra-bind': 'error', // 禁止不必要的函数绑定（bind方法）
    'no-extra-label': 'error', // 禁用不必要的标签
    'no-floating-decimal': 'error', // 小数点之前或之后必须有一个数字
    'no-implicit-coercion': 'error', // 禁止使用运算符实现类型转换
    'no-implicit-globals': 'error', // 不允许在全局范围内声明。避免使本地的变量“污染”全局变量
    'no-implied-eval': 'error', // 禁用隐式的eval()
    'no-inline-comments': 'off', // 允许行内注释
    'no-invalid-this': 'error', // 不允许类或类对象之外使用this
    'no-iterator': 'error', // 禁用迭代器
    'no-label-var': 'error', // 禁用与变量同名的标签
    'no-labels': 'error', // 禁用标签语句 默认都为false
    'no-lone-blocks': 'error', // 禁用不必要的嵌套块
    'no-lonely-if': 'error', // 禁止 if 语句作为唯一语句出现在 else 语句块中，应该合并为else if ()
    'no-loop-func': 'error', // 不允许在循环中编写使用函数
    'no-magic-numbers': ['off', { ignoreArrayIndexes: true, ignore: [0, 1, 2, 3, 200, 400, 401, 403, 404, 405, 500] }], // 禁止使用魔术数字, 暂时关闭
    'no-mixed-operators': 'off', // 可以混合使用规则
    'no-multi-assign': 'error', // 禁止连续赋值，难以阅读
    'no-multi-str': 'error', //  禁止多行字符串
    'no-negated-condition': 'off', // 避免先决条件是否定条件的情况，难以阅读
    'no-nested-ternary': 'off', // 可以使用嵌套三元表达式
    'no-new': 'error', // 避免单独使用new
    'no-new-func': 'error', // 禁用Function构造函数
    'no-new-object': 'error', // 禁止使用 Object 构造函数
    'no-new-wrappers': 'error', // 禁止原始包装实例
    'no-octal-escape': 'error', // 禁止在字符串字面量中使用八进制转义序列
    'no-param-reassign': 'off', // 允许函数内部修改入参
    'no-plusplus': 'off', // 允许++自增符号单独出现，除for循环内部。可以使用+=，-=替代
    'no-proto': 'error', // 禁用__proto__
    'no-restricted-exports': 'off', // 允许导出任意变量名
    // 'no-restricted-globals': [ // 变量保护
    //   'error',
    //   {
    //     name: '_Vue_',
    //     message: '全局变量保护，请勿占用.'
    //   }
    // ],
    'no-return-assign': ['error', 'except-parens'], // 禁止在返回语句中赋值  except-parens 禁止出现赋值语句，除非使用括号把它们括起来
    'no-return-await': 'error', // 禁用不必要的 return await
    'no-script-url': 'error', // 禁用 Script URL
    'no-sequences': 'error', // 不允许使用逗号操作符
    'no-shadow': 'off', // 禁止变量声明覆盖外层作用域的变量, 使用ts中的检查
    'no-ternary': 'off', // 允许使用三元运算
    'no-throw-literal': 'error', // 限制可以被抛出的异常
    'no-undef-init': 'off', // 允许初始化变量值为 undefined，部分场景undefined有特殊含义
    'no-undefined': 'off', // 允许 undefined作为标识符
    'no-underscore-dangle': 'off', // 允许 使用下划线作为标识符
    'no-unneeded-ternary': ['error', { // 禁止可以表达为更简单结构的三元操作符
      defaultAssignment: true // 禁止条件表达式作为默认的赋值模式
    }],
    'no-unused-expressions': ['error', { allowShortCircuit: true }], // 禁止未使用过的表达式
    'no-useless-call': 'error', // 禁用不必要的 .call() 和 .apply()
    'no-useless-computed-key': 'error', // 禁止在对象中使用不必要的计算属性
    'no-useless-concat': 'error', // 禁止没有必要的字符拼接 'a' + 'b'
    'no-useless-constructor': 'error', // 禁用不必要的构造函数
    'no-useless-rename': 'error', // 禁止在 import 和 export 时将引用重命名为相同的名字
    'no-useless-return': 'error', // 禁止无意义的 return
    'no-var': 'error', // 要求使用 let 或 const
    'no-void': 'error', // 禁止使用void操作符
    'object-shorthand': 'error', // 对象简写，单字母
    'one-var': 'off', // 对变量声明位置无限制
    'prefer-arrow-callback': ['error', { allowUnboundThis: false }], // 要求使用箭头函数作为回调
    'prefer-const': 'off', // 建议使用const
    'prefer-destructuring': 'off', // 优先使用数组和对象解构
    'prefer-exponentiation-operator': 'error', // 使用 ** 替换 Math.pow
    'prefer-object-has-own': 'error', // 使用 Object.hasOwn 替换 Object.hasOwnProperty
    'prefer-object-spread': 'error', // 限制Object的使用场景，尽可能使用对象扩展方式完成
    'prefer-rest-params': 'error', // 使用 ...args 收集参数，避免使用arguments
    'prefer-spread': 'error', // 建议使用扩展语法而非.apply()
    'prefer-template': 'error', // 建议使用模板字面量而非字符串连接
    'quote-props': ['error', 'as-needed'], // 属性前后按需添加双引号
    'radix': ['error', 'as-needed'], // parseInt转换非10进制时，不省略第二个参数基数
    'require-await': 'off', // async 内部必须存在 await
    'spaced-comment': ['error', 'always', { // 要求或禁止在注释前有空白
      markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] // 'markers'的值是一个字符串形式的数组，这些字符串也就是块级注释的标记
    }],
    'strict': ['error', 'global'], // 只允许全局声明 use strict
    'vars-on-top': 'error', // var变量声明要位于顶部，手动进行变量提升
    'yoda': 'error', // 不允许yoda表达式，判断条件中变量在前，值在后
    'array-bracket-newline': 'off', // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': 'error', // 禁止在括号内使用空格，1.有空格var arr = [ 'foo', 'bar' ]; 2.无空格 var arr = ['foo', 'bar', 'baz'];
    'array-element-newline': 'off', // 数组元素换行风格
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }], // 要求箭头函数的参数使用圆括号
    'arrow-spacing': ['error', { // 箭头函数的箭头之前或之后有空格
      before: true,
      after: true
    }],
    'block-spacing': ['error', 'always'], // 代码块中开括号前和闭括号后有空格
    'brace-style': ['error', '1tbs', { // 大括号风格
      allowSingleLine: true // 允许左右大括号在同一行
    }],
    'comma-dangle': ['error', 'never'], // 不允许使用拖尾逗号，IE8报错
    'comma-spacing': ['error', { // 强制在逗号周围使用空格
      before: false,
      after: true
    }],
    'comma-style': ['error', 'last'], // 逗号样式
    'computed-property-spacing': 'error', // 禁止或强制在计算属性中使用空格
    'dot-location': ['error', 'property'], // 点操作符和属性放在同一行
    'eol-last': 'off', // 要求或禁止文件末尾保留一行空行
    'func-call-spacing': 'off', // 要求或禁止在函数标识符和其调用之间有空格
    'function-call-argument-newline': 'off', // 不强制要求函数调用参数换行
    'generator-star-spacing': ['error', { before: true, after: false }], // 强制 generator 函数中 * 号前面有空格
    'implicit-arrow-linebreak': 'error', // 强制隐式返回的箭头函数体的位置需在同一行
    'indent': ['off', 2],
    'jsx-quotes': ['error', 'prefer-single'], // JSX 属性中使用一致的单引号
    'key-spacing': ['error', { // 对象文字属性中的键和值之间保持一致的间距
      beforeColon: false,
      afterColon: true
    }],
    'keyword-spacing': ['error', { // 强制关键字周围空格的一致性
      before: true,
      after: true
    }],
    'line-comment-position': 'off', // 行注释位置，可以在上面也可以在后面
    'lines-around-comment': ['error', {
      beforeBlockComment: false,
      beforeLineComment: false,
      allowBlockStart: true,
      allowClassStart: true,
      allowObjectStart: true
    }], // 强制注释周围有空行  后续开启
    'object-curly-newline': 'off', // 不对对象换行强制要求
    'lines-between-class-members': ['off', 'never'], // 禁止在类成员之间出现空行
    'max-len': ['error', { code: 20000 }], // 最大行长度
    'max-statements-per-line': ['error', { max: 3 }], // 每行最大语句数
    'new-parens': 'error', // 无参构造函数时带括号
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }], // 链式操作最大个数
    'no-extra-parens': ['off', 'functions'], // 禁止冗余的括号
    'no-multi-spaces': 'error', // 禁止出现多个空格
    'no-multiple-empty-lines': ['error', { // 不允许多个空行
      max: 1, // 强制最大连续空行数。
      maxEOF: 1, // 强制文件末尾的最大连续空行数
      maxBOF: 0 //  强制文件开始的最大连续空行数
    }],
    'no-trailing-spaces': 'off', // 不检查行尾空白
    'no-whitespace-before-property': 'error', // 禁止属性前有空白
    'nonblock-statement-body-position': ['error', 'beside'], // 强制单行语句在同一行
    'object-curly-spacing': ['error', 'always', { // 强制在花括号中使用一致的空格 always要求花括号内有空格 (除了 {})
      objectsInObjects: false
    }],
    'object-property-newline': 'off', // 对象属性强制换行
    'operator-linebreak': ['error', 'before'], // 运算符强制执行一致的换行样式, 在操作符之前放置换行符
    'padded-blocks': ['error', 'never'], // 禁止块语句和类的开始或末尾有空行
    'quotes': ['error', 'single', { // 强制一致地使用反引号、双引号或单引号
      avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
      allowTemplateLiterals: true //  允许字符串使用反勾号
    }],
    'rest-spread-spacing': ['error', 'never'], // 展开运算符后面不允许跟空格： ... args
    'semi': ['error', 'always'], // 分号检查
    // 'semi': 'off', // 不检查分号
    'semi-spacing': 'error', // 强制分号后有空格
    'semi-style': ['error', 'last'], // 强制分号的位置在末尾
    'space-before-blocks': ['error', 'always'], // 要求语句块之前的空格
    'space-before-function-paren': ['error', 'never'], // 禁止函数圆括号之前有一个空格
    'space-in-parens': ['error', 'never'], // 禁止括号内的空格 foo('bar');
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'space-unary-ops': ['error', { // 要求或禁止在一元操作符之前或之后存在空格
      words: true, // 适用于单词类一元操作符 例如：new、delete、typeof、void、yield
      nonwords: false // 适用于这些一元操作符: -、+、--、++、!、!!
    }],
    'switch-colon-spacing': 'error', // 强制在 switch 的冒号左侧没有空格，右侧有空格
    'template-curly-spacing': ['error', 'never'], // 强制模板字符串中禁止花括号内出现空格 ${people.name}
    'wrap-iife': ['error', 'any'], // 需要把立即执行的函数包裹起来，不限制执行风格
    'yield-star-spacing': ['error', 'before'], //* 在 yield 表达式周围强制使用间距
    'no-debugger': ISPROD ? 'error' : 'off', // 禁用 debugger

    /*
    * 20220504 -  V8.7.1
    * 文档地址： https://eslint.vuejs.org/rules/ + [rule].html
    */
    'vue/define-macros-order': ['error', {
      order: ['defineProps', 'defineEmits']
    }], // 强制执行 defineEmits 和 defineProps 的顺序
    'vue/match-component-import-name': 'error', // 要求注册的组件名称与导入的组件名称匹配
    // "vue/no-restricted-html-elements": ["error", "button", "marquee"],// 禁用的html元素
    'vue/prefer-prop-type-boolean-first': 'error', // 强制Boolean在prop类型定义中排在第一位
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }], // 在标签的右括号之前要求或禁止换行
    'vue/component-tags-order': ['error', {
      order: ['template', 'script', 'style']
    }], // vue单文件属性顺序
    'vue/no-v-html': 'error', // 不使用v-html
    'vue/this-in-template': 'error', // 不在template中使用this
    'vue/attribute-hyphenation': 'off', // 使用下划线链接属性
    'vue/component-definition-name-casing': 'error', // 组件定义时的name要使用驼峰命名
    'vue/first-attribute-linebreak': 'error', // 属性换行规范
    'vue/html-closing-bracket-spacing': 'error', // 标签关闭前不允许出现空格
    'vue/html-end-tags': 'error', // 要对标签进行关闭操作
    'vue/html-indent': 'off', // html内遵守缩进
    'vue/html-quotes': 'error', // html内部使用双引号
    'vue/html-self-closing': 'error', // 优先使用自闭合标签
    'vue/max-attributes-per-line': ['error', { // 限制每行允许的最多属性数量
      singleline: 5, // 开始标记在一行中时，每行的最大属性数
      multiline: 5
    }],
    'vue/multiline-html-element-content-newline': 'error', // 多行元素的内容之前和之后强制换行
    'vue/mustache-interpolation-spacing': 'error', // {{}} 插值时保持统一间距
    'vue/no-multi-spaces': 'error', // 不允许多个空格
    'vue/no-spaces-around-equal-signs-in-attribute': 'error', // 属性中的等号周围不允许有空格
    'vue/no-template-shadow': 'error', // template中遵守作用域规则
    'vue/one-component-per-file': 'error', // 每个文件只有一个组件
    'vue/prop-name-casing': 'error', // Vue 组件中的 Prop 名称强制使用驼峰
    'vue/require-default-prop': 'off', // prop必须设置默认value 关闭
    'vue/require-explicit-emits': 'error', // 事件必须在 emits 中声明才能使用
    'vue/require-prop-types': 'off', // prop 必须有类型限制 关闭
    'vue/singleline-html-element-content-newline': 'off', // 强制换行
    'vue/v-bind-style': 'error', // 使用 : 进行属性绑定，避免使用v-bind
    'vue/v-on-event-hyphenation': 'off', // 强制在template中使用连字符事件名
    'vue/v-on-style': 'error', // 使用简写@，避免使用v-on
    'vue/v-slot-style': 'error', // 使用插槽的简写
    'vue/attributes-order': 'off', // 属性顺序
    'vue/no-lone-template': 'error', // 避免不必要的template
    'vue/no-multiple-slot-args': 'error', // 不允许将多个参数传递给作用域插槽
    'vue/order-in-components': 'error', // 强制组件中的属性顺序
    // 其他规则：
    'vue/block-lang': ['error', // 此规则不允许将您的应用程序中可用的语言以外的语言用于块元素的 lang 属性
      {
        script: {
          lang: ['js', 'ts']
        },
        route: {
          lang: '' // route 自定义块内只能使用默认的json5
        }
      }
    ],
    'vue/block-tag-newline': 'error', // 此规则在打开和关闭块标记之前强制换行（或不换行）
    'vue/component-api-style': ['error', // 此规则旨在使您用于定义 Vue 组件的 API 样式在您的项目中保持一致
      ['script-setup', 'composition', 'options'] // "script-setup", "composition", "composition-vue2", or "options"
    ],
    'vue/component-name-in-template-casing': ['off', 'PascalCase', { // 此规则旨在警告 Vue.js 模板中配置的大小写以外的标记名称。
      registeredComponentsOnly: false
    }],
    'vue/component-options-name-casing': 'error', // 强制在components选项中对组件名称进行大小写(PascalCase)
    'vue/custom-event-name-casing': ['error', 'camelCase'], // 在 Vue 3 中，使用 camelCase 或 kebab-case 作为自定义事件名称不会限制其在 v-on 中的使用。但是，遵循 JavaScript 约定，camelCase 更自然。
    'vue/html-button-has-type': 'off', // 不检查按钮类型属性上是否使用了无效类型
    'vue/html-comment-content-newline': 'error', // 强制在注释（<!-- -->）之后和之前的换行符的一致性。
    'vue/html-comment-content-spacing': 'error', // 此规则将强制注释前后的间距保持一致
    'vue/html-comment-indent': 'off', // 此规则在 HTML 注释中强制使用一致的缩进样式
    'vue/match-component-file-name': 'error', // 组件name属性要与文件名一致
    'vue/new-line-between-multi-line-property': 'off', // 对象属性之间不用空行
    'vue/next-tick-style': 'error', // 强制使用Promise风格的nextTick回调，不允许传递callback
    /*
     * ✓ GOOD
     * Vue.nextTick().then(() => callback());
     * await Vue.nextTick(); callback();
     * this.$nextTick().then(() => callback());
     * await this.$nextTick(); callback();
     */
    'vue/no-bare-strings-in-template': 'off', // 允许在template中插入字符串，更建议使用国际化文件
    'vue/no-boolean-default': ['error', 'default-false'], // 强制布尔值类型的prop默认值只能是false：https://blog.csdn.net/weixin_34246551/article/details/88009159
    'vue/no-child-content': 'error', // 由于v-html、v-text导致的子元素失效
    'vue/no-duplicate-attr-inheritance': 'error', // 使用v-bind="$attrs"时需要指定inheritAttrs：false
    'vue/no-empty-component-block': 'off', // 允许template，script，style为空, 考虑到开发阶段存在批量创建页面的场景
    'vue/multi-word-component-names': 'off', // 关闭组件名称多单词限制
    'vue/no-expose-after-await': 'error', // 禁止异步注册expose()
    'vue/no-invalid-model-keys': 'error', // model中的关键字校验
    'vue/no-multiple-objects-in-class': 'error', // 使用对象风格赋值class
    'vue/no-potential-component-option-typo': 'error', // 不允许在您的组件属性中出现潜在的拼写错误
    'vue/no-reserved-component-names': ['error', { // 禁止定义原生名冲突的组件
      disallowVueBuiltInComponents: true,
      disallowVue3BuiltInComponents: true
    }],
    'vue/no-restricted-block': 'off', // 禁止特定的块，自定义块： ["error", "style", "foo", "bar"]
    'vue/no-restricted-call-after-await': 'off', // 禁止异步调用受限方法
    'vue/no-restricted-class': 'off', // 禁止使用特定类： ["error", "forbidden", "forbidden-two", "forbidden-three"]
    'vue/no-restricted-component-options': 'off', // 禁止使用特定的组件选项： ["error", "init", "beforeCompile", "compiled"]
    'vue/no-restricted-custom-event': 'off', // 禁止使用特定的事件： ["error", "input", "/^forbidden/"]
    'vue/no-restricted-props': 'off', // 禁止特定的props： ["error", "value", "/^forbidden/"]
    'vue/no-restricted-static-attribute': 'off', // 禁止特定的attribute： ["error", "foo", "bar"]
    'vue/no-restricted-v-bind': 'off', // 禁止使用v-bind绑定特定的属性： ["error", "/^v-/", "foo", "bar"]
    'vue/no-static-inline-styles': 'off', // 禁止使用静态的内联样式，提取为class，保持template干净
    'vue/no-template-target-blank': 'error', // 禁止没有 rel="noopener noreferrer" 的 target="_blank" 属性，安全问题：https://www.cnblogs.com/tangyuu/p/6912044.html
    'vue/no-this-in-before-route-enter': 'error', // 禁止在beforeRouteEnter方法中使用this
    'vue/no-undef-components': 'off', // 考虑到存在全局组件，不对未定义组件进行检查
    'vue/no-undef-properties': 'error', // 禁止使用未定义的属性
    'vue/no-unsupported-features': ['error', {
      version: '^3.2.31'
    }], // 禁止使用废弃语法
    'vue/no-unused-properties': 'off', // 禁止未使用的props属性
    'vue/no-unused-refs': 'off', // 不禁止未使用的ref，有可能在mixin或父组件中使用
    'vue/no-use-computed-property-like-method': 'error', // 禁止使用类似方法的计算属性,禁止执行计算属性
    'vue/no-useless-mustaches': 'error', // 无用的字符串模板 {{ "Lorem ipsum" }}
    'vue/no-useless-v-bind': 'error', // 禁止不必要的v-bind指令
    'vue/no-v-text-v-html-on-component': 'error', // 禁止自定义组件上的 v-text / v-html
    'vue/no-v-text': 'error', // 禁止使用 v-text
    'vue/padding-line-between-blocks': ['error', 'always'], // 要求块之间的填充一个以上换行
    'vue/prefer-import-from-vue': 'error', // 强制从“vue”导入，而不是从“@vue/*”导入
    'vue/prefer-separate-static-class': 'error', // 要求模板中的静态类名位于单独的class属性中, 动态class与
    'vue/prefer-true-attribute-shorthand': 'error', // V-bind属性当value为true时需要简写形式
    'vue/require-direct-export': 'error', // 要求组件直接导出
    'vue/require-emit-validator': 'error', // 需要在emit中定义类型
    'vue/require-expose': 'off', // 不强制要求使用expose声明公共属性
    'vue/require-name-property': 'error', // 组件中需要 name 属性
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1
    }], // 强制一致的缩进 baseIndent顶级语句的缩进乘数 <script>里面的</script>
    'vue/sort-keys': 'off', // 不对属性进行排序
    'vue/static-class-names-order': 'off', // 不对类名进行排序
    'vue/v-for-delimiter-style': 'off', // 不约束使用forin还是forof
    'vue/v-on-function-call': 'error', // V-on没有参数的方法调用时禁止括号：<button v-on:click="closeModal">
    // 以下为扩展规则，保持与之前规则配置一致
    'vue/array-bracket-newline': 'off', // 在数组开括号后和闭括号前不换行s
    'vue/array-bracket-spacing': 'error', // 禁止或强制在括号内使用空格, '"'never" (默认) 禁止在数组括号内出现空格 ，1.有空格var arr = [ "foo", "bar" ]; 2.无空格 var arr = ["foo", "bar", "baz"];
    'vue/arrow-spacing': ['error', { // 箭头函数的箭头之前或之后有空格
      before: true,
      after: true
    }],
    'vue/block-spacing': ['error', 'always'], // 代码块中开括号前和闭括号后有空格
    'vue/brace-style': ['error', '1tbs', {
      allowSingleLine: true
    }], // 大括号风格
    'vue/camelcase': 'error', // 命名变量时使用驼峰
    'vue/comma-dangle': ['error', 'never'], // 是否使用拖尾逗号
    'vue/comma-spacing': ['error', { // 强制在逗号周围使用空格
      before: false,
      after: true
    }],
    'vue/comma-style': ['error', 'last'], // 逗号样式
    'vue/dot-location': ['error', 'property'], // 点操作符和属性放在同一行
    'vue/dot-notation': 'error', // 能用.连接符取值时，优先使用.
    'vue/eqeqeq': ['error', 'always'], // 强制使用 === 和 !==
    'vue/func-call-spacing': 'error', // 要求或禁止在函数标识符和其调用之间有空格
    'vue/key-spacing': ['error', { // 对象文字属性中的键和值之间保持一致的间距
      beforeColon: false,
      afterColon: true
    }],
    'vue/keyword-spacing': ['error', { // 强制关键字周围空格的一致性
      before: true,
      after: true
    }],
    'vue/max-len': ['error', { code: 20000 }], // 最大行长度
    'vue/no-constant-condition': 'error', // 不允许条件中的常量表达式，关联：https://eslint.org/docs/rules/no-constant-condition
    'vue/no-empty-pattern': 'error', // 禁止使用空解构模式 (no-empty-pattern) "extends: "eslint:recommended" 属性启用了此规则
    'vue/no-extra-parens': ['off', 'functions'], // 禁止冗余的括号（no-extra-parens） function
    'vue/no-irregular-whitespace': 'error', // 禁止不规则的空白 关联： https://eslint.org/docs/rules/no-irregular-whitespace
    'vue/no-loss-of-precision': 'error', // 不允许失去精度的数字文字 关联：https://eslint.org/docs/rules/no-loss-of-precision
    'vue/no-sparse-arrays': 'error', // 禁用稀疏数组，关联：https://eslint.org/docs/rules/no-sparse-arrays
    'vue/no-useless-concat': 'error', // 禁止没有必要的字符拼接 "a" + "b"
    'vue/object-curly-newline': 'off', // 不对对象换行强制要求
    'vue/object-curly-spacing': ['error', 'always', { // 强制在花括号中使用一致的空格 always要求花括号内有空格 (除了 {})
      objectsInObjects: false // objectsInObjects: true 要求以对象元素开始或结尾的对象的花括号中有空格 (当第一个选项为 never 时生效)
    }],
    'vue/object-property-newline': 'off',
    'vue/operator-linebreak': ['error', 'before'], // 运算符强制执行一致的换行样式, 在操作符之前放置换行符
    'vue/object-shorthand': 'error', // 对象简写，单字母
    'vue/prefer-template': 'error', // 要求或禁止在标签的右括号前换行
    'vue/quote-props': ['error', 'as-needed'], // 属性前后按需添加双引号
    'vue/space-in-parens': ['error', 'never'], // 运算符前后需要补充空格 a ? b : c
    'vue/space-infix-ops': 'error', // 运算符前后需要补充空格 a ? b : c
    'vue/space-unary-ops': ['error', { // 要求或禁止在一元操作符之前或之后存在空格
      words: true, // 适用于单词类一元操作符 例如：new、delete、typeof、void、yield
      nonwords: false // 适用于这些一元操作符: -、+、--、++、!、!!
    }],
    'vue/template-curly-spacing': ['error', 'never'], // 强制模板字符串中禁止花括号内出现空格 ${people.name}

    // typescript-eslint v5.22 https://typescript-eslint.io/rules/
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用该any类型
    '@typescript-eslint/no-unused-vars': 'off', // 禁止未使用的变量
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止@ts-<directive>使用评论或在指令后要求描述
    '@typescript-eslint/brace-style': ['error', '1tbs', { // 大括号风格
      allowSingleLine: true // 允许左右大括号在同一行
    }],
    '@typescript-eslint/comma-dangle': ['error', 'never'], // 是否使用拖尾逗号
    '@typescript-eslint/comma-spacing': ['error', { // 强制在逗号周围使用空格
      before: false,
      after: true
    }],
    '@typescript-eslint/default-param-last': 'off', // 强制将默认参数放在最后
    '@typescript-eslint/dot-notation': 'off', // 尽可能强制使用点表示法
    '@typescript-eslint/func-call-spacing': 'error', // 要求或不允许函数标识符及其调用之间有间距
    '@typescript-eslint/indent': ['off', 2],
    '@typescript-eslint/keyword-spacing': ['error', { // 强制关键字周围空格的一致性
      before: true,
      after: true
    }],
    '@typescript-eslint/lines-between-class-members': ['off', 'never'], // 要求或禁止class成员之间有空行
    '@typescript-eslint/no-dupe-class-members': 'error', // 禁止重复的班级成员
    '@typescript-eslint/no-duplicate-imports': 'error', // 禁止重复导入
    '@typescript-eslint/no-this-alias': 'off', // 禁止内部this
    '@typescript-eslint/no-extra-parens': 'off', // 禁止不必要的括号
    '@typescript-eslint/no-invalid-this': 'off', // 禁止this类或类对象之外的关键字
    '@typescript-eslint/no-loop-func': 'error', // 禁止在循环语句中包含不安全引用的函数声明
    '@typescript-eslint/no-magic-numbers': 'off', // 禁止魔法值
    '@typescript-eslint/no-redeclare': 'error', // 禁止变量重新声明
    '@typescript-eslint/no-restricted-imports': 'error', // 加载时禁止指定模块import
    '@typescript-eslint/no-shadow': 'error', // 禁止在外部作用域中声明的隐藏变量中的变量声明
    '@typescript-eslint/no-throw-literal': 'off', // 不允许将文字作为异常抛出
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }], // 禁止未使用的表达式
    '@typescript-eslint/no-use-before-define': 'off', // 在定义之前禁止使用变量  !!!
    '@typescript-eslint/no-useless-constructor': 'error', // 禁止不必要的构造函数
    '@typescript-eslint/object-curly-spacing': ['error', 'always', { // 强制在花括号中使用一致的空格 always要求花括号内有空格 (除了 {})
      objectsInObjects: false
    }],
    '@typescript-eslint/quotes': ['error', 'single', { // 强制一致地使用反引号、双引号或单引号
      avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
      allowTemplateLiterals: true //  允许字符串使用反勾号
    }],
    '@typescript-eslint/return-await': 'off', // 强制一致地返回等待的值
    '@typescript-eslint/semi': ['error', 'always'], // 要求或禁止使用分号而不是 ASI
    '@typescript-eslint/space-before-function-paren': ['error', 'never'], // 在函数括号之前强制保持一致的间距
    '@typescript-eslint/space-infix-ops': 'error' // 此规则旨在确保中缀运算符周围有空格。

    // 以下内容待梳理
    // '@typescript-eslint/array-type', // 需要使用T[]或者Array<T>用于数组
    // '@typescript-eslint/class-literal-property-style', // 确保类上的文字以一致的样式公开
    // '@typescript-eslint/consistent-indexed-object-style', // 强制或禁止使用记录类型
    // '@typescript-eslint/consistent-type-assertions', // 强制使用一致的类型断言
    // '@typescript-eslint/consistent-type-definitions', // 与类型定义一致interface或type
    // '@typescript-eslint/consistent-type-exports', // 强制使用类型导出的一致使用
    // '@typescript-eslint/consistent-type-imports', // 强制类型导入的一致使用
    // '@typescript-eslint/explicit-function-return-type', // 需要函数和类方法的显式返回类型
    // '@typescript-eslint/explicit-member-accessibility', // 要求对类属性和方法进行显式可访问性修饰符
    // '@typescript-eslint/explicit-module-boundary-types', // 需要导出函数和类的公共类方法的显式返回和参数类型
    // '@typescript-eslint/member-delimiter-style', // 接口和类型文字需要特定的成员分隔符样式
    // '@typescript-eslint/member-ordering', // 要求一致的成员声明顺序
    // '@typescript-eslint/method-signature-style', // 强制使用特定的方法签名语法
    // '@typescript-eslint/naming-convention', // 对代码库中的所有内容强制执行命名约定
    // '@typescript-eslint/no-base-to-string', // 要求.toString()仅在字符串化时提供有用信息的对象上调用
    // '@typescript-eslint/no-confusing-non-null-assertion', // 在可能令人困惑的位置禁止非空断言
    // '@typescript-eslint/no-confusing-void-expression', // 要求 void 类型的表达式出现在语句位置
    // '@typescript-eslint/no-dynamic-delete', // 禁止使用计算键表达式的删除运算符
    // '@typescript-eslint/no-extraneous-class', // 禁止使用类作为命名空间
    // '@typescript-eslint/no-invalid-void-type', // 禁止使用void泛型或返回类型之外的类型
    // '@typescript-eslint/no-meaningless-void-operator', // 禁止void运算符，除非用于丢弃值
    // '@typescript-eslint/no-non-null-asserted-nullish-coalescing', // 不允许在空值合并运算符的左操作数中使用非空断言
    // '@typescript-eslint/no-require-imports', // 不允许调用require()
    // '@typescript-eslint/no-type-alias', // 禁止使用类型别名
    // '@typescript-eslint/no-unnecessary-boolean-literal-compare', // 标记与布尔文字不必要的相等比较
    // '@typescript-eslint/no-unnecessary-condition', // 防止类型始终为真或始终为假的条件
    // '@typescript-eslint/no-unnecessary-qualifier', // 不需要命名空间限定符时发出警告
    // '@typescript-eslint/no-unnecessary-type-arguments', // 强制在不需要时不使用类型参数
    // '@typescript-eslint/non-nullable-type-assertion-style', // 在可能的情况下，优先使用非空断言而不是显式类型转换
    // '@typescript-eslint/parameter-properties', // 要求或禁止在类构造函数中使用参数属性
    // '@typescript-eslint/prefer-enum-initializers', // 首选初始化每个枚举成员值
    // '@typescript-eslint/prefer-for-of', // 如果索引仅用于访问被迭代的数组，则首选“for-of”循环而不是标准“for”循环
    // '@typescript-eslint/prefer-function-type', // 使用函数类型而不是带有调用签名的接口
    // '@typescript-eslint/prefer-includes', // includes在方法之上强制执行indexOf方法
    // '@typescript-eslint/prefer-literal-enum-member', // 要求所有枚举成员都是文字值，以防止意外的枚举成员名称影子问题
    // '@typescript-eslint/prefer-nullish-coalescing', // 强制使用无效合并运算符而不是逻辑链接
    // '@typescript-eslint/prefer-optional-chain', //更喜欢使用简洁的可选链表达式而不是链式逻辑与
    // '@typescript-eslint/prefer-readonly', // 要求将私有成员标记为readonly好像它们从未在构造函数之外修改过
    // '@typescript-eslint/prefer-readonly-parameter-types', // 要求将函数参数键入为只读，以防止输入意外突变
    // '@typescript-eslint/prefer-reduce-type-parameter', // 调用时更喜欢使用类型参数Array#reduce而不是强制转换
    // '@typescript-eslint/prefer-regexp-exec', // 如果没有提供全局标志，则强制RegExp#exec使用它而不是String#match
    // '@typescript-eslint/prefer-return-this-type', // this仅this返回类型时使用的强制执行
    // '@typescript-eslint/prefer-string-starts-ends-with', // 强制使用String#startsWithandString#endsWith而不是检查子字符串的其他等效方法
    // '@typescript-eslint/prefer-ts-expect-error', // 建议使用@ts-expect-error过@ts-ignore
    // '@typescript-eslint/promise-function-async', // 要求将任何返回 Promise 的函数或方法标记为异步
    // '@typescript-eslint/require-array-sort-compare', // 要求Array#sort调用始终提供compareFunction
    // '@typescript-eslint/sort-type-union-intersection-members', // 强制类型联合/交集的成员按字母顺序排序
    // '@typescript-eslint/strict-boolean-expressions', // 限制布尔表达式中允许的类型
    // '@typescript-eslint/switch-exhaustiveness-check', // 使用联合类型的开关中的详尽性检查
    // '@typescript-eslint/type-annotation-spacing', // 需要在类型注释周围保持一致的间距
    // '@typescript-eslint/typedef', // 需要存在类型注释
    // '@typescript-eslint/unified-signatures', // 警告可以通过使用联合或可选/休息参数统一为一个的任何两个重载
    // '@typescript-eslint/init-declarations', // 在变量声明中要求或禁止初始化
    // '@typescript-eslint/padding-line-between-statements': 'error', // 要求或禁止语句之间的填充线
  }
};
