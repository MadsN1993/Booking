import { Injectable } from '@angular/core';
import { Table } from '../table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tables : Table[] = [];

  addTable(table : Table){
    this.tables.push(table);
  }

  getTables(){
    return this.tables;
  }
  constructor() { }
}






