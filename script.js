const juros = {
    'visa': [1.39, 3.76, 4.09, 4.78, 5.47, 6.14, 6.79, 7.64, 8.30, 8.95, 9.60, 10, 10.70, 12.29, 12.89, 13.53, 14.14, 15.34],
    'master': [1.39, 3.76, 4.09, 4.78, 5.47, 6.14, 6.79, 7.64, 8.30, 8.95, 9.60, 10, 10.70, 12.29, 12.89, 13.53, 14.14, 15.34],
    'hiper': [2.39, 4.73, 5.27, 5.69, 6.63, 7.32, 7.97, 9.43, 10.10, 11.40, 12.00, 12.06, 12.65, 13.32, 13.90, 14.53, 15.13, 16.34],
    'elo': [2.39, 4.73, 5.27, 5.69, 6.63, 7.32, 7.97, 9.43, 10.10, 11.40, 12.00, 12.06, 12.65, 13.32, 13.90, 14.53, 15.13, 16.34],
    'outra': [2.39, 4.73, 5.27, 5.69, 6.63, 7.32, 7.97, 9.43, 10.10, 11.40, 12.00, 12.06, 12.65, 13.32, 13.90, 14.53, 15.13, 16.34]
};

function simular() {
    const bandeira = document.getElementById('bandeira').value;
    const limiteElement = document.getElementById('limite');
    const limite = parseFloat(limiteElement.value);
    const parcelas = parseInt(document.getElementById('parcelas').value);

    // Validar a seleção da bandeira do cartão
    if (!bandeira) {
        alert('Por favor, selecione uma bandeira de cartão.');
        return;  // Termina a execução da função se a bandeira não for selecionada
    }

    // Validar o valor do limite
    if (isNaN(limite) || limite <= 0) {
        alert('Por favor, insira um valor de limite válido.');
        limiteElement.focus();  // Coloca o foco no campo de limite
        return;  // Termina a execução da função se o limite não for válido
    }

    // Validar a seleção de parcelas
    if (!parcelas || parcelas < 1 || parcelas > 18) {
        alert('Por favor, selecione um número válido de parcelas.');
        return;  // Termina a execução da função se a seleção de parcelas não for válida
    }
    
    const taxa = juros[bandeira][parcelas - 1] / 100;
    const valorEmprestimo = limite;
    const totalPagar = limite * (1 + taxa);
    const valorParcela = totalPagar / parcelas;
    const jurosMes = taxa * 100;
    const jurosAno = (Math.pow(1 + taxa, 12) - 1) * 100;
    const cet = ((Math.pow(1 + taxa, parcelas) - 1) * 100).toFixed(2);

    const resultado = `Valor do empréstimo: R$ ${valorEmprestimo.toFixed(2)}<br>Total a ser pago: R$ ${totalPagar.toFixed(2)}<br>Valor da Parcela: R$ ${valorParcela.toFixed(2)}<br>Quantidade de parcelas: ${parcelas}<br>Juros ao mês: ${jurosMes.toFixed(2)}%<br>Juros ao ano: ${jurosAno.toFixed(2)}%<br>Custo Efetivo Total: ${cet}%<br>Bandeira do cartão: ${bandeira.toUpperCase()}`;
    document.getElementById('resultado').innerHTML = resultado;
}

function compartilhar() {
    const resultado = document.getElementById('resultado');
    if (resultado.innerHTML === '') {
        alert('Por favor, simule primeiro antes de compartilhar.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Contratação de Empréstimos TROCA MAIS', 10, 10);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.line(10, 15, 200, 15);  // Adiciona uma linha de separação
    const lines = document.getElementById('resultado').innerText.split('\n');
    let y = 20;
    lines.forEach(line => {
        pdf.text(line, 10, y);
        y += 10;
    });
    pdf.line(10, y + 5, 200, y + 5);  // Adiciona outra linha de separação
    pdf.text(`Data: ${new Date().toLocaleDateString()} Hora: ${new Date().toLocaleTimeString()}`, 10, y + 15);
    pdf.save('Emprestimo_TROCA_MAIS.pdf');
}
