import { Component, OnInit } from '@angular/core';
import { KafkaRestStubService } from '../../services/kafka-rest-stub.service';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-kafka-observer',
  templateUrl: './kafka-observer.component.html',
  styleUrls: ['./kafka-observer.component.scss']
})
export class KafkaObserverComponent implements OnInit {
  constructor(private _kafkaBroker: KafkaRestStubService, private _contextService: AppContextService) {}
  topics;
  topicData;
  brokerUrl;
  settings;

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
    this._kafkaBroker.url = this._contextService.proxyUrl; // store url for later use
    this._kafkaBroker.getAllTopics(this._kafkaBroker.url).subscribe(res => {
      this.topics = res;
    });
  }

}
