export type ServiceOrderStatus =
  | "ABERTA"
  | "EM_ANDAMENTO"
  | "AGUARDANDO_PECAS"
  | "AGUARDANDO_CLIENTE"
  | "FINALIZADA"
  | "CANCELADA";

export interface Client {
  codigocliente?: number;
  codigoCliente?: number;
  nomecliente?: string;
  nomeCliente?: string;
  cpfcnpj?: string;
  cpfCnpj?: string;
  fone?: string;
  email?: string;
}

export interface Product {
  codigoproduto?: number;
  codigoProduto?: number;
  nomeproduto?: string;
  nomeProduto?: string;
  preco?: string | number;
  estoque?: string | number;
  unidade?: string;
}

export interface PaymentMethod {
  codigoformapagamento?: number;
  codigoFormaPagamento?: number;
  descricao: string;
  status: string;
}

export interface ServiceOrder {
  codigoMovimentoOS: number;
  ordemMovimentoOS: string;
  codigoCliente: number;
  dataAbertura: string;
  dataFechamento?: string | null;
  status: ServiceOrderStatus;
  observacao?: string | null;
  total: string | number;
}

export type CreateClient = Omit<Client, "codigocliente" | "codigoCliente">;

export interface CreateProduct {
  nomeProduto: string;
  preco: string;
  estoque: string;
  unidade: string;
}

export interface CreatePaymentMethod {
  descricao: string;
  status: string;
}

export interface CreateServiceOrder {
  ordemMovimentoOS: string;
  codigoCliente: number;
  status: ServiceOrderStatus;
  observacao?: string;
  total?: number;
}
