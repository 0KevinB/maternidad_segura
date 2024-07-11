import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maternal';
  showAlert = false;
  constructor(private notificationService: NotificationService){
  }
  message = ''
  ngOnInit(): void {
    this.notificationService.alert$.subscribe((notification : any) => {
      this.message = notification.message;
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false;
      }, notification.time)
    })
  }
}
