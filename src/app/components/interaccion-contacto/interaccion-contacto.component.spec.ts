import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionContactoComponent } from './interaccion-contacto.component';

describe('InteraccionContactoComponent', () => {
  let component: InteraccionContactoComponent;
  let fixture: ComponentFixture<InteraccionContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteraccionContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteraccionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
