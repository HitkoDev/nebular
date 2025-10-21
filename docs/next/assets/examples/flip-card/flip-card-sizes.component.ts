import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-flip-card-sizes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './flip-card-sizes.component.html',
    standalone: false
})
export class FlipCardSizesComponent {
}
