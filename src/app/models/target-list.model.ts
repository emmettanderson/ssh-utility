import { TargetGroupListInt, TargetListInt } from '../target-list/target-list.component';

export class TargetGroupList implements TargetGroupListInt {
  id: number;
  GroupName: string;
}
export class TargetList implements TargetListInt {
  id: number;
  HostName: string;
  HostUrl: string;
}

/*
import { PatientListInt } from '../patient-list/patient-list.component';

export class Hospital {
  HospitalCode: string | number;
  HospitalDescription: string;
}

export class Location {
  Location: string | number;
  HospitalCode: string | number;
}

export class ZZZPatientList {
  id: string | number;
  private _hospital: any;     // Hospital;
  private _location: any;     // Location;
  private _assignedRoom: any;
  private _assignedBed: any;
  private _MPIID: any;
  private _RowId: string | number;

  constructor(PatientListObj) {
    this._hospital = PatientListObj.Hospital;
    this._location = PatientListObj.Location;
    this._assignedRoom = PatientListObj.AssignedRoom;
    this._assignedBed = PatientListObj.AssignedBed;
    this._MPIID = PatientListObj.MPIID;
    this._RowId = PatientListObj.RowId;
  }
}
export class PatientList implements PatientListInt {
  id: number;
  Hospital: string;     // Hospital;
  Location: string;     // Location;
  AssignedRoom: string;
  AssignedBed: string;
  MPIID: number;
  RowId: number;
}
*/
