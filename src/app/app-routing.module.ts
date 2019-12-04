import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'menu-dados',
    loadChildren: () =>
      import('./pages/cadastro/menu-dados/menu-dados.module').then(
        m => m.MenuDadosPageModule
      )
  },
  {
    path: 'secao',
    loadChildren: () =>
      import('./pages/cadastro/secoes-cadastro/secoes-cadastro.module').then(
        m => m.SecoesCadastroModule
      )
  },
  // {
  //   path: 'list',
  //   loadChildren: () =>
  //     import('./pages/list/list.module').then(m => m.ListPageModule)
  // },
  // {
  //   path: 'cultos',
  //   loadChildren: () =>
  //     import('./pages/cultos/cultos.module').then(m => m.CultosModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./pages/login/login.module').then(m => m.LoginPageModule)
  // },
  // {
  //   path: 'menu-dados',
  //   loadChildren: () =>
  //     import('./pages/cadastro/menu-dados/menu-dados.module').then(
  //       m => m.MenuDadosPageModule
  //     )
  // },
  // {
  //   path: 'cadastro',
  //   loadChildren: () =>
  //     import('./pages/cadastro/cadastro-dados/cadastro-dados.module').then(
  //       m => m.CadastroDadosModule
  //     )
  // },
  // {
  //   path: 'secao',
  //   loadChildren: () =>
  //     import('./pages/cadastro/secoes-cadastro/secoes-cadastro.module').then(
  //       m => m.SecoesCadastroModule
  //     )
  // },
  { path: 'novo-culto', loadChildren: './pages/cadastro/novo-culto/novo-culto.module#NovoCultoPageModule' },
  { path: 'atualizar-culto', loadChildren: './pages/cadastro/atualizar-culto/atualizar-culto.module#AtualizarCultoPageModule' },
  { path: 'nova-campanha', loadChildren: './pages/cadastro/nova-campanha/nova-campanha.module#NovaCampanhaPageModule' },
  { path: 'atualizar-campanha', loadChildren: './pages/cadastro/atualizar-campanha/atualizar-campanha.module#AtualizarCampanhaPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
