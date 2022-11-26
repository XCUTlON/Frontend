import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Partido } from '../../../modelos/partido.model';
import { PartidoService } from '../../../servicios/partido.service';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  partidos: Partido[];
  nombresColumnas: string[] = ['_id', 'Nombre del Partido Político', 'Lema del Partido Político'];
  constructor(private miServicioPartido: PartidoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioPartido.listar().
    subscribe(data => {
      this.partidos = data;
    })
  }

  agregar():void{
    this.router.navigate(["pages/partido/crear"])
  }

  editar(id:string): void{
    this.router.navigate(["pages/partido/actualizar/"+id])
  }
  eliminar(id:string):void{
    console.log("Eliminando");
    Swal.fire({
    title: 'Eliminar partido',
    text: "¿Está seguro que quiere eliminar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
    }).then((result) =>{
      if (result.isConfirmed){
        this.miServicioPartido.eliminar(id).
        subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El partido político ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        })
      }
    })
  }
}

