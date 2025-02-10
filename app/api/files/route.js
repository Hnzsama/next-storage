import { readdir, stat } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request) {
    try {
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const files = await readdir(uploadDir);
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host');
        const baseUrl = `${protocol}://${host}`;
        
        const filesData = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(uploadDir, filename);
                const stats = await stat(filePath);
                return {
                    name: filename,
                    url: `${baseUrl}/uploads/${filename}`,
                    size: stats.size,
                    created: stats.birthtime,
                    modified: stats.mtime,
                    type: path.extname(filename).slice(1)
                };
            })
        );

        return NextResponse.json({
            files: filesData.sort((a, b) => b.created - a.created)
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to list files" },
            { status: 500 }
        );
    }
}
