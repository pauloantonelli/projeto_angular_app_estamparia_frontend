import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { MatSnackBar } from '@angular/material';

import { OrcamentoService } from 'src/app/shared/services/orcamento/orcamento.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected modalRef: BsModalRef;

  protected padraoTipoPessoa = true;
  protected ativo = [false, false, false];

  protected emailValido: boolean;
  protected emailValidoMessage = false;

  protected servicoEscolhido: boolean[] = [];

  protected tipoPessoa = {
    estado: true,
    tipo: '',
  };

  // painel de aviso
  protected aviso = {
    ativo: null,
    mensagem: '',
  };
  // preenchimento dos campos
  protected formulario = {
    titulo: '',
    descricao: '',
    servicos: {
      titulo: '',
      tiposDeServicos: [],
      imagens: [],
    }
  };
  protected segmento = [];
  protected mensagemDeSucesso = {
    titulo: '',
    subtitulo: '',
  };

  protected formularioCliente = {
    nome: '',
    email: '',
    telefoneFixo: [],
    celular: [],
    empresa: '',
    tipoPessoa: {
      tipo: '',
      numero: '',
    },
    segmento: '',
    servicoEscolhido: '',
    detalhamento: {
      largura: Number(null),
      altura: Number(null),
      quantidade: Number(null),
      cor: String('#ffffff'),
      mensagem: String(''),
      anexo: String(),
    }
  };

  constructor(
    private http: OrcamentoService,
    private snackBar: MatSnackBar,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.inscricao = this.http.getOrcamentoAll().subscribe(
      (res) => {
        const dados = res[0];

        // painel de aviso
        this.aviso.ativo = dados.aviso.ativo;
        this.aviso.mensagem = dados.aviso.mensagem;

        // campos e detalhes do formulário de orcamento
        this.formulario.titulo = dados.formulario.titulo;
        this.formulario.descricao = dados.formulario.descricao;
        this.formulario.servicos.titulo = dados.formulario.servicos.titulo;
        this.formulario.servicos.tiposDeServicos = dados.formulario.servicos.tiposDeServicos;
        this.formulario.servicos.imagens = dados.formulario.servicos.imagens;

        this.mensagemDeSucesso = dados.mensagemDeSucesso;

        // combo-box de segmentos do formulario
        this.segmento = dados.segmento;

        this.adicionaMaisTelefoneFixo();
        this.adicionaMaisCelular();

        if (this.aviso.ativo) {
          this.snackBar.open(this.aviso.mensagem, 'Fechar', {
            duration: 60000,
          });
        }
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
  trackByIndex(index: number): any {
    return index;
  }
  mudaTipoPessoa() {
    this.tipoPessoa.estado = !this.tipoPessoa.estado;
    if (this.tipoPessoa.estado) {
      this.tipoPessoa.tipo = 'Pessoa Física';
    } else {
      this.tipoPessoa.tipo = 'Pessoa Juridica';
    }
  }

  adicionaMaisTelefoneFixo() {
    this.formularioCliente.telefoneFixo.push(null);
  }
  adicionaMaisCelular() {
    this.formularioCliente.celular.push(null);
  }

  trocaTipoPessoa() {
    this.padraoTipoPessoa = !this.padraoTipoPessoa;
  }

  escolhaSegmento(segmento: string) {
    this.formularioCliente.segmento = segmento;
  }

  escolhaTipoServico(servico: string, escolhido: number) {
    this.formularioCliente.servicoEscolhido = servico;

    for (let i = 0; i < this.formulario.servicos.imagens.length; i++) {
        this.servicoEscolhido[i] = false;
    }
    this.servicoEscolhido[escolhido] = true;
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
        }, 3000);
      } else {
        this.emailValido = false;
        this.emailValidoMessage = true;
        setTimeout(() => {
          this.emailValidoMessage = false;
        }, 3000);
      }
  }
  enviaFormulario(mensagemModal: any) {
    if (this.padraoTipoPessoa === true) {
      this.formularioCliente.tipoPessoa.tipo = 'cnpj';
    } else {
      this.formularioCliente.tipoPessoa.tipo = 'cpf';
    }

    if (this.formularioCliente.nome.length >= 3 && this.emailValido === true) {

        const docs = { formularioCliente: this.formularioCliente };

        this.inscricao = this.http.setOrcamentoClienteAll(docs).subscribe(
          (resolve) => {
            this.http.getOrcamentoAll().subscribe(
              (responseMensagemSucesso) => {
                const dados = responseMensagemSucesso[0];

                this.mensagemDeSucesso = dados.mensagemDeSucesso;
              }
            );
            this.abrirModal(mensagemModal);
            this.formularioCliente = {
              nome: '',
              email: '',
              telefoneFixo: [null],
              celular: [null],
              empresa: '',
              tipoPessoa: {
                tipo: '',
                numero: '',
              },
              segmento: '',
              servicoEscolhido: '',
              detalhamento: {
                largura: Number(null),
                altura: Number(null),
                quantidade: Number(null),
                cor: String('#ffffff'),
                mensagem: String(''),
                anexo: String(),
              }
            };
          },
          (erro) => {
            this.mensagemDeSucesso.titulo = 'Mensagem NÃO enviada!';
            this.mensagemDeSucesso.subtitulo = 'Verifique sua conexão com a internet e tente novamente!';
            this.abrirModal(mensagemModal);
          },
          () => {
            console.log('Pedido cadastrado com sucesso!');
          }
        );
    } else {
      this.mensagemDeSucesso.titulo = 'Mensagem NÃO enviada!';
      this.mensagemDeSucesso.subtitulo = 'Preencha pelo menos os campos obrigatorios e tente novamente';
      this.abrirModal(mensagemModal)
    }
  }
  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
