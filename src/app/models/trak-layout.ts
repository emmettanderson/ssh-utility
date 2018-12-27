
export class TrakLayoutFile {
  Id: number;
  FileName: string;
  UserName: string;
  LayoutItemList: LayoutItemArray;
}

export class LayoutItemArray {
  LayoutItem: LayoutItem;
}

export class LayoutItem {
  ChangeType: CodeTable;
  Description: string;
  LayoutItemType: CodeTable | ChartItem | ContextItem;
}

export class ChartItem {
  ChartBook: SimpleRecord;
  ChartId: string;
  ChartName: string;
  ChartType: string | number;
}

export class ComponentItem {
  RowId: string | number;
  Name: string;
}

export class ContextItem {
  Context: string;
  Component: SimpleRecord;
  SiteCode: string | number;
}

export class CodeTable {
  Code: string;
  Description: string;
}

export class SimpleRecord {
  RowId: string | number;
  Name: string;
}
