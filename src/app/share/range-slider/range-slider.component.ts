import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent implements OnChanges {
  private readonly RANGE_COLOR_0 = '#3AB17D';
  private readonly RANGE_COLOR_1 = '#C7CDD2';
  @Input() progressPercentage: number;
  @Input() disabled: boolean;
  @Output() rangeChanged = new EventEmitter<number>();

  public styleWidth: string;
  public range = 0;

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    this.range = this.progressPercentage;
    this.updateRangeStyle();
  }

  public updateRangeStyle(): void {
    const val = this.range / 100;
    let color0 = this.RANGE_COLOR_0;

    if (this.disabled) {
        color0 = '#ACCABD';
    }

    this.styleWidth = `-webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(${val}, ${color0}),
      color-stop(${val}, ${this.RANGE_COLOR_1})
    )`;
    this.rangeChanged.emit(this.range);
  }
}
