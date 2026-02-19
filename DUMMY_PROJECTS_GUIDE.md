# ダミープロジェクト追加ガイド

このガイドでは、デモ用のダミープロジェクト10個をデータベースに追加する方法を説明します。

## 前提条件

- Supabaseのアカウントがセットアップされている
- `seed_dummy_projects.sql` ファイルが `/workspaces/tool-park/supabase/` に存在

## 実行方法（推奨順）

### 方法1: Supabase ダッシュボードから実行 ⭐ 推奨（最も簡単）

このようが最も簡単で、追加の環境変数設定が不要です。

1. [Supabase ダッシュボード](https://app.supabase.com/)にアクセス
2. 自分のプロジェクトを選択
3. 左サイドメニューから **SQL エディタ** をクリック
4. **「New query」** をクリック
5. 以下のSQLコードを貼り付け：

```sql
-- Seed dummy profile for testing (if it doesn't exist)
INSERT INTO profiles (id, email, full_name, avatar_url, bio, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'demo@example.com',
    'デモユーザー',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    'AIやノーコードツールで作った様々なプロジェクトを共有しています',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 以下、INSERT INTO projects ... の10個のプロジェクト定義
-- [seed_dummy_projects.sql の内容を貼り付け]
```

**または** [`seed_dummy_projects.sql`](./seed_dummy_projects.sql) ファイルの全内容をコピーして貼り付けください。

6. **「Run」** ボタンをクリック
7. 実行完了のメッセージが表示されたら成功

### 方法2: Node.jsスクリプトで実行

より自動化されたアプローチです。

#### セットアップ

1. Supabase ダッシュボード → Project Settings → API を開く
2. **Service Role Secret** をコピー
3. `.env.local` に以下を追加：

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
```

#### 実行

```bash
npm run seed:dummy
```

### 方法3: Supabase CLIで実行

```bash
# CLIをインストール
npm install -g supabase

# コマンド実行
supabase db execute -f supabase/seed_dummy_projects.sql
```

## データ内容

このスクリプトは以下を追加します：

### テスト用プロフィール
- **ID**: `00000000-0000-0000-0000-000000000001`
- **名前**: デモユーザー
- **メール**: demo@example.com

### ダミープロジェクト（10個）

1. **AI駆動型タスク管理アプリ** - ChatGPTを使用した優先順位付け機能
2. **ノーコード在庫管理システム** - Notionベースの在庫管理
3. **顧問フィードバック分析ダッシュボード** - Claude APIでセンチメント分析
4. **AIベースの記事自動要約ツール** - Claude/Geminiで記事要約
5. **Zapierを使った営業フロー自動化** - HubSpot、Slack連携
6. **SNSコンテンツ企画AIアシスタント** - ChatGPTでSNS企画自動生成
7. **Airtable × Automationで請求書管理システム** - Zapier連携
8. **Make（Integromat）で採用管理自動化** - 採用フロー完全自動化
9. **V0とSupabaseで構築したECストア** - Stripe決済連携
10. **LLaMAを使用したローカルAIチャットボット** - プライベートなAI

## 確認方法

### Supabase ダッシュボードで確認

1. Supabase ダッシュボードを開く
2. **Table Editor** をクリック
3. **projects** テーブルを選択
4. 新しいプロジェクトが表示されている确認

### アプリケーションで確認

1. アプリケーションを起動
2. [/projects](http://localhost:3000/projects) ページを訪問
3. 新しい10個のプロジェクトが表示されている確認

## データ削除方法

もしダミーデータを削除したい場合：

```sql
DELETE FROM projects WHERE id LIKE '10000000%';
DELETE FROM profiles WHERE id = '00000000-0000-0000-0000-000000000001';
```

## トラブルシューティング

### エラー: "Duplicate key value violates unique constraint"

このエラーが出た場合、既にデータが存在しています。以下のコマンドで確認：

```sql
SELECT COUNT(*) FROM projects WHERE id LIKE '10000000%';
```

データを削除してから再度実行してください。

### アプリに反映されない

- キャッシュをクリアしてブラウザをリロード
- 開発サーバーを再起動
- Supabase ダッシュボード側で rows が増えているか確認

## なお

- このダミーデータは開発・テスト用です
- 本番環境での使用は推奨しません
- プロジェクトの作成日時は分散して設定されています
- 実際のユーザーアクションたちは反映されていません

