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

  submitConsumerPresetJSON(event) {
    this.cCctx.contentType.embeddedFormat = 'json';
    this.cCctx.format = 'json';
  }

  submitConsumerPresetAVRO(event) {
    this.cCctx.contentType.embeddedFormat = 'avro';
    this.cCctx.format = 'avro';
  }

  submitConsumerPresetBINARY(event) {
    this.cCctx.contentType.embeddedFormat = 'binary';
    this.cCctx.format = 'binary';
  }

}
