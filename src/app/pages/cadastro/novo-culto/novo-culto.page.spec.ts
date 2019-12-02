import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCultoPage } from './novo-culto.page';

describe('NovoCultoPage', () => {
  let component: NovoCultoPage;
  let fixture: ComponentFixture<NovoCultoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoCultoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCultoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
