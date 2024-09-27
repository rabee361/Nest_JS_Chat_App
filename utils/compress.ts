import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';


interface CompressedImageResult {
    fileName: string;
    fileSize: string;
  }
  
@Injectable()
export class UploadService {
    async compressImage(file: Express.Multer.File): Promise<CompressedImageResult> {
        const outputDir = "./files/compressed/"
        const fileName = file.filename;
        const filePath = path.join(outputDir, file.filename);
        const compressedImageBuffer = await sharp(file.path)
            .webp({ quality: 75 }) 
            .toBuffer();
            
        fs.writeFileSync(filePath, compressedImageBuffer);
        const stat = fs.statSync(filePath).size
        const fileSize: string = String((stat / 1000000).toFixed(1)) + " MB"
        return {fileName , fileSize}; 
    }
}