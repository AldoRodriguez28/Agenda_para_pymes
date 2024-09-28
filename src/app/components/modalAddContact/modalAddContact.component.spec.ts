import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modalAddContact } from './modalAddContact.component';

describe('modalAddContact', () => {
  let component: modalAddContact;
  let fixture: ComponentFixture<modalAddContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ modalAddContact ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(modalAddContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});