# 高度なMarkdown機能

このドキュメントでは、mdpreviewでサポートされている高度なMarkdown機能を紹介します。

## 引用

> これはシンプルな引用です。

> これは複数の段落を含む引用です。
>
> 複数の行と段落を含めることができます。

> ### ネストされた引用
> 
> 引用をネストすることもできます：
> 
> > これはネストされた引用です。
> > インデントされて表示されます。

## 水平線

ハイフン、アスタリスク、アンダースコアを3つ以上使って水平線を作成できます：

---

***

___

## リンク

### 基本的なリンク

- [GitHub](https://github.com)
- [mdpreview リポジトリ](https://github.com/kght6123/mdpreview)
- [Markdown ガイド](https://www.markdownguide.org)

### 参照スタイルのリンク

これは参照スタイルのリンクの[例][1]です。

[数字][1]や[テキスト][link-text]を参照として使用することもできます。

[1]: https://example.com
[link-text]: https://www.markdownguide.org

### 自動リンク

<https://www.example.com>  
<email@example.com>

## 強調

- *斜体テキスト* または _斜体テキスト_
- **太字テキスト** または __太字テキスト__
- ***太字と斜体*** または ___太字と斜体___
- ~~取り消し線テキスト~~

## リスト

### 順序なしリスト

- 項目1
- 項目2
  - ネストされた項目2.1
  - ネストされた項目2.2
    - 深くネストされた項目2.2.1
- 項目3

### 順序付きリスト

1. 最初の項目
2. 2番目の項目
   1. ネストされた項目2.1
   2. ネストされた項目2.2
3. 3番目の項目

### 混合リスト

1. 順序付き項目1
   - 順序なしのネストされた項目
   - 別の順序なし項目
2. 順序付き項目2
   1. 順序付きのネストされた項目
   2. 別の順序付きネストされた項目

## コード

### インラインコード

テキスト内で`インラインコード`にバッククォートを使用します。

`const x = 10`のようなコード変数や、`npm install`のようなコマンドを含めることもできます。

### 言語指定のコードブロック

#### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>例</title>
</head>
<body>
    <h1>こんにちは、世界！</h1>
</body>
</html>
```

#### CSS

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;
}

.card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### JSON

```json
{
  "name": "mdpreview",
  "version": "1.0.0",
  "description": "Markdownプレビューツール",
  "author": "kght6123",
  "license": "MIT"
}
```

#### Shell

```bash
#!/bin/bash

# プロジェクトをビルド
npm run build

# テストを実行
npm test

# デプロイ
npm run deploy
```

## 画像

画像ファイルがあれば、ここに表示されます：

```markdown
![代替テキスト](./image.png)
![GitHub ロゴ](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

## 特殊文字のエスケープ

特殊文字をエスケープできます：

\* 斜体ではない \*  
\# 見出しではない  
\- リスト項目ではない  

## 脚注

これは脚注付きの文です[^1]。

[^1]: これは脚注の内容です。

## 定義リスト

用語1
: 定義1

用語2
: 定義2a
: 定義2b

## 絵文字（サポートされている場合）

:smile: :rocket: :heart: :+1: :tada:

注：絵文字のサポートは、レンダラーの設定に依存します。
