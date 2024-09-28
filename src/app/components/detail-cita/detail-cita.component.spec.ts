import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCitaComponent } from './detail-cita.component';

describe('DetailCitaComponent', () => {
  let component: DetailCitaComponent;
  let fixture: ComponentFixture<DetailCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
