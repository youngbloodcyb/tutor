"use server";

import { db } from "@/lib/db";
import { resource as resourceTable } from "@/lib/db/schema";
import { embeddings as embeddingsTable } from "@/lib/db/schema";
import { authenticatedAction } from "./safe";
import { generateEmbeddings } from "../ai/embedding";
import { put } from "@vercel/blob";
import { z } from "zod";

const createResourceSchema = z.object({
  file: z.instanceof(File),
  content: z.string(),
});

export const createResource = authenticatedAction
  .schema(createResourceSchema)
  .action(async ({ parsedInput }) => {
    const { file, content } = parsedInput;

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });

    // Create resource in database
    const [resource] = await db
      .insert(resourceTable)
      .values({
        id: crypto.randomUUID(),
        link: blob.url,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Generate and store embeddings
    const embeddings = await generateEmbeddings(content);
    await db.insert(embeddingsTable).values(
      embeddings.map((embedding) => ({
        id: crypto.randomUUID(),
        resourceId: resource.id,
        ...embedding,
      }))
    );

    return {
      success: true,
      message: "Resource successfully created and embedded.",
    };
  });
