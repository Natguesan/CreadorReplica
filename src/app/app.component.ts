import { Component, OnInit, Inject  } from '@angular/core';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import {Coleccion} from './models/coleccion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'creador';
  fondoimagen: string = "";
  casa: string = "Borcloy";
  casa2: string = "Ninguna";
  ninguna: string = "Ninguna"
  mercenario: string = "Mercenario"
  nombrecarta: string = "";
  casas: Array<string> = ["Borcloy", "Fenrir", "Rutghar", "Yalmir"];
  imagencreada = "";
  tiposdecarta: Array<string> = ["Contendiente", "Táctica"];
  tipodecarta: string = "Contendiente";
  subtiposdecarta: Array<string> = ["Adepto","Asesino","Bardo","Bestia","Bruja","Caballero","Caballero Dragón","Cazador","Corrupto","Dama","Demonio","Dragón","Druida","Espadachín","Explorador","Faxala","Forajido","Guardia","Guerrero","Hadraix","Hechicero","Ladrón","Luman","Mago","Mercader","Místico","Mooncat","Pistolero","Terpun","Vumdrak"];
  subtipodecarta: string = "";
  subtiposdetactica: Array <string> = ["Apoyo","Hechizo","Militar","Subterfugio"];
  subtipodetactica : string = "";
  filePath: string = "";
  myForm: FormGroup;
  textodeCarta: string = "";
  descripciondeCarta: string = "";
  ataque: string = "X";
  defensa: string = "X";
  ataques: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  defensas: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rareza: string = "Común";
  rarezas: Array<string> = ["Común", "Rara", "Épica", "Legendaria"];
  costeprincipal: number = 0;
  costesecundario: number = 0;
  costeneutro: string = "0";
  costecasaprincipal: Array<number> = [0, 1, 2, 3, 4];
  costecasasecundaria: Array<number> = [0, 1, 2, 3];
  costesneutro: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  negrita : boolean = false ; 
  coleccion: Coleccion = {nombre:"", siglas: ""};
  colecciones: Array<Coleccion> = [
  {nombre:"Mazo inicial Familia Borcloy", siglas: "MI/FB"},
  {nombre:"Mazo inicial Familia Fenrir", siglas: "MI/FF"},
  {nombre:"Mazo inicial Familia Rutghar", siglas: "MI/FR"},
  {nombre:"Mazo inicial Familia Yalmir", siglas: "MI/FY"},
  {nombre:"SET1", siglas: "SET1"}]
  numerocoleccion : number = 0;
  filename : string = "sintitulo.png"
  constructor(public fb: FormBuilder, public dialog: MatDialog) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Appcomponentdialog, {
      width: '250px',
      data: this.filename,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filename = result;
      
    });
  }

  ngOnInit(): void {

  }
comprobarnumero( e : number) : void{
  if (e >= 100) {
    this.numerocoleccion = 99
  } else {
    this.numerocoleccion = e
  }

}
anadirNegrita()  {
  let b = this.negrita
if (b === true) {
  this.textodeCarta = this.textodeCarta + "</b>"
   this.negrita = false
}if (b === false) {
this.textodeCarta = this.textodeCarta + "<b>";
  this.negrita = true;
} 
}
  textoCarta(e: string) {
    let completedText = e
    this.textodeCarta = e
    document.querySelector('#textoCarta')!.innerHTML = completedText
  }
  comprobarCasa(e: string): void {
    this.casa = e
    if (e === this.casa2) {
      this.casa2 = this.ninguna
    } if (e === this.mercenario) {
      this.casa2 = this.ninguna
    }
  }

  imagePreview(e: any) {
    const file = (e.target as HTMLInputElement).files![0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img')!.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.fondoimagen = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  anadirhabilidad(hab : string) : void {
    this.textodeCarta = this.textodeCarta + "<span style='border:1.3px black solid; border-radius:15px;background-color:white;font-weight:bold;color:black;padding-right:1px;padding-left:1px'>" + hab +"</span>"
    this.textoCarta(this.textodeCarta)
}
  
  textodelaCarta(e: string) {
    console.log(e);
    let txt = $('#textodelacarta').html();//valor del div en texto.
   // let convertir = document.getElementById("textodelacarta");
   // let texto = convertir!.innerHTML;
   // let newtext;
   let newtext = txt.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
   // convertir!.innerHTML = newtext;
    let completedText = newtext
    this.textodeCarta = newtext
    document.querySelector('#textoCarta')!.innerHTML = completedText
    document.querySelector('#textodelacarta')!.innerHTML = completedText
  }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.dialog.html',
  styleUrls: ['./app.component.scss']
})
export class Appcomponentdialog {
  imagencreada : string = "";
  constructor(
    public dialogRef: MatDialogRef<Appcomponentdialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}
  generarIMG(): void {
     const DATA = document.getElementById('carta');
     const options = {
       scale: 1
     }
     html2canvas(DATA!, options).then(canvas => {
       this.imagencreada = canvas.toDataURL("image/png");
       this.downloadImage(this.imagencreada, this.data)
     })
   }
   downloadImage(data: string, filename : string) {
     let a = document.createElement('a');
     a.href = data;
     a.download = filename;
     document.body.appendChild(a);
     a.click()
   }
  onNoClick(): void {
    this.dialogRef.close();
  }
}