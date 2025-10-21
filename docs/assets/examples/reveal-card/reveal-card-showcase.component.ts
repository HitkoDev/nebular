import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-reveal-card-showcase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './reveal-card-showcase.component.html',
    standalone: false
})
export class RevealCardShowcaseComponent {
}
