import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAddress} from "../../models/address";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-address-container',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './address-container.component.html',
  styleUrl: './address-container.component.css'
})
export class AddressContainerComponent {
  @Input() address!: IAddress;
  @Output() idClicked: EventEmitter<number> = new EventEmitter<number>();

  emitId(id: number) {
    this.idClicked.emit(id);
  }
}
