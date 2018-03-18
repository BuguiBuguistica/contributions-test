import { Component } from '@angular/core';

@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html'
})
export class NewContributionComponent {
  public isFormOpen = false;

  public toogleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }
}
