import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET() {
    try {
        const { resources } = await cloudinary.api.resources({
            type: 'upload',
            prefix: '',
            max_results: 100
        });

        const files = resources.map(file => ({
            public_id: file.public_id,      // ID yang digunakan untuk delete
            name: file.filename,            // Nama original file
            url: file.secure_url,
            size: file.bytes,
            created: file.created_at,
            type: file.format,
            width: file.width,
            height: file.height
        }));

        return NextResponse.json({
            files: files
        });
    } catch (error) {
        console.error('List files error:', error);
        return NextResponse.json(
            { error: "Failed to list files: " + error.message },
            { status: 500 }
        );
    }
}
