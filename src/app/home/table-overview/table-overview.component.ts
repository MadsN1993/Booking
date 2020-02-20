import { Component, OnInit } from '@angular/core';
import { Table } from '../../table'
import { TableService } from '../../setup/table.service'

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.css']
})
export class TableOverviewComponent implements OnInit {

  tables: Table[];

  containerTop: number;
  containerLeft: number;
  containerWidth: number;
  containerHeight: number;

  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {

    if (this.tableService.getTables().length > 0) {
      this.tables = this.tableService.getTables();
      console.log("tableService length: " + this.tableService.getTables().length);
      this.containerTop = document.getElementById("container").getBoundingClientRect().top;
      this.containerLeft = document.getElementById("container").getBoundingClientRect().left;
      this.containerWidth = document.getElementById("container").getBoundingClientRect().width;
      this.containerHeight = document.getElementById("container").getBoundingClientRect().height;

      this.tables.forEach((table) => {

        this.createTableElement(table);

      });

    }
  }

  createTableElement(table : Table) {
    console.log("createTableElement called");
    let yRel = table.yRel;
    let xRel = table.xRel;
    let div = document.createElement("div");
    let tableWidth = this.containerWidth * 0.045; // Andet forhold end drag/drop component, pga æstetik til demonstration

    div.style.width = tableWidth + "px";
    div.style.height = tableWidth + "px";
    div.style.left = (xRel * this.containerWidth) + "px";
    div.style.top = (yRel * this.containerHeight) + "px";
    div.style.backgroundColor = "#BA8B67";
    div.style.position = "absolute";
    div.style.borderStyle = "solid";
    div.style.borderColor = "black";
    div.style.boxSizing = "border-box"
    div.style.textAlign = "center";
    div.style.verticalAlign = "middle";
    div.style.lineHeight = (tableWidth-2) + "px"; // 2 er border-width
    div.style.fontSize = (tableWidth/2) + "px"; // 1.3 er en delvist random variable
    div.className = "tablee";

    div.innerText = table.tableNumber.toString();
    let container = document.getElementById("container");

    container.appendChild(div);
  }


}