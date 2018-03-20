import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  public displayMessage = false;

  public ngOnInit(): void {
    this.animateBox();
  }

  private animateBox(): void {
    setTimeout(() => {
      this.displayMessage = true;
    }, 600);
  }
}
