import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContatoService } from 'src/app/shared/services/contato/contato.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected envio = false;

  // dados da administracao
  protected telefones: [];
  protected atendimento = {
    diaDaSemana: '',
    horario: '',
  };
  protected endereco = {
    rua: '',
    numero: null,
    bairro: '',
    cep: '',
    estado: '',
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

  constructor(private http: ContatoService) {
  }

  ngOnInit() {
    this.inscricao = this.http.getContatoAll().subscribe(
      (res) => {
      const dados = res[0];

      this.telefones = dados.telefones;

      this.atendimento.diaDaSemana = dados.atendimento.diaDaSemana;
      this.atendimento.horario = dados.atendimento.horario;

      this.endereco.rua = dados.endereco.rua;
      this.endereco.numero = dados.endereco.numero;
      this.endereco.bairro = dados.endereco.bairro;
      this.endereco.cep = dados.endereco.cep;
      this.endereco.estado = dados.endereco.estado;
    });
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
}
