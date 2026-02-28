import { provideRouter } from "@angular/router";
import { onboardingRoutes } from "./onboarding.routing";

export const provideOnboardingFeature=  ()=>[
  provideRouter(onboardingRoutes)
]