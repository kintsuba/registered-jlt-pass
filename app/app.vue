<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <header class="site-header">
      <p class="eyebrow">登録日本語教員試験対策</p>
      <h1>登録日本語教員パス</h1>
      <p class="lead">予想問題を解きながら、分野別の進捗と弱点を確認する学習サイトです。</p>
    </header>

    <main class="mode-grid" aria-label="学習メニュー">
      <button class="mode-card" type="button">
        <span>ランダム問題</span>
        <small>全範囲からすぐに演習</small>
      </button>
      <button class="mode-card" type="button">
        <span>間違えた問題</span>
        <small>まだ正解できていない問題</small>
      </button>
      <button class="mode-card" type="button">
        <span>ジャンル別</span>
        <small>公式出題範囲から選択</small>
      </button>
      <button class="mode-card" type="button">
        <span>ブックマーク</span>
        <small>保存した問題を復習</small>
      </button>
      <button class="mode-card" type="button">
        <span>学習記録</span>
        <small>進捗と最近の演習結果</small>
      </button>
      <button class="mode-card is-disabled" type="button" disabled>
        <span>過去問</span>
        <small>準備中</small>
      </button>
    </main>
  </div>
</template>

<style>
:root {
  color: #1f2933;
  background: #f6f7f8;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

body {
  margin: 0;
}

button {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  padding: 32px;
}

.site-header {
  max-width: 920px;
  margin: 0 auto 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #52616f;
  font-size: 14px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #102a43;
  font-size: 40px;
  line-height: 1.15;
}

.lead {
  max-width: 680px;
  margin: 14px 0 0;
  color: #44515f;
  font-size: 16px;
  line-height: 1.7;
}

.mode-grid {
  display: grid;
  max-width: 920px;
  margin: 0 auto;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.mode-card {
  min-height: 128px;
  padding: 18px;
  border: 1px solid #d8dee5;
  border-radius: 8px;
  background: #ffffff;
  color: #1f2933;
  text-align: left;
  cursor: pointer;
}

.mode-card:hover:not(:disabled) {
  border-color: #2f80ed;
}

.mode-card span {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
}

.mode-card small {
  color: #607080;
  font-size: 14px;
  line-height: 1.5;
}

.mode-card.is-disabled {
  background: #eef1f4;
  cursor: not-allowed;
}

@media (max-width: 760px) {
  .app-shell {
    padding: 20px;
  }

  h1 {
    font-size: 32px;
  }

  .mode-grid {
    grid-template-columns: 1fr;
  }
}
</style>
