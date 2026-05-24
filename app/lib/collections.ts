import { createCollection, localStorageCollectionOptions } from "@tanstack/db";
import { z } from "zod";

export const questionSchema = z.object({
  id: z.string(),
  officialCategory: z.string(),
  tags: z.array(z.string()),
  questionText: z.string(),
  choices: z.array(z.string()),
  correctChoice: z.number(),
  explanation: z.string(),
  choiceExplanations: z.string().optional(),
});

export type Question = z.infer<typeof questionSchema>;

export const questionCollection = createCollection(
  localStorageCollectionOptions({
    schema: questionSchema,
    getKey: (item) => item.id,
    storageKey: "jlt-questions",
  }),
);

export const progressSchema = z.object({
  questionId: z.string(),
  hasAnswered: z.boolean().default(false),
  hasCorrect: z.boolean().default(false),
  attemptCount: z.number().default(0),
  wrongCount: z.number().default(0),
  lastAnsweredAt: z.string().optional(),
  bookmarked: z.boolean().default(false),
});

export type Progress = z.infer<typeof progressSchema>;

export const progressCollection = createCollection(
  localStorageCollectionOptions({
    schema: progressSchema,
    getKey: (item) => item.questionId,
    storageKey: "jlt-progress",
  }),
);

export const sessionSchema = z.object({
  sessionId: z.string(),
  mode: z.enum(["random", "category", "incorrect", "bookmark"]),
  categoryId: z.string().nullable().optional(),
  questionIds: z.array(z.string()),
  incorrectQuestionIds: z.array(z.string()).optional(),
  correctCount: z.number().default(0),
  questionCount: z.number(),
  currentIndex: z.number().default(0),
  completedAt: z.string().optional(),
});

export type Session = z.infer<typeof sessionSchema>;

export const sessionCollection = createCollection(
  localStorageCollectionOptions({
    schema: sessionSchema,
    getKey: (item) => item.sessionId,
    storageKey: "jlt-sessions",
  }),
);

export function upsertLocal(collection: any, key: string, data: any) {
  try {
    collection.insert(data);
  } catch {
    collection.update(key, (draft: any) => {
      Object.assign(draft, data);
    });
  }
}
