import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-button-sizes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './button-sizes.component.html',
    standalone: false
})
export class ButtonSizesComponent {
}
