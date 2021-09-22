import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Feedback from "../views/Feedback.vue";
import AddFeedback from "../views/AddFeedback.vue";
import Roadmap from "../views/Roadmap.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedback/:id",
    name: "Feedback",
    component: Feedback,
    props: true,
  },
  {
    path: "/add",
    name: "AddFeedback",
    component: AddFeedback,
  },
  {
    path: "/edit",
    name: "EditFeedback",
    component: AddFeedback
  },
  {
    path: "/roadmap",
    name: "Roadmap",
    component: Roadmap,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
