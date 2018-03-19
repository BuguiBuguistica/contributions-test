import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role, JobPosition, Status } from '../models';

@Injectable()
export class ContributionFormService {
  private readonly ROUTE_BASE = '../../../mocks/';

  constructor(private http: HttpClient) {}

  public getRoles(): Promise<Role[]> {
    return this.http.get<Role[]>(`${this.ROUTE_BASE}roles.mock.json`).toPromise();
  }

  public getJobPositions(): Promise<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.ROUTE_BASE}positions.mock.json`).toPromise();
  }

  public getStatus(): Promise<Status[]> {
    return this.http.get<Status[]>(`${this.ROUTE_BASE}status.mock.json`).toPromise();
  }
}
