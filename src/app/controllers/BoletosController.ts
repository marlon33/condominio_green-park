import { Request, Response, Router } from 'express';
import CSVUploader from '../services/CsvService';
import PDFUploader from '../services/PdfService';
import BoletosProcessor from '../services/BoletoService';

const boletosRouter = Router();
const boletosProcessor = new BoletosProcessor();
const csvProcessor = new CSVUploader();
const pdfProcessor = new PDFUploader();

boletosRouter.get('/csv', csvProcessor.uploadCSV.single('file_upload'), async (req: Request, res: Response): Promise<object> => {
    const file = req.file;
    const result = await boletosProcessor.processCSV(file)
        .then((fileData) => {
            return fileData;
        })
        .catch((error) => {
            return error;
        });
    return res.status(200).json(result);
});

boletosRouter.get('/pdf', pdfProcessor.uploadPDF.single('file_upload'), async (req: Request, res: Response): Promise<object> => {
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

boletosRouter.get('/', async (req: Request, res: Response): Promise<object> => {
    const queryParams = req.query;
    const result = await boletosProcessor.listBoletos(queryParams);
    return res.status(200).json(result);
});

export default boletosRouter;

