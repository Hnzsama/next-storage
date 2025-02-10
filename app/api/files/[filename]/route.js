import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function DELETE(request, { params }) {
    try {
        const { filename } = params;
        const filePath = path.join(process.cwd(), 'public/uploads', filename);

        if (!existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        await unlink(filePath);

        return NextResponse.json({
            message: "File deleted successfully",
            filename: filename
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete file: " + error.message },
            { status: 500 }
        );
    }
}
