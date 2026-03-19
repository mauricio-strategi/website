document.addEventListener('DOMContentLoaded', () => {

    // Detailed mock database representing raw reporting data
    const rawData = [
        { Empresa: "Agro+RN", Carteira: "Turismo", Município: "Natal", Estado: "RN", Mês: "Janeiro", Ano: 2026, Faturamento: "R$ 152.300", "Ticket Médio": "R$ 41.948", Crescimento: "+18%" },
        { Empresa: "Costura + RN", Carteira: "Bovinocultura", Município: "Mossoró", Estado: "RN", Mês: "Janeiro", Ano: 2026, Faturamento: "R$ 124.500", "Ticket Médio": "R$ 38.500", Crescimento: "+12%" },
        { Empresa: "Conexão Empreendedora", Carteira: "Apicultura", Município: "Parnamirim", Estado: "RN", Mês: "Fevereiro", Ano: 2026, Faturamento: "R$ 98.400", "Ticket Médio": "R$ 35.200", Crescimento: "+8%" },
        { Empresa: "Agro+RN", Carteira: "Turismo", Município: "Caicó", Estado: "RN", Mês: "Março", Ano: 2026, Faturamento: "R$ 160.000", "Ticket Médio": "R$ 45.000", Crescimento: "+5%" },
        { Empresa: "Costura + RN", Carteira: "Bovinocultura", Município: "Natal", Estado: "RN", Mês: "Fevereiro", Ano: 2026, Faturamento: "R$ 110.000", "Ticket Médio": "R$ 32.100", Crescimento: "-2%" },
        { Empresa: "Conexão Empreendedora", Carteira: "Apicultura", Município: "Mossoró", Estado: "RN", Mês: "Abril", Ano: 2026, Faturamento: "R$ 105.000", "Ticket Médio": "R$ 30.000", Crescimento: "+10%" },
        { Empresa: "Agro+RN", Carteira: "Turismo", Município: "Natal", Estado: "RN", Mês: "Fevereiro", Ano: 2026, Faturamento: "R$ 145.000", "Ticket Médio": "R$ 40.000", Crescimento: "+15%" },
        { Empresa: "Costura + RN", Carteira: "Bovinocultura", Município: "Macau", Estado: "RN", Mês: "Março", Ano: 2026, Faturamento: "R$ 130.000", "Ticket Médio": "R$ 39.000", Crescimento: "+14%" }
    ];

    const thead = document.getElementById('pivot-head');
    const tbody = document.getElementById('pivot-body');
    const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');

    function renderTable() {
        // Find which columns are actively selected
        const selectedColumns = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Render Header
        thead.innerHTML = '';
        if (selectedColumns.length === 0) {
            thead.innerHTML = '<tr><th>Selecione ao menos uma coluna no menu lateral</th></tr>';
            tbody.innerHTML = '';
            return;
        }

        selectedColumns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            thead.appendChild(th);
        });

        // Render Body
        tbody.innerHTML = '';
        rawData.forEach(row => {
            const tr = document.createElement('tr');
            
            selectedColumns.forEach(col => {
                const td = document.createElement('td');
                // Use a bold style for important metrics like Faturamento and Crescimento
                if (col === "Faturamento" || col === "Crescimento") {
                    td.innerHTML = `<strong>${row[col] || '-'}</strong>`;
                    if (col === "Crescimento" && row[col].startsWith('+')) {
                        td.innerHTML = `<strong style="color: #2e7d32;">${row[col]}</strong>`;
                    }
                } else {
                    td.textContent = row[col] || '-';
                }
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    }

    // Attach listeners to instantly update table on checkbox toggle
    checkboxes.forEach(cb => {
        cb.addEventListener('change', renderTable);
    });

    // Initial render
    renderTable();

    // Export mock action
    document.getElementById('btn-exportar').addEventListener('click', () => {
        alert("O recurso de exportação CSV será processado pelo backend no ambiente de produção.");
    });
});
