document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("history-list");
    const goalDistanceElem = document.getElementById("goal-distance");
    const goalProgress = document.getElementById("goal-progress");
    const goalPercentage = document.getElementById("goal-percentage");
    const ctx = document.getElementById("run-stats-chart").getContext("2d");

    let history = JSON.parse(localStorage.getItem("history")) || [];
    let goalDistance = parseInt(localStorage.getItem("goalDistance")) || 60;

    goalDistanceElem.textContent = goalDistance;
    goalProgress.max = goalDistance;

    // Chart.js 그래프 생성
    const chart = new Chart(ctx, {
        type: "bar",
        data: { labels: [], datasets: [{ label: "거리 (km)", data: [] }] },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    const updateChart = () => {
        const labels = history.map(item => item.date);
        const data = history.map(item => item.distance);
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    };

    const updateGoalProgress = () => {
        const totalDistance = history.reduce((sum, record) => sum + record.distance, 0);
        goalProgress.value = totalDistance;
        goalPercentage.textContent = `${((totalDistance / goalDistance) * 100).toFixed(1)}%`;
    };

    const renderHistory = () => {
        historyList.innerHTML = "";
        history.forEach(({ date, distance, time }, index) => {
            const li = document.createElement("li");
            const pace = calculatePace(time, distance);
            li.textContent = `${date} - ${distance}km - ${time}분 (${pace}분/km)`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "삭제";
            deleteBtn.addEventListener("click", () => {
                history.splice(index, 1);
                saveData();
            });

            li.appendChild(deleteBtn);
            historyList.appendChild(li);
        });
    };

    const calculatePace = (time, distance) => {
        return distance > 0 ? (time / distance).toFixed(2) : "0";
    };

    const saveData = () => {
        localStorage.setItem("history", JSON.stringify(history));
        renderHistory();
        updateChart();
        updateGoalProgress();
    };

    document.getElementById("run-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("date").value;
        const distance = parseFloat(document.getElementById("distance-input").value);
        const timeMinutes = parseInt(document.getElementById("time-minutes").value, 10);
        const timeSeconds = parseInt(document.getElementById("time-seconds").value, 10);
        const totalTime = timeMinutes + timeSeconds / 60;

        history.push({ date, distance, time: totalTime.toFixed(2) });
        saveData();
    });

    renderHistory();
    updateChart();
    updateGoalProgress();
});
