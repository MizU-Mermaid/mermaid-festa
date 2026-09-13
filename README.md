# マーメイドフェスタ 公式サイト

「海・魔法・異空間」をテーマにしたイベント「マーメイドフェスタ」の公式サイトです。
ビルド不要の静的HTML/CSS/JavaScriptで構成しており、GitHub Pagesでそのまま公開できます。

## 技術構成

- 素のHTML + CSS + JavaScript(フレームワーク・ビルドツール不使用)
- 開催回ごとに変わる情報は `data/*.json` に分離し、HTMLは共通のまま中身だけ更新できる構成
- 共通ヘッダー・フッターは `partials/` にまとめ、JavaScriptで全ページに読み込み(修正が1箇所で済む)
- ホスティングは GitHub Pages を想定

非エンジニアの方でも、`data/` フォルダ内のJSONファイルとHTML内の文章を編集するだけで、
基本的な内容更新(日程・出店者・ステージ内容など)ができるようにしています。

## ディレクトリ構成

```
mermaid-festa/
├── index.html                 トップページ(最新イベント)
├── stage.html                 ステージパフォーマンス
├── contest.html                仮装コンテスト
├── vendors.html                出店者一覧
├── stamprally.html             スタンプラリー
├── archive.html                過去イベント一覧
├── history.html                歴史・年表
├── sponsors.html               協賛企業
├── committee.html              実行委員会
├── exhibitors-guide.html       出店希望者向け案内
├── events/
│   └── sample-past-event/      過去回の個別レポートページ(テンプレート)
├── partials/
│   ├── header.html             共通ヘッダー(ナビゲーション)
│   └── footer.html             共通フッター(SNSリンクほか)
├── data/                       開催回ごとに更新するJSONデータ
│   ├── site-config.json        現在の開催回の基本情報(名称・日程・キャッチコピー等)
│   ├── stage.json              ステージタイムテーブル
│   ├── contest.json            仮装コンテスト情報
│   ├── vendors.json            出店者一覧
│   ├── stamprally.json         スタンプラリー情報
│   ├── archive.json            過去イベント一覧
│   ├── history.json            歴史・年表
│   ├── sponsors.json           協賛企業一覧
│   └── committee.json          実行委員会情報
└── assets/
    ├── css/style.css           全ページ共通スタイル
    └── js/
        ├── include-partials.js 共通ヘッダー/フッターの読み込み・モバイルメニュー制御
        └── data-loader.js      data/*.json 読み込み用の共通関数
```

## 新しい開催回(ハロウィン・クリスマス・春イベント等)への更新方法

1. **`data/site-config.json`** の `currentEvent` を新しい回の情報に書き換える
   (名称・キャッチコピー・日程・会場・ステータスなど)。
2. **`data/stage.json`・`data/contest.json`・`data/vendors.json`・`data/stamprally.json`**
   の中身を、新しい回の内容に入れ替える。
3. 前回の開催回を過去イベントとして残したい場合は、その内容を
   **`data/archive.json`** に追記し、`events/` 配下に
   `events/<開催回のID>/`(例: `events/2025-halloween/`)フォルダを作成。
   `events/sample-past-event/index.html` をコピーして本文を書き換える。
4. 実績が増えたら **`data/history.json`** の年表に1項目追加する。
5. 協賛企業・実行委員会の情報が変わった場合は **`data/sponsors.json`・`data/committee.json`** を更新。

HTMLファイル自体やナビゲーション構成は基本的に変更不要です。

## ローカルでの確認方法

`fetch()` でJSON/パーツを読み込む構成のため、`index.html` を直接ダブルクリックして開くと
正しく表示されない場合があります(ブラウザのfile://制限のため)。
簡易サーバーを立てて確認してください。

```bash
# Python がある場合
python3 -m http.server 8000

# その後ブラウザで http://localhost:8000 を開く
```

## GitHub Pagesでの公開方法

1. GitHubリポジトリの **Settings → Pages** を開く
2. 「Build and deployment」の Source を **Deploy from a branch** に設定
3. Branch を `claude/mermaid-festa-site-setup-fejwuk`(または公開用ブランチ)・フォルダを `/ (root)` に設定して保存
4. 数分後、発行されたURLでサイトが公開されます

独自ドメインを使う場合は、Pages設定内の「Custom domain」で設定してください
(その場合、`assets/`や`data/`への相対パスはそのまま利用できます)。

## デザインの方針

- 世界観:「海・マーメイド・魔法・異空間」を感じるグラデーションと波・気泡モチーフ
- ただし過剰なアニメーションや装飾は避け、公式イベント案内サイトとしての
  「見やすさ」「情報の探しやすさ」を最優先
- スマートフォン(iPhone想定)・PCの両方で見やすいレスポンシブレイアウト
  (ハンバーガーメニュー、カード/グリッドの折り返し対応)

## 今後の拡張候補(未実装)

- 出店者・協賛企業の画像表示(現在はテキストのみのプレースホルダー)
- お問い合わせフォーム(現在はメールアドレス記載のみ)
- 開催回ごとのOGP画像・SEOメタタグの個別設定
