import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe, NgIf} from "@angular/common";
import {ITrip} from "../../models/trip";

@Component({
  selector: 'app-available-order',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './available-order.component.html',
  styleUrl: './available-order.component.css'
})
export class AvailableOrderComponent {
  @Input() trip!: ITrip;
  @Output() idClicked: EventEmitter<number> = new EventEmitter<number>();

  emitId(id: number) {
    this.idClicked.emit(id);
  }
}
