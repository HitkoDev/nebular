import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-reveal-card-sizes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './reveal-card-sizes.component.html',
    standalone: false
})
export class RevealCardSizesComponent {
}
