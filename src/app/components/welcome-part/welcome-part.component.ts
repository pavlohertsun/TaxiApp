import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

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
  constructor(private router: Router) {
  }
  findTaxiButtonFunc(){
    const role = localStorage.getItem('userRole');
    if(role === 'DRIVER'){
      this.router.navigate(['/driver']).then(r => ['/']);
    }
    else if(role === 'USER'){
      this.router.navigate(['/map']).then(r => ['/']);
    }
  }
}
