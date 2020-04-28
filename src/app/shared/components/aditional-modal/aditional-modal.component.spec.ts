import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AditionalModalComponent } from './aditional-modal.component';

describe('AditionalModalComponent', () => {
  let component: AditionalModalComponent;
  let fixture: ComponentFixture<AditionalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AditionalModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AditionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
