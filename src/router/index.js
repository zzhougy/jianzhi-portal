import Vue from "vue";
import VueRouter from "vue-router";
import { state } from "@/store/";
Vue.use(VueRouter);

// --start----------解决报错-------https://blog.csdn.net/weixin_43675173/article/details/103042998------------------
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// -----end-------解决报错-------https://blog.csdn.net/weixin_43675173/article/details/103042998------------------



const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/*webpackChunkName: "Home" */ "@/views/Home.vue"),
  },
  {
    path: "/products",
    name: "products",

    component: () =>
      import(/* webpackChunkName: "Products" */ "../views/Products.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",

    component: () => import(/* webpackChunkName: "jobs" */ "../views/common/Jobs.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
        import("../views/common/About.vue"),
  },
  {
    path: "/units",
    name: "units",

    component: () => import(/* webpackChunkName: "jobs" */ "../views/common/unit/Units.vue"),
  },
  {
    path: "/unit",
    name: "unit",

    component: () => import(/* webpackChunkName: "jobs" */ "../views/common/unit/UnitDetail.vue"),
  },
  {
    path: "/jobs2",
    name: "jobs2",

    component: () => import(/* webpackChunkName: "jobs" */ "../views/common/Jobs2.vue"),
  },
  {
    path: "/jobs/:id",
    name: "jobDetail",

    component: () =>
      import(/* webpackChunkName: "jobDetail" */ "../views/common/jobInfo.vue"),
  },
  {
    path: "/units/:id",
    name: "unitDetail",

    component: () =>
        import(/* webpackChunkName: "jobDetail" */ "../views/common/unit/UnitDetail.vue"),
  },
  {
    path: "/staff-stories/:id",
    name: "staff-story",

    component: () =>
      import(/* webpackChunkName: "staffStroy" */ "../views/StaffStory.vue"),
  },
  {
    path: "/login",
    name: "login",
    component() {
      return import(/* webpackChunkName: "user" */ "../views/common/LoginAndRegister/Login2.vue");
    },
  },
  {
    path: "/register",
    name: "register",
    component() {
      return import("../views/common/LoginAndRegister/Register2.vue");
    },
  },
  {
    path: "/resume",
    name: "resume",
    meta: {
      loginRequired: true,
    },
    component: () =>
      import(/* webpackChunkName "resume"*/ "@/views/jobSeeker/Resume.vue"),
  },
  {
    path: "/resume/edit",
    name: "resume-editor",
    meta: {
      loginRequired: true,
    },
    component: () =>
      import(/* webpackChunkName "resume-editor"*/ "@/views/jobSeeker/ResumeEditor.vue"),
  },
  {
    path: "/jobInformationView",
    name: "jobInformationView",
    meta: {
      loginRequired: true,
    },
    component: () =>
        import("@/views/recruitmentUnit/JobInformationView.vue"),
  },
  {
    path: "/resumeReceivedView",
    name: "resumeReceivedView",
    meta: {
      loginRequired: true,
    },
    component: () =>
        import("@/views/recruitmentUnit/ResumeReceivedView.vue"),
  },
  {
    path: "/feedback",
    name: "feedback",
    meta: {
      loginRequired: true,
    },
    component: () =>
        import("@/views/common/Feedback.vue"),
  },
  {
    path: "/unitInformationView2",
    name: "unitInformationView2",
    meta: {
      loginRequired: true,
    },
    component: () =>
        import("@/views/recruitmentUnit/basicInfo/BasicInfo.vue"),
  },
  {
    path: "/basicInfo",
    name: "basicInfo",
    meta: {
      loginRequired: true,
    },
    component: () =>
        import("@/views/jobSeeker/basicInfo/BasicInfo.vue"),
  },
  {
    path: "/applicationStatus",
    name: "applicationStatus",
    meta: {
      loginRequired: true,
    },
    component: () =>
        import("@/views/jobSeeker/ApplicationStatus.vue"),
  },

  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  // base:
  //   process.env.NODE_ENV !== "production"
  //     ? process.env.BASE_URL
  //     : process.env.BASE_URL  ,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return { x: 0, y: 0 };
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;

router.onError((err) => {
  if (err.name === "ChunkLoadError") {
    router.app.$notify.error("网络资源加载错误");
  }
});
router.beforeEach((to, from, next) => {
  console.log(to.path, state.isLogin);
  if (to.path === "/user" && state.isLogin) {
    return next("/");
  }
  if (to.meta.loginRequired && !state.isLogin) {
    return next("/user");
  }

  next();
});
