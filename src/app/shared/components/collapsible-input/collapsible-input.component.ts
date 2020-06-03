import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "collapsible-input",
  templateUrl: "./collapsible-input.component.html",
  styleUrls: ["./collapsible-input.component.scss"],
})
export class CollapsibleInputComponent implements OnInit {
  private form: FormGroup;
  @Input() buttonName: string;
  @Input() fieldValue: string;
  @Output() aditionalValue = new EventEmitter();
  @ViewChild("collapsible", { static: true }) collapsible;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.fieldValue);
    this.form = this.formBuilder.group({
      aditional: [this.fieldValue],
    });
  }

  sendValue() {
    this.aditionalValue.emit(this.form.get("aditional").value);
  }

  show() {
    this.collapsible.nativeElement.classList.toggle("active");
    var content = this.collapsible.nativeElement.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
