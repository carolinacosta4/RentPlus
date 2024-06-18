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
import ConfirmationView from "@/views/ConfirmationView.vue";
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

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
      meta: { requiresAuth: true },
    },
    {
      path: "/trips",
      name: "trips",
      component: TripsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/properties",
      name: "properties",
      component: PropertiesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/reservations",
      name: "reservations",
      component: ReservationsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/rent-place",
      name: "rent-place",
      component: RentPlace,
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: "/view-properties",
      name: "view-properties",
      component: ManagePropertiesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/messages/:id?",
      name: "messages",
      component: MessagesView,
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: "/edit-property/:id",
      name: "edit-property",
      component: EditPropertyView,
      meta: { requiresAuth: true },
    },
    {
      path: "/confirmation/:id",
      name: "confirmation",
      component: ConfirmationView,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
    },
    {
      path: "/reset-password/:id",
      name: "reset-password",
      component: ResetPasswordView,
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem("authToken")) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;