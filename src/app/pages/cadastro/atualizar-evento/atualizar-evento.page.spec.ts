import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtualizarEventoPage } from './atualizar-evento.page';

describe('AtualizarEventoPage', () => {
  let component: AtualizarEventoPage;
  let fixture: ComponentFixture<AtualizarEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarEventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
