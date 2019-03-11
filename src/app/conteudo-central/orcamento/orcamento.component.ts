import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrcamentoService } from 'src/app/shared/services/orcamento/orcamento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected padraoTipoPessoa = true;
  protected statusEnvioFormulario = false;
  protected servicoEscolhido = false;
  protected ativo = [false, false, false];

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

  constructor(private http: OrcamentoService) { }

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
      },
      (erro) => {
        console.log('Não pode conectar, verifique sua conexão com a internet e tente novamente');
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
    console.log(this.formularioCliente.segmento); // concertar
  }
  escolhaTipoServico(servico: string) {
    this.formularioCliente.servicoEscolhido = servico;
    this.servicoEscolhido = true;
  }
  ativaOpcao(indice: number) {
    this.ativo[indice] = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.ativo.length; i++) {
      if (this.ativo[i] !== this.ativo[indice]) {
        this.ativo[i] = false;
      }
    }
  }
  testando() {
    console.log(this.formularioCliente);
  }

  enviaFormulario() {
    if (this.padraoTipoPessoa === true) {
      this.formularioCliente.tipoPessoa.tipo = 'cnpj';
    } else {
      this.formularioCliente.tipoPessoa.tipo = 'cpf';
    }
    const docs = { formularioCliente: this.formularioCliente };

    this.inscricao = this.http.setOrcamentoClienteAll(docs).subscribe(
      (resolve) => {
        this.statusEnvioFormulario = true;
        setTimeout(() => {
          this.statusEnvioFormulario = false;
        }, 7000);
      },
      (erro) => {
        this.statusEnvioFormulario = false;
      },
      () => {
        console.log('Cliente cadastrado com sucesso!');
      }
    );
  }
}
