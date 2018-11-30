import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-carousel',
  templateUrl: './app-carousel.component.html',
  styleUrls: ['./app-carousel.component.scss']
})
export class AppCarouselComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routingTopics(): void  {
    this.router.navigateByUrl('topicManagement');
  }

  routingBroker(): void  {
    this.router.navigateByUrl('brokerInfo');
  }

  routingConsumers(): void  {
    this.router.navigateByUrl('consumerManagement');
  }

  routingMetrics(): void {
    console.log('Not yet implemented..');
  }
}
