import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-user-hide-captions',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-hide-captions.component.html',
    standalone: false
})
export class UserHideCaptionsComponent {

}
