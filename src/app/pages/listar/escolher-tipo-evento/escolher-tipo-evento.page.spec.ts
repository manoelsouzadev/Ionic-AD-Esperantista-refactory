import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscolherTipoEventoPage } from './escolher-tipo-evento.page';

describe('EscolherTipoEventoPage', () => {
  let component: EscolherTipoEventoPage;
  let fixture: ComponentFixture<EscolherTipoEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolherTipoEventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscolherTipoEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
