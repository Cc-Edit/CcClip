import type { Plugin } from 'vite';
const glob = require('glob');
const fs = require('fs');
const vm = require('node:vm');
const url = require('url');
const context = { // 代码运行上下文
  url,
  handler: () => {
    console.warn('servers 模块导入异常');
  }
};
vm.createContext(context);

function ViteProxyServer(): Plugin {
  return {
    name: 'vite:proxy-server',
    // 在解析 Vite 配置后调用。
    configResolved(config) {},
    // 是用于配置开发服务器的钩子
    configureServer(server) {
      // 添加响应头 COOP、COEP 支持wasm数据隔离
      server.middlewares.use((req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        next();
      });

      // 将 servers 下文件注册到接口
      const files = glob.sync('viteUtil/viteProxyServer/servers/**/*.js');
      console.log('****注册接口****');
      files.map((filePath: string) => {
        let urlPath = (filePath.match(/(?<=servers).*(?=\.js)/) || [])[0];
        urlPath = urlPath.replace(/[\\/]+/g, '/');
        vm.runInContext(fs.readFileSync(filePath, 'utf-8'), context)
        console.log('****注册接口: ' + urlPath);
        server.middlewares.use(urlPath, context.handler);
      })
    }
  };
}

export default ViteProxyServer;