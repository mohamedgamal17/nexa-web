import { provideRouter } from "@angular/router";
import { banksRoutes } from "./banks.routing";

export const provideBanks = () => [provideRouter(banksRoutes)];
