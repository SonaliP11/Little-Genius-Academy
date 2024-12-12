
    document.getElementById('nameInput').addEventListener('input', function() {
        const nameInput = document.getElementById('nameInput');
        const submitButton = document.querySelector('.btn-primary');
        if (nameInput.value.trim() !== '') {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });