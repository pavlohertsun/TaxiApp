import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import {MapPageComponent} from "./pages/map-page/map-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {AuthGuard} from "./guards/auth.guard"
import {DriverPageComponent} from "./pages/driver-page/driver-page.component";
import {DriverProfilePageComponent} from "./pages/driver-profile-page/driver-profile-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {DriverRoleGuard} from "./guards/driver-role.guard";
import {CustomerRoleGuard} from "./guards/customer-role.guard";
import {AdminRoleGuard} from "./guards/admin-role.guard";
import {ResponsePageComponent} from "./pages/response-page/response-page.component";
import {DriverResponseComponent} from "./pages/driver-response/driver-response.component";
import {SupportPageComponent} from "./pages/support-page/support-page.component";
import {WorkerPageComponent} from "./pages/worker-page/worker-page.component";

export const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "register", component: SignupPageComponent},
  {path: "response", component: ResponsePageComponent},
  {path: "dresponse", component: DriverResponseComponent},
  {path: "support", component: SupportPageComponent},
  {path: "worker", component: WorkerPageComponent},
  {path: "map", component: MapPageComponent, canActivate: [AuthGuard, CustomerRoleGuard]},
  {path: "profile", component: ProfilePageComponent, canActivate: [AuthGuard, CustomerRoleGuard]},
  {path: "driver", component: DriverPageComponent, canActivate: [AuthGuard, DriverRoleGuard]},
  {path: "dprofile", component: DriverProfilePageComponent, canActivate: [AuthGuard, DriverRoleGuard]},
  {path: "admin", component: AdminPageComponent, canActivate: [AuthGuard]},
];
