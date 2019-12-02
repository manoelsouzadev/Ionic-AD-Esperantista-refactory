import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaCampanhaPage } from './nova-campanha.page';

describe('NovaCampanhaPage', () => {
  let component: NovaCampanhaPage;
  let fixture: ComponentFixture<NovaCampanhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaCampanhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaCampanhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
