import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Uye } from '../../models/Uye';
import { Yolcu } from '../../models/Yolcu';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uyeyolcu',
  templateUrl: './uyeyolcu.component.html',
  styleUrls: ['./uyeyolcu.component.scss']
})
export class UyeyolcuComponent implements OnInit {
  yolcular: Yolcu[];
  uyeId: number;
  uye: Uye;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      if (p.uyeId) {
        this.uyeId = p.uyeId;
        this.UyeById();
        this.YolcuListeByUyeId();
      }

    });
  }
  UyeById() {
    this.apiServis.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.uye = d;
    });
  }
  YolcuListeByUyeId() {
    this.apiServis.YolcuListeByUyeId(this.uyeId).subscribe((d: Yolcu[]) => {
      this.yolcular = d;

    });
  }
}
