import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function compressImage(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer)
    .resize(800, 600, { fit: 'inside' })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function uploadToR2(file: Buffer, filename: string): Promise<string> {
  try {
    // Compress image
    const compressed = await compressImage(file);
    
    // Generate unique filename
    const id = uuid();
    const ext = '.webp';
    const key = `gold-items/${id}${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: compressed,
      ContentType: 'image/webp',
    });

    await s3.send(command);
    
    return `${process.env.R2_PUBLIC_URL}/${key}`;
  } catch (error) {
    console.error('R2 upload error:', error);
    throw error;
  }
}

export async function deleteFromR2(url: string): Promise<void> {
  try {
    // Extract key from URL
    const key = url.split('.com/')[1];
    
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    // Note: Would need DeleteObjectCommand to actually delete
    // This is a placeholder
  } catch (error) {
    console.error('R2 delete error:', error);
  }
}
