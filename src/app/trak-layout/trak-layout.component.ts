import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { SimpleChange, OnChanges, Input, Output } from '@angular/core';
import { TrakLayoutService } from '../api/trak-layout.service';

@Component({
  selector: 'app-trak-layout',
  templateUrl: './trak-layout.component.html',
  styleUrls: ['./trak-layout.component.css']
})
export class TrakLayoutComponent implements OnInit {

  constructor(private _trakLayoutService: TrakLayoutService) { }

  ngOnInit() {
  }

}
