import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule,
         MatCheckboxModule,
         MatPaginatorModule,
         MatSortModule,
         MatFormFieldModule,
         MatInputModule,
         MatListModule,
         MatIconModule,
         MatSelectModule,
         MatDialogModule,
         MatAutocompleteModule,
         MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

// Api Service
import { ApiService } from './api/api.service';

// Page Components
import { AppComponent } from './app.component';
import { TargetListComponent } from './target-list/target-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { CommandListComponent } from './command-list/command-list.component';
import { FileListComponent } from './file-list/file-list.component';
// import { OutputDisplayComponent } from './output-display/output-display.component';
import { OutputDisplayModalComponent, OutputDisplayComponent } from './output-display/output-display.component';
import { DataService } from './api/data.service';
import { TrakLayoutComponent } from './trak-layout/trak-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    TargetListComponent,
    HistoryListComponent,
    CommandListComponent,
    FileListComponent,
    OutputDisplayComponent,
    OutputDisplayModalComponent,
    TrakLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    OutputDisplayModalComponent
  ],
  entryComponents: [OutputDisplayModalComponent],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
