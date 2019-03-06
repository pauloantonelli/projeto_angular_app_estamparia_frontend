export interface OrcamentoInterface {
  aviso: {
    ativo: boolean;
    mensagem: string;
  };
  formulario: {
    titulo: string;
    descricao: string;
    servicos: {
      titulo: string;
      tiposDeServicos: [];
      imagens: [];
    };
    segmento: [];
    detalhamento: [];
  };
  formularioCliente: {
    nome: string,
    email: string,
    telefoneFixo: [],
    celular: [],
    empresa: string,
    tipoPessoa: {
      tipo: string,
      numero: string,
    },
    segmento: string,
    servicoEscolhido: string,
    detalhamento: {
      largura: number,
      altura: number,
      quantidade: number,
      cor: string,
      mensagem: string,
      anexo: string,
    }
  };
}
