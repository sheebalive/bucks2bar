function getIncomeAndExpenses() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 
        'june', 'july', 'august', 'september', 
        'october', 'november', 'december'
    ];

    const data = months.map(month => {
        const income = document.getElementById(`${month}-income`)?.value || 0;
        const expenses = document.getElementById(`${month}-expenses`)?.value || 0;

        return {
            month: month.charAt(0).toUpperCase() + month.slice(1),
            income: parseFloat(income),
            expenses: parseFloat(expenses)
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
        barChart.update();
    }

    function populateRandomData() {
        const months = [
            'january', 'february', 'march', 'april', 'may', 
            'june', 'july', 'august', 'september', 
            'october', 'november', 'december'
        ];

        months.forEach(month => {
            const randomIncome = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;
            const randomExpenses = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;

            document.getElementById(`${month}-income`).value = randomIncome;
            document.getElementById(`${month}-expenses`).value = randomExpenses;
        });
    }

    populateRandomData();

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

module.exports = { getIncomeAndExpenses };