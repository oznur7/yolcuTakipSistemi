
import { Ucus } from 'src/app/models/Ucus';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Yolcu } from 'src/app/models/Yolcu';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Ucus',
  templateUrl: './Ucus.component.html',
  styleUrls: ['./Ucus.component.scss']
})
export class UcusComponent implements OnInit {
  yolcular: Yolcu[];
  ucId: number;
  ucu: Ucus;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      if (p.ucId) {
        this.ucId = p.ucId;
        this.UcusById();
        this.YolcuListeByUcusId();
      }

    });
  }
  UcusById() {
    this.apiServis.UcusById(this.ucId).subscribe((d: Ucus) => {
      this.ucu = d;
    });
  }
  YolcuListeByUcusId() {
    this.apiServis.YolcuListeByUcusId(this.ucId).subscribe((d: Yolcu[]) => {
      this.yolcular = d;

    });
  }
}
