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
              "public_id": "folder/filename_publicid",  // ID untuk delete
              "name": "original_filename.jpg",
              "url": "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/filename_publicid.jpg",
              "size": 123456,
              "created": "2024-01-01T00:00:00.000Z",
              "type": "jpg",
              "width": 800,
              "height": 600
            }
          ]
        },
        "note": "Use public_id for DELETE operations"
      },
      "delete": {
        "endpoint": "DELETE /api/files/:public_id",
        "example": "DELETE /api/files/folder/filename_publicid",
        "response": {
          "message": "File deleted successfully",
          "filename": "folder/filename_publicid"
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
