import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './tag-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TagStatusComponent {
}
