import { provideRouter } from "@angular/router";
import { authRoutes } from "./auth.routing";

export const provideAuthFeature = ()=>[
  provideRouter(authRoutes)
]