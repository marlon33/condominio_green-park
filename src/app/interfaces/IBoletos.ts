export interface IBoletos{
    id?: number;
    nome_sacado: string;
    id_lote: number;
    valor: number;
    linha_digitavel: string;
    ativo: boolean;
    criado_em: Date;
}
