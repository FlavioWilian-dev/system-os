export interface MovimentoOS {
    codigoMovimentoOS?: number;
    ordemMovimentoOS: string;
    codigoCliente: number;
    dataAbertura?: Date;
    dataFechamento?: Date | null;
    status:
        | 'ABERTA'
        | 'EM_ANDAMENTO'
        | 'AGUARDANDO_PECAS'
        | 'AGUARDANDO_CLIENTE'
        | 'FINALIZADA'
        | 'CANCELADA';
    observacao?: string | null;
    total?: number;
}