import { Input } from "@angular/core";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SharedModalService } from "../../services/shared-modal/shared-modal.service";
@Component({
  selector: "aditional-input",
  templateUrl: "./aditional-input.component.html",
  styleUrls: ["./aditional-input.component.scss"],
})
export class AditionalInputComponent implements OnInit {
  private form: FormGroup;
  private haveText: boolean = false;
  private textInputModal: string = "";
  @Input() url: string;
  @Input() aditional: string = "";
  //@Output() aditional = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      adicional: [""],
    });

    this.form.get("adicional").setValue(this.aditional);

    this.route.queryParams.subscribe((queryParams: any) => {
      this.textInputModal = queryParams["textInputModal"];
      this.setValuesOnForm(this.textInputModal);
      this.haveText = this.textInputModal ? true : false;
	console.log(this.haveText, this.textInputModal);
    });
  }

  setValuesOnForm(value) {
    this.form.patchValue({
      adicional: value,
    });

    //this.aditional.emit(value);undefined
  }

  clearAditionalInput() {
    this.form.patchValue({
      adicional: "",
    });
    this.haveText = !this.haveText;
  }

  openAditionalModal() {
    this.sharedModalService.presentAditionalModal(
      this.form.get("adicional").value,
      this.url
    );
  }
}
