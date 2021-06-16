import { Ucus } from '../../../models/Ucus';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ucus-dialog',
  templateUrl: './ucus-dialog.component.html',
  styleUrls: ['./ucus-dialog.component.css']
})
export class UcusDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Ucus;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UcusDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Ucus Ekle";
      this.yeniKayit = new Ucus();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Ucus Düzenle";
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuild.group({
      ucusAdi: [this.yeniKayit.ucusAdi]

    });
  }
}
