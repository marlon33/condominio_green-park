import CSVUploader from '../services/CsvService';
import PDFUploader from '../services/PdfService';
import BoletosRepository from '../repositories/BoletosRepository';
import { IFileParams } from '../interfaces/IFileParams';
import { IBoletosParams } from "../interfaces/IBoletosParams";

// Class responsavel por processar os boletos, CSV e PDF e lsitar os boletos
class BoletosProcessor {
    protected csvProcessor = new CSVUploader();
    protected pdfProcessor = new PDFUploader();
    protected boletosRepository = new BoletosRepository();

    async processCSV(file: IFileParams): Promise<object[]> {
        const fileData = await this.csvProcessor.uploadAndReadFileCSV(file.filename);
        for (const data of fileData) {
            await this.boletosRepository.createBoletos(data);
        }

        return fileData;
    }


    async processPDF(file: IFileParams): Promise<object[]> {
        const fileData = await this.pdfProcessor.uploadAndReadFilePDF(file.filename);

        return fileData;
    }

    async listBoletos(params: IBoletosParams): Promise<object[]>{
        if(
            (
                !!params.valor_inicial && !!params.valor_final
            ) &&
            params.valor_inicial > params.valor_final
        ){
            return [{
                erro: "valor inical não pode ser maior do que o final"
            }];
        }

        if(params.relatorio){
            const result = await this.boletosRepository.listBoletos(params);
            const base64 = await this.pdfProcessor.generatePdfBase64(result)
            return [{base64}];
        }

        const result = await this.boletosRepository.listBoletos(params);
        
        return result;
    }
}

export default BoletosProcessor;
