import { Injectable } from '@angular/core';
import { Contribution } from '../models/index';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyContributionService {
  private readonly ROUTE = '../../../mocks/contributions.mock.json';
  private readonly CONTRIBUTIONS_KEY = 'contributions';

  constructor(private http: HttpClient) { }

  public getContributions(): Promise<Contribution[]> {
    return new Promise(resolve => {
      const contributions = this.getContributionsFromLocalStorage();
      if (contributions) {
        return resolve(contributions);
      }
      this.http.get<Contribution[]>(this.ROUTE).subscribe(response => {
        this.saveInLocalStorage(response);
        return resolve(response);
      });
    });
  }

  public updateContribution(newContribution: Contribution): Promise<void> {
    const contributions: Contribution[] = this.getContributionsFromLocalStorage();
    contributions.forEach(contribution => {
      if (contribution.id === newContribution.id) {
        contribution.description = newContribution.description;
        contribution.title = newContribution.title;
        contribution.status = newContribution.status;
        contribution.visibilityRole = newContribution.visibilityRole;
        contribution.targetDate = newContribution.targetDate;
        contribution.creationDate = newContribution.creationDate;
        contribution.range = newContribution.range;
        contribution.jobPosition = newContribution.jobPosition;
      }
    });
    localStorage.removeItem(this.CONTRIBUTIONS_KEY);
    this.saveInLocalStorage(contributions);
    return Promise.resolve();
  }

  public addContribution(contribution: Contribution): Promise<void> {
    const contributions: Contribution[] = this.getContributionsFromLocalStorage();
    contributions.unshift(contribution);
    this.saveInLocalStorage(contributions);
    return Promise.resolve();
  }

  private saveInLocalStorage(contributions: Contribution[]): void {
    localStorage.setItem(this.CONTRIBUTIONS_KEY, JSON.stringify(contributions));
  }

  private getContributionsFromLocalStorage(): any {
    const contributions = JSON.parse(localStorage.getItem(this.CONTRIBUTIONS_KEY));
    return contributions;
  }
}
