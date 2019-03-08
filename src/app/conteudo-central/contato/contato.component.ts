import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ContatoService } from 'src/app/shared/services/contato/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected envio = false;
  protected modalRef: BsModalRef;

  // mensagem do cliente
  protected mensagem = {
    nome: '',
    email: '',
    telefone: '',
    tipoPessoa: {
      tipo: '',
      numero: '',
    },
    corpoMensagem: '',
  };

  constructor(private http: ContatoService, private modalService: BsModalService) {}

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  enviarMensagem() {
    const docs = { mensagem: this.mensagem };
    console.log(docs);
    this.inscricao = this.http.setNovaMensagem(docs).subscribe(
      (response) => {
        this.envio = true;
        setTimeout(() => {
          this.envio = false;
          this.mensagem = {
            nome: '',
            email: '',
            telefone: '',
            tipoPessoa: {
              tipo: '',
              numero: '',
            },
            corpoMensagem: '',
          };
        }, 8000);
        console.log('Enviado com sucesso');
      },
      (erro) => {
        console.log('Verifique sua conexão com a internet e tente novamente!');
      },
      () => {
        console.log('Conexão encerrada com sucesso');
      }
    );
  }
  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
