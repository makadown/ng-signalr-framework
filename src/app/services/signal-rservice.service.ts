import { Injectable } from '@angular/core';
import { ValuesService } from './values.service';
import { environment } from '../../environments/environment';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {
  private connection: any;
  private proxy: any;
  constructor(private valuesService: ValuesService) { }

  public initializeSignalRConnection(): void {

    let signalRServerEndPoint = /*environment.urlCorsHelper +*/ 'http://localhost:6071/signalr';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.on('SendMessage', this.onMessageReceived );
    this.proxy.on('PruebaMayito', this.onMessageReceived );

    this.connection.start({ transport: 'longPolling' }).done((data: any) => {
      console.log('Connected to Notification Hub');
      console.log(data);
      this.broadcastMessage();
      console.log('Invokando Web API');
      this.valuesService.getValues(this.connection.id).subscribe( (respuesta) => {
          console.log(respuesta);
      }, console.error);
    }).catch((error: any) => {
      console.log('Notification Hub error -> ' + error);
    });
  }

  private broadcastMessage(): void {
    console.log(this.proxy);
    this.proxy.invoke( 'pruebaMayito', 'Hola señor!' )
      .catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });
  }

  private onMessageReceived(serverMessage: string) {
    console.log('New message received from Server: ' + serverMessage);
  }

}
