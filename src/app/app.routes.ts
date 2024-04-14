import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import {MapPageComponent} from "./pages/map-page/map-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {AuthGuard} from "./guards/auth.guard"
import {DriverPageComponent} from "./pages/driver-page/driver-page.component";

export const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "register", component: SignupPageComponent},
  {path: "map", component: MapPageComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: "driver", component: DriverPageComponent, canActivate: [AuthGuard]},
];
