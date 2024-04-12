import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SavedView from "@/views/SavedView.vue";
import TripsView from "@/views/TripsView.vue";
import PropertiesView from "@/views/PropertiesView.vue";
import ReservationsView from "@/views/ReservationsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/saved",
      name: "saved",
      component: SavedView,
    },
    {
      path: "/trips",
      name: "trips",
      component: TripsView,
    },
    {
      path: "/properties",
      name: "properties",
      component: PropertiesView,
    },
    {
      path: "/reservations",
      name: "reservations",
      component: ReservationsView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
});

export default router;
