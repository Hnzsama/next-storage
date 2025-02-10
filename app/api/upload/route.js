import { NextResponse } from 'next/server';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import { mkdir, rename } from 'fs/promises';
import { existsSync } from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveFile = async (file) => {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(file.originalFilename || '');
    const filename = `${uuidv4()}${fileExt}`;
    const newPath = path.join(uploadDir, filename);

    await rename(file.filepath, newPath);
    
    return {
        filename,
        originalName: file.originalFilename,
        size: file.size,
        type: file.mimetype
    };
};

// Handle CORS preflight requests
export async function OPTIONS(request) {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(request) {
    try {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'tmp'),
            keepExtensions: true,
            maxFileSize: Infinity // No file size limit
        });

        // Get the host from request headers
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host');
        const baseUrl = `${protocol}://${host}`;

        if (!existsSync(path.join(process.cwd(), 'tmp'))) {
            await mkdir(path.join(process.cwd(), 'tmp'), { recursive: true });
        }

        return new Promise((resolve, reject) => {
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    reject(NextResponse.json(
                        { error: "Upload failed: " + err.message },
                        { status: 500 }
                    ));
                    return;
                }

                try {
                    const file = files.file[0];
                    const savedFile = await saveFile(file);
                    const fullUrl = `${baseUrl}/uploads/${savedFile.filename}`;

                    const response = NextResponse.json({
                        message: "Upload successful",
                        filename: savedFile.filename,
                        originalName: savedFile.originalName,
                        url: fullUrl, // Now returning full URL
                        relativeUrl: `/uploads/${savedFile.filename}`, // Keep relative URL as well
                        size: savedFile.size
                    });

                    // Add CORS headers
                    response.headers.set('Access-Control-Allow-Origin', '*');
                    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

                    resolve(response);
                } catch (error) {
                    reject(NextResponse.json(
                        { error: "Upload failed: " + error.message },
                        { status: 500 }
                    ));
                }
            });
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Upload failed: " + error.message },
            { status: 500 }
        );
    }
}
