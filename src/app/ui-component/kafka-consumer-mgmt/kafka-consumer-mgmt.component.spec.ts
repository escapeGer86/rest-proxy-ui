import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaConsumerMgmtComponent } from './kafka-consumer-mgmt.component';

describe('KafkaConsumerMgmtComponent', () => {
  let component: KafkaConsumerMgmtComponent;
  let fixture: ComponentFixture<KafkaConsumerMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaConsumerMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaConsumerMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
