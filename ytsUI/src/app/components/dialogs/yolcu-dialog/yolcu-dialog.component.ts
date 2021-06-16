import { ApiService } from '../../../services/api.service';
import { Ucus } from '../../../models/Ucus';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Yolcu } from 'src/app/models/Yolcu';

@Component({
  selector: 'app-yolcu-dialog',
  templateUrl: './yolcu-dialog.component.html',
  styleUrls: ['./yolcu-dialog.component.css']
})
export class YolcuDialogComponent implements OnInit {
  dialogAdSoyad: string;
  yeniKayit: Yolcu;
  islem: string;
  frm: FormGroup;
  ucuslar: Ucus[];
  Jconfig = {};
  constructor(
    public dialogRef: MatDialogRef<YolcuDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogAdSoyad = "Yolcu Ekle";
      this.yeniKayit = new Yolcu();
    }
    if (this.islem == "duzenle") {
      this.dialogAdSoyad = "Yolcu Düzenle";
      this.yeniKayit = data.kayit;
    }
    if (this.islem == "detay") {
      this.dialogAdSoyad = "Yolcu Detay";
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.UcusListele();
  }
  FormOlustur() {
    return this.frmBuild.group({
      adSoyad: [this.yeniKayit.adSoyad],
      bilgi: [this.yeniKayit.bilgi],
      ucusId: [this.yeniKayit.ucusId]
    });
  }
  UcusListele() {
    this.apiServis.UcusListe().subscribe((d: Ucus[]) => {
      this.ucuslar = d;
    });
  }
}
