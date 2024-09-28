import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasComponent } from './agendas.component';

describe('AgendasComponent', () => {
  let component: AgendasComponent;
  let fixture: ComponentFixture<AgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
