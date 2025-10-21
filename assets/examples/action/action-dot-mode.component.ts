import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-action-dot-mode',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './action-dot-mode.component.html',
    standalone: false
})
export class ActionDotModeComponent {
}
