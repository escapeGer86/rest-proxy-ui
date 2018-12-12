import { Component, OnInit } from '@angular/core';
import { KafkaRestStubService } from '../../services/kafka-rest-stub.service';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-kafka-observer',
  templateUrl: './kafka-observer.component.html',
  styleUrls: ['./kafka-observer.component.scss']
})
export class KafkaObserverComponent implements OnInit {

  topics;
  topicData;
  brokerUrl;
  settings;
  alertLinkPresent;

  constructor(private _kafkaBroker: KafkaRestStubService, private _contextService: AppContextService) {}


  ngOnInit() {
    this.settings = {
      columns: {
        name: {
          title: 'Full Name'
        }
      },
      actions: false,
    };

  }

  onSubmit(event) {
    this._kafkaBroker.getAllTopics(this._contextService.proxyUrl).subscribe(res => {
      this.topics = res;
    });
  }

}
