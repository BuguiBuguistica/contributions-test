import { Component, OnInit } from '@angular/core';
import { Contribution } from './models/contribution.model';
import { MyContributionService } from './services/my-contributions.service';

@Component({
  providers: [MyContributionService],
  templateUrl: './my-contributions.component.html'
})
export class MyContributionsComponent implements OnInit {
  public contributions: Contribution[] = [];
  public totalContributions = { value: '0' };

  constructor(private myContributionsService: MyContributionService) { }

  public ngOnInit(): void {
    this.loadContributions();
  }

  public refreshContributionList(): void {
    this.loadContributions();
  }

  private loadContributions(): void {
    this.myContributionsService.getContributions().then(response => {
      this.contributions = response;
      this.totalContributions = { value: this.contributions.length.toString() };
    });
  }
}
