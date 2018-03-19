import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models';

@Injectable()
export class DialogueService {
  private readonly ROUTE = '../../../mocks/messages.mock.json';
  private readonly MESSAGES_KEY: 'messages';

  constructor(private http: HttpClient) { }

  public getMessages(contributionId: number, userId: number): Promise<Message[]> {
    return new Promise(resolve => {
      const messages = this.getMessagesFromLocalStorage();
      if (messages) {
        return resolve(this.filterByContributionId(contributionId, messages, userId));
      }
      this.http.get<Message[]>(this.ROUTE).subscribe(response => {
        this.saveInLocalStorage(response);
        return resolve(this.filterByContributionId(contributionId, response, userId));
      });
    });
  }

  public addMessage(message: Message): Promise<void> {
    const messages = this.getMessagesFromLocalStorage();
    messages.push(message);
    localStorage.removeItem(this.MESSAGES_KEY);
    this.saveInLocalStorage(messages);
    return Promise.resolve();
  }

  private saveInLocalStorage(messages: Message[]): void {
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
  }

  private getMessagesFromLocalStorage(): Message[] {
    const messages = JSON.parse(localStorage.getItem(this.MESSAGES_KEY));
    return messages;
  }

  private filterByContributionId(contributionId: number, messages: Message[], currentUserId: number): Message[] {
    const messagesFilterByContribution = messages.filter(message => message.contributionId === contributionId);
    messagesFilterByContribution.forEach(message => {
      message.isOwner = message.userId === currentUserId;
    });

    return messagesFilterByContribution;
  }
}
