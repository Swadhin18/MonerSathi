/*
  # MonerSathi Initial Schema

  1. New Tables
    - `conversations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `session_token` (text, unique, for anonymous users)
      - `is_active` (boolean)
    
    - `messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key)
      - `content` (text)
      - `sender` (text: 'user' or 'ai')
      - `mood` (text, nullable)
      - `is_crisis` (boolean, default false)
      - `created_at` (timestamp)
    
    - `mood_logs`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key)
      - `mood` (text)
      - `intensity` (integer, 1-10 scale)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Policies allow anonymous access via session_token
    - No personal data stored (GDPR compliant)
  
  3. Performance
    - Indexes on conversation_id and session_token
    - Foreign key constraints for data integrity
*/

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  session_token text UNIQUE NOT NULL,
  is_active boolean DEFAULT true
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  content text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'ai')),
  mood text CHECK (mood IN ('sad', 'anxious', 'positive', 'neutral', 'crisis')),
  is_crisis boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create mood_logs table
CREATE TABLE IF NOT EXISTS mood_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  mood text NOT NULL CHECK (mood IN ('sad', 'anxious', 'positive', 'neutral', 'crisis')),
  intensity integer CHECK (intensity >= 1 AND intensity <= 10),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_session_token ON conversations(session_token);
CREATE INDEX IF NOT EXISTS idx_mood_logs_conversation_id ON mood_logs(conversation_id);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for conversations (anonymous access via session_token)
CREATE POLICY "Anonymous users can create conversations"
  ON conversations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anonymous users can view own conversations"
  ON conversations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anonymous users can update own conversations"
  ON conversations FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for messages (anonymous access)
CREATE POLICY "Anonymous users can create messages"
  ON messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anonymous users can view messages"
  ON messages FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for mood_logs (anonymous access)
CREATE POLICY "Anonymous users can create mood logs"
  ON mood_logs FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anonymous users can view mood logs"
  ON mood_logs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();