document.addEventListener("DOMContentLoaded", () => {
    const goalUpButton = document.getElementById("goal-up");
    const goalDownButton = document.getElementById("goal-down");
    const goalDistanceElem = document.getElementById("goal-distance");

    let goalDistance = JSON.parse(localStorage.getItem("goalDistance")) || 50;

    goalDistanceElem.textContent = goalDistance;

    const updateGoalDistance = () => {
        localStorage.setItem("goalDistance", JSON.stringify(goalDistance));
        goalDistanceElem.textContent = goalDistance;
    };

    goalUpButton.addEventListener("click", () => {
        goalDistance += 1;
        updateGoalDistance();
    });

    goalDownButton.addEventListener("click", () => {
        if (goalDistance > 1) {
            goalDistance -= 1;
            updateGoalDistance();
        }
    });
});
