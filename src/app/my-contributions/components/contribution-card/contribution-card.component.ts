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

  public showMoreActive = false;
  public translateKey = this.SHOW_MORE;
  public isFormOpen = false;
  public title: string;
  public shortTitle: string;
  public displayShowMoreButton = false;
  public isEditionTitle = false;
  public isValidTitle = true;
  private contributionCopy: Contribution;
  public tabs: string[] = [];
  public formTab: string;
  public dialogueTab: string;
  public activeTab: string;

  constructor(private myContributionService: MyContributionService) { }

  public ngOnInit(): void {
    this.contributionCopy = Object.assign({}, this.contribution);
    this.contributionCopy.range = this.contributionCopy.range || 0;
    this.cutTitle(this.contributionCopy.title);
    this.initTabs();
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

  public toggleEditTitle(event): void {
    if (this.isEditionTitle) {
      this.resetTitle();
    }
    this.isEditionTitle = !this.isEditionTitle;
    this.validateTitle();
    this.stopPropagation(event);
  }

  public stopPropagation(event): void {
    event.stopPropagation();
  }

  public onSaveContribution(contribution: Contribution): void {
    // update contribution range here because is not part of contribution form component
    if (!this.isValidTitle) {
      return;
    }

    contribution.range = this.contributionCopy.range;
    contribution.title = this.contributionCopy.title;
    this.myContributionService.updateContribution(contribution).then(() => {
      this.toogleForm();
      this.savedChanges.emit();
    });
  }

  public onTabSelected(tab: string): void {
    this.activeTab = tab;
  }

  public onRangeChange(range: number): void {
    this.contributionCopy.range = range;
  }

  private initTabs(): void {
    this.tabs = this.myContributionService.getTabs();
    this.formTab = this.tabs[0];
    this.dialogueTab = this.tabs[1];
    this.activeTab = this.tabs[0];
  }

  private resetTitle(): void {
    this.contributionCopy = Object.assign(this.contributionCopy, {title: this.contribution.title});
  }

  private validateTitle(): void {
    this.isValidTitle = this.contributionCopy.title.length > 0;
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
