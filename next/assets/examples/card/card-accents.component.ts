import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-card-accents',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card-accents.component.html',
    standalone: false
})
export class CardAccentsComponent {
}
