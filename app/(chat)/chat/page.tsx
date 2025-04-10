"use client";

import { useChat } from "@ai-sdk/react";
import { Weather } from "@/components/ai/weather";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Paperclip } from "lucide-react";
import { FractionVisualizer } from "@/components/ai/fraction";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
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

export default function Page() {
  const { execute, isExecuting } = useAction(createResource, {
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
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("content", input);

    setIsUploading(true);
    execute(formData);
  };

  return (
    <div className="p-20 w-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Chat</h1>
      <div className="flex flex-col gap-4 w-[600px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-4 max-w-[26rem] ${
                message.role === "user" ? "bg-white" : "bg-gray-100"
              }`}
            >
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>

              <div className="space-y-4">
                {message.toolInvocations?.map((toolInvocation) => {
                  const { toolName, toolCallId, state } = toolInvocation;

                  switch (state) {
                    case "result": {
                      switch (toolName) {
                        case "displayWeather": {
                          const { result } = toolInvocation;
                          return (
                            <div key={toolCallId}>
                              <Weather {...result} />
                            </div>
                          );
                        }
                        case "displayFraction": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div key={toolCallId}>
                              <FractionVisualizer {...result} />
                            </div>
                          );
                        }
                        default:
                          return null;
                      }
                    }
                    default: {
                      switch (toolName) {
                        case "displayWeather":
                          return (
                            <div key={toolCallId}>
                              <div>Loading weather...</div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    }
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-[600px] relative">
        <div className="flex gap-2 w-full">
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type a message..."
            className="shadow-shadow resize-none min-h-[100px]"
            rows={4}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" size="icon" className="px-4">
              <SendHorizonal />
            </Button>
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
                        accept=".txt,.json,.pdf"
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
                      <p className="text-xs text-gray-400">
                        TXT, JSON, PDF up to 2MB
                      </p>
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
          </div>
        </div>
      </form>
    </div>
  );
}
