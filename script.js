// Элементы модального окна
const modalOverlay = document.getElementById('modalOverlay');
const addNoteBtn = document.querySelector('.add-note-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const applyBtn = document.querySelector('.apply-btn');
const noteInput = document.querySelector('.note-input');

// Открытие модального окна
addNoteBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    noteInput.value = ''; // Очищаем поле при открытии
    noteInput.focus();
});

// Закрытие модального окна
cancelBtn.addEventListener('click', closeModal);
applyBtn.addEventListener('click', addNewNote);

// Закрытие по клику на overlay
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.remove('active');
}
