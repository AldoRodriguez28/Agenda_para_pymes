import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectRecursosComponent } from './multiselect-recursos.component';

describe('MultiselectRecursosComponent', () => {
  let component: MultiselectRecursosComponent;
  let fixture: ComponentFixture<MultiselectRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
