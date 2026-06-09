import type { AuthError } from '@supabase/supabase-js';

export function translateAuthError(error: AuthError | null): string {
  if (!error) return 'Erro desconhecido. Tente novamente.';

  const code = error.code ?? '';
  const message = error.message.toLowerCase();

  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos. Verifique os dados ou crie uma conta em /cadastro.';
  }

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada (e spam).';
  }

  if (message.includes('user already registered')) {
    return 'Este e-mail já está cadastrado. Faça login ou use "Esqueci minha senha".';
  }

  if (message.includes('password') && message.includes('least')) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (message.includes('invalid api key') || message.includes('api key')) {
    return 'Chave da API Supabase inválida. Verifique NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local.';
  }

  if (
    code === 'over_email_send_rate_limit' ||
    message.includes('rate limit') ||
    message.includes('email rate limit exceeded')
  ) {
    return 'Limite de envio de e-mails atingido. Aguarde alguns minutos e tente novamente.';
  }

  return error.message;
}
