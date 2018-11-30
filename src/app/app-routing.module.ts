import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KafkaObserverComponent } from './ui-component/kafka-observer/kafka-observer.component';
import { KafkaTopicObserverComponent } from './ui-component/kafka-topic-observer/kafka-topic-observer.component';
import { AppCarouselComponent } from './ui-component/app-carousel/app-carousel.component';
import { KafkaBrokerObserverComponent } from './ui-component/kafka-broker-observer/kafka-broker-observer.component';
import { KafkaConsumerMgmtComponent } from './ui-component/kafka-consumer-mgmt/kafka-consumer-mgmt.component';

const routes: Routes = [
  //  {
  //  path: '',
  //  component: AppCarouselComponent
  // },
  {
    path: '',
    component: AppCarouselComponent,
  },
  {
    path: 'viewKafka',
    component: KafkaObserverComponent,
  },
  {
    path: 'topicManagement',
    component: KafkaObserverComponent,
  },
  {
    path: 'consumerManagement',
    component: KafkaConsumerMgmtComponent,
  },
  {
    path: 'brokerInfo',
    component: KafkaBrokerObserverComponent,
  },
  {
    path: 'viewTopic/:topic',
    component: KafkaTopicObserverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
