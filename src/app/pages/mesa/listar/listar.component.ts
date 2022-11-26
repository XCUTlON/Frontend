import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Mesa } from '../../../modelos/mesa.model';
import { MesaService } from '../../../servicios/mesa.service';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  mesas: Mesa[];
  nombresColumnas: string[] = ['_id', 'Número', 'Cantidad Cédulas Inscritas'];
  constructor(private miServicioMesa: MesaService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioMesa.listar().
    subscribe(data => {
      this.mesas = data;
    })
  }

  agregar():void{
    this.router.navigate(["pages/mesa/crear"])
  }

  editar(id:string): void{
    this.router.navigate(["pages/mesa/actualizar/"+id])
  }
  eliminar(id:string):void{
    console.log("Eliminando");
    Swal.fire({
    title: 'Eliminar mesa de votación',
    text: "¿Está seguro que quiere eliminar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
    }).then((result) =>{
      if (result.isConfirmed){
        this.miServicioMesa.eliminar(id).
        subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La mesa de votación ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        })
      }
    })
  }
}