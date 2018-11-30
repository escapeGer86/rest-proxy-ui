import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubscribeConsumerComponent } from './app-subscribe-consumer.component';

describe('AppSubscribeConsumerComponent', () => {
  let component: AppSubscribeConsumerComponent;
  let fixture: ComponentFixture<AppSubscribeConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSubscribeConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSubscribeConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
