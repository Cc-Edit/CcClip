import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
const routes: Array<RouteRecordRaw> = [];
interface Moudle {
  default: RouteRecordRaw
}
const installRouter = {
  install(app: App) {
    // 将modules下的全部路由配置文件加载到routes中
    const moduleRouterList = import.meta.glob('pages/routers/*.ts', { eager: true });
    for (const path in moduleRouterList) {
      const routerInstance = (moduleRouterList[path] as Moudle).default;
      // 自动关联routers与views 下的同名文件
      routerInstance.component = () => import(`@/pages/views/${routerInstance.name as string}.vue`);
      routes.push(routerInstance);
    }

    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes
    });

    router.beforeResolve(async to => {
      if (to.meta.title) {
        window.document.title = to.meta.title as string;
      }
    });
    app.use(router);
  }
};
export default installRouter;