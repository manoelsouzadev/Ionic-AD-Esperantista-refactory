import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OracoesPage } from './oracoes.page';

describe('OracoesPage', () => {
  let component: OracoesPage;
  let fixture: ComponentFixture<OracoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OracoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OracoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
