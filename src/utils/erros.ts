import axios from 'axios';

export function traduzirErro(error: unknown, contexto: 'login' | 'sessao' | 'lista' = 'lista'): string {
  if (!axios.isAxiosError(error)) {
    return 'Erro inesperado no app. Tenta de novo.';
  }

  if (error.code === 'ECONNABORTED') {
    return 'A resposta demorou demais. Tenta de novo.';
  }

  if (!error.response) {
    return 'Sem conexão com o servidor. Confere a internet e tenta de novo.';
  }

  const status = error.response.status;

  if (contexto === 'login' && (status === 400 || status === 401)) {
    return 'Usuário ou senha incorretos.';
  }

  if (status === 401 && contexto === 'sessao') {
    return 'Tua sessão expirou. Entra de novo.';
  }

  if (status === 404) {
    return 'Não encontramos o que tu pediu. Pode ter sido removido.';
  }

  if (status === 400) {
    return 'Os dados enviados não foram aceitos. Confere o que digitou.';
  }

  if (status >= 500) {
    return 'O servidor está com problema. Tenta de novo daqui a pouco.';
  }

  return 'Erro inesperado no app. Tenta de novo.';
}
