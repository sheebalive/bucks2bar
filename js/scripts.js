const MONTHS = [
    'january', 'february', 'march', 'april', 'may',
    'june', 'july', 'august', 'september',
    'october', 'november', 'december'
];

function getIncomeAndExpenses() {
    const data = MONTHS.map(month => {
        const income = document.getElementById(`${month}-income`)?.value || 0;
        const expenses = document.getElementById(`${month}-expenses`)?.value || 0;
        const incomeNum = parseFloat(income);
        const expensesNum = parseFloat(expenses);

        return {
            month: month.charAt(0).toUpperCase() + month.slice(1),
            income: incomeNum,
            expenses: expensesNum,
            net: incomeNum - expensesNum
        };
    });

    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById('username'); 
    usernameInput.addEventListener('input', function () {
        const username = usernameInput.value;   
        const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (usernameRegex.test(username)) { 
            usernameInput.style.borderColor = 'green';
        } else {
            usernameInput.style.borderColor = 'red'; 
        }
    });

    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Net Savings',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                type: 'line', // Display as a line chart on top of the bars
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChart() {
        const data = getIncomeAndExpenses();
        barChart.data.datasets[0].data = data.map(item => item.income);
        barChart.data.datasets[1].data = data.map(item => item.expenses);
        barChart.data.datasets[2].data = data.map(item => item.net);
        barChart.update();
    }

    function populateDataInputs() {
        const dataInputsContainer = document.getElementById('data-inputs');
        if (!dataInputsContainer) return;
    
        let html = '';
        MONTHS.forEach(month => {
            const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
            html += `
                <div class="col-12 col-md-6">
                    <h4 class="p-2 rounded-2" data-month="${month}">${capitalizedMonth}</h4>
                    <div class="row mb-3">
                        <div class="col-12 col-md-6 mb-2 mb-md-0">
                            <div class="input-group">
                                <label class="input-group-text" for="${month}-income">Income</label>
                                <input type="number" class="form-control financial-input" id="${month}-income" placeholder="Enter income" min="0" step="any">
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="input-group">
                                <label class="input-group-text" for="${month}-expenses">Expenses</label>
                                <input type="number" class="form-control financial-input" id="${month}-expenses" placeholder="Enter expenses" min="0" step="any">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        dataInputsContainer.innerHTML = html;
    }

    function populateRandomData() {
        MONTHS.forEach(month => {
            const randomIncome = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;
            const randomExpenses = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;

            document.getElementById(`${month}-income`).value = randomIncome;
            document.getElementById(`${month}-expenses`).value = randomExpenses;
        });
    }

    function updateDataTabColors() {
        const data = getIncomeAndExpenses();
        data.forEach(item => {
            const month = item.month.toLowerCase();
            const monthHeader = document.querySelector(`#data-inputs h4[data-month="${month}"]`);

            if (monthHeader) {
                // Reset classes to avoid conflicts
                monthHeader.classList.remove(
                    'bg-success-subtle', 'text-success-emphasis',
                    'bg-danger-subtle', 'text-danger-emphasis',
                    'bg-secondary-subtle'
                );

                // Apply new classes based on net income
                if (item.net > 0) {
                    monthHeader.classList.add('bg-success-subtle', 'text-success-emphasis');
                } else if (item.net < 0) {
                    monthHeader.classList.add('bg-danger-subtle', 'text-danger-emphasis');
                } else {
                    monthHeader.classList.add('bg-secondary-subtle');
                }
            }
        });
    }

    function addInputValidation() {
        const financialInputs = document.querySelectorAll('.financial-input');
        financialInputs.forEach(input => {
            input.addEventListener('input', (event) => {
                // Use browser's built-in validity check for type="number"
                if (event.target.validity.valid) {
                    event.target.classList.remove('is-invalid');
                    updateChart();
                    updateDataTabColors();
                } else {
                    event.target.classList.add('is-invalid');
                }
            });
        });
    }

    populateDataInputs();
    addInputValidation();
    populateRandomData();
    updateChart();
    updateDataTabColors();

    const chartTab = document.getElementById('chart-tab');
    chartTab.addEventListener('click', updateChart);

    const downloadButton = document.getElementById('download');
    downloadButton.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = document.getElementById('barChart').toDataURL('image/png');
        link.download = 'chart-report.png';
        link.click();
    });
});

// Make the script safe for both browser and Node.js environments (for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getIncomeAndExpenses };
}