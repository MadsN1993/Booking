import { Injectable } from '@angular/core';
import { Table } from '../table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tables : Table[] = [];

  constructor() { }

  addTable(table : Table){
    this.tables.push(table);
  }

  getTables(){
    return this.tables;
  }

  editTable(table : Table){
    const index = this.tables.findIndex(t => t.idHtml == table.idHtml);
    this.tables[index] = table;
  }

  deleteTable(id: string){
    const index = this.tables.findIndex(t => t.idHtml === id);
    this.tables.splice(index,1);
  }


}






