import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {

  private connection: any;
  private proxy: any;
  constructor() { }

  public initializeSignalRConnection(): void {
    let signalRServerEndPoint = 'http://localhost:6071/signalr';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.on('Hello'/*'messageReceived'*/, 
      (serverMessage) => this.onMessageReceived(serverMessage));
    this.connection.start().done((data: any) => {
      console.log('Connected to Notification Hub');
      this.broadcastMessage();
    }).catch((error: any) => {
      console.log('Notification Hub error -> ' + error);
    });
  }

  private broadcastMessage(): void {
    this.proxy.invoke('NotificationService', 'text message')
      .catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });
  }

  private onMessageReceived(serverMessage: string) {
    console.log('New message received from Server: ' + serverMessage);
  }

}
