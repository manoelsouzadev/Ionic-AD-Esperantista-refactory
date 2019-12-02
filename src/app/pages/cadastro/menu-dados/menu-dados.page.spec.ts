import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDadosPage } from './menu-dados.page';

describe('MenuDadosPage', () => {
  let component: MenuDadosPage;
  let fixture: ComponentFixture<MenuDadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
