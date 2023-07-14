import multer from 'multer';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

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

