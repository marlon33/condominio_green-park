import Boletos from "../entities/Boletos";
import BoletosLotes from "../entities/BoletosLotes";
import { IBoletos } from "../interfaces/IBoletos";
import { IBoletosParams } from "../interfaces/IBoletosParams";
import IBoletosLotes from "../interfaces/IBoletosLotes";
import { AppDataSource } from "../../database/db";

class BoletosRepository {
    private boletosRepository = AppDataSource.getRepository(Boletos);
    private boletosLotesRepository = AppDataSource.getRepository(BoletosLotes);

    public async getBoletoByNomeLote(data: IBoletosParams): Promise<IBoletosLotes> {
        const idLote = data.id_lote.toString().padStart(4, '0');
        const query = this.boletosLotesRepository.createQueryBuilder('boletos_lotes')
            .where("nome_lote = :nome_lote", { nome_lote: idLote });
        const boletos = await query.getOne();

        return boletos;
    }

    public async createBoletos(data: IBoletosParams): Promise<IBoletos[]> {
        const getlistBoletos = await this.getBoletoByNomeLote({ id_lote: data.unidade });
        const boletos: Boletos[] = await this.boletosRepository.save([
            {
                nome_sacado: data.nome,
                id_lote: getlistBoletos.id_lote,
                valor: data.valor,
                linha_digitavel: data.linha_digitavel,
                ativo: true,
            }
        ]);

        return boletos;
    }
}

export default BoletosRepository;
