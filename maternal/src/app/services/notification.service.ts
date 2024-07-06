// notification.service.ts

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject();
  alert$ = this.notificationSubject.asObservable()

  public notify(message: string, time: number = 5000): void {
    this.notificationSubject.next({message, time});
  }
}
