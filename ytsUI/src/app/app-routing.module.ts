import { UyeyolcuComponent } from './components/uyeyolcu/uyeyolcu.component';
import { UcusComponent } from './components/Ucus/Ucus.component';
import { YolcuComponent } from './components/yolcu/yolcu.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminYolcuComponent } from './components/admin/admin-yolcu/admin-yolcu.component';
import { AdminUcusComponent } from './components/admin/admin-ucus/admin-ucus.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'yolcu/:yolcuId',
    component: YolcuComponent
  },
  {
    path: 'ucus/:ucId',
    component: UcusComponent
  },
  {
    path: 'uyeyolcu/:uyeId',
    component: UyeyolcuComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/ucus',
    component: AdminUcusComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/yolcu',
    component: AdminYolcuComponent
  },
  {
    path: 'admin/yolcu/:ucId',
    component: AdminYolcuComponent
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
