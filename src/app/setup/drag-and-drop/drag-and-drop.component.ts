import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from '../../table'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '../table.service'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { style } from '@angular/animations';
import { GuardsCheckEnd } from '@angular/router';


@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  currentTable: Table;
  copyCurrentTable: Table;
  currentTableNumber: number;
  tables: Table[] = [];

  containerWidth: number;
  containerHeight: number;
  tableWidth: number;


  @ViewChild('modalView', { static: false }) modalView: ElementRef<HTMLElement>;

  constructor(
    private modalService: NgbModal,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.setTableSize();
    this.setVerticalLineSize();

    this.tables = this.tableService.getTables();
    if (this.tables.length > 0) {
      this.showTables();
    }
  }


  showTables() {

    this.containerHeight = document.getElementById("containerId").getBoundingClientRect().height;
    let container = document.getElementById("containerId");

    this.tables.forEach(table => {

      let div = document.createElement("div");

      div.style.width = this.tableWidth + "px";
      div.style.height = this.tableWidth + "px";
      div.style.left = (table.xRel * this.containerWidth) + "px";
      div.style.top = (table.yRel * this.containerHeight) + "px";
      div.style.lineHeight = (this.tableWidth - 2) + "px"; // 2 er border-width
      div.style.fontSize = (this.tableWidth / 2) + "px";

      // *** burde være nok at tilføje en klasse med disse værdier, men kunne ikke få det til at virker ***
      div.style.backgroundColor = "#BA8B67";
      div.style.position = "absolute";
      div.style.borderStyle = "solid";
      div.style.borderColor = "black";
      div.style.boxSizing = "border-box"
      div.style.textAlign = "center";
      div.style.verticalAlign = "middle";
      div.style.userSelect = "none";
      // **************************************************************************************************                 

      div.setAttribute("draggable", "true");
      div.setAttribute("id", table.idHtml);
      div.innerText = table.tableNumber.toString();

      container.appendChild(div);

      this.addEventListeners(table.idHtml);
    });

  }

  setTableSize() {

    this.containerWidth = document.getElementById("containerId").getBoundingClientRect().width;
    this.tableWidth = this.containerWidth * 0.037; // 0.037 er en delvist random variable
    let tableTop = this.tableWidth / 2;
    let tableLeft = ((this.containerWidth * 0.10) - this.tableWidth) / 2 // Finder plads til overs i spalten, når table fratrækkes, og deler med 2 => x

    let div = document.getElementById("divTable");
    div.style.width = this.tableWidth + "px";
    div.style.height = this.tableWidth + "px";
    div.style.top = tableTop + "px";
    div.style.left = tableLeft + "px";
    div.style.lineHeight = (this.tableWidth - 2) + "px"; // 2 er border-width
    div.style.fontSize = (this.tableWidth / 2) + "px"; 

    this.addEventListeners("divTable");
  }

  setVerticalLineSize() {

    let verticalDiv = document.getElementById("verticalLine");
    let containerWidth = document.getElementById("containerId").getBoundingClientRect().width;

    verticalDiv.style.borderLeft = (0.10 * containerWidth) + "px " + "solid " + "";
    verticalDiv.style.borderLeftColor = "Gray"
  }

  openModal(modalView, ev = undefined) {
    this.modalService.open(modalView, { ariaLabelledBy: 'modal-basic-title', size: "sm" }).result.then((result) => {

      let tableCopy: Table;

      if (this.newTableCreation) {

        this.moveTable(ev);
        this.calculateRelCoordinates();
        tableCopy = new Table("temp"); // bruger en kopi for at sikre mod gamle referencer
        Object.assign(tableCopy, this.currentTable); // Object.assign(target, source) -> laver en kopi af objekt med anden reference
        this.tableService.addTable(tableCopy);

        setTimeout(() => this.getTables(), 1000); // 1000ms for at sikre at det pågældende table er blevet gemt i DB
        
        document.getElementById(tableCopy.idHtml).insertAdjacentHTML('afterbegin', tableCopy.tableNumber.toString());
        this.newTableCreation = false;

      }
      else {
        tableCopy = new Table("temp"); // bruger en kopi for at sikre mod gamle referencer
        Object.assign(tableCopy, this.currentTable); // Object.assign(target, source) -> laver en kopi af objekt med anden reference
        this.tableService.editTable(tableCopy);

        setTimeout(() => this.getTables(), 1000);
        document.getElementById(tableCopy.idHtml).innerText = tableCopy.tableNumber.toString();
      }

    }, (reason) => {

      if (this.newTableCreation) {
        this.deleteTable(this.currentTable.idHtml);
        this.newTableCreation = false;
        setTimeout(() => this.getTables(), 1000);
      }

      // kaldes ved klik udenfor modal eller ved klik på krydset

      // nulstiller modal vindue med alerts
      this.hideMessageEmpty = true;
      this.hideMessageDuplicate = true;

    });
  }

  getTables() {
    this.tables = this.tableService.getTables();
  }

  hideMessageEmpty: boolean = true;
  hideMessageDuplicate: boolean = true;

  onSubmit(form, modal) {

    let validTableNumber = true;
    // tjekker om et bord har samme tableNumber
    this.tables.forEach(table => {

      if (table.tableNumber === Number(form.value.tableNumber)) {
        validTableNumber = false;
        if (!this.newTableCreation && this.currentTableNumber === Number(form.value.tableNumber)) {
          validTableNumber = true;
        }
      }
    });

    if (form.value.tableNumber === undefined || form.value.tableNumber === null) {
      this.hideMessageEmpty = false;
    }
    else if (!validTableNumber) {
      this.hideMessageDuplicate = false;
    }
    else {
      this.currentTable.size = Number(form.value.size);
      this.currentTable.tableNumber = Number(form.value.tableNumber);

      if (form.value.static === "true") {
        this.currentTable.static = true;
      }
      else {
        this.currentTable.static = false;
      }
      this.hideMessageEmpty = true;
      this.hideMessageDuplicate = true;
      modal.close();
    }

  }

  // ******************************* MOUSE EVENTS PÅ TABLES *******************************


  // når der dobbeltklikkes åbnes et modal vindue
  edit(ev) {
    this.tables.forEach(table => {
      if (table.idHtml === ev.target.id) {
        this.currentTable = new Table("temp");
        Object.assign(this.currentTable, table); // Object.assign(target, source) -> laver en kopi af objekt med anden reference
        this.currentTableNumber = table.tableNumber;
        this.openModal(this.modalView);
      }
    });
  }

  // viser tooltip med table info
  showTooltip(ev) {

    this.tables.forEach(table => {
      if (table.idHtml === ev.target.id) {

        // på sigt kan der være nogle if statement her, som bestemmer positionen af tooltip afhængig div elements position
        // der skal laves en lokal variable tilsvarende tableWidth ift. værdien

        let tooltip =
          `<div 
        style="
        background-color:black; 
        color:white;
        position: absolute;
        z-index: 1; 
        padding: 8px 8px;
        white-space: nowrap; 
        top: ${this.tableWidth + this.tableWidth*0.10}px;
        border-radius: 6px;
        left: 0px;
        line-height: 25px;
        " 
        
        id="tooltip${table.idHtml}">

          <p style="margin:0px 0px; font-size: 15px">Table number: ${table.tableNumber}</p>
          <p style="margin:0px 0px; font-size: 15px">Table size: ${table.size}</p>
          <p style="margin:0px 0px; font-size: 15px">Static: ${table.static}</p>
        
        </div>`;

        let divTable = document.getElementById(table.idHtml);
        divTable.insertAdjacentHTML('beforeend', tooltip);

        let divTooltip = document.getElementById("tooltip" + table.idHtml);

        let tooltipWidth = divTooltip.getBoundingClientRect().width;
        let offset = tooltipWidth * 0.5 - this.tableWidth * 0.5;

        divTooltip.style.left = -offset + "px";

      }
    });
  }

  // Lukker tooltip ved mouseout og mousedown
  closeToolTip(ev) {
    let divTooltip = document.getElementById("tooltip" + ev.target.id);
    divTooltip.parentElement.removeChild(divTooltip);
  }


  // ******************************* DRAG AND DROP FUNKTIONALITET *******************************

  // diverse variable brugt i forbindelse med drag and drop (skal op for oven på et tidspunkt og der skal skrives kommentarer)
  // Alle ev.preventDefault ved jeg ikke rigtigt om er nødvendige
  x: number;
  y: number;
  offsetTop: number; // offset fra top af viewport til container
  offsetTopScroll: number;
  xCoordinateOnDragStart: number;
  yCoordinateOnDragStart: number;
  dropRightBoundary: number;
  dropLeftBoundary: number;
  actionToExecute: string;
  newTableCreation: boolean;

  currentTableDragId: string;
  currentTableDragDiv: HTMLElement;
  counterHack: number = 0;


  tempCounter: number = 0;

  onDragStart(ev) {

    // validerer divTable ikke placeres udenfor divContainer
    let divTable = document.getElementById(ev.target.id);
    let divContainer = document.getElementById(ev.target.parentNode.id);
    let divTableWidth = divTable.getBoundingClientRect().width;
    let divContaionerWidth = divContainer.getBoundingClientRect().width;

    this.dropRightBoundary = divContaionerWidth - divTableWidth;
    this.dropLeftBoundary = 0.10 * divContaionerWidth;

    // offset fra divContainer til top og scrollTop - bruges da position i onDragEnd af divTable sættes via mouse position
    this.offsetTopScroll = window.pageYOffset;
    this.offsetTop = ev.toElement.parentNode.offsetTop;

    // startkoordinator findes her - divTable's koordinator relativt til divContainer (slipper for at regne mouse position)
    this.xCoordinateOnDragStart = Number(ev.target.style.left.substring(0, ev.target.style.left.length - 2));
    this.yCoordinateOnDragStart = Number(ev.target.style.top.substring(0, ev.target.style.top.length - 2));

    ev.dataTransfer.setDragImage(ev.target, 0, 0);

    console.log("onDragStart");
  }

  onDrag(ev) {
    let divVerticalLine = document.getElementById("verticalLine");

    // Lille hack, som er nødvendigt
    if (this.counterHack < 20) {
      this.counterHack++;
    }

    // if (ev.x < this.dropLeftBoundary - 1 && this.xCoordinateOnDragStart > this.dropLeftBoundary) { *****BEHOLDT FOR AT VISE HVAD HACK GØR*****
    if (ev.x < this.dropLeftBoundary - 1 && this.xCoordinateOnDragStart > this.dropLeftBoundary && this.counterHack > 19 && (ev.x + ev.y) !== 0) {
      divVerticalLine.style.borderColor = "red";
      divVerticalLine.style.opacity = "0.8";
    }
    else {
      divVerticalLine.style.borderColor = "gray";
      divVerticalLine.style.opacity = "1";
    }
    // ev.preventDefault();
  }

  // fired ved drop på drop target
  onDrop(ev) {


    if (ev.x < this.dropLeftBoundary - 1 && this.xCoordinateOnDragStart > this.dropLeftBoundary) {
      this.actionToExecute = "Delete existing table";
    }
    else if (ev.x > this.dropLeftBoundary - 1 && this.xCoordinateOnDragStart > this.dropLeftBoundary) {
      this.actionToExecute = "Move existing table";
    }
    else if (ev.x > this.dropLeftBoundary - 1 && this.xCoordinateOnDragStart < this.dropLeftBoundary && this.dropRightBoundary > ev.x) {
      this.actionToExecute = "Create new table and move table";
    }
    else if (ev.x < this.dropLeftBoundary - 1 && this.xCoordinateOnDragStart < this.dropLeftBoundary) {
      this.actionToExecute = "Do nothing";
    }

    console.log("onDrop");
    // ev.preventDefault();
  }


  // fired ved dragover drop target
  onDragOver(ev) {
    ev.preventDefault();
  }

  onDragEnd(ev) {

    console.log("onDragEnd");

    // nulstiller effekten relateret til rød baggrund
    let divVerticalLine = document.getElementById("verticalLine");

    divVerticalLine.style.borderColor = "gray";
    divVerticalLine.style.opacity = "1";

    this.counterHack = 0;

    switch (this.actionToExecute) {

      case "Delete existing table":
        console.log(this.actionToExecute);
        this.deleteTable(ev.target.id)
        break;

      case "Move existing table":

        console.log(this.actionToExecute);
        this.moveTable(ev);
        this.calculateRelCoordinates();

        break;

      case "Create new table and move table":

        this.createTable();
        this.openModal(this.modalView, ev);

        break;

      case "Do nothing":

        break;
      default:

        console.log("Outside container");
    }

    this.actionToExecute = "";

    ev.preventDefault();
  }


  moveTable(ev: any) {

    // sikre at der ved oprettelse af nyt bord ikke flyttes på "drag-bordet"
    if (ev.target.id !== "divTable") {
      this.currentTableDragId = ev.target.id;
      this.currentTableDragDiv = document.getElementById(this.currentTableDragId);
    }
    else {
      this.currentTableDragDiv = document.getElementById(this.currentTableDragId);
    }

    // validerer at et table ikke placeres udenfor container (MANGLER I FORHOLD TIL BUNDEN)
    if (ev.y - this.offsetTop + this.offsetTopScroll < 0 || this.dropRightBoundary < ev.x || this.dropLeftBoundary > ev.x) {
      this.currentTableDragDiv.style.left = this.xCoordinateOnDragStart + "px";
      this.currentTableDragDiv.style.top = this.yCoordinateOnDragStart + "px";
    }
    else {
      this.currentTableDragDiv.style.left = ev.x + "px";

      let y = ev.y - this.offsetTop + this.offsetTopScroll;
      this.y = y;
      this.x = ev.x;

      this.currentTableDragDiv.style.top = y + "px";
    }
  }

  calculateRelCoordinates() {
    let containerWidth = document.getElementById('containerId').getBoundingClientRect().width;
    let containerHeight = document.getElementById('containerId').getBoundingClientRect().height;

    let currentDivTableX = Number(this.currentTableDragDiv.style.left.substring(0, this.currentTableDragDiv.style.left.length - 2));
    let currentDivTableY = Number(this.currentTableDragDiv.style.top.substring(0, this.currentTableDragDiv.style.top.length - 2));

    let xRel = currentDivTableX / containerWidth;
    let yRel = currentDivTableY / containerHeight;


    if (this.newTableCreation) {
      this.currentTable.xRel = xRel;
      this.currentTable.yRel = yRel;
    }
    else {
      // finder det div element som er flyttet og opdaterer dets xRel og yRel i tableService
      this.tableService.getTables().forEach(table => {

        if (table.idHtml === this.currentTableDragId) {
          table.xRel = xRel;
          table.yRel = yRel;
          this.tableService.editTable(table);
        }
      });
    }

  }

  // sletter både html element og table i service
  deleteTable(id: string) {
    let divTable = document.getElementById(id);
    divTable.parentElement.removeChild(divTable);

    this.tableService.deleteTable(id);
  }

  // opretter nyt table
  createTable() {

    let container = document.getElementById('containerId');
    let clone = <HTMLDivElement>document.getElementById('divTable').cloneNode(true);

    let id;
    let ids = [];
    if (this.tables.length > 0) {
      this.tables.forEach(table => { ids.push(Number(table.idHtml)) });
      id = Math.max(...ids) + 1;
    }
    else {
      id = 0;
    }

    clone.setAttribute('id', id + '');
    container.appendChild(clone);

    this.addEventListeners(clone.id);
    this.currentTableDragId = id + '';

    this.newTableCreation = true;
    // sætter currentTable til det nye table
    this.currentTable = new Table(this.currentTableDragId);
    this.currentTable.size = 2;
    this.currentTable.static = false;

  }

  // tilføjer eventlisteners
  addEventListeners(id: string) {
    let divTable = document.getElementById(id);

    divTable.addEventListener('dragstart', (ev) => this.onDragStart(ev));
    divTable.addEventListener('drag', (ev) => this.onDrag(ev));
    divTable.addEventListener('dragend', (ev) => this.onDragEnd(ev));

    if (id !== "divTable") {
      divTable.addEventListener('dblclick', (ev) => this.edit(ev));
      divTable.addEventListener('mouseover', (ev) => this.showTooltip(ev));
      divTable.addEventListener('mouseout', (ev) => this.closeToolTip(ev));
      divTable.addEventListener('mousedown', (ev) => this.closeToolTip(ev));
    }

  }

}