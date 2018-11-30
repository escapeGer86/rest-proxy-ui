import { Component, OnInit } from '@angular/core';
import { ContentTypes } from '../../model/contentType/content-types';
import { ConsumerCreationContext } from '../../model/consumer-creation-context';
import { KafkaRestStubService } from '../../services/kafka-rest-stub.service';
import { ActivatedRoute } from '@angular/router';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-kafka-consumer-mgmt',
  templateUrl: './kafka-consumer-mgmt.component.html',
  styleUrls: ['./kafka-consumer-mgmt.component.scss']
})
export class KafkaConsumerMgmtComponent implements OnInit {

  isLeftVisible = false;
  cCctx: ConsumerCreationContext = new ConsumerCreationContext();

  consumers;
  selectedConsumer;
  messages;
  offsets;
  assignments;
  customOffset;
  reconnectConsumserText: string;

  constructor(private _kafkaRestProxy: KafkaRestStubService, private route: ActivatedRoute, private _contextService: AppContextService) {

  }

  ngOnInit() {
    this.consumers = this._contextService.sessionCustomerCreationContextList;
  }

  /*function cCctxAlreadyCreated(innerContext: ConsumerCreationContext, outerContext: ConsumerCreationContext) {
    return innerContext.name === outerContext.name;
  }*/

  reconnectConsumer(event) {
    if (this.reconnectConsumserText != null && this.reconnectConsumserText !== '') {
      // check if value is already in Seassion:
      if (!this._contextService.sessionCustomerCreationContextList.find(element => element.name === this.cCctx.name)) {
        // build up new Consumer Creation Context and add to list:
        const newSessionContext: ConsumerCreationContext = new ConsumerCreationContext();
        const result = this.reconnectConsumserText.split('/');
        newSessionContext.consumerGroup = result[0];
        newSessionContext.name = result[1];
        // get Subscriptions:
        this._kafkaRestProxy.getTopicSubscriptionsForConsumer(this._contextService.proxyUrl, newSessionContext).subscribe(resp => {

          interface Topics {
            topics: string[];
          }
          const topicarray: string[] = [];

          for (const topic of (<Topics> resp).topics) {
            topicarray.push(topic);
          }
          newSessionContext.plannedSubscriptions = topicarray;
          // push to global value:
          this._contextService.sessionCustomerCreationContextList.push(newSessionContext);
          // re-init drop down:
          this.consumers = this._contextService.sessionCustomerCreationContextList;
        });
      }
    }
  }

  submitConsumer(event) {
    console.log(this.cCctx);
    if (!this._contextService.sessionCustomerCreationContextList.find(element => element.name === this.cCctx.name)) {
      this._kafkaRestProxy.createConsumerInConsumerGroup(this._contextService.proxyUrl, this.cCctx).subscribe(res => {
        console.log(res);
        // this.cCctx.base_uri = res.base_uri;
      });
      this._contextService.sessionCustomerCreationContextList.push(this.cCctx);
      this.consumers = this._contextService.sessionCustomerCreationContextList;
      console.log(this.cCctx + 'pushed');
    } else {
      console.log(this.cCctx + 'not pushed, already known: ' +
      this._contextService.sessionCustomerCreationContextList.findIndex(element => element.name === this.cCctx.name));
    }
    return this.isLeftVisible = !this.isLeftVisible;
  }

  subscribeConsumer(event) {
    console.log(this.cCctx.plannedSubscriptions);
    if (this.cCctx.plannedSubscriptions.length <= 0) {
      console.log('Nothing selected');
    } else {
      this._kafkaRestProxy.subscribeToTopic(this._contextService.proxyUrl,
        this.cCctx.plannedSubscriptions, this.cCctx.consumerGroup, this.cCctx.name);
    }
  }

  readWithConsumer(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will read with: ');
    console.log(this.cCctx);
    this._kafkaRestProxy.consumeData(this._contextService.proxyUrl, this.cCctx).subscribe( res => {
      this.messages = res;
      console.log(this.messages);
    });
  }

  refreshConsumer(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will refresh with: ');
    console.log(this.cCctx);
    this._kafkaRestProxy.getManuallyAssignedPartitions(this._contextService.proxyUrl, this.cCctx).subscribe( res => {
      this.assignments = res;
      console.log(this.assignments);
    });
  }

  getOffsetConsumer(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will get offset for: ');
    console.log(this.cCctx);
   // this._kafkaRestProxy.resetOffsetToBeginforConsumer(this._contextService.proxyUrl, this.cCctx, this.assignments).subscribe( res => {
   //   console.log(res);
   // });
  }

  setOffsetToBegin(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will set to begin with: ');
    console.log(this.cCctx);
    this._kafkaRestProxy.resetOffsetToBeginforConsumer(this._contextService.proxyUrl, this.cCctx, this.assignments).subscribe( res => {
      console.log(res);
    });
  }

  setOffsetToEnd(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will set to end with: ');
    console.log(this.cCctx);
    this._kafkaRestProxy.resetOffsetToEndforConsumer(this._contextService.proxyUrl, this.cCctx, this.assignments).subscribe( res => {
      console.log(res);
    });
  }

  overrideOffsetForConsumer(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will set to position with: ');
    console.log(this.cCctx);
    const preparedBody = this.assignments;
    preparedBody.offsets = [];

    for (let i = 0; i < preparedBody.partitions.length; i++) {
      preparedBody.partitions[i].offset = this.customOffset;
      preparedBody.offsets[i] = preparedBody.partitions[i];
    }
    delete preparedBody.partitions;
    console.log(preparedBody);
    /**
     *  POST /consumers/testgroup/instances/my_consumer/positions HTTP/1.1
        Host: proxy-instance.kafkaproxy.example.com
        Content-Type: application/vnd.kafka.v2+json
        {
          "offsets": [
            {
              "topic": "test",
              "partition": 0,
              "offset": 20
            },
            {
              "topic": "test",
              "partition": 1,
              "offset": 30
            }
          ]
        }
     */

    console.log('After preparation: ');
    console.log(preparedBody);
    this._kafkaRestProxy.overrideOffsetForConsumer(this._contextService.proxyUrl, this.cCctx, preparedBody).subscribe( res => {
      console.log(res); // HTTP/1.1 204 No Content
    });
  }

  commitOffsetForConsumer(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will set to position with: ');
    console.log(this.cCctx);
    const preparedBody = this.assignments;
    preparedBody.offsets = [];

    for (let i = 0; i < preparedBody.partitions.length; i++) {
      preparedBody.partitions[i].offset = this.customOffset;
      preparedBody.offsets[i] = preparedBody.partitions[i];
    }
    delete preparedBody.partitions;
    console.log(preparedBody);

    /*POST /consumers/testgroup/instances/my_consumer/offsets HTTP/1.1
    Host: proxy-instance.kafkaproxy.example.com
    Content-Type: application/vnd.kafka.v2+json
    {
      "offsets": [
        {
          "topic": "test",
          "partition": 0,
          "offset": 20
        },
        {
          "topic": "test",
          "partition": 1,
          "offset": 30
        }
      ]
    }*/

    this._kafkaRestProxy.commitOffsetForConsumer(this._contextService.proxyUrl, this.cCctx, preparedBody).subscribe( res => {
      console.log(res);

  });
  }

  tearDownConsumer(event) {
    this.cCctx = this.selectedConsumer;
    console.log('Will tear down: ');
    console.log(this.cCctx);
    this._kafkaRestProxy.deleteConsumerInComsumerGroup(this._contextService.proxyUrl, this.cCctx).subscribe( res => {
      console.log(res);
      const index = this._contextService.sessionCustomerCreationContextList.findIndex(element => element.name === this.cCctx.name);
      this._contextService.sessionCustomerCreationContextList.splice(index, 1);
    });
  }

}
