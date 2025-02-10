import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64File}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
    });

    const response = NextResponse.json({
      message: "Upload successful",
      filename: result.public_id,
      originalName: file.name,
      url: result.secure_url,
      size: result.bytes
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Upload failed: " + error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
