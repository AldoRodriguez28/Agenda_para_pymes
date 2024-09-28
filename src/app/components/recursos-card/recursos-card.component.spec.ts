import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosCardComponent } from './recursos-card.component';

describe('RecursosCardComponent', () => {
  let component: RecursosCardComponent;
  let fixture: ComponentFixture<RecursosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
