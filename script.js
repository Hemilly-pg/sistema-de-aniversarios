// Recupera do LocalStorage
function carregarDados() {
  return JSON.parse(localStorage.getItem("aniversarios")) || [];
}

// Salva no LocalStorage
function salvarDados(dados) {
  localStorage.setItem("aniversarios", JSON.stringify(dados));
}

// Atualiza tabela
function atualizarTabela() {
  const dados = carregarDados();
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";

  dados.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.data}</td>
      <td>${item.telefone}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Cadastrar novo
function cadastrar() {
  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !data) {
    alert("Preencha nome e data!");
    return;
  }

  const dados = carregarDados();
  dados.push({ nome, data, telefone });
  salvarDados(dados);

  document.getElementById("nome").value = "";
  document.getElementById("data").value = "";
  document.getElementById("telefone").value = "";

  atualizarTabela();
}

// Exportar Excel
function exportarExcel() {
  const dados = carregarDados();
  if (dados.length === 0) {
    alert("Nenhum dado para exportar!");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(dados);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Aniversarios");

  XLSX.writeFile(wb, "relatorio_aniversarios.xlsx");
}

// Carregar tabela ao abrir
window.onload = atualizarTabela;
