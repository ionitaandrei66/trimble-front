import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public showNotification(message: string, type: 'success' | 'error') {
    const toastElement = document.createElement('div');
    toastElement.className = `toast ${type === 'error' ? 'bg-danger' : 'bg-success'} text-light`;
    toastElement.innerHTML = `
    <div class="toast-body">
      ${message}
    </div>
  `;

    document.body.appendChild(toastElement);

    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 1000);
  }
}
