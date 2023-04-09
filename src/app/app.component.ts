import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  history = history;

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

  onGo(delta: string) {
    const val = parseInt(delta, 10);
    const newPageIndexValue = this.currentPageIndex + val;
    const isOutOfBounds =
      newPageIndexValue < 0 || newPageIndexValue >= this.pages.length;
    if (isOutOfBounds) {
      return;
    }
    this.currentPageIndex = newPageIndexValue;
    history.go(val);
  }

  onPushClick() {
    if (this.pages.length >= 12) {
      return;
    }
    const newPage = {
      id: this.generateRandomId(),
      displayValue: String(this.pages.length + 1),
    };
    this.pages.push(newPage);
    history.pushState(newPage, '');
    this.currentPageIndex = this.pages.length - 1;
  }

  openNewTabWithSameUrl() {
    window.open(location.href, '_blank');
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
