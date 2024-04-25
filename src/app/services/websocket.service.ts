import {Injectable} from '@angular/core';
import {Client, Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Client;

  constructor() {
  }
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stompClient = Stomp.over(new WebSocket('ws://localhost:8080/taxi'));
      this.stompClient.onConnect = () => {
        console.log("Connected to WebSocket");
        resolve();
      };
      this.stompClient.onStompError = (frame) => {
        console.error("WebSocket connection error", frame);
        reject(frame);
      };
      this.stompClient.activate();
    });
  }


  createTrip(message: any) {
    this.stompClient.publish({destination: '/app/createTrip', body: JSON.stringify(message)});
  }

  subscribeForDriver(callback: (response: any) => void) {
    this.stompClient.subscribe('/topic/public', (response) => {
      callback(response);
    });
  }

  applyTrip(message: any, id: number) {
    this.stompClient.publish({destination: '/app/applyTrip/' + id, body: JSON.stringify(message)});
  }

  subscribeForCustomer(id: string, callback: (response: any) => void) {
    this.stompClient.subscribe('/topic/public1/' + id, (response) => {
      callback(response);
    });
  }

  driverArrived(message: number, id: number) {
    this.stompClient.publish({destination: '/app/arrived/' + id, body: JSON.stringify(message)});
  }

  endTrip(message: number, id: number) {
    this.stompClient.publish({destination: '/app/end/' + id, body: JSON.stringify(message)});
  }

  subscribeForCancelling(callback: (response: any) => void) {
    this.stompClient.subscribe('/topic/public2', (response) => {
      callback(response);
    });
  }

  cancelTrip(message: number) {
    this.stompClient.publish({destination: '/app/cancel', body: JSON.stringify(message)});
  }

  disconnect() {
    if (this.stompClient.connected) {
      this.stompClient.forceDisconnect();
    }
  }
}
