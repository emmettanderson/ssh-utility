import { TargetGroupListInt, TargetListInt } from '../target-list/target-list.component';

export class TargetGroupList implements TargetGroupListInt {
  id: number;
  GroupName: string;
}
export class TargetList implements TargetListInt {
  id: number;
  HostName: string;
  HostUrl: string;
  AlternateHostUrl: string;
  DeployPath: string;
}
