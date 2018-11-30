import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaObserverComponent } from './kafka-observer.component';

describe('KafkaObserverComponent', () => {
  let component: KafkaObserverComponent;
  let fixture: ComponentFixture<KafkaObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
