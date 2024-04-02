import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";

export const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "register", component: SignupPageComponent},
];
