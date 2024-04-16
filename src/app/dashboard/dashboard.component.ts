import { Component, OnInit } from '@angular/core';
import { PluginsService } from '../plugins.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private plugins: PluginsService) {}

  ngOnInit() {
    // Init all plugins...
    const current = this;

    setTimeout(() => {
      current.plugins.index();
      current.plugins.dashboardIndex();
    }, 200);
  }
}
