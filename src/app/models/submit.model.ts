import { SessionLogInt } from '../output-display/output-display.component';

export class SubmitList {
  RowId: string;
  LogDate: string;
  LogTime: string;
  Description: string;
  CommandStringList: string;
  SourceFileList: string;
  DestinationFileList: string;
  TargetGroup: string;
}

export class SessionLog implements SessionLogInt {
  ProcessComplete: number | string;
  SessionLog: string;
}
