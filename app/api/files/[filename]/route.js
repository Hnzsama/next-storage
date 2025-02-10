import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function DELETE(request, { params }) {
    try {
        const { filename } = params;

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(filename);

        if (result.result === 'ok') {
            return NextResponse.json({
                message: "File deleted successfully",
                filename: filename
            });
        } else {
            return NextResponse.json(
                { error: "File not found or already deleted" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { error: "Failed to delete file: " + error.message },
            { status: 500 }
        );
    }
}
