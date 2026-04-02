"use client";

import { CloudUpload, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "./ui/file-upload";
import { useEffect, useState } from "react";

type UploadedDoc = { id: string; name: string; createdAt: string };

export default function UploadMaterials({ courseId }: { courseId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);

  async function fetchDocs() {
    const res = await fetch(`/api/resources?courseId=${encodeURIComponent(courseId)}`);
    if (res.ok) setUploadedDocs(await res.json());
  }

  useEffect(() => {
    fetchDocs();
  }, [courseId]);

  function handleClearAll() {
    setFiles([]);
  }

  async function handleProcessFiles() {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('courseId', courseId);

      try {
        const response = await fetch('/api/ingest', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to upload ${file.name}: ${text}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setFiles([]);
    fetchDocs();
  }

  return (
    <section className="mb-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <FileUpload
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
          value={files}
          onValueChange={setFiles}
          multiple
        >
          {files.length === 0 && (
            <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
              <CloudUpload className="size-4" />
              <span className="text-sm">Drag and drop or</span>

              <FileUploadTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0">
                  choose files
                </Button>
              </FileUploadTrigger>

              <span className="text-sm">to upload</span>
            </FileUploadDropzone>
          )}

          <FileUploadList className="grid grid-cols-5 gap-3">
            {files.map((file, index) => (
              <FileUploadItem
                key={`${file.name}-${file.lastModified}-${index}`}
                value={file}
              >
                <FileUploadItemPreview />
                <FileUploadItemMetadata />

                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X className="size-4" />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>

          {files.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <FileUploadTrigger asChild>
                  <Button variant="outline">Add More</Button>
                </FileUploadTrigger>
                <Button variant="outline" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>
              <Button onClick={handleProcessFiles}>Upload</Button>
            </div>
          )}
        </FileUpload>

        {uploadedDocs.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="mb-3 text-sm font-medium text-gray-700">Uploaded Documents</h3>
            <ul className="space-y-2">
              {uploadedDocs.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                    <span>{doc.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-gray-400 hover:text-red-500"
                    onClick={async () => {
                      await fetch(`/api/resources?id=${doc.id}`, { method: 'DELETE' });
                      fetchDocs();
                    }}
                  >
                    <X className="size-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
