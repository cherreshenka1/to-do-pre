// ===== ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM =====
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const listElement = document.querySelector('.to-do__list');
const template = document.querySelector('#to-do__item-template');

// ===== НАЧАЛЬНЫЙ МАССИВ ЗАДАЧ =====
const initialItems = [
    'Изучить основы JavaScript',
    'Написать первую функцию',
    'Создать to-do приложение',
    'Добавить сохранение в localStorage',
    'Реализовать удаление задач',
    'Сделать копирование задач'
];

// ===== ФУНКЦИЯ ПОЛУЧЕНИЯ ЗАДАЧ ИЗ LOCALSTORAGE =====
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return initialItems;
}

// ===== ФУНКЦИЯ СОХРАНЕНИЯ ЗАДАЧ В LOCALSTORAGE =====
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ===== ФУНКЦИЯ СБОРА ЗАДАЧ ИЗ DOM =====
function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
    const tasks = [];
    itemsNamesElements.forEach((element) => {
        tasks.push(element.textContent);
    });
    return tasks;
}

// ===== ФУНКЦИЯ СОЗДАНИЯ ЭЛЕМЕНТА ЗАДАЧИ =====
function createItem(itemText) {
    // Клонируем шаблон
    const clone = template.content.cloneNode(true);
    const taskElement = clone.querySelector('.to-do__item');
    const textElement = taskElement.querySelector('.to-do__item-text');
    const editButton = taskElement.querySelector('.to-do__item-button_type_edit');
    const duplicateButton = taskElement.querySelector('.to-do__item-button_type_duplicate');
    const deleteButton = taskElement.querySelector('.to-do__item-button_type_delete');
    
    // Устанавливаем текст задачи
    textElement.textContent = itemText;
    
    // ===== ОБРАБОТЧИК УДАЛЕНИЯ =====
    deleteButton.addEventListener('click', () => {
        taskElement.remove();
        const tasks = getTasksFromDOM();
        saveTasks(tasks);
    });
    
    // ===== ОБРАБОТЧИК КОПИРОВАНИЯ =====
    duplicateButton.addEventListener('click', () => {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const tasks = getTasksFromDOM();
        saveTasks(tasks);
    });
    
    // ===== ОБРАБОТЧИК РЕДАКТИРОВАНИЯ (ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ) =====
    editButton.addEventListener('click', () => {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });
    
    textElement.addEventListener('blur', () => {
        textElement.setAttribute('contenteditable', 'false');
        const tasks = getTasksFromDOM();
        saveTasks(tasks);
    });
    
    return taskElement;
}

// ===== ОТОБРАЖЕНИЕ ЗАДАЧ ПРИ ЗАГРУЗКЕ =====
let items = loadTasks();

items.forEach((item) => {
    const taskElement = createItem(item);
    listElement.append(taskElement);
});

// ===== ОБРАБОТЧИК ДОБАВЛЕНИЯ НОВОЙ ЗАДАЧИ =====
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newTaskText = inputElement.value.trim();
    
    if (newTaskText === '') {
        return;
    }
    
    const newTaskElement = createItem(newTaskText);
    listElement.prepend(newTaskElement);
    
    inputElement.value = '';
    
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
});
