-- Disable constraint checks temporarily using session replication role
SET session_replication_role = 'replica';

-- Delete existing dummy projects first
DELETE FROM projects WHERE id >= '10000000-0000-0000-0000-000000000000'::uuid AND id < '10000000-0000-0000-0000-000000001000'::uuid;

-- Create or update auth user in auth.users
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_user_meta_data, raw_app_meta_data)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'demo@example.com',
    NOW(),
    NOW(),
    NOW(),
    '{"full_name": "デモユーザー"}',
    '{}'
)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- Seed dummy profile
INSERT INTO profiles (id, email, full_name, avatar_url, bio, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'demo@example.com',
    'デモユーザー',
    NULL,
    'AIやノーコードツールで作った様々なプロジェクトを共有しています',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- Insert 10 dummy projects
INSERT INTO projects (id, user_id, title, description, url, image_url, categories, tags, ai_tools, backend_services, frontend_tools, likes_count, created_at, updated_at)
VALUES
(
    '10000000-0000-0000-0000-000000000001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'AI駆動型タスク管理アプリ',
    'ChatGPTを使用して自動的にタスクを優先順位付けする革新的なタスク管理アプリケーション。自然言語で入力したタスクを自動分類し、最適なスケジュールを提案します。チーム向けのコラボレーション機能も充実。',
    'https://ai-task-manager.example.com',
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=300&fit=crop',
    ARRAY['プロジェクト管理', 'タスク・ToDo管理', 'AI活用ツール']::TEXT[],
    ARRAY['無料', 'チーム向け', 'ブラウザ完結', 'AI活用']::TEXT[],
    ARRAY['Chat GPT', 'Copilot']::TEXT[],
    ARRAY['Supabase', 'Node.js']::TEXT[],
    ARRAY['Vercel']::TEXT[],
    245,
    NOW() - INTERVAL '45 days',
    NOW() - INTERVAL '45 days'
),
(
    '10000000-0000-0000-0000-000000000002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'ノーコード在庫管理システム',
    'Notionを使ったシンプルで効果的な在庫管理システム。商品情報、在庫数、仕入先情報を一元管理できます。自動でバーコード生成、リアルタイムの在庫状況把握が可能。',
    'https://notion-inventory.example.com',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    ARRAY['在庫管理', 'ドキュメント共有']::TEXT[],
    ARRAY['無料', 'チーム向け', 'インストール不要']::TEXT[],
    ARRAY['Notion']::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    189,
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '30 days'
),
(
    '10000000-0000-0000-0000-000000000003'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    '顧客フィードバック分析ダッシュボード',
    'Claude APIとVercelを使用して、顧客フィードバックを自動分析するダッシュボード。センチメント分析、主要なテーマの抽出、アクションアイテムの提案を自動実行。複数チャネルからのフィードバックを統一的に管理。',
    'https://feedback-analyzer.example.com',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    ARRAY['データ分析・可視化', 'AI活用ツール', 'レポート作成']::TEXT[],
    ARRAY['有料', 'チーム向け', 'ブラウザ完結']::TEXT[],
    ARRAY['Claude', 'Copilot']::TEXT[],
    ARRAY['Supabase', 'PostgreSQL']::TEXT[],
    ARRAY['Vercel', 'Next.js']::TEXT[],
    412,
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days'
),
(
    '10000000-0000-0000-0000-000000000004'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'AIベースの記事自動要約ツール',
    'Webページから記事を自動抽出して、Claude APIで要約を作成するツール。複数言語対応で、日本語記事も英語に翻訳。ブックマーク機能で記事を管理、時間帯別に要約をメール送信。',
    'https://article-summarizer.example.com',
    'https://images.unsplash.com/photo-1488521787991-ed7fe863eac5?w=500&h=300&fit=crop',
    ARRAY['文書作成・編集', 'AI活用ツール']::TEXT[],
    ARRAY['フリーミアム', '個人向け', 'ブラウザ完結']::TEXT[],
    ARRAY['Claude', 'Gemini']::TEXT[],
    ARRAY['Firebase']::TEXT[],
    ARRAY['Netlify']::TEXT[],
    328,
    NOW() - INTERVAL '15 days',
    NOW() - INTERVAL '15 days'
),
(
    '10000000-0000-0000-0000-000000000005'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Zapierを使った営業フロー自動化',
    '複数のツール（HubSpot、Slack、Gmail）をZapierで繋ぎ、営業プロセスを完全自動化。見込み客の登録から提案まで、一連のワークフローを自動実行。レポートはGoogleスプレッドシートに自動集計。',
    'https://zapier-sales-automation.example.com',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    ARRAY['営業・販売管理', '自動化・効率化ツール']::TEXT[],
    ARRAY['有料', 'チーム向け']::TEXT[],
    ARRAY['Zapier']::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    176,
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '10 days'
),
(
    '10000000-0000-0000-0000-000000000006'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'SNSコンテンツ企画AIアシスタント',
    'ChatGPTを活用してSNS投稿用の企画・文案を自動生成。トレンドキーワード分析、フォロワー属性の考慮、エンゲージメント予測も実装。複数SNSプラットフォーム対応。',
    'https://sns-content-ai.example.com',
    'https://images.unsplash.com/photo-1460925895917-adf4e565db13?w=500&h=300&fit=crop',
    ARRAY['SNS管理', 'マーケティング支援', 'AI活用ツール']::TEXT[],
    ARRAY['フリーミアム', 'チーム向け', 'アカウント不要']::TEXT[],
    ARRAY['Chat GPT']::TEXT[],
    ARRAY['Firebase']::TEXT[],
    ARRAY['Netlify']::TEXT[],
    567,
    NOW() - INTERVAL '8 days',
    NOW() - INTERVAL '8 days'
),
(
    '10000000-0000-0000-0000-000000000007'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Airtable × Automationで請求書管理システム',
    'Airtableをメインシステムとして、複数の請求書テンプレートを管理。Zapier経由で自動メール送信、支払い状況の追跡、売上レポートの自動生成。',
    'https://airtable-invoicing.example.com',
    'https://images.unsplash.com/photo-1533707366651-a480e8c7c741?w=500&h=300&fit=crop',
    ARRAY['請求書・見積書作成', '経理・会計']::TEXT[],
    ARRAY['有料', 'チーム向け']::TEXT[],
    ARRAY['Airtable']::TEXT[],
    ARRAY['Airtable']::TEXT[],
    ARRAY[]::TEXT[],
    134,
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days'
),
(
    '10000000-0000-0000-0000-000000000008'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Make（Integromat）で採用管理自動化',
    '求人掲載からスクリーニング、面接スケジューリングまで全て自動化。Googleフォーム、Slack、メールを連携させ、採用候補者の情報を自動集計。',
    'https://make-recruitment.example.com',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    ARRAY['人事・勤怠管理', '自動化・効率化ツール']::TEXT[],
    ARRAY['フリーミアム', 'チーム向け']::TEXT[],
    ARRAY['Make']::TEXT[],
    ARRAY['Make']::TEXT[],
    ARRAY[]::TEXT[],
    198,
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
),
(
    '10000000-0000-0000-0000-000000000009'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'V0とSupabaseで構築したECストア',
    'Vercel V0で高速にUIを構築し、Supabaseでバックエンドを構成したシンプルなECストア。決済はStripeを統合。在庫管理も自動実行。',
    'https://v0-ec-store.example.com',
    'https://images.unsplash.com/photo-1460925895917-adf4e565db13?w=500&h=300&fit=crop',
    ARRAY['小売・EC']::TEXT[],
    ARRAY['有料', '個人向け', 'モバイル対応']::TEXT[],
    ARRAY['V0']::TEXT[],
    ARRAY['Supabase']::TEXT[],
    ARRAY['Vercel']::TEXT[],
    654,
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
),
(
    '10000000-0000-0000-0000-000000000010'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'LLaMAを使用したローカルAIチャットボット',
    'オープンソースのLLaMAモデルを使用した、プライベートなAIチャットボット。企業内ナレッジベースにアクセスして、社内Q&Aの自動応答を実現。ファインチューニングで業界用語にも対応。',
    'https://llama-chatbot.example.com',
    'https://images.unsplash.com/photo-1676681533283-e798e4c3b3f0?w=500&h=300&fit=crop',
    ARRAY['チャット・メッセージング', 'AI活用ツール']::TEXT[],
    ARRAY['オープンソース', 'チーム向け']::TEXT[],
    ARRAY['LLaMA']::TEXT[],
    ARRAY['Python']::TEXT[],
    ARRAY[]::TEXT[],
    421,
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
);

-- Re-enable constraint checks
SET session_replication_role = 'origin';


