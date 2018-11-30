import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLogDisplayComponent } from './app-log-display.component';

describe('AppLogDisplayComponent', () => {
  let component: AppLogDisplayComponent;
  let fixture: ComponentFixture<AppLogDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLogDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
