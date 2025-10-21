import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-card-sizes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './alert-sizes.component.html',
    standalone: false
})
export class AlertSizesComponent {
}
