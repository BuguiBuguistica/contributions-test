import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contribution } from '../../models/contribution.model';
import { MyContributionService } from '../../services/my-contributions.service';

@Component({
  selector: 'app-contribution-card',
  templateUrl: './contribution-card.component.html'
})
export class ContributionCardComponent implements OnInit {
  @Input() contribution: Contribution;
  @Output() savedChanges = new EventEmitter();

  private readonly SHOW_MORE = 'card.showMore';
  private readonly SHOW_LESS = 'card.showLess';
  private readonly MAX_TITLE_CHAR = 172;

  public progressPercentage: number;
  public showMoreActive = false;
  public translateKey = this.SHOW_MORE;
  public isFormOpen = false;
  public title: string;
  public shortTitle: string;
  public displayShowMoreButton = false;
  public isEditionTitle = false;
  private contributionCopy: Contribution;

  constructor(private myContributionService: MyContributionService) {}

  public ngOnInit(): void {
    this.contributionCopy = Object.assign({}, this.contribution);
    this.progressPercentage = this.contributionCopy ? this.contributionCopy.range : 0;
    this.cutTitle(this.contributionCopy.title);
  }

  public toggleShowMore(event): void {
    this.showMoreActive = !this.showMoreActive;
    this.title = !this.showMoreActive ? this.shortTitle : this.contributionCopy.title;
    this.translateKey = !this.showMoreActive ? this.SHOW_MORE : this.SHOW_LESS;
    this.stopPropagation(event);
  }

  public toogleForm(): void {
    this.isFormOpen = !this.isFormOpen;
    if (!this.isFormOpen) {
      this.isEditionTitle = false;
      this.resetModel();
    }
  }

  public editTitle(event): void {
    this.isEditionTitle = true;
    this.stopPropagation(event);
  }

  public stopPropagation(event): void {
    event.stopPropagation();
  }

  public onSaveContribution(contribution: Contribution): void {
    contribution.range = 0;
    this.myContributionService.updateContribution(contribution).then(() => {
      this.toogleForm();
      this.savedChanges.emit();
    });
  }

  private cutTitle(title: string): void {
    if (title.length > this.MAX_TITLE_CHAR) {
      this.displayShowMoreButton = true;
      const shortText = title.split('').slice(0, this.MAX_TITLE_CHAR);
      this.shortTitle = `${shortText.join('')}...`;
      this.title = this.shortTitle;
      return;
    }
    this.title = title;
  }

  private resetModel(): void {
    this.contributionCopy = Object.assign({}, this.contribution);
  }
}
