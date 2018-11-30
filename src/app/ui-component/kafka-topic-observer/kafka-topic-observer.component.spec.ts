import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaTopicObserverComponent } from './kafka-topic-observer.component';

describe('KafkaTopicObserverComponent', () => {
  let component: KafkaTopicObserverComponent;
  let fixture: ComponentFixture<KafkaTopicObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaTopicObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaTopicObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
