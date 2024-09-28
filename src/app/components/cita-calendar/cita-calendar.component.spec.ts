import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaCalendarComponent } from './cita-calendar.component';

describe('CitaCalendarComponent', () => {
  let component: CitaCalendarComponent;
  let fixture: ComponentFixture<CitaCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
