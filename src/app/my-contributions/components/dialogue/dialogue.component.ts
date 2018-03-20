import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DialogueService } from './services/dialogue.service';
import { Message } from './models';
// import * as $ from 'jquery';
@Component({
  providers: [DialogueService],
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html'
})
export class DialogueComponent implements OnInit, AfterViewInit {
  @Input() contributionId: number;

  public readonly DIALOGUE_AREA_ID = '#dialogueContent';
  public text: string;
  public messagesBag: Message[] = [];

  private readonly USER_ID_OWNER = 1;
  private readonly OTHER_USER_ID = 2;
  private currentUserId = this.USER_ID_OWNER;

  constructor(private dialogueService: DialogueService) { }

  public ngOnInit(): void {
    this.dialogueService.getMessages(this.contributionId, this.currentUserId).then(messages => {
      this.messagesBag = messages;
      this.scrollToBottom();
    });
  }

  public ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  public addMessage(): void {
    const message = new Message(this.contributionId, this.currentUserId, this.text, true);
    message.isOwner = this.USER_ID_OWNER === this.currentUserId;
    this.messagesBag.push(message);
    this.dialogueService.addMessage(message).then(() => {
      this.scrollToBottom();
    });
    this.resetInput();
  }

  public switchUsers(): void {
    this.currentUserId = this.currentUserId === this.USER_ID_OWNER ? this.OTHER_USER_ID : this.USER_ID_OWNER;
  }

  private resetInput(): void {
    this.text = '';
  }

  private scrollToBottom(): void {
    const scrollHeight = 2200;
    const scrollVelocity = 1000;
    // $(this.DIALOGUE_AREA_ID).animate({ scrollTop: scrollHeight}, scrollVelocity);
  }
}
