import { Component, OnInit } from '@angular/core';
import { KafkaRestStubService } from '../../services/kafka-rest-stub.service';
import { ActivatedRoute } from '@angular/router';
import { ContentTypes } from '../../model/contentType/content-types';

@Component({
  selector: 'app-kafka-topic-observer',
  templateUrl: './kafka-topic-observer.component.html',
  styleUrls: ['./kafka-topic-observer.component.scss']
})
export class KafkaTopicObserverComponent implements OnInit {

  topic;
  topicInfos;
  partitionInfos;

  consumerName;
  hint;
  messages;

  accept: ContentTypes;
  contentType: ContentTypes;
  body: string;

  constructor(private _kafkaBroker: KafkaRestStubService, private route: ActivatedRoute) {
    this.accept = new ContentTypes();
    this.contentType = new ContentTypes();
   }

  ngOnInit() {

    console.log('KafkaTopicObserverComponent.ngOnInit');

    // get params
    this.route.params.subscribe(params => {
      this.topic = params['topic'];
    });

    this._kafkaBroker.getTopic(this._kafkaBroker.url, this.topic).subscribe(res => {
      // just receive the message and log it to the console:
      console.log(res);
      this.topicInfos = res;
    });

    this._kafkaBroker.getPartitions(this._kafkaBroker.url, this.topic, 'application/vnd.kafka.v2+json').subscribe(res => {
      // just receive the message and log it to the console:
      console.log(res);
      this.partitionInfos = res;
    });

  }

 /*  onSubmit(event) {
    this._kafkaBroker.createConsumerInConsumerGroup(this._kafkaBroker.url, this.consumerName).subscribe(res => {
      this.hint = res;
      console.log(res);
    });
  }

  onSubmitSubscribe(event) {
    this._kafkaBroker.subscribeToTopic(this._kafkaBroker.url, this.topic, this.consumerName);
  }

  onSubmitConsume(event) {
    this._kafkaBroker.consumeData(this._kafkaBroker.url, this.consumerName, '').subscribe( res => {
      this.messages = res;
    });
  } */

  onSubmitTopicContent(event) {
    console.log(this.contentType.getContentType());
    console.log(this.accept.getAcceptType());
    console.log(this.body);
    this._kafkaBroker.postContentToTopic(this._kafkaBroker.url,
      this.topic, this.contentType.getContentType(), this.accept.getAcceptType(), this.body).subscribe(res => {
        // just receive the message and log it to the console:
        console.log(res);
    });
  }

}
