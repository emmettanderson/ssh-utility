import { HistoryListInt } from '../history-list/history-list.component';

export class HistoryList implements HistoryListInt {
  rowId: string;
  logDate: string;
  logTime: string;
  description: string;
  commandList: any;
  srcFileList: any;
  destFileList: any;
  targetGroup: string;
}
