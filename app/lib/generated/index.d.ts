import {
  ConnectorConfig,
  DataConnect,
  QueryRef,
  QueryPromise,
  ExecuteQueryOptions,
  MutationRef,
  MutationPromise,
} from "firebase/data-connect";

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export interface GetMyProgressData {
  progresses: ({
    id: string;
    userId: string;
    questionId: string;
    hasAnswered: boolean;
    hasCorrect: boolean;
    attemptCount: number;
    wrongCount: number;
    lastAnsweredAt?: string | null;
    bookmarked: boolean;
  } & Progress_Key)[];
}

export interface GetMyProgressVariables {
  userId: string;
}

export interface GetMySessionsData {
  studySessions: ({
    id: string;
    userId: string;
    sessionId: string;
    mode: string;
    categoryId?: string | null;
    questionIds: string[];
    incorrectQuestionIds?: string[] | null;
    correctCount: number;
    questionCount: number;
    completedAt?: string | null;
  } & StudySession_Key)[];
}

export interface GetMySessionsVariables {
  userId: string;
}

export interface Progress_Key {
  id: string;
  __typename?: "Progress_Key";
}

export interface StudySession_Key {
  id: string;
  __typename?: "StudySession_Key";
}

export interface UpsertProgressData {
  progress_upsert: Progress_Key;
}

export interface UpsertProgressVariables {
  id: string;
  userId: string;
  questionId: string;
  hasAnswered: boolean;
  hasCorrect: boolean;
  attemptCount: number;
  wrongCount: number;
  lastAnsweredAt?: string | null;
  bookmarked: boolean;
}

export interface UpsertSessionData {
  studySession_upsert: StudySession_Key;
}

export interface UpsertSessionVariables {
  id: string;
  userId: string;
  sessionId: string;
  mode: string;
  categoryId?: string | null;
  questionIds: string[];
  incorrectQuestionIds?: string[] | null;
  correctCount: number;
  questionCount: number;
  completedAt?: string | null;
}

interface GetMyProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyProgressVariables): QueryRef<GetMyProgressData, GetMyProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: GetMyProgressVariables,
  ): QueryRef<GetMyProgressData, GetMyProgressVariables>;
  operationName: string;
}
export const getMyProgressRef: GetMyProgressRef;

export function getMyProgress(
  vars: GetMyProgressVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetMyProgressData, GetMyProgressVariables>;
export function getMyProgress(
  dc: DataConnect,
  vars: GetMyProgressVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetMyProgressData, GetMyProgressVariables>;

interface GetMySessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMySessionsVariables): QueryRef<GetMySessionsData, GetMySessionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: GetMySessionsVariables,
  ): QueryRef<GetMySessionsData, GetMySessionsVariables>;
  operationName: string;
}
export const getMySessionsRef: GetMySessionsRef;

export function getMySessions(
  vars: GetMySessionsVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetMySessionsData, GetMySessionsVariables>;
export function getMySessions(
  dc: DataConnect,
  vars: GetMySessionsVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetMySessionsData, GetMySessionsVariables>;

interface UpsertProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertProgressVariables): MutationRef<UpsertProgressData, UpsertProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: UpsertProgressVariables,
  ): MutationRef<UpsertProgressData, UpsertProgressVariables>;
  operationName: string;
}
export const upsertProgressRef: UpsertProgressRef;

export function upsertProgress(
  vars: UpsertProgressVariables,
): MutationPromise<UpsertProgressData, UpsertProgressVariables>;
export function upsertProgress(
  dc: DataConnect,
  vars: UpsertProgressVariables,
): MutationPromise<UpsertProgressData, UpsertProgressVariables>;

interface UpsertSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSessionVariables): MutationRef<UpsertSessionData, UpsertSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: UpsertSessionVariables,
  ): MutationRef<UpsertSessionData, UpsertSessionVariables>;
  operationName: string;
}
export const upsertSessionRef: UpsertSessionRef;

export function upsertSession(
  vars: UpsertSessionVariables,
): MutationPromise<UpsertSessionData, UpsertSessionVariables>;
export function upsertSession(
  dc: DataConnect,
  vars: UpsertSessionVariables,
): MutationPromise<UpsertSessionData, UpsertSessionVariables>;
