export interface MovimentoParcelaOS {
    codigoParcelaOS?: number;
    codigoMovimentoOS: number;
    codigoFormaPagamento: number;
    numeroParcela: number;
    valor: number;
    dataVencimento: Date;
    dataPagamento?: Date | null;
    status:
        | 'PENDENTE'
        | 'PAGO'
        | 'ATRASADO'
        | 'CANCELADO';
    observacao?: string | null;
}
