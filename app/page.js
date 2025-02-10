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
          "filename": "uuid-example.jpg",
          "originalName": "example.jpg",
          "url": "http://domain.com/uploads/uuid-example.jpg",
          "relativeUrl": "/uploads/uuid-example.jpg",
          "size": 123456
        }
      },
      "list": {
        "endpoint": "GET /api/files",
        "response": {
          "files": [
            {
              "name": "uuid-example.jpg",
              "url": "http://domain.com/uploads/uuid-example.jpg",
              "size": 123456,
              "created": "2024-01-01T00:00:00.000Z",
              "modified": "2024-01-01T00:00:00.000Z",
              "type": "jpg"
            }
          ]
        }
      },
      "delete": {
        "endpoint": "DELETE /api/files/:filename",
        "response": {
          "message": "File deleted successfully",
          "filename": "uuid-example.jpg"
        },
        "error": {
          "error": "File not found"
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
