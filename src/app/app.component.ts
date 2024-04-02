import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {GeolocationService} from "./services/geolocation.service";
import {CoordinatesService} from "./services/coordinates.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'TaxiApp';

  constructor(private geolocationService: GeolocationService, private coordinatesService: CoordinatesService) { }

  ngOnInit(): void {
    this.geolocationService.getCurrentPosition()
      .then(coords => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        this.coordinatesService.setCoordinates(latitude, longitude);
        console.log(latitude);
        console.log(longitude);
      })
      .catch(error => console.error(error));
  }
}
