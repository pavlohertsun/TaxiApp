import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-welcome-part',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './welcome-part.component.html',
  styleUrl: './welcome-part.component.css'
})
export class WelcomePartComponent {

}
