# ポートフォリオサイト - デプロイガイド

このポートフォリオサイトをGitHub Pagesで公開する方法を説明します。

## 📋 前提条件

- GitHubアカウント
- Gitがインストールされていること
- このプロジェクトのソースコード

## 🚀 デプロイ手順

### ステップ1: GitHubリポジトリの作成

1. GitHubにログインし、新しいリポジトリを作成
   - リポジトリ名を決定（例：`portfolio`、`my-portfolio`、または `username.github.io`）
   - Publicに設定（GitHub Pagesの無料プランを使用する場合）

### ステップ2: vite.config.tsのbase設定を更新

リポジトリ名に応じて `/vite.config.ts` の `base` を更新してください：

**パターンA: ユーザー/組織ページ（`username.github.io`の場合）**
```typescript
base: '/',
```

**パターンB: プロジェクトページ（`username.github.io/portfolio`の場合）**
```typescript
base: '/portfolio/',  // リポジトリ名に置き換える
```

### ステップ3: ローカルリポジトリの初期化とプッシュ

```bash
# プロジェクトディレクトリで実行
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

**注意**: `username` と `repository-name` を実際の値に置き換えてください。

### ステップ4: GitHub Pagesの設定

1. GitHubのリポジトリページを開く
2. **Settings** タブをクリック
3. 左サイドバーから **Pages** をクリック
4. **Source** セクションで以下を選択：
   - Source: **GitHub Actions** を選択

### ステップ5: 自動デプロイの確認

1. リポジトリの **Actions** タブを開く
2. 「Deploy to GitHub Pages」ワークフローが実行されていることを確認
3. 完了すると、緑のチェックマークが表示される
4. **Settings > Pages** に公開URLが表示される
   - 例: `https://username.github.io/portfolio/`

## 🔄 更新方法

コードを更新した後、以下のコマンドで自動的に再デプロイされます：

```bash
git add .
git commit -m "更新内容の説明"
git push
```

## 🛠 トラブルシューティング

### ページが真っ白になる場合

`vite.config.ts` の `base` 設定を確認してください：
- リポジトリ名が `portfolio` なら `base: '/portfolio/'`
- リポジトリ名が `username.github.io` なら `base: '/'`

### CSSやJSが読み込まれない場合

同上の `base` 設定を確認してください。

### GitHub Actionsが失敗する場合

1. リポジトリの Settings > Actions > General を開く
2. "Workflow permissions" を "Read and write permissions" に設定
3. 再度プッシュしてみる

## 📝 カスタマイズ

### ヘッダーの名前を変更

編集パネル（右上の鉛筆アイコン）から編集できます。データはブラウザのLocalStorageに保存されます。

### デフォルトデータの変更

`/src/app/lib/portfolio-data.ts` を編集してください。

## 🌐 公開URL

デプロイが成功すると、以下のようなURLでアクセスできます：

- ユーザーページ: `https://username.github.io/`
- プロジェクトページ: `https://username.github.io/repository-name/`

---

## 📚 その他のリソース

- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
- [Vite デプロイガイド](https://vitejs.dev/guide/static-deploy.html)
