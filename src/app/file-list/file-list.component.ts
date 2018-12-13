import { Component, ViewChild, ElementRef, OnInit, Input, EventEmitter, SimpleChange, OnChanges, Output } from '@angular/core';
import { FileList, FileArray } from '../models/file-list.model';
import { DataService } from '../api/data.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css', '../app.component.css']
})

export class FileListComponent implements OnInit, OnChanges {
  Title = 'Files to transfer';
  message: string;
  newentry: FileList;
  fileAryObj: FileArray;
  srcFileAry: any = [];
  destFileAry: any = [];
  SrcFileList: string;
  DestFileList: string;

  @Input() srcFileList: string;
  @Input() destFileList: string;
  @Output() sendDataToParent = new EventEmitter<any>();

  @ViewChild('newSrcItem') srcInput: ElementRef;
  @ViewChild('newDestItem') destInput: ElementRef;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('change log File List start');
    if (typeof changes['srcFileList'].currentValue !== 'undefined') {
      console.log('change log srcFileList: ' + changes['srcFileList'].currentValue);
      if ((changes['srcFileList'].currentValue !== changes['srcFileList'].previousValue)
        && (changes['destFileList'].currentValue !== changes['destFileList'].previousValue)) {
        const src = changes['srcFileList'].currentValue.split('\n');
        const dest = changes['destFileList'].currentValue.split('\n');
        for (let i = 0; i < src.length; i++) {
          if ((this.srcFileAry && (!this.srcFileAry.includes(src[i])))
            || (this.destFileAry && (!this.destFileAry.includes(dest[i])))) {
              this.addItem(src[i], dest[i], 1);
          }
        }
        this.updateFileAry(this);
      }
    }
  }

  addItem(newSrcItem, newDestItem, onchangeflag) {
    // alert('newSrcItem: ' + newSrcItem + '\nnewDestItem: ' + newDestItem);
    if (newSrcItem && newDestItem) {
      this.srcFileAry.push(newSrcItem);
      this.destFileAry.push(newDestItem);
      this.srcInput.nativeElement.value = '';
      this.destInput.nativeElement.value = '';
    }
    if (onchangeflag !== 1) {
      const fileAryObj = this.updateFileAry(this);
      this.sendDataToParent.emit(fileAryObj);
    }
  }

  removeItem(index) {
    this.srcFileAry.splice(index, 1);
    this.destFileAry.splice(index, 1);
    const fileAryObj = this.updateFileAry(this);
    this.sendDataToParent.emit(fileAryObj);
  }

  updateFileAry(fileAry) {
    this.fileAryObj = new FileArray;
    this.fileAryObj.srcFileAry = fileAry.srcFileAry;
    this.fileAryObj.destFileAry = fileAry.destFileAry;
    return this.fileAryObj;
  }
  editItem(index) {
    this.srcInput.nativeElement.value = this.srcFileAry[index];
    this.destInput.nativeElement.value = this.destFileAry[index];
  }
  constructor(private data: DataService) { }

  ngOnInit() {
    this.fileAryObj = new FileArray;
    this.fileAryObj.srcFileAry = this.srcFileAry;
    this.fileAryObj.destFileAry = this.destFileAry;
    // this.data.currentMessage.subscribe(message => this.message = message);
  }

}
