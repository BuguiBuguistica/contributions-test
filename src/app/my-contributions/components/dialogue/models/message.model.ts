export class Message {
  public publishDate: Date;

  constructor(public contributionId: number, public userId: number, public text: string, public isOwner = false) {
    this.publishDate = new Date();
  }
}
