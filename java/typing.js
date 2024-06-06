document.addEventListener("DOMContentLoaded", function() {
    const typingElement = document.querySelector('.typing');
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        const currentFullWord = words[wordIndex];
        
        if (!isDeleting && charIndex <= currentFullWord.length) {
            currentWord = currentFullWord.substring(0, charIndex);
            charIndex++;
            typingElement.innerHTML = currentWord;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex >= 0) {
            currentWord = currentFullWord.substring(0, charIndex);
            charIndex--;
            typingElement.innerHTML = currentWord;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex > currentFullWord.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000); // Wait for 2 seconds before deleting
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        }
    }

    setTimeout(type, 1000);
});
