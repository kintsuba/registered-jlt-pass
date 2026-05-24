import {
  questionCollection,
  sessionCollection,
  progressCollection,
  type Question,
} from "~/lib/collections";
import { queryOnce } from "@tanstack/db";

// ユーティリティ: シャッフル
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j] as T, arr[i] as T];
  }
  return arr;
}

// ユーティリティ: 直前セッションで出題した問題を除外する
async function filterRecentSession(candidates: Question[], count: number): Promise<Question[]> {
  const recentSessions = await queryOnce((q) =>
    q.from({ s: sessionCollection }).select(({ s }) => s),
  );
  const lastSession = recentSessions.sort((a, b) =>
    (b.completedAt || "").localeCompare(a.completedAt || ""),
  )[0];

  const lastQuestionIds = lastSession ? lastSession.questionIds : [];
  const lastQuestionIdSet = new Set(lastQuestionIds);

  let filtered = candidates.filter((q) => !lastQuestionIdSet.has(q.id));

  // 候補が足りない場合は、直前セッションの問題も復活させる
  if (filtered.length < Math.min(count, candidates.length)) {
    filtered = candidates;
  }

  return shuffleArray(filtered).slice(0, count);
}

// ランダム抽出 (直前のセッションを除外するルールを適用)
export async function getRandomQuestions(count: number = 10): Promise<Question[]> {
  const allQuestions = await queryOnce((q) =>
    q.from({ qs: questionCollection }).select(({ qs }) => qs),
  );
  if (allQuestions.length === 0) return [];
  return filterRecentSession(allQuestions, count);
}

// カテゴリ別抽出
export async function getCategoryQuestions(
  categoryId: string,
  count: number = 10,
): Promise<Question[]> {
  const allQuestions = await queryOnce((q) =>
    q.from({ qs: questionCollection }).select(({ qs }) => qs),
  );
  const candidates = allQuestions.filter((q) => q.officialCategory === categoryId);
  return filterRecentSession(candidates, count);
}

// 間違えた問題からの抽出
export async function getIncorrectQuestions(count: number = 10): Promise<Question[]> {
  const progressList = await queryOnce((q) =>
    q.from({ p: progressCollection }).select(({ p }) => p),
  );
  // hasAnswered == true かつ hasCorrect == false
  const incorrectIds = new Set(
    progressList.filter((p) => p.hasAnswered && !p.hasCorrect).map((p) => p.questionId),
  );

  const allQuestions = await queryOnce((q) =>
    q.from({ qs: questionCollection }).select(({ qs }) => qs),
  );
  const candidates = allQuestions.filter((q) => incorrectIds.has(q.id));
  return filterRecentSession(candidates, count);
}

// ブックマークからの抽出
export async function getBookmarkedQuestions(count: number = 10): Promise<Question[]> {
  const progressList = await queryOnce((q) =>
    q.from({ p: progressCollection }).select(({ p }) => p),
  );
  const bookmarkedIds = new Set(progressList.filter((p) => p.bookmarked).map((p) => p.questionId));

  const allQuestions = await queryOnce((q) =>
    q.from({ qs: questionCollection }).select(({ qs }) => qs),
  );
  const candidates = allQuestions.filter((q) => bookmarkedIds.has(q.id));
  return filterRecentSession(candidates, count);
}
