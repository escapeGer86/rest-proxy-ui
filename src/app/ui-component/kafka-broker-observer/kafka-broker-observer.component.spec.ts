import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaBrokerObserverComponent } from './kafka-broker-observer.component';

describe('KafkaBrokerObserverComponent', () => {
  let component: KafkaBrokerObserverComponent;
  let fixture: ComponentFixture<KafkaBrokerObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaBrokerObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaBrokerObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
