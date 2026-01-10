# mdpreview

📄 ローカルMarkdownファイルをブラウザでプレビューするCLIツール

## 🌐 Live Demo

GitHub Pages でホストされているデモサイトをご覧ください：  
**https://kght6123.github.io/mdpreview/**

## Features

- 🌳 ディレクトリツリー表示
- 📝 リアルタイムMarkdownプレビュー
- 🔄 ファイル変更の自動リロード
- 🌙 ライト/ダークテーマ対応
- 📊 Mermaid図表サポート
- 🎨 GFM (GitHub Flavored Markdown) サポート
- ♿ WCAG 2.2 Level AA 準拠
- 📑 目次 (TOC) 自動生成

## Installation & Usage

### GitHub から直接実行

```bash
npx github:kght6123/mdpreview ./docs
```

### グローバルインストール

```bash
npm install -g github:kght6123/mdpreview
mdpreview ./docs
```

### ローカルプロジェクト

```bash
npm install -D github:kght6123/mdpreview
npx mdpreview ./docs
```

## Options

```bash
npx mdpreview <directory> [options]
```

| オプション | 短縮 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `--port <number>` | `-p` | 3000 | ポート番号 |
| `--open` | `-o` | true | ブラウザ自動オープン |
| `--no-open` | | | ブラウザを開かない |
| `--watch` | `-w` | true | ファイル監視 |
| `--no-watch` | | | ファイル監視を無効化 |
| `--help` | `-h` | | ヘルプ表示 |
| `--version` | `-V` | | バージョン表示 |

## Examples

```bash
# デフォルト設定で起動
npx mdpreview ./docs

# ポート番号を指定
npx mdpreview ./docs --port 8080

# ブラウザを自動で開かない
npx mdpreview ./docs --no-open

# ファイル監視を無効化
npx mdpreview ./docs --no-watch
```

## Development

```bash
# 依存関係のインストール
npm install
cd src/client && npm install && cd ../..

# クライアントのビルド
npm run build

# 開発モード
npm run dev

# Lint
npm run lint

# Format
npm run format

# Build static site for GitHub Pages
npm run build:static
```

## GitHub Pages Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**⚠️ Before the first deployment, you must enable GitHub Pages:**
1. Go to repository Settings > Pages
2. Set **Source** to **"GitHub Actions"**

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for more details.

## License

MIT

## Repository

https://github.com/kght6123/mdpreview