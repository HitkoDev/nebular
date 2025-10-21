import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-icon-showcase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './icon-showcase.component.html',
    standalone: false
})
export class IconShowcaseComponent {

  constructor() { }
}
