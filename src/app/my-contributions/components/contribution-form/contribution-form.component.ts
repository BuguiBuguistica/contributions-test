import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationMessageService } from '../../../share/validation-message/validation-message.service';
import { ContributionFormService } from './services/contribution-form.service';
import { Status, Role, JobPosition } from './models';
import { Contribution } from '../../models/index';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  providers: [ValidationMessageService, ContributionFormService],
  selector: 'app-contribution-form',
  templateUrl: './contribution-form.component.html'
})
export class ContributionFormComponent implements OnInit {
  @Input() contributionModel: Contribution;
  @Output() saveContribution = new EventEmitter<Contribution>();
  @Output() cancelChanges = new EventEmitter();

  public contributionForm: FormGroup;
  public status: Status[];
  public roles: Role[];
  public jobPositions: JobPosition[];
  public targetDate: Date;
  public activeTab: string;
  public tabs: string[] = [];
  public formTab: string;

  public options: DatepickerOptions = {
    minYear: 2014,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0,
    minDate: new Date(Date.now()),
    barTitleIfEmpty: 'Click to select a date'
  };

  constructor(private formBuilder: FormBuilder,
    public validationMessageService: ValidationMessageService,
    private contributionFormService: ContributionFormService) { }

  public ngOnInit(): void {
    this.initTabs();
    this.initData();
    this.initForm();
  }

  public onTabSelected(tab: string): void {
    this.activeTab = tab;
  }

  public submitForm(form: FormGroup): void {
    if (this.contributionForm.invalid) {
      return;
    }
    const contribution: Contribution = {
      id: this.contributionModel.id,
      title: this.contributionModel.title,
      description: this.contributionForm.controls['description'].value,
      status: this.contributionForm.controls['status'].value,
      visibilityRole: this.contributionForm.controls['visibilityRole'].value,
      jobPosition: this.contributionForm.controls['jobPosition'].value,
      creationDate: this.contributionModel.creationDate,
      targetDate: this.targetDate
    };

    this.saveContribution.emit(contribution);
  }

  public cancel(): void {
    this.cancelChanges.emit();
  }

  private initTabs(): void {
    this.tabs = this.contributionFormService.getTabs();
    this.formTab = this.tabs[0];
    this.activeTab = this.tabs[0];
  }

  private async initData(): Promise<void> {
    await Promise.all([this.contributionFormService.getRoles().then(roles => this.roles = roles),
    this.contributionFormService.getJobPositions().then(jobPositions => this.jobPositions = jobPositions),
    this.contributionFormService.getStatus().then(status => this.status = status)]);
    this.updateForm();
  }

  private initForm(): void {
    this.contributionForm = this.formBuilder.group({
      'description': [this.contributionModel ? this.contributionModel.description : '', Validators.required],
      'status': [null, Validators.required],
      'visibilityRole': [null, Validators.required],
      'jobPosition': [null, Validators.required],
      'targetDate': [null, Validators.required]
    });
  }

  private updateForm(): void {
    if (!this.contributionModel) {
      return;
    }

    this.targetDate = this.contributionModel.targetDate || null;

    const jobPositions = this.jobPositions.find(position => this.contributionModel.jobPosition.id === position.id);
    this.contributionForm.controls['jobPosition'].setValue(jobPositions);

    const visibilityRole = this.roles.find(role => this.contributionModel.visibilityRole.id === role.id);
    this.contributionForm.controls['visibilityRole'].setValue(visibilityRole);

    const status = this.status.find(st => this.contributionModel.status.id === st.id);
    this.contributionForm.controls['status'].setValue(status);
  }
}
