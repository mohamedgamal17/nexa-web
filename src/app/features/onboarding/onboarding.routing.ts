import { Routes } from "@angular/router";
import { OnboardingPage } from "./pages/onboarding-page/onboarding-page";

export const onboardingRoutes: Routes = [
  {
    path: "onboarding",
    loadComponent: () => import("../../layouts/auth-layout/auth-layout").then(m => m.AuthLayout),

    children: [
      { path: "", loadComponent: () => import("../onboarding/pages/onboarding-page/onboarding-page").then(m => m.OnboardingPage) }
    ]
  }
]