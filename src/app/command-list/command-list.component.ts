import { Component, ViewChild, ElementRef, OnInit, Input, EventEmitter, SimpleChange, OnChanges, Output } from '@angular/core';
import { CommandList, SyntaxCheck } from '../models/command-list.model';
import { CommandListService } from '../api/command-list.service';
import { SyncAsync } from '@angular/compiler/src/util';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css', '../app.component.css']
})

export class CommandListComponent implements OnInit, OnChanges {
  Title = 'SSH Commands';
  message: string;
  CommandAry: any = [];
  public errorMessage = '';

  @Input() CommandList: string;
  @Input() syntaxCheck: SyntaxCheck;
  @Output() sendDataToParent = new EventEmitter<any[]>();
  @ViewChild('newitem') input: ElementRef;
  @ViewChild('syntaxerror') syntaxerror: ElementRef;

  constructor(private _commandListService: CommandListService) { }

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

  public addItem(newitem, onchangeflag) {
    if (newitem && newitem.value !== '') {
      this.CommandAry.push(newitem.value);
      this.input.nativeElement.value = '';
      if (onchangeflag !== 1) {
        this.sendDataToParent.emit(this.CommandAry);
      }
    }
  }

  checkSyntax(newitem) {
    this.syntaxCheck = new SyntaxCheck;
    this._commandListService.checkCodeSyntax(newitem.value).subscribe(
      resp => {
        this.syntaxCheck = resp;
        if (typeof this.syntaxCheck.summary !== 'undefined') {
          if (this.syntaxCheck.summary === '1') {
            this.syntaxerror.nativeElement.style.display = 'none';
            this.syntaxerror.nativeElement.innerHTML = '';
            this.addItem(newitem, 0);
          } else {
            this.syntaxerror.nativeElement.innerHTML = this.syntaxCheck.summary;
            this.syntaxerror.nativeElement.style.display = '';
          }
        }
    });
  }
  removeItem(index) {
    this.CommandAry.splice(index, 1);
    this.sendDataToParent.emit(this.CommandAry);
  }
  editItem(index, command) {
    this.input.nativeElement.value = command;
    console.log('commandAry edit: index: ' + index);
  }


  ngOnInit() {
    this.syntaxCheck = {'summary': '1'};
    // this.data.currentMessage.subscribe(message => this.message = message);
  }

}
