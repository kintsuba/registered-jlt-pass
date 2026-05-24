import { useAuth } from "./useAuth";
import {
  progressCollection,
  sessionCollection,
  type Progress,
  type Session,
} from "~/lib/collections";
import {
  upsertProgress,
  upsertSession,
  getMyProgress,
  getMySessions,
  connectorConfig,
} from "@dataconnect/generated";
import { getDataConnect, connectDataConnectEmulator } from "firebase/data-connect";
import { useNuxtApp } from "#app";
import { queryOnce } from "@tanstack/db";

let dcInstance: ReturnType<typeof getDataConnect> | null = null;

export const useSync = () => {
  const { currentUser } = useAuth();

  const initDataConnect = () => {
    if (dcInstance) return dcInstance;
    const { $firebaseApp } = useNuxtApp();
    dcInstance = getDataConnect($firebaseApp as any, connectorConfig);

    // Use emulator in development
    if (import.meta.dev) {
      // Data Connect emulator usually runs on 9399
      try {
        connectDataConnectEmulator(dcInstance, "localhost", 9399);
      } catch (e) {
        // ignore if already connected
      }
    }

    return dcInstance;
  };

  const syncToCloud = async () => {
    if (!currentUser.value) return;
    const userId = currentUser.value.uid;
    const dc = initDataConnect();

    // 1. Sync Progress (Local -> Cloud)
    const localProgresses = await queryOnce((q) =>
      q.from({ p: progressCollection }).select(({ p }) => p),
    );
    for (const p of localProgresses) {
      await upsertProgress(dc, {
        id: `${userId}_${p.questionId}`,
        userId,
        questionId: p.questionId,
        hasAnswered: p.hasAnswered,
        hasCorrect: p.hasCorrect,
        attemptCount: p.attemptCount,
        wrongCount: p.wrongCount,
        lastAnsweredAt: p.lastAnsweredAt || null,
        bookmarked: p.bookmarked,
      });
    }

    // 2. Sync Sessions (Local -> Cloud)
    const localSessions = await queryOnce((q) =>
      q.from({ s: sessionCollection }).select(({ s }) => s),
    );
    for (const s of localSessions) {
      await upsertSession(dc, {
        id: `${userId}_${s.sessionId}`,
        userId,
        sessionId: s.sessionId,
        mode: s.mode,
        categoryId: s.categoryId || null,
        questionIds: s.questionIds,
        incorrectQuestionIds: s.incorrectQuestionIds || null,
        correctCount: s.correctCount,
        questionCount: s.questionCount,
        completedAt: s.completedAt || null,
      });
    }
  };

  const syncFromCloud = async () => {
    if (!currentUser.value) return;
    const userId = currentUser.value.uid;
    const dc = initDataConnect();

    // 1. Sync Progress (Cloud -> Local)
    const cloudProgressRes = await getMyProgress(dc, { userId });
    const localProgresses = await queryOnce((q) =>
      q.from({ p: progressCollection }).select(({ p }) => p),
    );

    cloudProgressRes.data.progresses.forEach((cp) => {
      const local = localProgresses.find((p) => p.questionId === cp.questionId);

      if (!local) {
        progressCollection.insert({
          questionId: cp.questionId,
          hasAnswered: cp.hasAnswered,
          hasCorrect: cp.hasCorrect,
          attemptCount: cp.attemptCount,
          wrongCount: cp.wrongCount,
          lastAnsweredAt: cp.lastAnsweredAt || undefined,
          bookmarked: cp.bookmarked,
        });
      } else {
        // Merge logic
        progressCollection.update(cp.questionId, (draft) => {
          draft.hasAnswered = draft.hasAnswered || cp.hasAnswered;
          draft.hasCorrect = draft.hasCorrect || cp.hasCorrect;
          draft.attemptCount = Math.max(draft.attemptCount, cp.attemptCount);
          draft.wrongCount = Math.max(draft.wrongCount, cp.wrongCount);
          draft.bookmarked = draft.bookmarked || cp.bookmarked;

          if (cp.lastAnsweredAt) {
            if (
              !draft.lastAnsweredAt ||
              new Date(cp.lastAnsweredAt) > new Date(draft.lastAnsweredAt)
            ) {
              draft.lastAnsweredAt = cp.lastAnsweredAt;
            }
          }
        });
      }
    });

    // 2. Sync Sessions (Cloud -> Local)
    const cloudSessionsRes = await getMySessions(dc, { userId });
    const localSessions = await queryOnce((q) =>
      q.from({ s: sessionCollection }).select(({ s }) => s),
    );

    cloudSessionsRes.data.studySessions.forEach((cs) => {
      const local = localSessions.find((s) => s.sessionId === cs.sessionId);
      if (!local) {
        sessionCollection.insert({
          sessionId: cs.sessionId,
          mode: cs.mode as any,
          categoryId: cs.categoryId || undefined,
          questionIds: cs.questionIds,
          incorrectQuestionIds: cs.incorrectQuestionIds || undefined,
          correctCount: cs.correctCount,
          questionCount: cs.questionCount,
          completedAt: cs.completedAt || undefined,
        });
      }
    });
  };

  const syncAll = async () => {
    // 1. Push local changes
    await syncToCloud();
    // 2. Pull cloud changes & merge
    await syncFromCloud();
    // 3. Push merged changes back (optional, doing it simple for now)
    await syncToCloud();
  };

  return {
    syncToCloud,
    syncFromCloud,
    syncAll,
  };
};
