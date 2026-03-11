document.addEventListener('DOMContentLoaded', () => {
    // 1. Dropdown Logic
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const searchInput = dropdown.querySelector('.dropdown-search input');
        const options = dropdown.querySelectorAll('.dropdown-option');
        const span = toggle.querySelector('span');

        // Toggle menu
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.contains('show');
            closeAllDropdowns();
            if (!isOpen) {
                menu.classList.add('show');
                searchInput.focus();
            }
        });

        // Search logic
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(term)) {
                    option.classList.remove('hidden');
                } else {
                    option.classList.add('hidden');
                }
            });
        });

        // Select option
        options.forEach(option => {
            option.addEventListener('click', () => {
                span.textContent = option.dataset.value;
                menu.classList.remove('show');
                searchInput.value = '';
                options.forEach(opt => opt.classList.remove('hidden'));
            });
        });
    });

    // Close on outside click
    document.addEventListener('click', () => closeAllDropdowns());

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }

    // 2. Chart logic
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#666';

    const primaryColor = '#509ee3';
    const darkBlue = '#1a0dab';

    // Faturamento Mensal - Real Analysis Data
    const ctxMensal = document.getElementById('faturamentoMensalChart').getContext('2d');
    new Chart(ctxMensal, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Faturamento',
                // Simulated real revenue data with growth trend
                data: [104870, 98400, 112500, 105000, 118200, 125400, 110000, 115600, 128900, 134500, 142100, 152300],
                backgroundColor: darkBlue,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `R$ ${context.parsed.y.toLocaleString('pt-BR')}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { borderDash: [5, 5] },
                    ticks: {
                        callback: (value) => `R$ ${(value / 1000).toLocaleString()}k`
                    }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // Distribuição por Carteiras reais
    const ctxDist = document.getElementById('distribuicaoChart').getContext('2d');
    new Chart(ctxDist, {
        type: 'bar',
        data: {
            labels: ['Agro+RN', 'Conexão Empreendedora', 'Costura + RN', 'Turismo', 'Bovinocultura', 'Apicultura'],
            datasets: [{
                label: 'Faturamento',
                data: [450300, 320150, 210400, 185200, 142100, 95400],
                backgroundColor: [darkBlue, '#2e25b8', '#4b41d6', '#645ae6', '#7a71f0', '#9189f5'],
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `R$ ${context.parsed.x.toLocaleString('pt-BR')}`
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { borderDash: [5, 5] },
                    ticks: {
                        callback: (value) => `R$ ${(value / 1000).toLocaleString()}k`
                    }
                },
                y: { grid: { display: false } }
            }
        }
    });

    // Small Comparison Charts
    const createSmallChart = (id, data, label) => {
        const ctx = document.getElementById(id).getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: [primaryColor, primaryColor, primaryColor, darkBlue],
                    borderRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `R$ ${context.parsed.y.toLocaleString('pt-BR')}`
                        }
                    }
                },
                scales: {
                    x: { display: false },
                    y: {
                        display: true,
                        beginAtZero: true,
                        ticks: { display: false },
                        grid: { display: false }
                    }
                }
            }
        });
    };

    // Realistic weekly comparison data
    createSmallChart('comparativo1Chart', [25000, 28000, 32000, 41000], 'Janeiro');
    createSmallChart('comparativo2Chart', [22000, 24000, 28000, 35000], 'Dezembro');
});
