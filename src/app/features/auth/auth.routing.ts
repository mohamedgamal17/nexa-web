import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login-page/login-page";

export const authRoutes : Routes = [
  {
    path :"auth",
    loadComponent : ()=> import("../../layouts/auth-layout/auth-layout").then(m=>m.AuthLayout),
    children : [
      {path : "", component : LoginPage},
    ]
  }
]