"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useBlockStore } from "@/lib/stores/block-store";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Grip,
} from "lucide-react";

interface TiptapBlockProps {
  block: any;
  isSelected: boolean;
}

export function TiptapBlock({ block, isSelected }: TiptapBlockProps) {
  const selectBlock = useBlockStore((state) => state.selectBlock);
  const updateBlock = useBlockStore((state) => state.updateBlock);

  const editor = useEditor({
    extensions: [StarterKit],
    content: block.content || "<p>Click to edit content...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none min-h-[100px]",
      },
    },
    onUpdate: ({ editor }) => {
      updateBlock(block.id, {
        ...block,
        content: editor.getHTML(),
      });
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div onClick={() => selectBlock(block.id)} className="relative">
      <div className="flex items-center gap-1 mb-2 text-muted-foreground">
        <Grip className="h-4 w-4" />
        <span className="text-xs font-medium">{block.title}</span>
      </div>

      {isSelected && block.showToolbar && (
        <div className="flex items-center gap-1 mb-2 bg-muted p-1 rounded-md">
          <Button
            variant="noShadow"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="noShadow"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "bg-muted-foreground/20" : ""
            }
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="noShadow"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? "bg-muted-foreground/20" : ""
            }
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="noShadow"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList") ? "bg-muted-foreground/20" : ""
            }
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="noShadow"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "bg-muted-foreground/20"
                : ""
            }
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="noShadow"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "bg-muted-foreground/20"
                : ""
            }
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
