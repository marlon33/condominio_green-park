import CSVUploader from '../services/CsvService';
import BoletosRepository from '../repositories/BoletosRepository';

class BoletosProcessor {
    protected csvProcessor = new CSVUploader();
    protected boletosRepository = new BoletosRepository();
    async processCSV(file: object | any) {
        const fileData = await this.csvProcessor.uploadAndReadFileCSV(file.filename);
        for (const data of fileData) {
            await this.boletosRepository.createBoletos(data);
        }

        return fileData;
    }
}

export default BoletosProcessor;
