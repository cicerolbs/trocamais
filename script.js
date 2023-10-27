
const juros = {
  // ...restante do objeto juros...
};

function simular() {
  const bandeira = document.getElementById('bandeira').value;
  // ...restante do código...
  const valorParcela = totalPagar / parcelas;

  const resultado = `Valor do empréstimo: R$ ${valorEmprestimo.toFixed(2)}<br>Total a ser pago: R$ ${totalPagar.toFixed(2)}<br>Valor da Parcela: R$ ${valorParcela.toFixed(2)}<br>Quantidade de parcelas: ${parcelas}<br>Juros ao mês: ${jurosMes.toFixed(2)}%<br>Juros ao ano: ${jurosAno.toFixed(2)}%<br>Custo Efetivo Total: ${cet}%<br>Bandeira do cartão: ${bandeira.toUpperCase()}`;
  document.getElementById('resultado').innerHTML = resultado;
}

// ...restante do código...
