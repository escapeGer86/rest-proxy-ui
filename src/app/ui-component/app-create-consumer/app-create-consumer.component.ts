import { Component, OnInit, Input } from '@angular/core';
import { ConsumerCreationContext } from '../../model/consumer-creation-context';

@Component({
  selector: 'app-create-consumer',
  templateUrl: './app-create-consumer.component.html',
  styleUrls: ['./app-create-consumer.component.scss']
})
export class AppCreateConsumerComponent implements OnInit {

  @Input() cCctx: ConsumerCreationContext;
  @Input() alertLinkPresent = false;

  constructor() {
   }

  ngOnInit() {
  }

}
