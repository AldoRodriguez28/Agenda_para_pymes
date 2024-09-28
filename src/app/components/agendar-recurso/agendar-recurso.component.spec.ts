import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarRecursoComponent } from './agendar-recurso.component';

describe('AgendarRecursoComponent', () => {
  let component: AgendarRecursoComponent;
  let fixture: ComponentFixture<AgendarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
