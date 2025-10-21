import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-action-width',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './action-width.component.html',
    standalone: false
})
export class ActionWidthComponent {
}
