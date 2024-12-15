document.addEventListener("DOMContentLoaded", () => {
    const goalProgress = document.getElementById("goal-progress");
    const goalPercentage = document.getElementById("goal-percentage");
    const goalDistanceElem = document.getElementById("goal-distance");

    let totalDistance = JSON.parse(localStorage.getItem("totalDistance")) || 0;
    let goalDistance = JSON.parse(localStorage.getItem("goalDistance")) || 50;

    goalProgress.max = goalDistance;
    goalDistanceElem.textContent = goalDistance;

    const updateGoalProgress = () => {
        const percentage = ((totalDistance / goalDistance) * 100).toFixed(1);
        goalPercentage.textContent = `${percentage}%`;
        goalProgress.value = totalDistance;
    };

    updateGoalProgress();
});
