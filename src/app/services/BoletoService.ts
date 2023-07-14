import CSVUploader from '../services/CsvService';
import PDFUploader from '../services/PdfService';
import BoletosRepository from '../repositories/BoletosRepository';
import { IFileParams } from '../interfaces/IFileParams';

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

}

export default BoletosProcessor;
