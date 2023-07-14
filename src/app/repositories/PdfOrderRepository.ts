import PdfOrder from "../entities/PdfOrder";
import { IPdfOrder } from "../interfaces/IPdfOrder";
import { AppDataSource } from "../../database/db";

class PdfOrderRepository {
    private pdfOrderRepository = AppDataSource.getRepository(PdfOrder);

    public async getPdfOrder(): Promise<IPdfOrder[]> {
        const pdfOrder: PdfOrder[] = await this.pdfOrderRepository.find();
        return pdfOrder;
    }
}

export default PdfOrderRepository;
