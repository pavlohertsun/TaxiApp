import {Component, Input} from '@angular/core';
import {IFaq} from "../../models/faq";

@Component({
  selector: 'app-faq-container',
  standalone: true,
  imports: [],
  templateUrl: './faq-container.component.html',
  styleUrl: './faq-container.component.css'
})
export class FaqContainerComponent {
  @Input() faq!: IFaq
  toggleAnswer(faq: IFaq) {
    faq.expanded = !faq.expanded;
  }
}
