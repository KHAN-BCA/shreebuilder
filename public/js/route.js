document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("form"); // Select the form element
    let nameInput = document.querySelector(".name");
    let emailInput = document.querySelector(".email");
    let messageInput = document.querySelector(".message");
    let subjectInput = document.querySelector(".subject"); // Only exists in contact form
    let phoneInput = document.querySelector(".phone"); // Only exists in quote form
    let btn = document.querySelector("button[type='submit']"); // Select the submit button

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let formData = {};

        formData.name = nameInput.value;
        formData.email = emailInput.value;
        formData.message = messageInput.value;

        if (subjectInput) {
            formData.subject = subjectInput.value;
            // Contact form submission
            postdata(formData, '');
        } else if (phoneInput) {
            formData.phone = phoneInput.value;
            // Quote form submission
            postdata(formData, '/quote');
        }
    });

    async function postdata(data, url) {
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            let responseData = await response.json();
            if (response.ok) {
                showAlert('success', responseData.message);
                form.reset();
            } else {
                showAlert('error', responseData.message);
            }
        } catch (err) {
            showAlert('error', 'An error occurred. Please try again.');
        }
    }

    function showAlert(type, message) {
        const alertDiv = type === 'success' ? document.getElementById('alert-success') : document.getElementById('alert-error');
        alertDiv.textContent = message;
        alertDiv.style.display = 'block';
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 3000);
    }
});
