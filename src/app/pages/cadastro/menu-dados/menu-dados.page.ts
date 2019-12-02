import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-dados',
  templateUrl: './menu-dados.page.html',
  styleUrls: ['./menu-dados.page.scss'],
})
export class MenuDadosPage implements OnInit {
  protected techs = [
    {
      'title': 'Cultos',
      'icon': 'more',
      'description': 'Cadastrar culto',
      'color': '#E63135',
      'route': '/secao/cultos'
     },
    {
      'title': 'Campanhas',
      'icon': 'more',
      'description': 'Cadastrar campanha',
      'color': '#0CA9EA',
      'route': '/secao/campanhas'
    },
    {
      'title': 'HTML5',
      'icon': 'html5',
      'description': 'The latest version of the web\'s markup language.',
      'color': '#F46529'
    },
    {
      'title': 'JavaScript',
      'icon': 'javascript',
      'description': 'One of the most popular programming languages on the Web!',
      'color': '#FFD439'
    },
    {
      'title': 'Sass',
      'icon': 'sass',
      'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
      'color': '#CE6296'
    },
    {
      'title': 'NodeJS',
      'icon': 'nodejs',
      'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
      'color': '#78BD43'
    },
    {
      'title': 'Python',
      'icon': 'python',
      'description': 'A clear and powerful object-oriented programming language!',
      'color': '#3575AC'
    },
    {
      'title': 'Markdown',
      'icon': 'markdown',
      'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
      'color': '#412159'
    },
    {
      'title': 'Tux',
      'icon': 'tux',
      'description': 'The official mascot of the Linux kernel!',
      'color': '#000'
    },
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onConsole(route){
    this.router.navigate([ route ]);
  }

}
