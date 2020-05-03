import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'aditional-modal',
  templateUrl: './aditional-modal.component.html',
  styleUrls: ['./aditional-modal.component.scss'],
})
export class AditionalModalComponent implements OnInit {
  @Input() textInput;
  private form: FormGroup
  private url: string = this.navParams.get('url');

  constructor(private formBuilder: FormBuilder, private navParams: NavParams, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    let textInputForm = this.navParams.get("textInput");
    this.form = this.formBuilder.group({
      adicional: textInputForm
    });
  }

  redirectToForm(){
    this.router.navigate([this.url]);
    this.closeModal();  
}

  returnForm(){
    this.router.navigate([ this.url ], { queryParams:{ textInputModal: this.form.get('adicional').value}});
    this.closeModal();
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
