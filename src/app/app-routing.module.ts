import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/module/home.module').then(m => m.HomeModule) },
  { path: 'product', loadChildren: () => import('./pages/products/module/product.module').then(m => m.ProductModule),data:{title:" كــاف / الصفحة الرئيسية"} },
  { path: 'about-kaf', loadChildren: () => import('./pages/about-us/module/about-kaf.module').then(m => m.AboutKAfModule) },
  { path: 'contact-us', loadChildren: () => import('./pages/contact-us/module/contact-us.module').then(m => m.ContactUSModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/module/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./pages/user_profile/module/user-kaf.module').then(m => m.UserKAfModule) },
  { path: 'gomla', loadChildren: () => import('./pages/gomla/module/gomla.module').then(m => m.GomlaModule) },
  { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/module/terms.module').then(m => m.TermsModule) },
  { path: 'help-center', loadChildren: () => import('./pages/help-center/module/help-center.module').then(m => m.HelpCenterModule) },



  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


