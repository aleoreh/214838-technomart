var storage;
var hasStorageSupport = true;

var feedbackLink = document.querySelector('.contacts__feedback-link');
var feedbackModal = document.querySelector('.modal-feedback');
var feedbackClose = feedbackModal.querySelector('.modal-feedback__close');
var feedbackForm = feedbackModal.querySelector('form');
var feedbackNameInput = feedbackModal.querySelector('[name=name]');
var feedbackEmailInput = feedbackModal.querySelector('[name=email]');
var feedbackTextarea = feedbackModal.querySelector('textarea');

var currentSlide = 2;
var sliderBackward = document.querySelector('.main-slider__rewind--backward');
var sliderForward = document.querySelector('.main-slider__rewind--forward');
var sliderItems = [
    document.querySelector('.main-slider__slide--1'),
    document.querySelector('.main-slider__slide--2'),
];
var sliderPosIndicators = [
    document.querySelector('.main-slider__position-indicator--1'),
    document.querySelector('.main-slider__position-indicator--2'),
];

var currentService = 1;
var deliveryTabButton = document.querySelector('.services__item--1 .services__item-button');
var garanteeTabButton = document.querySelector('.services__item--2 .services__item-button');
var creditTabButton =   document.querySelector('.services__item--3 .services__item-button');
var serviceTabs = [
    document.querySelector('.services__item--1'),
    document.querySelector('.services__item--2'),
    document.querySelector('.services__item--3'),
];
var serviceSections = [
    document.querySelector('.services__info--1'),
    document.querySelector('.services__info--2'),
    document.querySelector('.services__info--3'),
];

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

window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 27) {
        ev.preventDefault();
        if (feedbackModal.classList.contains('modal-show')) {
            feedbackModal.classList.remove('modal-show');
        }
    }
});

function switchSlider(cur) {
    sliderItems.forEach(function(item) {
        if (item.classList.contains('main-slider__slide--' + cur)) {
            item.classList.add('main-slider__slide--current');
        } else {
            item.classList.remove('main-slider__slide--current');
        }
    });

    sliderPosIndicators.forEach(function(item) {
        if (item.classList.contains('main-slider__position-indicator--' + cur)) {
            item.classList.add('main-slider__position-indicator--current');
        } else {
            item.classList.remove('main-slider__position-indicator--current');
        }
    });
}

sliderBackward.addEventListener('click', function(ev) {
    ev.preventDefault();

    currentSlide = currentSlide === 1 ? currentSlide : currentSlide - 1;
    switchSlider(currentSlide);
});

sliderForward.addEventListener('click', function(ev) {
    ev.preventDefault();

    currentSlide = currentSlide === 2 ? currentSlide : currentSlide + 1;
    switchSlider(currentSlide);
});

switchSlider(currentSlide);

// service tabs

function switchService(serviceNum) {
    serviceSections.forEach(function(section, index) {
        if (index + 1 !== serviceNum) {
            section.classList.remove('services__info--current');
        };
    });
    serviceTabs.forEach(function(tab, index) {
        if (index + 1 !== serviceNum) {
            tab.classList.remove('services__item--current');
        };
    });
    serviceSections[serviceNum - 1].classList.add('services__info--current');
    serviceTabs[serviceNum - 1].classList.add('services__item--current');
}

deliveryTabButton.addEventListener('click', function(ev) {
    ev.preventDefault();

    switchService(1);
});

garanteeTabButton.addEventListener('click', function(ev) {
    ev.preventDefault();

    switchService(2);
});

creditTabButton.addEventListener('click', function(ev) {
    ev.preventDefault();

    switchService(3);
});
