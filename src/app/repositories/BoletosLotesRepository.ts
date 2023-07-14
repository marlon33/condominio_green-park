import BoletosLotes from "../entities/BoletosLotes";
import IBoletosLotes from "../interfaces/IBoletosLotes";
import { AppDataSource } from "../../database/db";

class BoletosLotesRepository {
    private boletosLotesRepository = AppDataSource.getRepository(BoletosLotes);

    public async getBoletosLotes(): Promise<IBoletosLotes[]> {
        const boletosLotes: BoletosLotes[] = await this.boletosLotesRepository
            .createQueryBuilder('boletosLotes')
            .orderBy('id')
            .getMany();
        return boletosLotes;
    }
}

export default BoletosLotesRepository;
