import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const reviewsDir = path.join(process.cwd(), 'public/images/reviews');
const doctorPath = path.join(process.cwd(), 'public/images/dr-shallenberger.webp');

async function optimize() {
    // Optimize Reviews (Resize to 150px width)
    if (fs.existsSync(reviewsDir)) {
        console.log('Optimizing reviews...');
        const files = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.webp'));
        for (const file of files) {
            const filePath = path.join(reviewsDir, file);
            // Read, resize, override
            const buffer = await sharp(filePath).resize({ width: 150 }).toBuffer();
            fs.writeFileSync(filePath, buffer);
            console.log(`Optimized: ${file}`);
        }
    }

    // Optimize Doctor (Resize to 600px width)
    if (fs.existsSync(doctorPath)) {
        console.log('Optimizing doctor image...');
        const buffer = await sharp(doctorPath).resize({ width: 600 }).toBuffer();
        fs.writeFileSync(doctorPath, buffer);
        console.log('Optimized: dr-shallenberger.webp');
    }

    // Optimize Products (Resize to 300px width)
    const productsDir = path.join(process.cwd(), 'public/images/product');
    if (fs.existsSync(productsDir)) {
        console.log('Optimizing product images...');
        const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.webp'));
        for (const file of files) {
            const filePath = path.join(productsDir, file);
            const buffer = await sharp(filePath).resize({ width: 300 }).toBuffer();
            fs.writeFileSync(filePath, buffer);
            console.log(`Optimized: ${file}`);
        }
    }
}

optimize().catch(console.error);
