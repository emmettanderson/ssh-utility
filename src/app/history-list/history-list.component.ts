import { Component, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import { SimpleChange, OnChanges, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { HistoryListService } from '../api/history-list.service';
import { TargetListComponent } from '../target-list/target-list.component';
import { HistoryList} from '../models/history-list';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export interface HistoryListInt {
  RowId: string;
  LogDate: string;
  LogTime: string;
  Description: string;
  CommandStringList: any;
  SourceFileList: any;
  DestinationFileList: any;
  TargetGroup: string;
}

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css', '../app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HistoryListComponent implements OnInit, AfterViewInit, OnChanges {
  Title = 'History List';
  public actionUrl: string;
  public histories: Observable<HistoryList[]>;
  private selectedRowId: number;
  public targetlist: TargetListComponent;
  groupName: string;
  message: any = [];

  public displayedColumns: string[] = ['logDate', 'description', 'commandList', 'fileList', 'targetGroup', 'removeRecord'];
  dataSource: MatTableDataSource<HistoryList> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() sendDataToParent = new EventEmitter<HistoryList[]>();
  @Input() submitted: any;

  constructor(
    private _historyListService: HistoryListService
  ) {
    this._historyListService.getHistoryList('').subscribe((histories: HistoryList[]) => {
      this.dataSource = new MatTableDataSource(histories);
     });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('History List change log: ' + changes['submitted'].currentValue);
    if (typeof changes['submitted'].currentValue !== 'undefined') {
      if ( changes['submitted'].currentValue !== changes['submitted'].previousValue) {
        this._historyListService.getHistoryList('').subscribe((histories: HistoryList[]) => {
         this.dataSource = new MatTableDataSource(histories);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
        });
      }
    }
  }
  public ngOnInit() {
    // Get Hospital drop-down contents
    this._historyListService.getHistoryList('').subscribe((histories: HistoryList[]) => {
      this.dataSource = new MatTableDataSource(histories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    /*
    this.histories = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedRowId = +params.get('id');
        console.log('History list selected: ' + this.selectedRowId);
        return this._historyListService.getHistoryList(this.selectedRowId);
      })
    );
    */
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (data, header) => data[header];
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectRow(row) {
      if (row) {
        this.sendDataToParent.emit(row);
        console.log('History List selectRow: destFileList = ' + row.destFileList);
      }
  }
  removeRecord(event, RowId) {
    this._historyListService.getHistoryList(RowId).subscribe((histories: HistoryList[]) => {
      this.dataSource = new MatTableDataSource(histories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    event.stopPropagation();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    /*
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // const numRows = 10;
    return numSelected === numRows;
    */
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  /*
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  */
  /*
  public getHistoryList() {
    console.log('onClickGetHistoryList');
    this._historyListService.getHistoryList().subscribe((histories: HistoryList[]) => {
      this.dataSource = new MatTableDataSource(histories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('historylist: ' + this.dataSource);
    });
  }
  */
}
