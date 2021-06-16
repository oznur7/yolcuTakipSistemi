import { Sonuc } from '../../models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Yolcu } from 'src/app/models/Yolcu';

@Component({
  selector: 'app-yolcu',
  templateUrl: './yolcu.component.html',
  styleUrls: ['./yolcu.component.scss']
})
export class YolcuComponent implements OnInit {
  yolcuId: number;
  yolcu: Yolcu;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.yolcuId) {
        this.yolcuId = p.yolcuId;
        this.YolcuById();
      }

    });
  }

  YolcuById() {
    this.apiServis.YolcuById(this.yolcuId).subscribe((d: Yolcu) => {
      this.yolcu = d;
      
    });
  }
}
  
