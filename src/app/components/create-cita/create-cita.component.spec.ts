import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCitaComponent } from './create-cita.component';

describe('CreateCitaComponent', () => {
  let component: CreateCitaComponent;
  let fixture: ComponentFixture<CreateCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
