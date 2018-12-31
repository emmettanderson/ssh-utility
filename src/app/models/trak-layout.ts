import { LayoutItemInt, LayoutItemArrayInt } from '../trak-layout/trak-layout.component';

export class TrakLayoutFile {
  Id: number;
  FileName: string;
  UserName: string;
  LayoutItemList: LayoutItemArray;
}

export class LayoutItemArray implements LayoutItemArrayInt {
  LayoutItem: LayoutItem;
}

export class LayoutItem implements LayoutItemInt {
  ChangeType: string;
  Description: string;
  LayoutItemType: CodeTable | ChartItem | ContextItem;
}

export class ChartItem {
  ChartBookId: string;
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
  ComponentId: string;
}

export class CodeTable {
  Code: string;
  Description: string;
}

export class SimpleRecord {
  RowId: string | number;
  Name: string;
}
