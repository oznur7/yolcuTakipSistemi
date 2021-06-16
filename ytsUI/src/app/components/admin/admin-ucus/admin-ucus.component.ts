import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from '../../../services/myAlert.service';
import { Sonuc } from '../../../models/Sonuc';
import { UcusDialogComponent } from '../../dialogs/ucus-dialog/ucus-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ucus } from '../../../models/Ucus';
import { ApiService } from '../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-ucus',
  templateUrl: './admin-ucus.component.html',
  styleUrls: ['./admin-ucus.component.css']
})
export class AdminUcusComponent implements OnInit {
  ucuslar: Ucus[];
  dataSource: any;
  displayedColumns = ['ucusAdi', 'ucYolcuSay', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<UcusDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UcusListele();
  }

  UcusListele() {
    this.apiServis.UcusListe().subscribe((d: Ucus[]) => {
      this.ucuslar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yeniKayit: Ucus = new Ucus();
    this.dialogRef = this.matDialog.open(UcusDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UcusEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UcusListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Ucus) {
    this.dialogRef = this.matDialog.open(UcusDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.ucusAdi = d.ucusAdi;
        this.apiServis.UcusDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UcusListele();
          }
        });
      }
    });
  }

  Sil(kayit: Ucus) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.ucusAdi + " uçuşu silinecektir onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UcusSil(kayit.ucusId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UcusListele();
          }
        });
      }
    });
  }
}
