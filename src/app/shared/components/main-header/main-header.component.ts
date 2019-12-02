import { OnInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() title: string;

  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  redirecionarHome(){
    this.router.navigate(['/home']);
  }

  redirecionarLogin(){
    this.router.navigate(['/login']);
  }
}
