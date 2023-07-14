import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PDFExtract } from 'pdf.js-extract';
import PdfOrderRepository from '../repositories/PdfOrderRepository';
import { IPdfOrder } from '../interfaces/IPdfOrder';
import PDFDocument from 'pdfkit';

// Classe Responsavel por todo o processamento do aqruivo PDF
class PDFUploader {
    protected pdfOrderRepository = new PdfOrderRepository();

    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../uploads/pdf'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    public uploadPDF = multer({ storage: this.storage });

    // Função responsavel por fazer a leitura do arquivo cpdf
    private async readPDFFile(filePath: string): Promise<object[]> {
        interface IData {
            index: number;
            order: number;
            id_lote: number;
        }
        let order: IData[] = [];

        // Responsavel por buscar no banco de dados a ordem dos boletos no pdf
        const getPdfOrder: IPdfOrder[] = await this.pdfOrderRepository.getPdfOrder();
        getPdfOrder.forEach((el, index) => {
            order.push({
                index,
                order: el.pdf_order,
                id_lote: el.id_lote
            });
        });

        // Promise responsavel por separar na order os boletos que foi feito o upload
        return new Promise(async (resolve, reject) => {
            let results: object[] = [];
            const pdfStructure = await new PDFExtract().extract(filePath, {});
            pdfStructure.pages.forEach(async (page, index, arr) => {
                const width = page.pageInfo.width;
                const height = page.pageInfo.height;
                const text = page.content.map(({ str }) => str).join(' ');
                const x = parseFloat(page.content.map(({ x }) => x).join(' '));
                const y = parseFloat(page.content.map(({ y }) => y).join(' '));

                const doc = new PDFDocument();
                doc.fontSize(20).text(`${text}`, 100, 100);
                doc.pipe(fs.createWriteStream(path.join(__dirname, `../../public/pdf/${order[index].order}.pdf`)));
                doc.end();

                results.push({
                    file: `${order[index].order}.pdf`,
                    dir: `/public/pdf/${order[index].order}.pdf`
                });
                if (((index + 1) == arr.length)) {
                    resolve(results)
                }
            });
        });
    }


    // Função responsavel por fazer o upload e leitura do arquivo pdf
    public async uploadAndReadFilePDF(filename: string): Promise<object[]> {
        const fileJustUploaded = path.join(__dirname, '../../uploads/pdf', filename);
        try {
            const data = await this.readPDFFile(fileJustUploaded);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // Funçaõ responsavel por criar o pdf com a tabela em base64
    public async createTable(doc: PDFKit.PDFDocument, tableData: any[][], columnWidths: number[], columnPositions: number[], options: any) {
        // Promise para retornar a base64
        return new Promise<string>((resolve, reject) => {
            const table = {
                headers: options.headers || [],
                rows: tableData || [],
                rowCount: tableData.length || 0,
                columnCount: options.headers ? options.headers.length : 0,
                width: options.width || 500,
                padding: options.padding || 10,
                margin: options.margin || 50,
                columnWidths: columnWidths || [],
                columnPositions: columnPositions || []
            };

            const cellHeight = 20;

            doc.fontSize(options.fontSize || 11);
            doc.font(options.font || 'Helvetica');

            let y = table.margin;

            // Cria o cabeçalho
            table.headers.forEach((header: any, index: any) => {
                const cellWidth = table.columnWidths[index];
                const cellPositions = table.columnPositions[index];
                doc.rect(table.margin + index * cellPositions, y, cellWidth, cellHeight).stroke();
                doc.text(header, table.margin + index * cellPositions + table.padding, y + table.padding);
            });

            y += cellHeight;

            // Cria as linhas da tabela
            table.rows.forEach((row) => {
                table.headers.forEach((header: any, index: any) => {
                    const cellWidth = table.columnWidths[index];
                    const cellPositions = table.columnPositions[index];
                    doc.rect(table.margin + index * cellPositions, y, cellWidth, cellHeight).stroke();
                    doc.text(row[index], table.margin + index * cellPositions + table.padding, y + table.padding);
                });
                y += cellHeight;
            });

            // DAqui para baixo e responsavel por "Criar" o pdf em base64
            const chunks: any[] = [];
            const stream = doc;

            stream.on('data', (chunk) => {
                chunks.push(chunk);
            });

            stream.on('end', () => {
                const pdfBuffer = Buffer.concat(chunks);
                const base64String = pdfBuffer.toString('base64');
                resolve(base64String);
            });

            doc.end();

            stream.on('error', (error) => {
                reject(error);
            });
        });
    }

    // Função responsavel por pegar os parametros vindos do banco de dados e gerar o relatorio
    public async generatePdfBase64(params: object | any): Promise<string> {
        let tableData: string[][] = [];

        params.forEach((boleto: any, index: number) => {
            tableData.push([
                boleto.id,
                boleto.nome_sacado,
                boleto.id_lote,
                boleto.valor,
                boleto.linha_digitavel
            ])
        });

        const doc = new PDFDocument();

        const columnWidths = [50, 150, 50, 60, 200];
        const columnPositions = [50, 50, 100, 83.5, 77.7];
        const tableOptions = {
            headers: ['ID', 'NOME SACADO', 'LOTE', 'VALOR', 'LINHA DIGITAVEL'],
            width: 600,
            padding: 10,
            margin: 50,
            fontSize: 12,
            font: 'Helvetica',
        };

        const base64 = await this.createTable(doc, tableData, columnWidths, columnPositions, tableOptions);

        doc.end();
        return base64;
    }
}

export default PDFUploader;
