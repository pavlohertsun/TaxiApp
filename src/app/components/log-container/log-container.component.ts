import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ILog} from "../../models/log";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-log-container',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './log-container.component.html',
  styleUrl: './log-container.component.css'
})
export class LogContainerComponent implements OnChanges{
  @Input() log!: ILog;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('log')) {

    }
  }
}
