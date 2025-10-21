import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-button-group-multiple',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './button-group-multiple.component.html',
    standalone: false
})
export class ButtonGroupMultipleComponent {
}
