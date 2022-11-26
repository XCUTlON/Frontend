import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Resultado } from '../../../modelos/resultado.model';
import { ResultadoService } from '../../../servicios/resultado.service';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  resultados: Resultado[];
  nombresColumnas: string[] = ['_id', 'Mesa', 'Candidato'];
  constructor(private miServicioResultado: ResultadoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioResultado.listar().
    subscribe(data => {
      this.resultados = data;
    })
  }

  agregar():void{
    this.router.navigate(["pages/resultado/crear"])
  }

  editar(id:string): void{
    this.router.navigate(["pages/resultado/actualizar/"+id])
  }
  eliminar(id:string):void{
    console.log("Eliminando");
    Swal.fire({
    title: 'Eliminar Resultado Electoral',
    text: "¿Está seguro que quiere eliminar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
    }).then((result) =>{
      if (result.isConfirmed){
        this.miServicioResultado.eliminar(id).
        subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El resultado electoral ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        })
      }
    })
  }
}