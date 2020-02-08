import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Table } from '../../table'
import { Coordinate } from '../../coordinate'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit, AfterViewInit {

  currentTable: Table;
  tables: Table[] = [];
  tBool: boolean[] = [false, true, true, true, true, true, true];
  startPositions: Coordinate[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

  defaultPosition: Coordinate = { x: 0, y: 0 };

  containerWidth: number;
  container_x1: number;
  container_y1: number;

  div_x1: number;
  div_y1: number;

  container_x2: number;
  container_y2: number;

  move_x: number;
  move_y: number;

  currentDivWidth: number;
  currentDivHeight: number;

  constructor(
    private modalService: NgbModal
  ) { }



  ngOnInit() { }
  ngAfterViewInit() { }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "sm" });
  }

  //Når der dobbeltklikkes åbnes et modal vindue
  edit(divId, tempref) {
    if (divId.isOpen()) {
      divId.close();
    }
    this.tables.forEach(table => {
      if (table.idHtml === divId._elementRef.nativeElement.id) {
        this.currentTable = table;
        this.open(tempref);
      }
    });
  }

  //Viser tooltip med table info, hvis der er et table knyttet til div Id'et og ellers ikke. 
  showTooltip(divId) {
    if (divId.isOpen()) {
      divId.close();
    }
    this.tables.forEach(table => {
      if (table.idHtml === divId._elementRef.nativeElement.id) {
        this.currentTable = table;
        divId.open();
      }
    });
  }

  //Lukker tooltip ved mouseout og mousedown
  closeToolTip(divId) {
    if (divId.isOpen()) {
      divId.close();
    }
  }



  // ******************************* DRAG AND DROP EVENTS *******************************

  started(event: CdkDragStart) {

    let currentDivId: string = event.source.element.nativeElement.id;
    let currentDivNumber = Number(currentDivId.charAt(1).toString());
    let position: Coordinate = { x: event.source.getFreeDragPosition().x, y: event.source.getFreeDragPosition().y };

    this.startPositions[currentDivNumber] = position;

    this.containerWidth = document.getElementById("containerIdParent").getBoundingClientRect().width;
    this.container_x1 = document.getElementById("containerIdParent").getBoundingClientRect().left;
    this.container_y1 = document.getElementById("containerIdParent").getBoundingClientRect().top;

    // this.container_x2 = document.getElementById("containerIdParent2").getBoundingClientRect().left;
    // this.container_y2 = document.getElementById("containerIdParent2").getBoundingClientRect().top;

  }


  ended(event: CdkDragEnd) {

    let currentDivId: string = event.source.element.nativeElement.id;
    let currentDivNumber = Number(currentDivId.charAt(1).toString());

    // Finder ud af om elementet er blevet flyttet over grænsen
    if (event.source.getFreeDragPosition().x > (this.containerWidth * 0.10)) {

      let makeNewTable: boolean = true;

      //Finder ud af om der allerede eksisterer et objekt med det pågældende id så man ikke laver flere objekter med samme id
      this.tables.forEach(table => {
        if (table.idHtml === currentDivId) {
          makeNewTable = false;
        }
      });

      if (makeNewTable) {

        let newTable = new Table(currentDivId);

        // this.tables.push(new Table(currentDivId));
        this.tables.push(newTable);

        // ************** Udregning af alt vedr. koordinator til det nye table **************

        this.div_x1 = document.getElementById(currentDivId).getBoundingClientRect().left;
        this.div_y1 = document.getElementById(currentDivId).getBoundingClientRect().top;

        this.move_x = this.div_x1 - this.container_x1;
        this.move_y = this.div_y1 - this.container_y1;

        let widthContainer = document.getElementById("containerIdParent").getBoundingClientRect().width;
        let heightContainer = document.getElementById("containerIdParent").getBoundingClientRect().height;

        let xRel = (this.div_x1 - this.container_x1) / widthContainer; //Samme som at have brugt move_x det i parentesen
        let yRel = (this.div_y1 - this.container_y1) / heightContainer; //Samme som at have brugt move_x det i parentesen

        newTable.xRel = xRel;
        newTable.yRel = yRel;

        // this.tableService.addTable(newTable);

        //Her kan modal vinduet åbnes med de oplysninger der skal udfyldes

        let firstTrueIndex: number;
        let lastTrueIndex: number;
        let useFirstTrueIndex: boolean;

        //Her sættes næste div til at blive unhidden. Som udgangspunkt skal den div med det mindste id altid sættes som synlig først.
        //Tjekker først om der er en værdi i tBool som er true før andre false i såfald skal denne div bruges og laves synlig. Ellers den næste.
        this.tBool.forEach((b, index) => {

          if (b && firstTrueIndex === undefined) {
            firstTrueIndex = index;
          }
          if (b) {
            lastTrueIndex = index;
          }
          if (lastTrueIndex > firstTrueIndex) {
            useFirstTrueIndex = true;
          }

        });

        if (useFirstTrueIndex) {
          this.tBool[firstTrueIndex] = false;
        }
        else {
          this.tBool[lastTrueIndex] = false;
        }
      }
    }

    else {

      //Sletning af objekt og nulstilling af tilhørende div elements hidden state 

      //Matcher eksisterende objekt med samme idHtlm som nuværende div 
      this.tables.forEach((table, index) => {

        //*******Begrænsning lige nu er, at når alle borde er valgt og der slettes et table, så vises der ingen længere. Men burde ikke ske.*******

        //Sletter det aktuelle objekt i tables arrayet og tilhørende div sættes til true
        if (table.idHtml == currentDivId && table.idHtml.length == 2) {

          this.tBool[Number(table.idHtml.charAt(1))] = true;
          this.tables.splice(index, 1);
        }
        else if (table.idHtml == currentDivId && table.idHtml.length == 3) {

          let indexAsString = table.idHtml.charAt(1).toString() + table.idHtml.charAt(2).toString();
          this.tBool[Number(indexAsString)] = true;
          this.tables.splice(index, 1);
        }

      });

      //Reset af div position
      this.startPositions[currentDivNumber] = this.defaultPosition;

    }

    // console.log("Antal objekter oprettet: " + this.tables.length);

    this.div_x1 = document.getElementById(currentDivId).getBoundingClientRect().left;
    this.div_y1 = document.getElementById(currentDivId).getBoundingClientRect().top;

    this.move_x = this.div_x1 - this.container_x1;
    this.move_y = this.div_y1 - this.container_y1;


  }

}
