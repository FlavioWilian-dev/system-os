export interface Produto {
  codigoProduto: string;
  nomeProduto: string;
  descricao?: string;
  preco?: number;
  estoque: number;
}