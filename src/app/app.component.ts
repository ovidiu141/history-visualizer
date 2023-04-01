import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentPageIndex: number;

  pages = [
    { id: this.generateRandomId() },
  ];

  constructor() {
    this.currentPageIndex = 0;
  }

  onBackClick() {
    history.back();
    this.currentPageIndex--;
  }

  onForwardClick() {
    history.forward();
    this.currentPageIndex++;
  }

  onPushClick() {
    history.pushState({}, "");
    this.pages.push({ id: this.generateRandomId() });
    this.currentPageIndex = this.pages.length - 1;
  }

  private generateRandomId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
