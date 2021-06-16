
import { YolcuDialogComponent } from '../../dialogs/yolcu-dialog/yolcu-dialog.component';
import { Yolcu } from '../../../models/Yolcu';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ucus } from 'src/app/models/Ucus';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UcusDialogComponent } from '../../dialogs/ucus-dialog/ucus-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-yolcu',
  templateUrl: './admin-yolcu.component.html',
  styleUrls: ['./admin-yolcu.component.css']
})
export class AdminYolcuComponent implements OnInit {
  yolcular: Yolcu[];
  ucuslar: Ucus[];
  secUc: Ucus;
  ucId: number;
  uyeId: number;
  dataSource: any;
  displayedColumns = ['adSoyad', 'tarih', 'uyeKadi', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<YolcuDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.UcusListele();
    this.uyeId = parseInt(localStorage.getItem("uyeId"));
    this.route.params.subscribe(p => {
      if (p.ucId) {
        this.ucId = p.ucId;
        this.UcusById();
      }

    });
  }

  UcusById() {
    this.apiServis.UcusById(this.ucId).subscribe((d: Ucus) => {
      this.secUc = d;
      this.YolcuListele();
    });
  }
  YolcuListele() {
    this.apiServis.YolcuListeByUcusId(this.ucId).subscribe((d: Yolcu[]) => {
      this.yolcular = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  UcusListele() {
    this.apiServis.UcusListe().subscribe((d: Ucus[]) => {
      this.ucuslar = d;
    });
  }
  UcusSec(uc: Ucus) {
    this.ucId = uc.ucusId;
    this.UcusListele();
  }
  Ekle() {
    var yeniKayit: Yolcu = new Yolcu();
    this.dialogRef = this.matDialog.open(YolcuDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniKayit = d;
        yeniKayit.foto = "foto.jpg";
        yeniKayit.tarih = new Date();
        yeniKayit.uyeId = this.uyeId;
        // console.log(yeniKayit);
        this.apiServis.YolcuEkle(yeniKayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YolcuListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Yolcu) {
    this.dialogRef = this.matDialog.open(YolcuDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        this.apiServis.YolcuDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YolcuListele();
          }
        });
      }
    });
  }
  Detay(kayit: Yolcu) {
    this.dialogRef = this.matDialog.open(YolcuDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'detay'
      }
    });
  }
  Sil(kayit: Yolcu) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.adSoyad + " adlı yolcu silinecektir, onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.YolcuSil(kayit.yolcuId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YolcuListele();
          }
        });
      }
    });
  }
}
