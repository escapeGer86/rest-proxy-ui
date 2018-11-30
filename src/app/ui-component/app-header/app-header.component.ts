import { Component, OnInit } from '@angular/core';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  brokerUrl;
  alertLinkPresent = true;
  proxyUrlEnabled = false;

  public isNavbarCollapsed: boolean;

  constructor(private _contextService: AppContextService) {
      this.isNavbarCollapsed = false;
  }

  ngOnInit() {
  }

  onSubmit(event) {
    this._contextService.proxyUrl = this.brokerUrl; // store url for later use
    console.log(this._contextService.proxyUrl);
  }

}
