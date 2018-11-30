import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-slide-panel',
  templateUrl: './app-slide-panel.component.html',
  styleUrls: ['./app-slide-panel.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
  ])],
})
export class AppSlidePanelComponent implements OnInit {

  @Input() activePane: PaneType = 'left';

  constructor() { }

  ngOnInit() {
  }

}

type PaneType = 'left' | 'right';
