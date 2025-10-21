import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-button-full-width',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './button-full-width.component.html',
    standalone: false
})
export class ButtonFullWidthComponent {
}
