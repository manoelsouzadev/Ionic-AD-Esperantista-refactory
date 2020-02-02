import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from "@ionic/angular";

@Component({
  selector: 'app-menu-dados',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  protected techs = [
    {
      'title': 'Cultos',
      'icon': 'contacts',
      'description': 'Cadastrar culto',
      'color': '#E63135',
      'route': 'cadastro/secao/cultos'
     },
    {
      'title': 'Campanhas',
      'icon': 'flame',
      'description': 'Cadastrar campanha',
      'color': '#0CA9EA',
      'route': 'cadastro/secao/campanhas'
    },
    {
      'title': 'Orações',
      'icon': 'time',
      'description': 'Cadastrar oração',
      'color': '#0CA9EA',
      'route': 'cadastro/secao/oracoes'
     }
    // {
    //   'title': 'JavaScript',
    //   'icon': 'javascript',
    //   'description': 'One of the most popular programming languages on the Web!',
    //   'color': '#FFD439'
    // },
    // {
    //   'title': 'Sass',
    //   'icon': 'sass',
    //   'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
    //   'color': '#CE6296'
    // },
    // {
    //   'title': 'NodeJS',
    //   'icon': 'nodejs',
    //   'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
    //   'color': '#78BD43'
    // },
    // {
    //   'title': 'Python',
    //   'icon': 'python',
    //   'description': 'A clear and powerful object-oriented programming language!',
    //   'color': '#3575AC'
    // },
    // {
    //   'title': 'Markdown',
    //   'icon': 'markdown',
    //   'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
    //   'color': '#412159'
    // },
    // {
    //   'title': 'Tux',
    //   'icon': 'tux',
    //   'description': 'The official mascot of the Linux kernel!',
    //   'color': '#000'
    // },
  ];
  constructor(private router: Router, private navController: NavController, private platform: Platform) {

  }

  ngOnInit() {
  }

  onConsole(route){
    this.router.navigate([ route ]);
  }

}
