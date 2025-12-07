 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("persona-fan-form");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        let errors = [];

        const nameInput   = document.getElementById("playerName");
        const emailInput  = document.getElementById("email");
        const hoursInput  = document.getElementById("hours");
        const dateInput   = document.getElementById("firstGameDate");
        const gameSelect  = document.getElementById("favoriteGame");
        const comments    = document.getElementById("comments");


        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            errors.push("Your name must be at least 2 characters long.");
        }


        if (!emailInput.value.trim() || !emailInput.checkValidity()) {
            errors.push("Please enter a valid email address.");
        }


        const hoursValue = Number(hoursInput.value);
        if (!hoursInput.value || Number.isNaN(hoursValue) || hoursValue < 1 || hoursValue > 9999) {
            errors.push("Hours played must be a number between 1 and 9999.");
        }


        if (!dateInput.value) {
            errors.push("Please choose the date when you first played Persona.");
        } else {
            const chosen = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0,0,0,0);

            if (chosen > today) {
                errors.push("The date cannot be in the future.");
            }
        }


        if (!gameSelect.value) {
            errors.push("Please select your favorite Persona game.");
        }


        if (comments.value && comments.value.length > 500) {
            errors.push("Comments cannot exceed 500 characters.");
        }


        if (errors.length > 0) {
            event.preventDefault(); 
            alert("Please fix the following errors:\n\n" + errors.join("\n"));
        } else {
            alert("Thank you! Your survey has been submitted.");
        }
    });
});
