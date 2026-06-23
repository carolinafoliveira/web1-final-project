// Array com páginas e palavras-chave que podem ser buscadas
let dadosBusca = [
  {
    titulo: 'Calendário Acadêmico',
    descricao: 'Horários das aulas, dias da semana, disciplinas, professores e salas.',
    link: 'index2.html',
    palavras: 'calendario horário horarios aula aulas prova provas disciplina semestre sala'
  },
  // ... outros itens (Professores, Biblioteca, FAQ, etc.)
];

// Captura os elementos do HTML
let campoBusca = document.getElementById('busca-site'); // campo de input
let resultadosBusca = document.getElementById('resultados-busca'); // área de resultados

// Função para normalizar texto (remove acentos e coloca em minúsculo)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Função para montar HTML de cada resultado
function montarResultado(item) {
  let externo = item.link.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
  return '<div class="resultado-busca">' +
    '<a href="' + item.link + '"' + externo + '>' + item.titulo + '</a>' +
    '<p>' + item.descricao + '</p>' +
    '</div>';
}

// Evento: quando o usuário digita no campo de busca
campoBusca.addEventListener('input', function () {
  let termo = normalizarTexto(campoBusca.value.trim());

  // Se digitar menos de 2 letras, mostra mensagem
  if (termo.length < 2) {
    resultadosBusca.innerHTML = '<p class="mensagem-busca">Digite uma palavra para ver sugestões.</p>';
    return;
  }

  // Filtra resultados que contenham o termo
  let resultados = dadosBusca.filter(function (item) {
    let textoCompleto = normalizarTexto(item.titulo + ' ' + item.descricao + ' ' + item.palavras);
    return textoCompleto.includes(termo);
  });

  // Se não encontrar nada
  if (resultados.length == 0) {
    resultadosBusca.innerHTML = '<p class="mensagem-busca">Nenhum resultado encontrado. Tente buscar por calendário, biblioteca, SUAP ou professores.</p>';
    return;
  }

  // Mostra resultados encontrados
  resultadosBusca.innerHTML = resultados.map(montarResultado).join('');
});
