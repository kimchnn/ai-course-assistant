"use client";

import { CloudUpload, X } from "lucide-react";
import { Button } from "./ui/button";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "./ui/file-upload";
import React from "react";

export default function UploadMaterials() {
  const [files, setFiles] = React.useState<File[]>([]);

  function handleClearAll() {
    setFiles([]);
  }

  function handleProcessFiles() {
    console.log("Files to process:", files);

    // TODO:
    // send to backend
    // extract text
    // upload with FormData
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
          </FileUpload>

          {files.length > 0 && (
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleClearAll}>
                Clear All
              </Button>

              <Button onClick={handleProcessFiles}>
                Upload
              </Button>
            </div>
          )}
      </div>
    </section>
  );
}