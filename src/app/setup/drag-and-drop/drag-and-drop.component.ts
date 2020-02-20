import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Table } from '../../table'
import { Coordinate } from '../../coordinate'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '../table.service'


@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit, AfterViewInit {

  currentTable: Table;
  tables: Table[] = [];
  tBool: boolean[] = [false, true, true, true, true, true];
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

  

  @ViewChild('content', { static: false }) modalView: ElementRef<HTMLElement>;


  constructor(
    private modalService: NgbModal,
    private tableService: TableService
  ) { }



  ngOnInit() {
    this.setTableSize();
    this.setVerticalLineSize();
  }
  ngAfterViewInit() { }

  setTableSize() {

    // let borderWidth = document.getElementById("t0").style.borderWidth;
    let containerWidth = document.getElementById("containerId").getBoundingClientRect().width;
    let tableWidth = containerWidth * 0.037; // 0.037 er en delvist random variable
    let tableTop = tableWidth / 2;
    let tableLeft = ((containerWidth * 0.10) - tableWidth) / 2 // Finder plads til overs i spalten, når table fratrækkes, og deler med 2 => x 

    for (let i = 0; i < this.tBool.length; i++) {
      let div = document.getElementById("t" + i);
      div.style.width = tableWidth + "px";
      div.style.height = tableWidth + "px";
      div.style.top = tableTop + "px";
      div.style.left = tableLeft + "px";
      div.style.lineHeight = (tableWidth - 2) + "px"; // 2 er border-width
      div.style.fontSize = (tableWidth / 2) + "px"; // 1.3 er en delvist random variable

    }

    
  }

  setVerticalLineSize() {

    let verticalDiv = document.getElementById("verticalLine");
    let containerWidth = document.getElementById("containerId").getBoundingClientRect().width;

    verticalDiv.style.borderLeft = (0.10 * containerWidth) + "px " + "solid " + "";
    verticalDiv.style.borderLeftColor = "Gray"
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "sm" }).result.then((result) => {

      // console.log(result);

      this.tableService.addTable(this.currentTable);
      document.getElementById(this.currentTable.idHtml).innerText = this.currentTable.tableNumber.toString();


    }, (reason) => {



      // Her skal laves en if statement der tjekker om det er et eksisterende bord eller et nyt bord som bliver krydset
      // Ved eksisterende bord skal der ikke ske noget
      // Ved nyt bord skal det slettes 
      // Kig efter currenttables værdier i if statement
    });
  }

  hideMessage: boolean = true;
  onSubmit(form, modal) {

    console.log(form.value.tableNumber);

    if (form.value.tableNumber === undefined || form.value.tableNumber === null) {
      this.hideMessage = false;
    }
    else {
      this.currentTable.size = form.value.size;
      this.currentTable.tableNumber = form.value.tableNumber;

      if (form.value.static === "true") {
        this.currentTable.static = true;
      }
      else {
        this.currentTable.static = false;
      }
      this.hideMessage = true;
      modal.close();
    }

    
    // Der skal altid tjekkes om et bord med samme idhtml er til stede, så det sikres, at der ved edit ikke bare oprettes et nyt
    // Det er i denne funktion, hvor bordet skal tilføjes 
    // Der skal sikres en overensstemmelse mellem de to arrays med tables i
    
  }


  // ******************************* MOUSE EVENTS PÅ TABLES *******************************


  // Når der dobbeltklikkes åbnes et modal vindue
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

  // Viser tooltip med table info, hvis der er et table knyttet til div Id'et og ellers ikke. 
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

  // Lukker tooltip ved mouseout og mousedown
  closeToolTip(divId) {
    if (divId.isOpen()) {
      divId.close();
    }
  }




  deleteTable(_currentDivId, _currentDivNumber){

    let currentDivId: string = _currentDivId;
    let currentDivNumber = _currentDivNumber; // Her kommer der til at ske en fejl, når div number overstiger 9

    // Sletning af objekt og nulstilling af tilhørende div elements hidden state 

      // Matcher eksisterende objekt med samme idHtlm som nuværende div 
      this.tables.forEach((table, index) => {

        // *******Begrænsning lige nu er, at når alle borde er valgt og der slettes et table, så vises der ingen længere. Men burde ikke ske.*******

        // Sletter det aktuelle objekt i tables arrayet og tilhørende div sættes til true
        if (table.idHtml == currentDivId && table.idHtml.length == 2) {

          this.tBool[Number(table.idHtml.charAt(1))] = true;
          this.tables.splice(index, 1);
          document.getElementById(table.idHtml).innerText = "";
          // HER SKAL OGSÅ SLETTES I ARRAY I SERVICE
        }
        else if (table.idHtml == currentDivId && table.idHtml.length == 3) {

          let indexAsString = table.idHtml.charAt(1).toString() + table.idHtml.charAt(2).toString();
          this.tBool[Number(indexAsString)] = true;
          this.tables.splice(index, 1);
          document.getElementById(table.idHtml).innerText = "";
        }

      });

      // Reset af div position
      this.startPositions[currentDivNumber] = this.defaultPosition;

  }



  // ******************************* DRAG AND DROP EVENTS *******************************

  started(event: CdkDragStart) {

    let currentDivId: string = event.source.element.nativeElement.id;
    let currentDivNumber = Number(currentDivId.charAt(1).toString()); // Her kommer der til at ske en fejl, når div number overstiger 9
    let position: Coordinate = { x: event.source.getFreeDragPosition().x, y: event.source.getFreeDragPosition().y };

    this.startPositions[currentDivNumber] = position;
    
    // console.log(this.startPositions[currentDivNumber]);

    this.containerWidth = document.getElementById("containerIdParent").getBoundingClientRect().width;
    this.container_x1 = document.getElementById("containerIdParent").getBoundingClientRect().left;
    this.container_y1 = document.getElementById("containerIdParent").getBoundingClientRect().top;
  }


  ended(event: CdkDragEnd) {

    let currentDivId: string = event.source.element.nativeElement.id;
    let currentDivNumber = Number(currentDivId.charAt(1).toString());

    // Finder ud af om elementet er blevet flyttet over grænsen
    if (document.getElementById(currentDivId).getBoundingClientRect().left > (this.containerWidth * 0.10)) {

      let makeNewTable: boolean = true;

      // Finder ud af om der allerede eksisterer et objekt med det pågældende id så man ikke laver flere objekter med samme id
      this.tables.forEach(table => {
        if (table.idHtml === currentDivId) {
          makeNewTable = false;
        }
      });

      if (makeNewTable) {

        let newTable = new Table(currentDivId);

        this.tables.push(newTable);

        // ************** Udregning af alt vedr. koordinator til det nye table **************

        this.div_x1 = document.getElementById(currentDivId).getBoundingClientRect().left;
        this.div_y1 = document.getElementById(currentDivId).getBoundingClientRect().top;

        this.move_x = this.div_x1 - this.container_x1; //HER SKAL DER TRÆKKES DE 10% AF WIDTH SOM IKKE ER MED 
        this.move_y = this.div_y1 - this.container_y1;

        let widthContainer = document.getElementById("containerIdParent").getBoundingClientRect().width;
        let heightContainer = document.getElementById("containerIdParent").getBoundingClientRect().height;

        let xRel = (this.div_x1 - this.container_x1) / widthContainer; //Samme som at have brugt move_x det i parentesen
        let yRel = (this.div_y1 - this.container_y1) / heightContainer; //Samme som at have brugt move_y det i parentesen

        newTable.xRel = xRel;
        newTable.yRel = yRel;


        // Her kan modal vinduet åbnes med de oplysninger der skal udfyldes
        this.currentTable = newTable;
        this.currentTable.size = 2;
        this.currentTable.static = false;
        this.open(this.modalView);


        let firstTrueIndex: number;
        let lastTrueIndex: number;
        let useFirstTrueIndex: boolean;

        // Her sættes næste div til at blive unhidden. Som udgangspunkt skal den div med det mindste id altid sættes som synlig først.
        // Tjekker først om der er en værdi i tBool som er true før andre false i såfald skal denne div bruges og laves synlig. Ellers den næste.
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

     this.deleteTable(currentDivId,currentDivNumber);

    }

    
  }


}



//  // Sletning af objekt og nulstilling af tilhørende div elements hidden state 

//       // Matcher eksisterende objekt med samme idHtlm som nuværende div 
//       this.tables.forEach((table, index) => {

//         // *******Begrænsning lige nu er, at når alle borde er valgt og der slettes et table, så vises der ingen længere. Men burde ikke ske.*******

//         // Sletter det aktuelle objekt i tables arrayet og tilhørende div sættes til true
//         if (table.idHtml == currentDivId && table.idHtml.length == 2) {

//           this.tBool[Number(table.idHtml.charAt(1))] = true;
//           this.tables.splice(index, 1);
//           document.getElementById(table.idHtml).innerText = "";
//           // HER SKAL OGSÅ SLETTES I ARRAY I SERVICE
//         }
//         else if (table.idHtml == currentDivId && table.idHtml.length == 3) {

//           let indexAsString = table.idHtml.charAt(1).toString() + table.idHtml.charAt(2).toString();
//           this.tBool[Number(indexAsString)] = true;
//           this.tables.splice(index, 1);
//           document.getElementById(table.idHtml).innerText = "";
//         }

//       });

//       // Reset af div position
//       this.startPositions[currentDivNumber] = this.defaultPosition;