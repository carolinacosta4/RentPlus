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
import LoginView from "@/views/LoginView.vue";
import PropertyView from "@/views/PropertyView.vue";
import CreatePropertyView from "@/views/CreatePropertyView.vue";
import EditPropertyView from "@/views/EditPropertyView.vue";

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
      path: "/login",
      name: "login",
      component: LoginView,
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
      path: "/property/:id",
      name: "property",
      component: PropertyView,
    },
    {
      path: "/create-property",
      name: "create-property",
      component: CreatePropertyView,
    },
    {
      path: "/edit-property",
      name: "edit-property",
      component: EditPropertyView,
    },
  ],
});

export default router;
