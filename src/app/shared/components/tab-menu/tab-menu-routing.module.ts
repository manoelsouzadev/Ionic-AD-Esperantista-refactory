import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabMenuComponent } from './tab-menu.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabMenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../../../pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'cultos',
        children: [
          {
            path: '',
            loadChildren: '../../../pages/cultos/cultos.module#CultosModule'
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../../../pages/login/login.module#LoginPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })
  export class TabMenuRoutingModule {}
  