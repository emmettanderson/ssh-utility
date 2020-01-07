import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SimpleChange, OnChanges, Input, Output } from '@angular/core';
import { TrakLayoutService } from '../api/trak-layout.service';
import { SessionLog } from '../models/submit.model';
import { CodeTable, SimpleRecord, ContextItem, ChartItem, ApplyPatch } from '../models/trak-layout';
import { LayoutItem, LayoutItemArray, TrakLayoutFile, TrakLayoutConfig } from '../models/trak-layout';

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
  @Input() LogRowId: string;
  @Input() SessionLog: SessionLog;
  @Input() SessionLogText: string;
  @Input() ProcessComplete: any;
  @Input() Interval: any;
  @Output() sendDataToParent = new EventEmitter<any[]>();
  @Output() sendLogRowId = new EventEmitter<any>();
  @ViewChild('filename', {static: false}) filename: ElementRef;
  @ViewChild('changetypesel', {static: false}) changetypesel: ElementRef;
  @ViewChild('componentdiv', {static: false}) componentdiv: ElementRef;
  @ViewChild('component', {static: false}) component: ElementRef;
  @ViewChild('chartbookdiv', {static: false}) chartbookdiv: ElementRef;
  @ViewChild('chartbook', {static: false}) chartbook: ElementRef;
  @ViewChild('context', {static: false}) context: ElementRef;
  @ViewChild('chart', {static: false}) chart: ElementRef;
  @ViewChild('applybutton', {static: false}) applybutton: any;
  @ViewChild('savepatch', {static: false}) savepatch: any;

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
  LayoutConfig: TrakLayoutConfig[];
  response: any;

  constructor(private _trakLayoutService: TrakLayoutService) { }

  ngOnInit() {
    console.log('getLayoutConfig');
    this._trakLayoutService.getLayoutConfig().subscribe(data => {
      this.LayoutConfig = data;
    });
    console.log('getChangeTypeList');
    this._trakLayoutService.getChangeTypeList().subscribe(data => {
      this.ChangeType = data;
    });
    this.selectedChangeType = '';
    this.selectedChartBook = '';
    this.selectedComponent = '';
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    /*
    if (typeof changes['LogRowId'] !== 'undefined'
      && typeof changes['LogRowId'].currentValue !== 'undefined') {
        if (changes['LogRowId'].currentValue !== '') {
          this.sendLogRowId.emit(changes['LogRowId'].currentValue);
        }
    }
    console.log('change log chartbookitems: ' + changes['ChartBookItems'].currentValue);
    if (typeof changes['ChartBookItems'].currentValue !== 'undefined') {
      this.onSelectChartBook(changes['ChartBookItems'].currentValue);
    }
    console.log('change log chartitems: ' + changes['ChartItems'].currentValue);
    if (typeof changes['ChartItems'].currentValue !== 'undefined') {
      this.onSelectChartItem(changes['ChartItems'].currentValue);
    }
    */
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
        description = this.selectedComponent.source.selected._element.nativeElement.innerText;
        description += ' - ' + item.source.selected._element.nativeElement.innerText;
        break;
      case ('Charts'):
        this.LayoutItem.LayoutItemType = new ChartItem;
        this.LayoutItem.LayoutItemType.ChartBookId = this.selectedChartBook.value;
        this.LayoutItem.LayoutItemType.ChartId = item.value;
        description = this.selectedChartBook.source.selected._element.nativeElement.innerText;
        description += ' - ' + item.source.selected._element.nativeElement.innerText;
        break;
      default:
        break;
    }

    this.LayoutItem.ChangeType = this.selectedChangeType.value;
    this.LayoutItem.Description = description;
    this.LayoutItemArray.push(this.LayoutItem);

    this.savepatch.disabled = 'false';
  }

  onClickSaveLayoutFile(event) {
    // Call rest service to save patch file from posted LayoutItemArray

    if (this.LayoutItemArray.length < 1) {
      alert('No layout items have been added to patch file');
      return;
    }
    if (this.filename.nativeElement.value === '') {
      alert('Patch File Name Required');
      this.filename.nativeElement.focus();
      return;
    }

    const trakLayoutFile = new TrakLayoutFile;
    trakLayoutFile.FileName = this.filename.nativeElement.value;
    trakLayoutFile.LayoutItemList = this.LayoutItemArray;

    this._trakLayoutService.saveLayoutFile(trakLayoutFile).subscribe(data => { this.response = data; });
    // Show/or activate button for Apply
    this.applybutton.disabled = 'false';
  }
  onClickSyncLocalLayout() {
    if (!confirm('This will update your local layout. Proceed?')) {
      return false;
    }
    this.ProcessComplete = '0';
    this.SessionLog = new SessionLog;
    this.SessionLog.ProcessComplete = '0';
    this.SessionLog.SessionLog = '';
    this.Interval = '';
    this.LogRowId = '';
    this._trakLayoutService.syncLocalLayout().subscribe(data => {
        this.LogRowId = data.LogRowId;
        this.sendLogRowId.emit(this.LogRowId);
     });
  }
  onClickApplyPatchFile() {
    // call rest service:
    //    Add file-list item with patch file
    //    Add command-list item that calls COS class method to load patch file
    // LayoutFile only applied if the file/command is submitted
    const applyitem: any = [];
    applyitem.srcFile = this.LayoutConfig['LocalLayoutDirectory'] + this.filename.nativeElement.value;
    applyitem.destFile = '/tmp/' + this.filename.nativeElement.value;
    applyitem.command = 'Do ##Class(' + this.LayoutConfig['LoadLayoutClassMethod'].split('|')[0];
    applyitem.command +=  ').' + this.LayoutConfig['LoadLayoutClassMethod'].split('|')[1];
    applyitem.command += '("' + applyitem.destFile + '",1,0,1)';

    console.log('onClickApplyPatchFile: ' + applyitem);
    this.sendDataToParent.emit(applyitem);
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
    if (elem.value === 'NOCONTEXT') {
      alert('Component must have context defined in Trak component preferences.');
      return;
    }
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
  }
}
