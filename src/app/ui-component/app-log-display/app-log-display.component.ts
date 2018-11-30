import { Component, OnInit } from '@angular/core';
import { RequestReponsePair } from '../../model/request-reponse-pair';
import { AppContextService } from '../../services/app-context.service';


@Component({
  selector: 'app-log-display',
  templateUrl: './app-log-display.component.html',
  styleUrls: ['./app-log-display.component.scss']
})
export class AppLogDisplayComponent implements OnInit {

  logTableEntries;

  constructor(private _contextService: AppContextService) {}

  ngOnInit() {
    console.log(this._contextService.loggingTrafficList.length);
    this.logTableEntries = this._contextService.loggingTrafficList;
  }



}
