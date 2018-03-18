import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnChanges {
  @Input() tabs: string[];
  @Output() tabSelected = new EventEmitter<string>();

  public activeTab = '';

  public selectTab(tab: string): void {
    this.activeTab = tab;
    this.tabSelected.emit(tab);
  }

  public ngOnChanges(): void {
    this.activeTab = this.tabs ? this.tabs[0] : '';
  }
}
