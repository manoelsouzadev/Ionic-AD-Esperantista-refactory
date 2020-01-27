import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhasPage } from './campanhas.page';

describe('CampanhasPage', () => {
  let component: CampanhasPage;
  let fixture: ComponentFixture<CampanhasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampanhasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanhasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
