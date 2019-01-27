import Vue from "vue";
import Router from "vue-router";
import PageOne from "../components/PageOne";
import PageTwo from "../components/PageTwo";

Vue.use(Router);

export const createRouter = () =>
  new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "pageOne",
        component: PageOne
      },
      {
        path: "/page-two",
        name: "pageTwo",
        component: PageTwo
      }
    ]
  });
