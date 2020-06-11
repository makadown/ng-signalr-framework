import { Component } from '@angular/core';
import { SignalRServiceService } from './services/signal-rservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-cliente-signalr-framework';
  constructor(private signalRService: SignalRServiceService) {
    this.signalRService.initializeSignalRConnection()
    }
}
