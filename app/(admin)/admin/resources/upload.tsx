"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createResource } from "@/lib/data/resource";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/lib/hooks/use-toast";
import { Paperclip } from "lucide-react";

export function Upload() {
  const { execute } = useAction(createResource, {
    onSuccess: () => {
      setIsUploading(false);
      toast({
        title: "Resource uploaded successfully",
      });
    },
    onError: () => {
      setIsUploading(false);
      toast({
        title: "Failed to upload resource",
      });
    },
  });
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);
    execute(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="icon" className="px-4">
          <Paperclip className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label
              htmlFor="image-upload"
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
            >
              <input
                id="image-upload"
                type="file"
                accept=".txt,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                  }
                }}
              />
              <Paperclip className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">TXT, JSON up to 2MB</p>
            </label>
            {selectedFile && (
              <p className="text-sm text-gray-500">
                Selected: {selectedFile.name}
              </p>
            )}
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
