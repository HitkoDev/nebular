import { Component } from '@angular/core';
import { DynamicToAddComponent } from './components/dynamic.components';

@Component({
    selector: 'nb-popover-custom-component',
    templateUrl: './popover-custom-component.component.html',
    styles: [`
    :host {
      display: block;
      padding-bottom: 3rem;
    }

    ::ng-deep nb-popover {
      padding: 1rem;
    }
  `],
    standalone: false
})
export class PopoverCustomComponentComponent {

  customComponent = DynamicToAddComponent;
}


