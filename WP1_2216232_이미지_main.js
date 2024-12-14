document.addEventListener("DOMContentLoaded", () => {
    const runForm = document.getElementById("run-form");
    const historyList = document.getElementById("history-list");
    const totalDistanceElem = document.getElementById("distance");
    const goalProgress = document.getElementById("goal-progress");
    const goalPercentage = document.getElementById("goal-percentage");
    const sortOptions = document.getElementById("sort-options");
    const ctx = document.getElementById("run-stats-chart").getContext("2d");

    let runData = JSON.parse(localStorage.getItem("runData")) || [];
    let totalDistance = parseFloat(localStorage.getItem("totalDistance")) || 0;

    // Chart.js 그래프 초기화
    const runStatsChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [], // 날짜가 들어감
            datasets: [
                {
                    label: "거리 (km)",
                    data: [], // 거리 데이터
                    backgroundColor: "#6ab4f8",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    const updateChart = () => {
        const labels = runData.map((record) => record.date);
        const data = runData.map((record) => record.distance);
        runStatsChart.data.labels = labels;
        runStatsChart.data.datasets[0].data = data;
        runStatsChart.update();
    };

    const calculatePace = (minutes, seconds, distance) => {
        const totalSeconds = minutes * 60 + seconds;
        const paceSeconds = Math.floor(totalSeconds / distance);
        const paceMinutes = Math.floor(paceSeconds / 60);
        return `${paceMinutes}'${(paceSeconds % 60).toString().padStart(2, "0")}"`;
    };

    const updateGoal = () => {
        goalProgress.value = totalDistance;
        const percentage = ((totalDistance / goalProgress.max) * 100).toFixed(1);
        goalPercentage.textContent = `${percentage}%`;
    };

    const updateUI = () => {
        historyList.innerHTML = "";

        let sortedData = [...runData];
        if (sortOptions.value === "distance") {
            sortedData.sort((a, b) => b.distance - a.distance);
        } else {
            sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        sortedData.forEach((record) => {
            const li = document.createElement("li");
            li.textContent = `${record.date}: ${record.distance}km, ${record.time} (평균 페이스: ${record.pace})`;
            historyList.appendChild(li);
        });

        totalDistanceElem.textContent = `${totalDistance.toFixed(2)} km`;
        updateGoal();
        updateChart();
    };

    runForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("date").value;
        const distance = parseFloat(document.getElementById("distance-input").value);
        const minutes = parseInt(document.getElementById("time-minutes").value, 10);
        const seconds = parseInt(document.getElementById("time-seconds").value, 10);
        const time = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        const pace = calculatePace(minutes, seconds, distance);

        runData.push({ date, distance, time, pace });
        totalDistance += distance;

        localStorage.setItem("runData", JSON.stringify(runData));
        localStorage.setItem("totalDistance", totalDistance);
        updateUI();
        runForm.reset();
    });

    sortOptions.addEventListener("change", updateUI);

    updateUI();
});
