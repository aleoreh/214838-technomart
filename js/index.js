var storage;
var hasStorageSupport = true;

var feedbackLink = document.querySelector('.contacts__feedback-link');
var feedbackModal = document.querySelector('.modal-feedback');
var feedbackClose = feedbackModal.querySelector('.modal-feedback__close');
var feedbackForm = feedbackModal.querySelector('form');
var feedbackNameInput = feedbackModal.querySelector('[name=name]');
var feedbackEmailInput = feedbackModal.querySelector('[name=email]');
var feedbackTextarea = feedbackModal.querySelector('textarea');

try {
    storage = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email')
    };
} catch (err) {
    hasStorageSupport = false;
}

feedbackLink.addEventListener('click', function(ev) {
    ev.preventDefault();
    feedbackModal.classList.add('modal-show');
    if (hasStorageSupport) {
        feedbackNameInput.value = storage.name;
        feedbackEmailInput.value = storage.email;
        if (!feedbackNameInput.value) {
            feedbackNameInput.focus();
        } else if (!feedbackEmailInput.value) {
            feedbackEmailInput.focus();
        } else {
            feedbackTextarea.focus();
        }
    }
});

feedbackClose.addEventListener('click', function(ev) {
    ev.preventDefault();
    feedbackModal.classList.remove('modal-show');
});

feedbackForm.addEventListener('submit', function(ev) {
    if (!feedbackNameInput.value || !feedbackEmailInput.value || !feedbackTextarea.value) {
        ev.preventDefault();
        console.log('Нужно ввести имя, email и текст сообщения');
    } else {
        if (hasStorageSupport) {
            localStorage.setItem('name', feedbackNameInput.value);
            localStorage.setItem('email', feedbackEmailInput.value);
        }
    }
});

window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 27) {
        ev.preventDefault();
        if (feedbackModal.classList.contains('modal-show')) {
            feedbackModal.classList.remove('modal-show');
        }
    }
});

