import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
    template: ` <router-outlet></router-outlet> `,
    styleUrls: ['../styles/styles.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PlaygroundBaseComponent implements OnInit {
  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
    this.themeService.changeTheme('default');
  }
}
