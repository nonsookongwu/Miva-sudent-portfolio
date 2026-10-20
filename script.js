'use strict';

// Each page initialises only the behaviour that it contains.
const taskForm = document.querySelector('#task-form');
if (taskForm) {
    const input = document.querySelector('#task-input');
    const list = document.querySelector('#task-list');
    const status = document.querySelector('#planner-status');
    const error = document.querySelector('#task-error');
    const storageKey = 'chukwunonso-portfolio-tasks-v1';
    let tasks = [];
    let storageAvailable = true;

    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        // Treat stored data as untrusted and discard malformed records.
        console.log(saved)
        if (Array.isArray(saved)) {
            tasks = saved.filter(task => task && typeof task.id === 'string'
                && typeof task.text === 'string' && task.text.trim()
                && typeof task.completed === 'boolean');
        }
    } catch {
        storageAvailable = false;
    }

    function saveTasks() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(tasks));
        } catch {
            storageAvailable = false;
        }
    }

    function announce(message) {
        status.textContent = message + (storageAvailable ? '' : ' Storage is unavailable; changes last for this page session only.');
    }

    function renderTasks() {
        list.replaceChildren();
        tasks.forEach(task => {
            const item = document.createElement('li');
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            const text = document.createElement('span');
            text.textContent = task.text;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                updateCount();
                announce(task.completed ? 'Task completed. Well done!' : 'Task marked as incomplete.');
            });
            label.append(checkbox, text);
            const remove = document.createElement('button');
            remove.type = 'button';
            remove.className = 'delete-task';
            remove.textContent = 'Delete';
            remove.setAttribute('aria-label', `Delete task: ${task.text}`);
            remove.addEventListener('click', () => {
                const index = tasks.findIndex(entry => entry.id === task.id);
                tasks = tasks.filter(entry => entry.id !== task.id);
                saveTasks();
                renderTasks();
                const nextButton = list.children[Math.min(index, tasks.length - 1)]?.querySelector('button');
                (nextButton || input).focus();
                announce('Task deleted.');
            });
            item.append(label, remove);
            list.append(item);
        });
        updateCount();
    }

    function updateCount() {
        const completed = tasks.filter(task => task.completed).length;
        document.querySelector('#task-count').textContent = `${completed} of ${tasks.length} tasks completed`;
        document.querySelector('#empty-tasks').hidden = tasks.length > 0;
    }

    taskForm.addEventListener('submit', event => {
        event.preventDefault();
        const text = input.value.trim();
        error.textContent = text ? '' : 'Please enter a task.';
        input.setAttribute('aria-invalid', String(!text));
        if (!text) {
            input.focus();
            return;
        }
        tasks.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, completed: false });
        saveTasks();
        renderTasks();
        input.value = '';
        input.focus();
        announce('Task added.');
    });
    renderTasks();
    if (!storageAvailable) announce('Planner ready.');
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    const fields = ['name', 'email', 'phone', 'message'];
    function validateField(id) {
        const field = contactForm.elements.namedItem(id);
        const value = field.value.trim();
        let message = '';
        if (!value) message = 'Please complete this field.';
        else if (id === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || field.validity.typeMismatch)) {
            message = 'Enter a valid email address, e.g. alex@example.com.';
        } else if (id === 'phone' && !/^[0-9]+$/.test(value)) {
            message = 'Use digits only (0–9), with no spaces or symbols.';
        }
        field.setAttribute('aria-invalid', String(Boolean(message)));
        document.getElementById(`${id}-error`).textContent = message;
        return !message;
    }
    fields.forEach(id => {
        contactForm.elements.namedItem(id).addEventListener('input', () => {
            document.querySelector('#contact-status').textContent = '';
            if (contactForm.elements.namedItem(id).hasAttribute('aria-invalid')) validateField(id);
        });
    });
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const invalid = fields.filter(id => !validateField(id));
        const status = document.querySelector('#contact-status');
        if (invalid.length) {
            status.textContent = 'Please correct the highlighted fields.';
            contactForm.elements.namedItem(invalid[0]).focus();
            return;
        }
        status.textContent = 'Your message passed validation. This is a demo: no message has been sent. Your text remains here for you to copy.';
    });
}
