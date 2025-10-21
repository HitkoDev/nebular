import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-action-badge',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './action-badge.component.html',
    standalone: false
})
export class ActionBadgeComponent {
}
