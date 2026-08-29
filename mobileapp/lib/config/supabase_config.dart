class SupabaseConfig {
  // Replace these credentials with your actual Supabase Project URL and Anon Key
  static const String url = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://your-supabase-project.supabase.co',
  );
  
  static const String anonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'your-supabase-anon-key',
  );

  static bool get isConfigured =>
      url.contains('.supabase.co') && !anonKey.contains('your-supabase-anon-key');
}
