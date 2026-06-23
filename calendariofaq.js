// Objeto com dados do calendário (curso -> semestre -> dia -> bloco -> aula)
let dados = {
  analise: {
    1: {
      segunda: { primeiro: 'CJOADMA<br>Edvando<br>Sala 10', segundo: 'CJOINGT<br>Karin<br>Sala 10' },
      // ... demais dias
    },
    // ... semestres 2 a 6
  }
};

// Arrays auxiliares
let dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
let horarios = ['19h00 às 19h50','19h50 às 20h40','21h00 às 21h50','21h50 às 22h40'];

// Função para separar disciplina/professor/sala
function separarAula(aula) {
  let partes = aula.split('<br>');
  return { disciplina: partes[0], professor: partes[1], sala: partes[2] };
}

// Função para formatar aula em HTML
function mostrarAula(aula) {
  return '<strong>' + aula.disciplina + '</strong><br>' + aula.professor + '<br>' + aula.sala;
}

// Captura elementos do HTML
let curso = document.getElementById('curso');
let semestre = document.getElementById('semestre');
let secaoTabela = document.getElementById('secao-tabela');
let corpoTabela = document.getElementById('corpo-tabela');

// Se curso e semestre existem
if (curso && semestre && secaoTabela && corpoTabela) {
  // Esconde tabela inicialmente
  secaoTabela.style.display = 'none';

  // Evento: quando curso é escolhido
  curso.addEventListener('change', function () {
    semestre.innerHTML = '<option value="">Selecione o semestre</option>';
    secaoTabela.style.display = 'none';

    if (curso.value == '') {
      semestre.disabled = true;
      return;
    }

    // Popula opções de semestre
    for (let numero = 1; numero <= 6; numero++) {
      semestre.innerHTML += '<option value="' + numero + '">' + numero + 'º semestre</option>';
    }
    semestre.disabled = false;
  });

  // Evento: quando semestre é escolhido
  semestre.addEventListener('change', function () {
    let cursoEscolhido = curso.value;
    let semestreEscolhido = semestre.value;

    if (cursoEscolhido == '' || semestreEscolhido == '') {
      secaoTabela.style.display = 'none';
      return;
    }

    // Pega grade do semestre
    let grade = dados[cursoEscolhido][semestreEscolhido];
    corpoTabela.innerHTML = '';

    // Monta cabeçalho da tabela
    let cabecalhoTabela = corpoTabela.parentElement.querySelector('thead');
    cabecalhoTabela.innerHTML = '<tr><th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th></tr>';

    // Primeira linha (primeiro bloco de cada dia)
    let linha1 = '<tr><th>' + horarios[0] + '</th>';
    for (let i = 0; i < dias.length; i++) {
      let aulaPrimeiroBloco = separarAula(grade[dias[i]].primeiro);
      linha1 += '<td rowspan="2">' + mostrarAula(aulaPrimeiroBloco) + '</td>';
    }
    linha1 += '</tr>';

    // Segunda linha (continuação do primeiro bloco)
    let linha2 = '<tr><th>' + horarios[1] + '</th></tr>';

    // Terceira linha (segundo bloco de cada dia)
    let linha3 = '<tr><th>' + horarios[2] + '</th>';
    for (let i = 0; i < dias.length; i++) {
      let aulaSegundoBloco = separarAula(grade[dias[i]].segundo);
      linha3 += '<td rowspan="2">' + mostrarAula(aulaSegundoBloco) + '</td>';
    }
    linha3 += '</tr>';

    // Quarta linha (continuação do segundo bloco)
    let linha4 = '<tr><th>' + horarios[3] + '</th></tr>';

    // Junta todas as linhas
    corpoTabela.innerHTML = linha1 + linha2 + linha3 + linha4;

    // Mostra tabela
    secaoTabela.style.display = 'block';
  });
}

// Formulário de dúvidas (FAQ)
let formulario = document.getElementById('form-duvida');
if (formulario) {
  document.getElementById('botao-enviar').addEventListener('click', function (evento) {
    evento.preventDefault(); // evita recarregar página
    let mensagem = document.getElementById('mensagem-retorno');
    mensagem.textContent = 'Obrigado! Sua dúvida foi registrada.';
    mensagem.style.display = 'block'; // mostra mensagem
    formulario.reset(); // limpa campos
    setTimeout(function () { mensagem.style.display = 'none'; }, 3000); // esconde após 3s
  });
}
