document.addEventListener("DOMContentLoaded", () => {
    const currentGoal = document.getElementById("current-goal");
    const editGoalButton = document.getElementById("edit-goal-button");
    const goalEdit = document.getElementById("goal-edit");
    const goalInput = document.getElementById("goal-input");
    const saveGoal = document.getElementById("save-goal");
    const goalUp = document.getElementById("goal-up");
    const goalDown = document.getElementById("goal-down");

    let goalDistance = 75;

    const toggleEdit = (show) => {
        goalEdit.style.display = show ? "block" : "none";
        editGoalButton.style.display = show ? "none" : "inline-block";
    };

    editGoalButton.addEventListener("click", () => {
        goalInput.value = goalDistance;
        toggleEdit(true);
    });

    goalUp.addEventListener("click", () => {
        goalInput.value = parseInt(goalInput.value) + 1;
    });

    goalDown.addEventListener("click", () => {
        if (goalInput.value > 1) {
            goalInput.value = parseInt(goalInput.value) - 1;
        }
    });

    saveGoal.addEventListener("click", () => {
        goalDistance = parseInt(goalInput.value);
        currentGoal.textContent = goalDistance;
        localStorage.setItem("goalDistance", goalDistance);
        toggleEdit(false);
    });

    currentGoal.textContent = localStorage.getItem("goalDistance") || goalDistance;
});
