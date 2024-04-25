import {Component} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {WelcomePartComponent} from "../../components/welcome-part/welcome-part.component";
import {FaqContainerComponent} from "../../components/faq-container/faq-container.component";
import {IFaq} from "../../models/faq";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavbarComponent,
    WelcomePartComponent,
    FaqContainerComponent,
    NgFor
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  faqs: IFaq[] = [
    {
    question: 'How to contact us?',
    answer: 'You can write on our email cab.swift.inc@gmail.com.' +
      ' Or contact the support service.'
    },
    {
      question: 'What do i need to book a taxi?',
      answer: 'You have to be registered on website and allow to track your geolocation.'
    },
    {
      question: 'How to book a taxi?',
      answer: 'Click the service button on navigation bar and search for your destination.'
    },
    {
      question: 'How to top up the balance?',
      answer: 'You can top up your balance in your profile.'
    },
    {
      question: 'How to become a driver?',
      answer: 'You must send your documents on our email and we will check it.'
    }
  ]

}
