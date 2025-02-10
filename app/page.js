export default function Home() {
  const docs = {
    "api": {
      "upload": {
        "endpoint": "POST /api/upload",
        "contentType": "multipart/form-data",
        "request": {
          "file": "(binary)"
        },
        "response": {
          "message": "Upload successful",
          "filename": "cloudinary_public_id",
          "originalName": "example.jpg",
          "url": "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/cloudinary_public_id.jpg",
          "size": 123456
        },
        "error": {
          "error": "Upload failed: error message"
        }
      },
      "list": {
        "endpoint": "GET /api/files",
        "response": {
          "files": [
            {
              "public_id": "folder/filename_xxxx",     // Use this ID for delete
              "name": "folder/filename_xxxx",
              "url": "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/filename_xxxx.jpg",
              "size": 123456,
              "created": "2024-01-01T00:00:00.000Z",
              "type": "jpg",
              "width": 800,
              "height": 600,
              "folder": "folder_name",
              "asset_id": "asset_xxx123xxx"
            }
          ]
        },
        "note": "Use public_id from list response for delete operation",
        "error": {
          "error": "Failed to list files: error message"
        }
      },
      "delete": {
        "endpoint": "DELETE /api/files/:cloudinary_public_id",
        "response": {
          "message": "File deleted successfully",
          "filename": "cloudinary_public_id"
        },
        "error": {
          "error": "File not found or already deleted"
        }
      }
    }
  };

  return (
    <pre className="p-8 bg-black text-white font-mono text-sm min-h-screen">
      {JSON.stringify(docs, null, 2)}
    </pre>
  );
}
