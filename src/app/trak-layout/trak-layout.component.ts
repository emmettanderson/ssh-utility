import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { SimpleChange, OnChanges, Input, Output } from '@angular/core';
import { TrakLayoutService } from '../api/trak-layout.service';
import { CodeTable, SimpleRecord, ContextItem, ChartItem, LayoutItem, LayoutItemArray, TrakLayoutFile } from '../models/trak-layout';

@Component({
  selector: 'app-trak-layout',
  templateUrl: './trak-layout.component.html',
  styleUrls: ['./trak-layout.component.css']
})
export class TrakLayoutComponent implements OnInit {
  @Output() sendDataToParent = new EventEmitter<any[]>();

  ChangeType: CodeTable[];
  ChartBookItem: SimpleRecord[];
  ComponentItem: SimpleRecord[];
  ContextItem: ContextItem[];
  ChartItem: ChartItem[];
  LayoutItem: LayoutItem;
  LayoutItemArray: LayoutItemArray[];

  constructor(private _trakLayoutService: TrakLayoutService) { }

  ngOnInit() {
    console.log('getChangeTypeList');
    this._trakLayoutService.getChangeTypeList().subscribe(data => {
      this.ChangeType = data;
    });
  }

  onSelectChangeType(elem) {
    switch (elem.value) {
      case('Component'):
        this._trakLayoutService.getComponentList().subscribe(data => {
          this.ComponentItem = data;
        });
        break;
      case('Chart'):
        this._trakLayoutService.getChartBookList().subscribe(data => {
          this.ChartBookItem = data;
        });
        break;
      default:
        break;
    }
  }
  addPatchItem(elem, ChangeType) {
    // add LayoutItem to LayoutItemArray
  }

  onSelectComponentItem(elem) {
    this._trakLayoutService.getContextList(elem.value).subscribe(data => {
      this.ContextItem = data;
    });
  }
  onSelectContextItem(elem) {
    this.addPatchItem(elem, this.ChangeType);
  }
  onSelectChartBook(elem) {
    this._trakLayoutService.getChartList(elem.value).subscribe(data => {
      this.ChartItem = data;
    });
  }
}
