import multer from 'multer';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

// Classe Responsavel por todo o processamento do aqruivo CSV
class CSVUploader {
    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../uploads/csv'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    public uploadCSV = multer({ storage: this.storage });

    // Função responsavel por fazer a leitura do arquivo csv
    public async readCSVFile(filePath: string, delimiter = ';'): Promise<object[]> {
        const results: object[] = [];
        const options = {
            separator: delimiter,
        };

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv(options))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }

    // Função responsavel por fazer o upload e leitura do arquivo csv e retorar linha por linha e seus indices
    public async uploadAndReadFileCSV(filename: string): Promise<object[]> {
        const fileJustUploaded = path.join(__dirname, '../../uploads/csv', filename);
        try {
            const data = await this.readCSVFile(fileJustUploaded, ';');
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default CSVUploader;

