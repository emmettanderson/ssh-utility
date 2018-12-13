import { HistoryListInt } from '../history-list/history-list.component';

export class HistoryList implements HistoryListInt {
  id: number;
  logDate: string;
  logTime: string;
  description: string;
  commandList: any;
  srcFileList: any;
  destFileList: any;
  targetGroup: string;
}
