document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("history-list");
    const goalProgress = document.getElementById("goal-progress");
    const goalPercentage = document.getElementById("goal-percentage");
    const ctx = document.getElementById("run-stats-chart").getContext("2d");

    let history = JSON.parse(localStorage.getItem("history")) || [];
    let goalDistance = 50;

    // 통계 그래프 생성
    let chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "거리 (km)",
                data: [],
                backgroundColor: "#6aabd2"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const updateStatistics = () => {
        const dates = history.map(item => item.date);
        const distances = history.map(item => item.distance);
        chart.data.labels = dates;
        chart.data.datasets[0].data = distances;
        chart.update();
    };

    const updateGoalProgress = () => {
        const totalDistance = history.reduce((sum, record) => sum + record.distance, 0);
        goalProgress.value = totalDistance;
        goalPercentage.textContent = `${((totalDistance / goalDistance) * 100).toFixed(1)}%`;
    };

    document.getElementById("run-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("date").value;
        const distance = parseFloat(document.getElementById("distance-input").value);

        history.push({ date, distance });
        localStorage.setItem("history", JSON.stringify(history));

        const li = document.createElement("li");
        li.textContent = `${date}: ${distance}km`;
        historyList.appendChild(li);

        updateStatistics();
        updateGoalProgress();
    });

    // 초기 렌더링
    history.forEach(({ date, distance }) => {
        const li = document.createElement("li");
        li.textContent = `${date}: ${distance}km`;
        historyList.appendChild(li);
    });

    updateStatistics();
    updateGoalProgress();
});
