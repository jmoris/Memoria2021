import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-configuracionUsuario',
  templateUrl: './configuracionUsuario.component.html',
  styleUrls: ['./configuracionUsuario.component.scss']
})
export class ConfiguracionUsuarioComponent implements OnInit {
  usuarios: any;
  checked = true;

  constructor(
        private modalService: NgbModal,
        private toastr: ToastrService,
        private usuariosService: UsuariosService,
        private fb: FormBuilder,
	) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.usuariosService.getAll().subscribe(
        (resp:any) => {
            this.usuarios = resp;
        }
    );
  }

  addUser(modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {

        }, (reason) => {
        });
  }

}
