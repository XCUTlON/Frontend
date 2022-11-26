import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Resultado } from '../../../modelos/resultado.model';
import { ResultadoService } from '../../../servicios/resultado.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_resultado: string = "";
  intentoEnvio: boolean = false;
  elResultado: Resultado = {
    mesa: "",
    candidato: ""    
  }

  constructor(private miServicioResultado: ResultadoService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_resultado) {
      this.modoCreacion = false;
      this.id_resultado = this.rutaActiva.snapshot.params.id_resultado;
      this.getResultado(this.id_resultado)
    } else {
      this.modoCreacion = true;
    }
  }

  getResultado(id: string) {
    this.miServicioResultado.getResultado(id).
      subscribe(data => {
        this.elResultado = data;
      });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.miServicioResultado.crear(this.elResultado).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El resultado electoral ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/resultado/listar"])
        });
    }
  }

  editar(): void {
    if (this.validarDatosCompletos()) {
      this.miServicioResultado.editar(this.elResultado._id, this.elResultado).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El resultado electoral ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/resultado/listar"]);
        });
    }
  }

  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (this.elResultado.mesa || this.elResultado.candidato) {
      return true;
    } else {
      return false;
    }
  }
}
