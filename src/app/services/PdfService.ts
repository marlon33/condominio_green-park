import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PDFExtract } from 'pdf.js-extract';
import { Template, BLANK_PDF, generate } from '@pdfme/generator';

class PDFUploader {
    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../uploads/pdf'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    public uploadPDF = multer({ storage: this.storage });

    private async readPDFFile(filePath: string, delimiter = ';'): Promise<object[]> {
        
        const options = {
            separator: delimiter,
        };
        
        return new Promise(async (resolve, reject) => {
            let results: object[] = [];
            const pdfStructure = await new PDFExtract().extract(filePath, {});
            pdfStructure.pages.forEach(async (page, index, arr) => {
                const width = page.pageInfo.width;
                const height = page.pageInfo.height;
                const text = page.content.map(({ str }) => str).join(' ');
                const x = parseFloat(page.content.map(({ x }) => x).join(' '));
                const y = parseFloat(page.content.map(({ y }) => y).join(' '));

                const template: Template = {
                    basePdf: BLANK_PDF,
                    schemas: [
                        {
                            a: {
                                type: 'text',
                                position: { x: x, y: y },
                                width: width,
                                height: height,
                            },
                        },
                    ],
                };
                const inputs = [{ a: text }];

                const pdfGenerated = await generate({ template, inputs }).then((pdf) => {
                    fs.writeFileSync(path.join(__dirname, `../../public/pdf/${index + 1}.pdf`), pdf);
                    return {
                        file: `${index + 1}.pdf`,
                        dir: `/public/pdf/${index + 1}.pdf`
                    }
                });
                results.push(pdfGenerated);
                if(((index+1) == arr.length)){
                    resolve(results)
                }
            });
        });
    }

    public async uploadAndReadFilePDF(filename: string): Promise<object[]> {
        const fileJustUploaded = path.join(__dirname, '../../uploads/pdf', filename);
        try {
            const data = await this.readPDFFile(fileJustUploaded, ';');
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default PDFUploader;
