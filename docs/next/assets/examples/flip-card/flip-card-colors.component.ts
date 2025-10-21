import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-flip-card-colors',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './flip-card-colors.component.html',
    standalone: false
})
export class FlipCardColorsComponent {
}
