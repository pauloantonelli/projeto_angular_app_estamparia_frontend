import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ContatoService } from 'src/app/shared/services/contato/contato.service';
import { OrcamentoService } from 'src/app/shared/services/orcamento/orcamento.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected modalRef: BsModalRef;

  protected emailValido: boolean;
  protected emailValidoMessage = false;

  protected mensagemDeSucesso = {
    titulo: '',
    subtitulo: '',
  };

  protected tipoPessoa = {
    estado: true,
    tipo: '',
  };

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

  constructor(
    private http: ContatoService,
    private recuperaMensagemSucessoServidor: OrcamentoService,
    private snackBar: MatSnackBar,
    private modalService: BsModalService) {
    }

  ngOnInit() {
    this.tipoPessoa.tipo = 'Pessoa Física';
    this.inscricao = this.recuperaMensagemSucessoServidor.getOrcamentoAll().subscribe(
      (response) => {
        const dados = response[0];

        this.mensagemDeSucesso = dados.mensagemDeSucesso;
      },
      (erro) => {
        this.snackBar.open('Não pode conectar, verifique sua conexão com a internet e tente novamente', 'Fechar', {
          duration: 60000,
        });
      },
      () => {
        console.log('Carregado com sucesso!');
      }
    );
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  mudaTipoPessoa() {
    this.tipoPessoa.estado = !this.tipoPessoa.estado;
    if (this.tipoPessoa.estado) {
      this.tipoPessoa.tipo = 'Pessoa Física';
    } else {
      this.tipoPessoa.tipo = 'Pessoa Juridica';
    }
  }

  validarEmail(email: string) {
    const usuario = email.substring(0, email.indexOf('@'));
    const dominio = email.substring(email.indexOf('@') + 1, email.length);

    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search('@') == -1 &&
      dominio.search('@') == -1 &&
      usuario.search(' ') == -1 &&
      dominio.search(' ') == -1 &&
      dominio.search('.') != -1 &&
      dominio.indexOf('.') >= 1 &&
      dominio.lastIndexOf('.') < dominio.length - 1
      ) {
        this.emailValido = true;
        this.emailValidoMessage = true;
        setTimeout(() => {
          this.emailValidoMessage = false;
        }, 5000);
      } else {
        this.emailValido = false;
        this.emailValidoMessage = true;
        setTimeout(() => {
          this.emailValidoMessage = false;
        }, 5000);
      }
  }

  enviarMensagem(mensagemModal: any) {
    if (this.tipoPessoa.estado === true) {
      this.tipoPessoa.tipo = 'cnpj';
    } else {
      this.tipoPessoa.tipo = 'cpf';
    }

    if (this.mensagem.nome.length >= 3 &&
      this.mensagem.corpoMensagem.length >= 10 &&
      this.emailValido === true) {

      const docs = { mensagem: this.mensagem };

      this.inscricao = this.http.setNovaMensagem(docs).subscribe(
      (response) => {

        this.recuperaMensagemSucessoServidor.getOrcamentoAll().subscribe(
          (responseMensagemSucesso) => {
            const dados = responseMensagemSucesso[0];

            this.mensagemDeSucesso = dados.mensagemDeSucesso;
          }
        );

        this.abrirModal(mensagemModal);
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
      },
      (erro) => {
        this.mensagemDeSucesso.titulo = 'Mensagem NÃO enviada!';
        this.mensagemDeSucesso.subtitulo = 'Verifique sua conexão com a internet e tente novamente!';
        this.abrirModal(mensagemModal);
      },
      () => {
        console.log('Conexão encerrada com sucesso');
      }
      );
    } else {
      this.mensagemDeSucesso.titulo = 'Mensagem NÃO enviada!';
      this.mensagemDeSucesso.subtitulo = 'Preencha corretamente os campos obrigatórios e tente novamente';
      this.abrirModal(mensagemModal);
    }
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
