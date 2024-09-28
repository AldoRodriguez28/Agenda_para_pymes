import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosConfigComponent } from './recursos-config.component';

describe('RecursosConfigComponent', () => {
  let component: RecursosConfigComponent;
  let fixture: ComponentFixture<RecursosConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
