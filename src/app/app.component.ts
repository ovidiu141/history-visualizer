import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentPageIndex: number;

  pages: { id: string; displayValue: string }[] = [];

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
    const newPage = { id: this.generateRandomId(), displayValue: String(this.pages.length + 1) };
    this.pages.push(newPage);
    history.pushState(newPage, '');
    this.currentPageIndex = this.pages.length - 1;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    console.log('Back or Forward button clicked', history.state);
  }

  private generateRandomId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
