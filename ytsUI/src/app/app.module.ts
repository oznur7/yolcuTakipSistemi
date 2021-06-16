import { UyeyolcuComponent } from './components/uyeyolcu/uyeyolcu.component';
import { UcusComponent } from './components/Ucus/Ucus.component';
import { YolcuComponent } from './components/yolcu/yolcu.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { YolcuDialogComponent } from './components/dialogs/yolcu-dialog/yolcu-dialog.component';
import { UcusDialogComponent } from './components/dialogs/ucus-dialog/ucus-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminYolcuComponent } from './components/admin/admin-yolcu/admin-yolcu.component';
import { AdminUcusComponent } from './components/admin/admin-ucus/admin-ucus.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { JoditAngularModule } from 'jodit-angular';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    YolcuComponent,
    UcusComponent,
    UyeyolcuComponent,


    //Admin
    AdminComponent,
    AdminUcusComponent,
    AdminYolcuComponent,
    AdminUyeComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UcusDialogComponent,
    YolcuDialogComponent,
    UyeDialogComponent,

    SafeHTMLPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    JoditAngularModule,

  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UcusDialogComponent,
    YolcuDialogComponent,
    UyeDialogComponent

  ],
  providers: [MyAlertService, ApiService, SafeHTMLPipe, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
