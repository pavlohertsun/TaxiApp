import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {WelcomePartComponent} from "../../components/welcome-part/welcome-part.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavbarComponent,
    WelcomePartComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
