import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultosSemanaisPage } from './cultos-semanais.page';

describe('CultosSemanaisPage', () => {
  let component: CultosSemanaisPage;
  let fixture: ComponentFixture<CultosSemanaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultosSemanaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultosSemanaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
