const form = document.getElementById('portfolio-form');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop the default page reload

    // 1. UI Loading State
    btnText.innerText = "Sending...";
    btnIcon.className = "fas fa-spinner fa-spin";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    const formData = new FormData(form);

    try {
        // 2. Send data to Formspree via AJAX
        const response = await fetch("https://formspree.io/f/xzdypdga", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // 3. Success logic
            form.reset(); // This clears the previous responses from the inputs
            
            // 4. Redirect to your custom thanks page
            window.location.href = "thanks.html"; 
        } else {
            const data = await response.json();
            alert("Submission failed: " + (data.errors ? data.errors[0].message : "Unknown error"));
            resetButton();
        }
    } catch (error) {
        alert("Network error. Please try again.");
        resetButton();
    }
});

function resetButton() {
    btnText.innerText = "Send Message";
    btnIcon.className = "fas fa-paper-plane";
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
}