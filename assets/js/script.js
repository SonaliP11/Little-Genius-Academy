

document.getElementById('nameInput').addEventListener('input', function() {
    const nameInput = document.getElementById('nameInput');
    const submitButton = document.querySelector('.btn-primary');
    if (nameInput.value.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const submitButton = document.querySelector('.btn-primary');
            if (nameInput.value.trim() !== '') {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        });
    }

    function redirectToCategory() {
        const nameInput = document.getElementById('nameInput').value.trim();
        if (nameInput !== '') {
            window.location.href = `category.html?name=${encodeURIComponent(nameInput)}`;
        }
    }

    window.redirectToCategory = redirectToCategory;

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const userName = getQueryParam('name');
    if (userName) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
    }
});

let selectedGameUrl = '';

function selectOption(element, url) {
    // Remove 'selected' class from all options
    document.querySelectorAll('.card-subject').forEach(option => {
        option.classList.remove('selected');
    });

    // Add 'selected' class to the clicked option
    element.classList.add('selected');

    // Enable the Start button
    const startButton = document.getElementById('startButton');
    startButton.disabled = false;

    // Store the selected game URL
    selectedGameUrl = url;
}

function startGame() {
    if (selectedGameUrl) {
        window.location.href = selectedGameUrl;
    }
}

