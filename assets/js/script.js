<<<<<<<<< Temporary merge branch 1


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

=========
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
    // Function to get query parameter value by name
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the name parameter from the URL
    const userName = getQueryParam('name');
    if (userName) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
    }

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

    window.redirectToCategory = function() {
        const nameInput = document.getElementById('nameInput').value.trim();
        if (nameInput !== '') {
            window.location.href = `category.html?name=${encodeURIComponent(nameInput)}`;
        }
    };

    window.updateGameUrls = function() {
        const userName = getQueryParam('name');
        if (userName) {
            const mathsLink = document.querySelector('.card-subject[onclick*="maths.html"]');
            const englishLink = document.querySelector('.card-subject[onclick*="english.html"]');
            if (mathsLink) {
                mathsLink.setAttribute('onclick', `selectOption(this, 'maths.html?name=${encodeURIComponent(userName)}')`);
            }
            if (englishLink) {
                englishLink.setAttribute('onclick', `selectOption(this, 'english.html?name=${encodeURIComponent(userName)}')`);
            }
        }
    };

    // Call updateGameUrls to update the URLs on page load
    updateGameUrls();
});

let selectedGameUrl = '';

window.selectOption = function(element, url) {
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

    // Update the Start button's onclick event
    startButton.onclick = function() {
        window.location.href = selectedGameUrl;
    };
};

function startGame() {
    if (selectedGameUrl) {
        window.location.href = selectedGameUrl;
    }
}
>>>>>>>>> Temporary merge branch 2
