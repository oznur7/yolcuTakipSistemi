import { Uye } from './../models/Uye';
import { Yolcu } from '../models/Yolcu';
import { Ucus } from '../models/Ucus';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:49964/api/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  UcusListe() {
    return this.http.get(this.apiUrl + "/ucusliste");
  }
  UcusById(ucId: number) {
    return this.http.get(this.apiUrl + "/ucusbyid/" + ucId);
  }
  UcusEkle(uc: Ucus) {
    return this.http.post(this.apiUrl + "/ucusekle", uc);
  }
  UcusDuzenle(uc: Ucus) {
    return this.http.put(this.apiUrl + "/ucusduzenle", uc);
  }
  UcusSil(ucId: number) {
    return this.http.delete(this.apiUrl + "/ucussil/" + ucId);
  }

  YolcuListe() {
    return this.http.get(this.apiUrl + "/yolculiste");
  }
  YolcuListeByUcusId(ucId: number) {
    return this.http.get(this.apiUrl + "/yolculistebyucusid/" + ucId);
  }
  YolcuListeByUyeId(uyeId: number) {
    return this.http.get(this.apiUrl + "/yolculistebyuyeid/" + uyeId);
  }
  YolcuById(yolcuId: number) {
    return this.http.get(this.apiUrl + "/yolcubyid/" + yolcuId);
  }
  YolcuEkle(yolcu: Yolcu) {
    return this.http.post(this.apiUrl + "/yolcuekle", yolcu);
  }
  YolcuDuzenle(yolcu: Yolcu) {
    return this.http.put(this.apiUrl + "/yolcuduzenle", yolcu);
  }
  YolcuSil(yolcuId: number) {
    return this.http.delete(this.apiUrl + "/yolcusil/" + yolcuId);
  }

  UyeListe() {
    return this.http.get(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "/uyesil/" + uyeId);
  }
}
