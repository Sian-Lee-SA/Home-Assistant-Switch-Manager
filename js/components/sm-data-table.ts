import { customElement } from "lit/decorators";
import memoizeOne from "memoize-one";
import {
  HaDataTable,
  ClonedDataTableColumnData,
  DataTableRowData,
  SortableColumnContainer,
  SortingDirection,
} from "../../ha-frontend/components/data-table/ha-data-table";

const filterData = memoizeOne(
  (
    data: DataTableRowData[],
    columns: SortableColumnContainer,
    filter: string
  ): DataTableRowData[] => {
    filter = filter.toUpperCase();
    return data.filter((row) =>
      Object.entries(columns).some((columnEntry) => {
        const [key, column] = columnEntry;
        if (column.filterable) {
          if (
            String(
              column.filterKey
                ? row[column.valueColumn || key][column.filterKey]
                : row[column.valueColumn || key]
            )
              .toUpperCase()
              .includes(filter)
          ) {
            return true;
          }
        }
        return false;
      })
    );
  }
);

const sortData = memoizeOne(
  (
    data: DataTableRowData[],
    column: ClonedDataTableColumnData,
    direction: SortingDirection,
    sortColumn: string
  ) =>
    data.sort((a, b) => {
      let sort = 1;
      if (direction === "desc") {
        sort = -1;
      }

      let valA = column.filterKey
        ? a[column.valueColumn || sortColumn][column.filterKey]
        : a[column.valueColumn || sortColumn];

      let valB = column.filterKey
        ? b[column.valueColumn || sortColumn][column.filterKey]
        : b[column.valueColumn || sortColumn];

      if (typeof valA === "string") {
        valA = valA.toUpperCase();
      }
      if (typeof valB === "string") {
        valB = valB.toUpperCase();
      }

      // Ensure "undefined" is always sorted to the bottom
      if (valA === undefined && valB !== undefined) {
        return 1;
      }
      if (valB === undefined && valA !== undefined) {
        return -1;
      }

      if (valA < valB) {
        return sort * -1;
      }
      if (valA > valB) {
        return sort * 1;
      }
      return 0;
    })
);

@customElement("sm-data-table")
export class SmDataTable extends HaDataTable 
{
  private async _sortFilterData() {
    const startTime = new Date().getTime();
    this.curRequest++;
    const curRequest = this.curRequest;

    let filteredData = this.data;
    if (this._filter) {
      filteredData = await this._memFilterData(this.data, this._sortColumns, this._filter);
    }

    const data = this._sortColumn
      ? sortData(
          filteredData,
          this._sortColumns[this._sortColumn],
          this._sortDirection,
          this._sortColumn
        )
      : filteredData;

    const curTime = new Date().getTime();
    const elapsed = curTime - startTime;

    if (elapsed < 100) {
      await new Promise((resolve) => setTimeout(resolve, 100 - elapsed));
    }
    if (this.curRequest !== curRequest) {
      return;
    }

    if (this.appendRow || this.hasFab) {
      const items = [...data];

      if (this.appendRow) {
        items.push({ append: true, content: this.appendRow });
      }

      if (this.hasFab) {
        items.push({ empty: true });
      }
      this._items = items;
    } else {
      this._items = data;
    }
    this._filteredData = data;
  }

  private _memFilterData = memoizeOne(
    async (
      data: DataTableRowData[],
      columns: SortableColumnContainer,
      filter: string
    ): Promise<DataTableRowData[]> => filterData(data, columns, filter)
  );
}