import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-alert-outline',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './alert-outline.component.html',
    styleUrls: ['./alert-example.component.scss'],
    standalone: false
})
export class AlertOutlineComponent {
}
