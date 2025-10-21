import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-user-showcase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-showcase.component.html',
    standalone: false
})
export class UserShowcaseComponent {
}
