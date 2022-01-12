import { Component, OnInit  } from '@angular/core';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';


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

  constructor(public fb: FormBuilder, private _fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    });

  }
 

  ngOnInit(): void {

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
anadirEva() {
  this.textodeCarta = this.textodeCarta + "<span style='border: 1.3px green solid; border-radius: 15px; background-color: white; font-weight: bold; color: green; margin: auto auto;'> Evasión </span>"
  this.textoCarta(this.textodeCarta)
}
anadirRap() {
  this.textodeCarta = this.textodeCarta + "<span style='border: 1.3px red solid; border-radius: 15px; background-color: white; font-weight: bold; color: red'> Rapidez </span>"
  this.textoCarta(this.textodeCarta)
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
    const DATA = document.getElementById('carta');
    const options = {
      scale: 1
    }
    html2canvas(DATA!, options).then(canvas => {
      this.imagencreada = canvas.toDataURL("image/png");
      this.downloadImage(this.imagencreada)
    })
  }
  downloadImage(data: string, filename = 'sintitulo.png') {
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click()
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