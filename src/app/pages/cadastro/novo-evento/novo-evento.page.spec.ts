import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovoEventoPage } from './novo-evento.page';

describe('NovoEventoPage', () => {
  let component: NovoEventoPage;
  let fixture: ComponentFixture<NovoEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoEventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
