import { Component, Output, EventEmitter } from '@angular/core';
import { Contribution } from '../../models/index';
import { MyContributionService } from '../../services/my-contributions.service';

@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html'
})
export class NewContributionComponent {
  @Output() contributionAdded = new EventEmitter();

  public isFormOpen = false;

  constructor(private myContributionService: MyContributionService) { }

  public toogleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  public onSaveContribution(contribution: Contribution): void {
    this.myContributionService.addContribution(contribution).then(() => {
      this.contributionAdded.emit();
      this.toogleForm();
    });
  }
}
