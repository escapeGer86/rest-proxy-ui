import { Component, OnInit } from '@angular/core';
import { KafkaRestStubService } from '../../services/kafka-rest-stub.service';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-kafka-broker-observer',
  templateUrl: './kafka-broker-observer.component.html',
  styleUrls: ['./kafka-broker-observer.component.scss']
})
export class KafkaBrokerObserverComponent implements OnInit {
  brokerInfo;

  constructor(private _kafkaBroker: KafkaRestStubService, private _contextSerivce: AppContextService) { }

  ngOnInit() {
  }

  onSubmit(event) {
    this._kafkaBroker.getBrokers(this._contextSerivce.proxyUrl).subscribe(res => {
      // just receive the message and log it to the console:
      this.brokerInfo = res;

      // map the attributes to some suitable internal structure
      // not needed it is alraeady an array ...
      console.log(this.brokerInfo);
    });
  }

}
