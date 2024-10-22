let form = document.querySelector("form");
let btn = document.querySelector("button[type='submit']");

btn.addEventListener('click', (e) => {

    let nameInput = document.querySelector(".name");
    let emailInput = document.querySelector(".email");
    let messageInput = document.querySelector(".message");
    let subjectInput = document.querySelector(".subject");
    let phoneInput = document.querySelector(".phone");

    e.preventDefault();
    let formData = {};

    formData.name = nameInput.value;
    formData.email = emailInput.value;
    formData.message = messageInput.value;

    if (subjectInput) {
        formData.subject = subjectInput.value;
        postdata(formData, 'https://shreebuilder.onrender.com/contact');
    } else if (phoneInput) {
        formData.phone = phoneInput.value;
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

