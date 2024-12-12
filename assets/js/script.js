document.getElementById('nameInput').addEventListener('input', function() {
    const nameInput = document.getElementById('nameInput');
    const submitButton = document.querySelector('.btn-primary');
    if (nameInput.value.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

function redirectToCategory() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput !== '') {
        window.location.href = `category.html?name=${encodeURIComponent(nameInput)}`;
    }
}