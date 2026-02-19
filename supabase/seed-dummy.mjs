#!/usr/bin/env node

/**
 * ダミープロジェクト挿入スクリプト
 * 
 * 使用方法:
 * SUPABASE_SERVICE_ROLE_KEY が必要です。以下のいずれかで設定してください：
 * 
 * 1. .env.local に SUPABASE_SERVICE_ROLE_KEY を追加
 * 2. 環境変数として設定: export SUPABASE_SERVICE_ROLE_KEY=your-key
 * 3. コマンド直接実行: SUPABASE_SERVICE_ROLE_KEY=your-key npm run seed:dummy
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
let SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// .env.local から読み込む
if (!SUPABASE_KEY) {
  try {
    const envLocal = path.join(__dirname, '..', '.env.local')
    if (fs.existsSync(envLocal)) {
      const content = fs.readFileSync(envLocal, 'utf-8')
      const match = content.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)
      if (match) {
        SUPABASE_KEY = match[1].trim()
      }
    }
  } catch (e) {
    // ignore
  }
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('\n❌ エラー: Supabase認証情報が見つかりません\n')
  
  if (!SUPABASE_URL) {
    console.error('  NEXT_PUBLIC_SUPABASE_URL が設定されていません')
  }
  
  if (!SUPABASE_KEY) {
    console.error('  SUPABASE_SERVICE_ROLE_KEY が設定されていません')
    console.error('\n📋 解決方法:\n')
    console.error('  1. Supabase ダッシュボードにログイン')
    console.error('  2. Project Settings → API を開く')
    console.error('  3. Service Role Secret をコピー')
    console.error('  4. .env.local に追加:\n')
    console.error('     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key\n')
    console.error('  または、SQLスクリプトで直接実行:\n')
    console.error('  ✓ supabase/seed_dummy_projects.sql をコピー')
    console.error('  ✓ Supabase SQL エディタに貼り付けて実行\n')
  }
  
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const dummyProfile = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'demo@example.com',
  full_name: 'デモユーザー',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  bio: 'AIやノーコードツールで作った様々なプロジェクトを共有しています',
}

const dummyProjects = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'AI駆動型タスク管理アプリ',
    description: 'ChatGPTを使用して自動的にタスクを優先順位付けする革新的なタスク管理アプリケーション。自然言語で入力したタスクを自動分類し、最適なスケジュールを提案します。チーム向けのコラボレーション機能も充実。',
    url: 'https://ai-task-manager.example.com',
    image_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=300&fit=crop',
    categories: ['プロジェクト管理', 'タスク・ToDo管理', 'AI活用ツール'],
    tags: ['無料', 'チーム向け', 'ブラウザ完結', 'AI活用'],
    ai_tools: ['Chat GPT', 'Copilot'],
    backend_services: ['Supabase', 'Node.js'],
    frontend_tools: ['Vercel'],
    likes_count: 245,
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'ノーコード在庫管理システム',
    description: 'Notionを使ったシンプルで効果的な在庫管理システム。商品情報、在庫数、仕入先情報を一元管理できます。自動でバーコード生成、リアルタイムの在庫状況把握が可能。',
    url: 'https://notion-inventory.example.com',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    categories: ['在庫管理', 'ドキュメント共有'],
    tags: ['無料', 'チーム向け', 'インストール不要'],
    ai_tools: [],
    backend_services: [],
    frontend_tools: [],
    likes_count: 189,
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: '顧客フィードバック分析ダッシュボード',
    description: 'Claude APIとVercelを使用して、顧客フィードバックを自動分析するダッシュボード。センチメント分析、主要なテーマの抽出、アクションアイテムの提案を自動実行。複数チャネルからのフィードバックを統一的に管理。',
    url: 'https://feedback-analyzer.example.com',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    categories: ['データ分析・可視化', 'AI活用ツール', 'レポート作成'],
    tags: ['有料', 'チーム向け', 'ブラウザ完結'],
    ai_tools: ['Claude', 'Copilot'],
    backend_services: ['Supabase', 'PostgreSQL'],
    frontend_tools: ['Vercel', 'Next.js'],
    likes_count: 412,
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'AIベースの記事自動要約ツール',
    description: 'Webページから記事を自動抽出して、Claude APIで要約を作成するツール。複数言語対応で、日本語記事も英語に翻訳。ブックマーク機能で記事を管理、時間帯別に要約をメール送信。',
    url: 'https://article-summarizer.example.com',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7fe863eac5?w=500&h=300&fit=crop',
    categories: ['文書作成・編集', 'AI活用ツール'],
    tags: ['フリーミアム', '個人向け', 'ブラウザ完結'],
    ai_tools: ['Claude', 'Gemini'],
    backend_services: ['Firebase'],
    frontend_tools: ['Netlify'],
    likes_count: 328,
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'Zapierを使った営業フロー自動化',
    description: '複数のツール（HubSpot、Slack、Gmail）をZapierで繋ぎ、営業プロセスを完全自動化。見込み客の登録から提案まで、一連のワークフローを自動実行。レポートはGoogleスプレッドシートに自動集計。',
    url: 'https://zapier-sales-automation.example.com',
    image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    categories: ['営業・販売管理', '自動化・効率化ツール'],
    tags: ['有料', 'チーム向け'],
    ai_tools: [],
    backend_services: [],
    frontend_tools: [],
    likes_count: 176,
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'SNSコンテンツ企画AIアシスタント',
    description: 'ChatGPTを活用してSNS投稿用の企画・文案を自動生成。トレンドキーワード分析、フォロワー属性の考慮、エンゲージメント予測も実装。複数SNSプラットフォーム対応。',
    url: 'https://sns-content-ai.example.com',
    image_url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db13?w=500&h=300&fit=crop',
    categories: ['SNS管理', 'マーケティング支援', 'AI活用ツール'],
    tags: ['フリーミアム', 'チーム向け', 'アカウント不要'],
    ai_tools: ['Chat GPT'],
    backend_services: ['Firebase'],
    frontend_tools: ['Netlify'],
    likes_count: 567,
  },
  {
    id: '10000000-0000-0000-0000-000000000007',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'Airtable × Automationで請求書管理システム',
    description: 'Airtableをメインシステムとして、複数の請求書テンプレートを管理。Zapier経由で自動メール送信、支払い状況の追跡、売上レポートの自動生成。',
    url: 'https://airtable-invoicing.example.com',
    image_url: 'https://images.unsplash.com/photo-1533707366651-a480e8c7c741?w=500&h=300&fit=crop',
    categories: ['請求書・見積書作成', '経理・会計'],
    tags: ['有料', 'チーム向け'],
    ai_tools: [],
    backend_services: ['Airtable'],
    frontend_tools: [],
    likes_count: 134,
  },
  {
    id: '10000000-0000-0000-0000-000000000008',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'Make（Integromat）で採用管理自動化',
    description: '求人掲載からスクリーニング、面接スケジューリングまで全て自動化。Googleフォーム、Slack、メールを連携させ、採用候補者の情報を自動集計。',
    url: 'https://make-recruitment.example.com',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    categories: ['人事・勤怠管理', '自動化・効率化ツール'],
    tags: ['フリーミアム', 'チーム向け'],
    ai_tools: [],
    backend_services: ['Make'],
    frontend_tools: [],
    likes_count: 198,
  },
  {
    id: '10000000-0000-0000-0000-000000000009',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'V0とSupabaseで構築したECストア',
    description: 'Vercel V0で高速にUIを構築し、Supabaseでバックエンドを構成したシンプルなECストア。決済はStripeを統合。在庫管理も自動実行。',
    url: 'https://v0-ec-store.example.com',
    image_url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db13?w=500&h=300&fit=crop',
    categories: ['小売・EC'],
    tags: ['有料', '個人向け', 'モバイル対応'],
    ai_tools: ['V0'],
    backend_services: ['Supabase'],
    frontend_tools: ['Vercel'],
    likes_count: 654,
  },
  {
    id: '10000000-0000-0000-0000-000000000010',
    user_id: '00000000-0000-0000-0000-000000000001',
    title: 'LLaMAを使用したローカルAIチャットボット',
    description: 'オープンソースのLLaMAモデルを使用した、プライベートなAIチャットボット。企業内ナレッジベースにアクセスして、社内Q&Aの自動応答を実現。ファインチューニングで業界用語にも対応。',
    url: 'https://llama-chatbot.example.com',
    image_url: 'https://images.unsplash.com/photo-1676681533283-e798e4c3b3f0?w=500&h=300&fit=crop',
    categories: ['チャット・メッセージング', 'AI活用ツール'],
    tags: ['オープンソース', 'チーム向け'],
    ai_tools: ['LLaMA'],
    backend_services: ['Python'],
    frontend_tools: [],
    likes_count: 421,
  },
]

async function seedData() {
  try {
    console.log('🌱 ダミープロジェクトのシード処理を開始しています...\n')

    // プロフィールを挿入
    console.log('📝 デモプロフィールを追加中...')
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([dummyProfile], { onConflict: 'id' })

    if (profileError) throw profileError
    console.log('✅ デモプロフィール追加完了\n')

    // プロジェクトを挿入
    console.log('🚀 ダミープロジェクトを追加中...')
    const { error: projectError } = await supabase
      .from('projects')
      .insert(dummyProjects, { onConflict: 'id' })

    if (projectError) throw projectError
    console.log(`✅ ${dummyProjects.length}個のプロジェクト追加完了\n`)

    console.log('🎉 完了！ページをリロードしてダミープロジェクトを確認してください。')
    console.log('📍 確認URL: http://localhost:3000/projects')
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message)
    process.exit(1)
  }
}

seedData()
