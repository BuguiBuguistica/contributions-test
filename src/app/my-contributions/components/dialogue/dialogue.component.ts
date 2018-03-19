import { Component, OnInit, Input } from '@angular/core';
import { DialogueService } from './services/dialogue.service';
import { Message } from './models';

@Component({
  providers: [DialogueService],
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html'
})
export class DialogueComponent implements OnInit {
  @Input() contributionId: number;

  public text: string;
  public messagesBag: Message[] = [];

  private readonly USER_ID_HARDCODE = 1;

  constructor(private dialogueService: DialogueService) {}

  public ngOnInit(): void {
    this.dialogueService.getMessages(this.contributionId, this.USER_ID_HARDCODE).then(messages => {
      this.messagesBag = messages;
    });
  }

  public addMessage(): void {
    const message = new Message(this.contributionId, this.USER_ID_HARDCODE, this.text, true);
    this.messagesBag.push(message);
    this.dialogueService.addMessage(message);
    this.resetInput();
  }

  private resetInput(): void {
    this.text = '';
  }
}
