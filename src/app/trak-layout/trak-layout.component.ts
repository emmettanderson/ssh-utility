import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SimpleChange, OnChanges, Input, Output } from '@angular/core';
import { TrakLayoutService } from '../api/trak-layout.service';
import { CodeTable, SimpleRecord, ContextItem, ChartItem } from '../models/trak-layout';
import { LayoutItem, LayoutItemArray, TrakLayoutFile } from '../models/trak-layout';

export class LayoutItemArrayInt {
  LayoutItem: LayoutItemInt;
}

export class LayoutItemInt {
  ChangeType: string;
  Description: string;
  LayoutItemType: CodeTable | ChartItem | ContextItem;
}

@Component({
  selector: 'app-trak-layout',
  templateUrl: './trak-layout.component.html',
  styleUrls: ['./trak-layout.component.css']
})
export class TrakLayoutComponent implements OnInit, OnChanges {
  @Input() ChartBookItems: any = [];
  @Output() sendDataToParent = new EventEmitter<any[]>();
  @ViewChild('changetypesel') changetypesel: ElementRef;
  @ViewChild('componentdiv') componentdiv: ElementRef;
  @ViewChild('component') component: ElementRef;
  @ViewChild('chartbookdiv') chartbookdiv: ElementRef;
  @ViewChild('chartbook') chartbook: ElementRef;
  @ViewChild('context') context: ElementRef;
  @ViewChild('chart') chart: ElementRef;
  @ViewChild('applybutton') applybutton: ElementRef;

  FileName: string;
  selectedChangeType: any;
  selectedComponent: any;
  selectedChartBook: any;
  ChangeType: any = [];
  ComponentItems: SimpleRecord[];
  ContextItems: ContextItem[];
  ChartItems: ChartItem[];
  LayoutItem: LayoutItemInt;
  LayoutItemArray: any = [];

  constructor(private _trakLayoutService: TrakLayoutService) { }

  ngOnInit() {
    console.log('getChangeTypeList');
    this._trakLayoutService.getChangeTypeList().subscribe(data => {
      this.ChangeType = data;
    });
    this.selectedChangeType = '';
    this.selectedChartBook = '';
    this.selectedComponent = '';
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('change log chartbookitems: ' + changes['ChartBookItems'].currentValue);
    if (typeof changes['ChartBookItems'].currentValue !== 'undefined') {
      this.onSelectChartBook(changes['ChartBookItems'].currentValue);
    }
    console.log('change log chartitems: ' + changes['ChartItems'].currentValue);
    if (typeof changes['ChartItems'].currentValue !== 'undefined') {
      this.onSelectChartItem(changes['ChartItems'].currentValue);
    }
  }
  onSelectChangeType(changetype) {
    console.log('onSelectChangeType: ' + changetype.value);
    this.selectedChangeType = changetype;
    this.selectedComponent = '';
    this.selectedChartBook = '';

    switch (changetype.value) {
      case('Components'):
        this._trakLayoutService.getComponentList().subscribe(data => {
          this.ComponentItems = data;
        });
        this.componentdiv.nativeElement.style.display = '';
        this.chartbookdiv.nativeElement.style.display = 'none';
        break;
      case('Charts'):
        this.getChartBookList();
        this.componentdiv.nativeElement.style.display = 'none';
        this.chartbookdiv.nativeElement.style.display = '';
        break;
      default:
        this.addPatchItem(changetype);
        this.componentdiv.nativeElement.style.display = 'none';
        this.chartbookdiv.nativeElement.style.display = 'none';
        break;
    }
  }

  getChartBookList() {
    this._trakLayoutService.getChartBookList().subscribe(data => {
      this.ChartBookItems = data;
    });
  }

  addPatchItem(item) {
    let description = '';
    this.LayoutItem = new LayoutItemInt;
    switch (this.selectedChangeType.value) {
      case ('Components'):
        this.LayoutItem.LayoutItemType = new ContextItem;
        this.LayoutItem.LayoutItemType.ComponentId = this.selectedComponent.value;
        this.LayoutItem.LayoutItemType.Context = item.value;
        description = this.selectedComponent.value + ' - ' + item.value;
        break;
      case ('Charts'):
        this.LayoutItem.LayoutItemType = new ChartItem;
        this.LayoutItem.LayoutItemType.ChartBookId = this.selectedChartBook.value;
        this.LayoutItem.LayoutItemType.ChartId = item.value;
        description = this.selectedChartBook.value + ' - ' + item.name;
        break;
      default:
        break;
    }

    this.LayoutItem.ChangeType = this.selectedChangeType.value;
    this.LayoutItem.Description = description;
    this.LayoutItemArray.push(this.LayoutItem);
  }

  onClickSaveLayoutFile(event) {
    // Call rest service to save patch file from posted LayoutItemArray
    // Show/or activate button for Apply
    if (this.LayoutItemArray.length < 1) {
      alert('No layout items have been added to patch file');
    }
  }

  onClickApplyPatchFile(event) {
    // call rest service:
    //    Add file-list item with patch file
    //    Add command-list item that calls COS class method to load patch file
    // LayoutFile only applied if the file/command is submitted
  }
  onSelectComponentItem(componentid) {
    this.selectedComponent = componentid;
    this._trakLayoutService
      .getContextList(componentid.value)
      .subscribe(data => {
        this.ContextItems = data;
    });
  }

  onSelectContextItem(elem) {
    this.addPatchItem(elem);
  }

  onSelectChartBook(chartbookid) {
    this.selectedChartBook = chartbookid;
    this._trakLayoutService
      .getChartList(chartbookid.value)
      .subscribe(data => {
        this.ChartItems = data;
    });
  }

  onSelectChartItem(elem) {
    this.addPatchItem(elem);
  }

  removeItem(index) {
    this.LayoutItemArray.splice(index, 1);
    this.sendDataToParent.emit(this.LayoutItemArray);
  }
}
