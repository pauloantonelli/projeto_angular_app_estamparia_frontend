import { Component, OnInit, OnDestroy, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ContatoService } from '../shared/services/contato/contato.service';
import { Subscription } from 'rxjs';
import { RodapeService } from '../shared/services/rodape/rodape.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss'],
  preserveWhitespaces: true,
})
export class RodapeComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;

  // dados reaproveitados do contato
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

  protected rodape = {
    titulo: '',
    subtitulo: '',
    btnTxt: '',
    sucesso: '',
  };
  protected redesSociais = {
    icones: [],
    links: [],
  };
  protected email = '';
  protected enviado = false;

  constructor(
    private httpContato: ContatoService,
    private http: RodapeService) {}

  ngOnInit() {
    this.inscricao = this.httpContato.getContatoAll().subscribe(
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
    this.inscricao = this.http.getRodapeAll().subscribe(
      (response) => {
        const dados = response[0];

        this.rodape = dados.rodape;

        this.redesSociais = dados.redesSociais;
      }
    );
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
  novoCadastroEmailCliente() {
    const docs = { email: this.email };
    this.inscricao = this.http.setRodapeCadastroEmail(docs).subscribe(
      (response) => {
        // dados gravados com sucesso recupera mensagem do servidor e retorna
        this.inscricao = this.http.getRodapeAll().subscribe(
          (responseCAdastro) => {
            const dados = responseCAdastro[0];
            this.rodape.sucesso = dados.rodape.sucesso;
          }
        );
        this.mensagemDeAlertaCliente();
      },
      (erro) => {
        this.rodape.sucesso = 'Por favor, verifique a sua conexão com a internet e tente novamente!';
        this.mensagemDeAlertaCliente();
      },
      () => {
        console.log('Conexão e atualização feitas com sucesso!');
      }
    );
  }
  mensagemDeAlertaCliente() {
    this.enviado = !this.enviado;
    setTimeout(() => {
      this.enviado = !this.enviado;
    }, 10000);
  }
  @HostListener('keypress') validacaoEmail() {
    if (this.email.includes('@') && this.email.includes('.')) {
      document.getElementById('email').style.borderColor = 'green';
    } else {
      document.getElementById('email').style.borderColor = 'red';
    }
  }
}
