import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSlidePanelComponent } from './app-slide-panel.component';

describe('AppSlidePanelComponent', () => {
  let component: AppSlidePanelComponent;
  let fixture: ComponentFixture<AppSlidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSlidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSlidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
