// script.js
const addNoteBtn = document.querySelector('.add-note-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const cancelBtn = document.querySelector('.cancel-btn');
const applyBtn = document.querySelector('.apply-btn');
const noteText = document.querySelector('.note-text');
const notesList = document.getElementById('notes-list');
const emptyState = document.getElementById('empty-state');
const searchInput = document.querySelector('.search');
const filterSelect = document.querySelector('select');
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleBtn_img = document.querySelector("#theme-toggle>img");

// Модальное окно удаления
const deleteModalOverlay = document.querySelector('.delete-modal-overlay');
const cancelDeleteBtn = document.querySelector('.cancel-delete-btn');
const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');

// Переменная для хранения заметки, которую собираемся удалить
let noteToDelete = null;

// Показ модального окна
addNoteBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    noteText.value = '';
    noteText.focus();
});

// Скрытие модального окна
cancelBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Закрытие модального окна при клике на overlay
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Добавление новой заметки
applyBtn.addEventListener('click', () => {
    const text = noteText.value.trim();
    
    if (text) {
        createNote(text);
        modalOverlay.classList.remove('active');
        noteText.value = '';
        
        // Показываем список заметок и скрываем пустое состояние
        if (emptyState.style.display !== 'none') {
            emptyState.style.display = 'none';
            notesList.style.display = 'flex';
        }
    }
});

// Создание элемента заметки
function createNote(text) {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    
    noteItem.innerHTML = `
        <input type="checkbox">
        <div class="note-content">
            <h2 class="note-title">${text}</h2>
            <input type="text" class="note-edit-input" style="display: none;" value="${text}">
        </div>
        <div class="note-actions">
            <button class="edit" type="button">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.17272 3.49106L0.5 10.1637V13.5H3.83636L10.5091 6.82736M7.17272 3.49106L9.5654 1.09837L9.5669 1.09695C9.8962 0.767585 10.0612 0.602613 10.2514 0.540824C10.4189 0.486392 10.5993 0.486392 10.7669 0.540824C10.9569 0.602571 11.1217 0.767352 11.4506 1.09625L12.9018 2.54738C13.2321 2.87769 13.3973 3.04292 13.4592 3.23337C13.5136 3.40088 13.5136 3.58133 13.4592 3.74885C13.3974 3.93916 13.2324 4.10414 12.9025 4.43398L12.9018 4.43468L10.5091 6.82736M7.17272 3.49106L10.5091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="delete" type="button">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
                    <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>
                    <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
                    <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                    <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Добавляем новую заметку в начало списка
    notesList.appendChild(noteItem);
    
    // Добавляем обработчики для новой заметки
    addNoteEventListeners(noteItem);
}

// Добавление обработчиков событий для заметки
function addNoteEventListeners(noteItem) {
    const checkbox = noteItem.querySelector('input[type="checkbox"]');
    const editBtn = noteItem.querySelector('.edit');
    const deleteBtn = noteItem.querySelector('.delete');
    const noteTitle = noteItem.querySelector('.note-title');
    const noteEditInput = noteItem.querySelector('.note-edit-input');
    
    // Обработчик для чекбокса
    checkbox.addEventListener('change', () => {
        console.log(checkbox.checked);
        
        if (checkbox.checked) {
            noteItem.classList.add('completed');
        } else {
            noteItem.classList.remove('completed');
        }
    });
    
    // Обработчик для кнопки редактирования
    editBtn.addEventListener('click', () => {
        // Переключаем режим редактирования
        if (noteTitle.style.display !== 'none') {
            // Включаем режим редактирования
            noteTitle.style.display = 'none';
            noteEditInput.style.display = 'block';
            noteEditInput.focus();
            noteEditInput.select();
            
            // Меняем иконку редактирования на иконку сохранения
            editBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="#CDCDCD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 21V13H7V21" stroke="#CDCDCD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 3V8H15" stroke="#CDCDCD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else {
            // Сохраняем изменения
            saveNoteChanges(noteItem, noteTitle, noteEditInput, editBtn);
        }
    });
    
    // Сохранение по нажатию Enter
    noteEditInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveNoteChanges(noteItem, noteTitle, noteEditInput, editBtn);
        }
    });
    
    // Отмена редактирования при потере фокуса
    noteEditInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (noteEditInput.style.display === 'block') {
                saveNoteChanges(noteItem, noteTitle, noteEditInput, editBtn);
            }
        }, 100);
    });
    
    // Обработчик для кнопки удаления
    deleteBtn.addEventListener('click', () => {
        showDeleteModal(noteItem);
    });
}

// Функция для сохранения изменений заметки
function saveNoteChanges(noteItem, noteTitle, noteEditInput, editBtn) {
    const newText = noteEditInput.value.trim();
    
    if (newText && newText !== noteTitle.textContent) {
        noteTitle.textContent = newText;
    }
    
    // Возвращаем обычный вид
    noteTitle.style.display = 'block';
    noteEditInput.style.display = 'none';
    
    // Возвращаем иконку редактирования
    editBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.17272 3.49106L0.5 10.1637V13.5H3.83636L10.5091 6.82736M7.17272 3.49106L9.5654 1.09837L9.5669 1.09695C9.8962 0.767585 10.0612 0.602613 10.2514 0.540824C10.4189 0.486392 10.5993 0.486392 10.7669 0.540824C10.9569 0.602571 11.1217 0.767352 11.4506 1.09625L12.9018 2.54738C13.2321 2.87769 13.3973 3.04292 13.4592 3.23337C13.5136 3.40088 13.5136 3.58133 13.4592 3.74885C13.3974 3.93916 13.2324 4.10414 12.9025 4.43398L12.9018 4.43468L10.5091 6.82736M7.17272 3.49106L10.5091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
}

// Показ модального окна удаления
function showDeleteModal(noteItem) {
    noteToDelete = noteItem;
    deleteModalOverlay.classList.add('active');
}

// Скрытие модального окна удаления
cancelDeleteBtn.addEventListener('click', () => {
    deleteModalOverlay.classList.remove('active');
    noteToDelete = null;
});

// Подтверждение удаления
confirmDeleteBtn.addEventListener('click', () => {
    if (noteToDelete) {
        noteToDelete.remove();
        deleteModalOverlay.classList.remove('active');
        noteToDelete = null;
        
        // Проверяем, остались ли заметки
        checkIfEmpty();
    }
});

// Закрытие модального окна удаления при клике на overlay
deleteModalOverlay.addEventListener('click', (e) => {
    if (e.target === deleteModalOverlay) {
        deleteModalOverlay.classList.remove('active');
        noteToDelete = null;
    }
});

// Проверка пустого состояния
function checkIfEmpty() {
    const noteItems = notesList.querySelectorAll('.note-item');
    if (noteItems.length === 0) {
        // Если заметок нет, показываем пустое состояние
        emptyState.style.display = 'block';
        notesList.style.display = 'none';
    }
}

// Поиск заметок
searchInput.addEventListener('input', filterNotes);

function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const noteItems = notesList.querySelectorAll('.note-item');
    
    let hasVisibleNotes = false;
    
    noteItems.forEach(item => {
        const title = item.querySelector('.note-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'flex';
            hasVisibleNotes = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Если после поиска нет видимых заметок, показываем пустое состояние
    if (!hasVisibleNotes && noteItems.length > 0) {
        emptyState.style.display = 'block';
        emptyState.querySelector('.empty-text');
    } else if (hasVisibleNotes) {
        emptyState.style.display = 'none';
        notesList.style.display = 'flex';
    }
}

// Фильтрация по статусу
filterSelect.addEventListener('change', filterByStatus);

function filterByStatus() {
    const status = filterSelect.value;
    const noteItems = notesList.querySelectorAll('.note-item');
    
    let hasVisibleNotes = false;
    
    noteItems.forEach(item => {
        const isCompleted = item.classList.contains('completed');
        
        switch (status) {
            case 'complete':
                item.style.display = isCompleted ? 'flex' : 'none';
                if (isCompleted) hasVisibleNotes = true;
                break;
            case 'incomplete':
                item.style.display = !isCompleted ? 'flex' : 'none';
                if (!isCompleted) hasVisibleNotes = true;
                break;
            default: // 'all'
                item.style.display = 'flex';
                hasVisibleNotes = true;
        }
    });
    
    // Показываем пустое состояние если нет заметок после фильтрации
    if (!hasVisibleNotes && noteItems.length > 0) {
        emptyState.style.display = 'block';
        emptyState.querySelector('.empty-text').textContent = 'No notes match the selected filter';
        notesList.style.display = 'none';
    } else if (hasVisibleNotes) {
        emptyState.style.display = 'none';
        notesList.style.display = 'flex';
    }
}

// Добавляем возможность нажимать Enter в модальном окне
noteText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        applyBtn.click();
    }
});

// Закрытие модальных окон по клавише Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Закрыть модальное окно удаления
        if (deleteModalOverlay.classList.contains('active')) {
            deleteModalOverlay.classList.remove('active');
            noteToDelete = null;
        }
        
        // Закрыть модальное окно добавления заметки
        if (modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    }
});

// Смена темы 
themeToggleBtn.addEventListener("click",() => {
    console.log(document.getElementsByTagName("body"));
    
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    
    // Меняем иконку темы (луна/солнце)
    themeToggleBtn_img.setAttribute(
        "src",
        themeToggleBtn_img.getAttribute("src") == "moon.svg"
        ? "sun.svg"
        : "moon.svg"
    );
    
    // Меняем изображение детектива
    const detectiveImg = document.querySelector('.empty-state img');
    if (detectiveImg) {
        detectiveImg.setAttribute(
            "src",
            document.getElementsByTagName("body")[0].classList.contains("dark")
            ? "Detective1.svg"
            : "Detective.svg"
        );
    }
    
    // Меняем иконку лупы в поиске
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.setAttribute(
            "src",
            document.getElementsByTagName("body")[0].classList.contains("dark")
            ? "Vector1.svg"  // Для темной темы
            : "Vector (2).svg"  // Для светлой темы
        );
    }
});
