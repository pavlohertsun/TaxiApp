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
    const role = localStorage.getItem('userRole');
    if(token == null){
      this.buttonText = 'Sign in'
    }
    else{
      if(role === 'ADMIN'){
        this.buttonText = '';
      }
      else{
        this.buttonText = 'Profile';
      }
    }
  }
  homeButtonFunc(){
    this.router.navigate(['/']).then(r => ['/']);
  }
  aboutUsButtonFunc(){
    this.router.navigate(['/about']).then(r => ['/']);
  }
  supportButtonFunc(){
    this.router.navigate(['/support']).then(r => ['/']);
  }

  serviceButtonFunc(){
    const role = localStorage.getItem('userRole');
    if(role === 'DRIVER'){
      this.router.navigate(['/driver']).then(r => ['/']);
    }
    else if(role === 'USER'){
      this.router.navigate(['/map']).then(r => ['/']);
    }
    else if(role === 'ADMIN'){
      this.router.navigate(['/admin']).then(r => ['/']);
    }
  }

  loginProfileButtonFunc(): void{
    if(this.buttonText == 'Sign in'){
      this.router.navigate(['/login']).then(r => ['/']);
    }
    else{
      const role = localStorage.getItem('userRole');
      if(role === 'DRIVER') {
        this.router.navigate(['/dprofile']).then(r => ['/']);
      }
      else if(role === 'USER'){
        this.router.navigate(['/profile']).then(r => ['/']);
      }
    }
  }

}
