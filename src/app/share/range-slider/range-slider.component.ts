import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent implements OnChanges {
  private readonly RANGE_COLOR_0 = '#3AB17D';
  private readonly RANGE_COLOR_1 = '#C7CDD2';
  @Input() progressPercentage: number;

  public styleWidth: string;
  public range = 0;

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    this.range = this.progressPercentage;
    this.rangeChange();
  }

  public rangeChange(): void {
    const val = this.range / 100;
    this.styleWidth = `-webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(${val}, ${this.RANGE_COLOR_0}),
      color-stop(${val}, ${this.RANGE_COLOR_1})
    )`;
  }
}
