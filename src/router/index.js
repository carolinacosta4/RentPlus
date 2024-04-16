import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SavedView from "@/views/SavedView.vue";
import TripsView from "@/views/TripsView.vue";
import PropertiesView from "@/views/PropertiesView.vue";
import ReservationsView from "@/views/ReservationsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RentPlace from "@/views/RentPlace.vue";
import MessagesView from '@/views/MessagesView.vue'
import ManageUsersView from "@/views/ManageUsersView.vue";
import ManagePropertiesView from "@/views/ManagePropertiesView.vue";
import PropertyView from "@/views/PropertyView.vue";

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
      path: "/rent-place",
      name: "rent-place",
      component: RentPlace,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/view-users",
      name: "view-users",
      component: ManageUsersView,
    },
    {
      path: "/view-properties",
      name: "view-properties",
      component: ManagePropertiesView,
    },
    {
      path: "/messages",
      name: "messages",
      component: MessagesView,
    },
    {
      path: "/property",
      name: "property",
      component: PropertyView,
    },
  ],
});

export default router;
