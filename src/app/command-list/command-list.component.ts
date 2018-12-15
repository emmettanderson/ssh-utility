import { Component, ViewChild, ElementRef, OnInit, Input, EventEmitter, SimpleChange, OnChanges, Output } from '@angular/core';
import { CommandList } from '../models/command-list.model';
import { DataService } from '../api/data.service';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css', '../app.component.css']
})

export class CommandListComponent implements OnInit, OnChanges {
  Title = 'SSH Commands';
  message: string;
  newentry: CommandList;
  CommandAry: any = [];

  @Input() CommandList: string;
  @Output() sendDataToParent = new EventEmitter<any[]>();
  @ViewChild('newitem') input: ElementRef;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('change log CommandList start');
    if (typeof changes['CommandList'].currentValue !== 'undefined') {
      console.log('change log CommandList: ' + changes['CommandList'].currentValue);
      if (changes['CommandList'].currentValue !== changes['CommandList'].previousValue) {
        const cmd = changes['CommandList'].currentValue.split('\n');
        for (let i = 0; i < cmd.length; i++) {
          if (this.CommandAry && (!this.CommandAry.includes(cmd[i]))) {
            this.input.nativeElement.value = cmd[i];
            this.addItem(this.input.nativeElement, 1);
          }
        }
      }
    }
  }

  addItem(newitem, onchangeflag) {
    if (newitem && newitem.value !== '') {
      this.CommandAry.push(newitem.value);
      this.input.nativeElement.value = '';
      if (onchangeflag !== 1) {
        this.sendDataToParent.emit(this.CommandAry);
      }
    }
  }

  removeItem(index) {
    this.CommandAry.splice(index, 1);
    this.sendDataToParent.emit(this.CommandAry);
  }
  editItem(index, command) {
    this.input.nativeElement.value = command;
    console.log('commandAry edit: index: ' + index);
  }
  constructor(private data: DataService) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.message = message);
  }

}
