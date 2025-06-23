import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppointmentsComponent,RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-appointments';
}
