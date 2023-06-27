import {MediaMatcher,BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, AfterViewInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

/** @title Orlando Service Guide */
@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.scss']
})
export class NavbarsComponent implements AfterViewInit {
  title = 'Orlando Service Guide';
  public isSidebarVisible: boolean = true;

  @ViewChild(MatSidenav) appDrawer: MatSidenav;

  constructor(public breakpointObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.shouldDisplaySidenav();
      }
    });
  }

  shouldDisplaySidenav() {
    return this.router.url !== '/';
  }

  ngAfterViewInit() {

  }
  openedChange(val: any) {

  }
}
