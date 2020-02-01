import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovaOracaoPage } from './nova-oracao.page';

describe('NovaOracaoPage', () => {
  let component: NovaOracaoPage;
  let fixture: ComponentFixture<NovaOracaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaOracaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovaOracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
