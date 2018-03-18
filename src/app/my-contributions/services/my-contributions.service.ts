import { Injectable } from '@angular/core';
import { Contribution } from '../models/index';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyContributionService {
  private readonly ROUTE = '../../../mocks/contributions.mock.json';

  constructor(private http: HttpClient) {}

  public getContributions(): Promise<Contribution[]> {
    return this.http.get<Contribution[]>(this.ROUTE).toPromise();
  }
}
