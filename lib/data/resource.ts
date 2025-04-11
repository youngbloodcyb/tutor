"use server";

import { db } from "@/lib/db";
import { resource as resourceTable } from "@/lib/db/schema";
import { embeddings as embeddingsTable } from "@/lib/db/schema";
import { adminAction } from "./safe";
import { generateEmbeddings } from "../ai/embedding";
import { put } from "@vercel/blob";
import { z } from "zod";
import { desc } from "drizzle-orm";
const createResourceSchema = z.instanceof(FormData);

export const getResources = async () => {
  const resources = await db
    .select()
    .from(resourceTable)
    .orderBy(desc(resourceTable.createdAt));
  return resources;
};

export const createResource = adminAction
  .schema(createResourceSchema)
  .action(async ({ parsedInput: formData }) => {
    const file = formData.get("file") as File;

    try {
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

      const text = await file.text();
      // Generate and store embeddings
      const embeddings = await generateEmbeddings(text);

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
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to create resource.",
      };
    }
  });
