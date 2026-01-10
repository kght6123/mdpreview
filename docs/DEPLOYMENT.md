# GitHub Pages デプロイメント

このプロジェクトは GitHub Pages に自動的にデプロイされます。

## 概要

mainブランチにマージされると、GitHub Actions が自動的に以下を実行します：

1. 📋 サンプルMarkdownファイル（`docs/` ディレクトリ）から静的データを生成
2. 🔨 React クライアントアプリケーションをビルド
3. 🚀 GitHub Pages にデプロイ

## デプロイされたサイト

デプロイされたサイトは以下のURLでアクセスできます：

https://kght6123.github.io/mdpreview/

## 機能

デプロイされた静的サイトには以下の機能があります：

- ✅ ファイルツリー表示
- ✅ Markdownプレビュー（プリレンダリング済み）
- ✅ 目次（TOC）表示
- ✅ シンタックスハイライト
- ✅ Mermaid 図表
- ✅ ダークモード対応

**注意**: 静的サイトでは以下の機能は利用できません：
- ❌ ファイル変更のリアルタイム監視
- ❌ WebSocket 接続

## ローカルでのビルドとテスト

静的サイトをローカルでビルドしてテストするには：

```bash
# 依存関係のインストール
npm install
cd src/client && npm install && cd ../..

# 静的サイトのビルド
npm run build:static

# ビルド結果のプレビュー
cd src/client && npm run preview
```

## カスタムサンプルファイルの追加

1. `docs/` ディレクトリに Markdown ファイルを追加
2. 変更をコミットして main ブランチにマージ
3. GitHub Actions が自動的に再デプロイします

## 手動デプロイ

GitHub Actions の「Actions」タブから「Deploy to GitHub Pages」ワークフローを手動で実行することもできます。

## トラブルシューティング

### GitHub Pages が有効になっていない

1. リポジトリの Settings > Pages に移動
2. Source を「GitHub Actions」に設定

### デプロイが失敗する

1. Actions タブでワークフローのログを確認
2. Node.js のバージョンが 18 以上であることを確認
3. すべての依存関係が正しくインストールされているか確認
