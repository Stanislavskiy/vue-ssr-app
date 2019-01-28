import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const createRouter = () =>
  new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "pageOne",
        component: () => import("../components/PageOne")
      },
      {
        path: "/page-two",
        name: "pageTwo",
        component: () => import("../components/PageTwo")
      }
    ]
  });
