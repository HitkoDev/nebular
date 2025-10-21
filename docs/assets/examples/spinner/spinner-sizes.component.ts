import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-spinner-sizes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './spinner-sizes.component.html',
    standalone: false
})
export class SpinnerSizesComponent {
}
