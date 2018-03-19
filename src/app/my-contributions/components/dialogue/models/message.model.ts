export class Message {
  private _publishDate: Date;

  public get publishDate() {
    return this._publishDate;
  }

  constructor(public contributionId: number, public userId: number, public text: string, public isOwner = false) {
    this._publishDate = new Date();
  }
}
