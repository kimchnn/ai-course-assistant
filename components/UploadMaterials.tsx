"use client";

import { CloudUpload, X } from "lucide-react";
import { Button } from "./ui/button";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "./ui/file-upload";
import { useState } from "react";

export default function UploadMaterials() {
  const [files, setFiles] = useState<File[]>([]);

  function handleClearAll() {
    setFiles([]);
  }

  async function handleProcessFiles() {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/ingest', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to upload ${file.name}: ${text}`);
        }

        console.log(`Uploaded: ${file.name}`);
      } catch (error) {
        console.error(error);
      }
    }
    setFiles([]);
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
      </div>
    </section>
  );
}