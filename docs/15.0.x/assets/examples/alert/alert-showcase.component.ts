import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-card-showcase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './alert-showcase.component.html',
    standalone: false
})
export class AlertShowcaseComponent {
}
