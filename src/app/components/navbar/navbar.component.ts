import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  buttonText: string = '';
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    const token = localStorage.getItem('accessToken')
    if(token == null){
      this.buttonText = 'Sign in'
    }
    else{
      this.buttonText = 'Profile';
    }
  }

  buttonFunc(): void{
    if(this.buttonText == 'Sign in'){
      this.router.navigate(['/login']).then(r => ['/']);
    }
    else{
      this.router.navigate(['/profile']).then(r => ['/']);
    }
  }

}
