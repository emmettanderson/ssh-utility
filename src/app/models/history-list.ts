import { HistoryListInt } from '../history-list/history-list.component';

export class HistoryList implements HistoryListInt {
  RowId: string;
  LogDate: string;
  LogTime: string;
  Description: string;
  CommandStringList: any;
  SourceFileList: any;
  DestinationFileList: any;
  TargetGroup: string;
}
