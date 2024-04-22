import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {ICustomerTrip} from "../../models/customer-trip";
import {IDriverProfileTrip} from "../../models/driver-profile-trip";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    CurrencyPipe,
    NgClass
  ],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit{
  @Input() customerTrip!: ICustomerTrip
  @Input() driverTrip!: IDriverProfileTrip
  detailInfo: boolean = false;
  cancelledTrip = false;
  changeView(){
    this.detailInfo = !this.detailInfo;
  }
  ngOnInit(): void {
    if(this.customerTrip){
      if(this.customerTrip.status === 'Cancelled'){
        this.cancelledTrip = true
      }
    }
    if(this.driverTrip){
      if(this.driverTrip.status === 'Cancelled'){
        this.cancelledTrip = true
      }
    }
  }

}
