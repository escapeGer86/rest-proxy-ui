import { Component, OnInit, Input } from '@angular/core';
import { ConsumerCreationContext } from '../../model/consumer-creation-context';
import { KafkaRestStubService } from '../../services/kafka-rest-stub.service';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-subscribe-consumer',
  templateUrl: './app-subscribe-consumer.component.html',
  styleUrls: ['./app-subscribe-consumer.component.scss']
})
export class AppSubscribeConsumerComponent implements OnInit {

  topics;

  @Input() cCctx: ConsumerCreationContext;

  constructor(private _kafkaBroker: KafkaRestStubService, private _contextService: AppContextService) { }

  ngOnInit() {
    this._kafkaBroker.getAllTopics(this._kafkaBroker.url).subscribe(res => {
      // just receive the message and log it to the console:
      this.topics = res;

      // map the attributes to some suitable internal structure
      // not needed it is alraeady an array ...
      console.log(this.topics);
    });
  }

}
