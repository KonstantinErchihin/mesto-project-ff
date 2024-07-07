export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('mousedown', closeModalOverlay);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('mousedown', closeModalOverlay);
}

export function closeModalEsc(evt) {
	if (evt.key === 'Escape') {
		closeModal(document.querySelector('.popup_is-opened'));
	}
}

    export function closeModalOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            closeModal(evt.target);
        }
    }   