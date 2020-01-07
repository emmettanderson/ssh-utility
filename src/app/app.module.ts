import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
         MatProgressSpinnerModule,
         MatButtonModule,
         MatMenuModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

// Api Service
import { ApiService, HttpErrorInterceptor } from './api/api.service';

// Page Components
import { AppComponent } from './app.component';
import { TargetListComponent } from './target-list/target-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { CommandListComponent } from './command-list/command-list.component';
import { FileListComponent } from './file-list/file-list.component';
import { OutputDisplayModalComponent, OutputDisplayComponent } from './output-display/output-display.component';
import { TrakLayoutComponent } from './trak-layout/trak-layout.component';
import { TerminalComponent } from './terminal/terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    TargetListComponent,
    HistoryListComponent,
    CommandListComponent,
    FileListComponent,
    OutputDisplayComponent,
    OutputDisplayModalComponent,
    TrakLayoutComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatMenuModule,
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
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    OutputDisplayModalComponent
  ],
  entryComponents: [OutputDisplayModalComponent],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
