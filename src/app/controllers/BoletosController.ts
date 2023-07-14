import { Request, Response, Router } from 'express';
import CSVUploader from '../services/CsvService';
import PDFUploader from '../services/PdfService';
import BoletosProcessor from '../services/BoletoService';

const boletosRouter = Router();
const boletosProcessor = new BoletosProcessor();
const csvProcessor = new CSVUploader();
const pdfProcessor = new PDFUploader();

// Rota para fazer o upload do  arquivo em csv
boletosRouter.post('/csv', csvProcessor.uploadCSV.single('file_upload'), async (req: Request, res: Response): Promise<object> => {
    const file = req.file;
    const result = await boletosProcessor.processCSV(file)
        .then((fileData) => {
            return fileData;
        })
        .catch((error) => {
            return {error: "Deu ruim"};
        });
    return res.status(200).json(result);
});

// Rota para fazer o upload do  arquivo em pdf
boletosRouter.post('/pdf', pdfProcessor.uploadPDF.single('file_upload'), async (req: Request, res: Response): Promise<object> => {
    const file = req.file;
    const result = await boletosProcessor.processPDF(file)
    .then((fileData) => {
        return fileData;
    })
    .catch((error) => {
        return error;
    });
    return res.status(200).json(result);
});

// Rota dos filtros e tbm geração do relatorio em base64
boletosRouter.get('/', async (req: Request, res: Response): Promise<object> => {
    const queryParams = req.query;
    const result = await boletosProcessor.listBoletos(queryParams);
    return res.status(200).json(result);
});

export default boletosRouter;

