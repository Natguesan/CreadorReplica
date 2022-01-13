import { Component, OnInit  } from '@angular/core';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import {Coleccion} from './models/coleccion';

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
  tipodecarta: string = "";
  subtiposdecarta: Array<string> = ["Pistolero", "Espadachín", "Hechicero", "Guerrero", "Mago", "Cazador", "Bestia", "Caballero", "Ladrón", "Místico"];
  subtipodecarta: string = "";
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
  constructor(public fb: FormBuilder, private _fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
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


  generarIMG(): void {
    let filename = prompt('Nombre de archivo');
    this.filename = filename!
    const DATA = document.getElementById('carta');
    const options = {
      scale: 1
    }
    html2canvas(DATA!, options).then(canvas => {
      this.imagencreada = canvas.toDataURL("image/png");
      this.downloadImage(this.imagencreada, this.filename)
    })
  }
  downloadImage(data: string, filename : string) {
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click()
  }
  anadirhabilidad(hab : string) : void {
    if (hab === 'Evasion'){
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #228b22 solid;border-radius:15px;background-color:white;font-weight:bold;color:#228b22;padding-right:1px;padding-left:1px'>Evasión</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Rapidez') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #E60026 solid;border-radius:15px;background-color:white;font-weight:bold;color:#E60026;padding-right:1px;padding-left:1px'>Rapidez</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Perforar') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #B87333 solid;border-radius:15px;background-color:white;font-weight:bold;color:#B87333;padding-right:1px;padding-left:1px'>Perforar</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'PrimerGolpe') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #FFA971 solid;border-radius:15px;background-color:white;font-weight:bold;color:#FFA971;padding-right:1px;padding-left:1px'>Primer Golpe</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Volar') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #0CB7F2 solid;border-radius:15px;background-color:white;font-weight:bold;color:#0CB7F2;padding-right:1px;padding-left:1px'>Volar</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Veloz') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #3EB489 solid;border-radius:15px;background-color:white;font-weight:bold;color:#3EB489;padding-right:1px;padding-left:1px'>Veloz</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'AntiHechizo') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #C6BD34 solid;border-radius:15px;background-color:white;font-weight:bold;color:#C6BD34;padding-right:1px;padding-left:1px'>Anti-Hechizo</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Regeneracion') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #900020 solid;border-radius:15px;background-color:white;font-weight:bold;color:#900020;padding-right:1px;padding-left:1px'>Regeneración</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Sigilo') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #7D2181 solid;border-radius:15px;background-color:white;font-weight:bold;color:#7D2181;padding-right:1px;padding-left:1px'>Sigilo</span>"
      this.textoCarta(this.textodeCarta)
    }
    if (hab === 'Precision') {
      this.textodeCarta = this.textodeCarta + "<span style='border:1.3px #EF7F1A solid;border-radius:15px;background-color:white;font-weight:bold;color:#EF7F1A;padding-right:1px;padding-left:1px'>Precisión</span>"
      this.textoCarta(this.textodeCarta)
    }
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