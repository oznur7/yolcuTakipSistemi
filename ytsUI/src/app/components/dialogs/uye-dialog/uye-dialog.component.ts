import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ucus } from 'src/app/models/Ucus';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Uye Ekle";
      this.yeniKayit = new Uye();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Uye Düzenle";
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuild.group({
      kullaniciAdi: [this.yeniKayit.kullaniciAdi]

    });
  }
}

