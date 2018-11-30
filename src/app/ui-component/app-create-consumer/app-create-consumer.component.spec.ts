import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCreateConsumerComponent } from './app-create-consumer.component';

describe('AppCreateConsumerComponent', () => {
  let component: AppCreateConsumerComponent;
  let fixture: ComponentFixture<AppCreateConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCreateConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCreateConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
