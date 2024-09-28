import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosViewCalendarComponent } from './recursos-view-calendar.component';

describe('RecursosViewCalendarComponent', () => {
  let component: RecursosViewCalendarComponent;
  let fixture: ComponentFixture<RecursosViewCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosViewCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosViewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
