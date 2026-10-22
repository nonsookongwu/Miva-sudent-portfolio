# Student portfolio — developer documentation

A static portfolio for Chukwunonso, a MIVA Open University student. It presents a biography, education, skills and selected work, alongside an interactive academic task planner and a contact-form validation demo.

## Run locally

Open `index.html` in a modern browser. No package installation or build is required. For consistent browser storage, serve the project root with a static HTTP server, for example `python3 -m http.server 8000`, then visit `http://localhost:8000`.

The implementation uses HTML, shared CSS and plain JavaScript. Four pages load Google Fonts; system font fallbacks are defined in CSS. No application framework or backend is included.

## Project structure

| File | Implemented responsibility |
| --- | --- |
| [index.html](index.html) | Home: introduction, portrait, study summary and navigation to projects, biography and planner. |
| [about.html](about.html) | Biography, career goals, hobbies, education table, skills and audio introduction with transcript. |
| [projects.html](projects.html) | Three illustrated project cards linking to external websites. |
| [planner.html](planner.html) | Task entry form, task list, completion count, empty state and status feedback. |
| [contact.html](contact.html) | Email link and locally validated name, email, phone and message fields. |
| [script.js](script.js) | Planner state, persistence, DOM rendering and contact validation. |
| [index.css](index.css) | Shared design tokens, layouts, components, responsive rules and accessibility styles. |
| `assets/` | Portraits, project screenshots and `introduction.opus`. |

## Shared page structure

Each page includes semantic navigation, a main content area and a footer. A skip link lets keyboard users jump to the main content; `aria-current="page"` identifies the active navigation item. The shared script is deferred and initialises planner/contact behaviour only when the corresponding form exists.

[index.html:17](index.html#L17)

```html
    <link rel="stylesheet" href="index.css" />
    <script src="script.js" defer></script>
```

[script.js:4](script.js#L4)

```javascript
const taskForm = document.querySelector('#task-form');
if (taskForm) {
```

## Home and about

The home page provides a hero introduction, portrait, project/about links and a three-column study summary. About adds an education table, skill tags and hobbies. Its native audio player includes a download fallback, followed by an expandable text transcript.

[about.html:116](about.html#L116)

```html
          <audio controls preload="metadata">
            <source src="assets/introduction.opus" type="audio/wav" />
            Your browser does not support audio.
            <a href="assets/introduction.opus">Download the introduction</a>.
          </audio>
```

## Project showcase

`projects.html` renders three cards with screenshots, technology labels, descriptions and external links: Turning Point today, a guest-house website (currently titled “Campus Library”), and RAWG game discovery. These are portfolio links; their application source is not included here. The older simulated library/results previews are commented out and do not render.

The Turning Point card links directly to its external site:

[projects.html:63](projects.html#L63)

```html
            <a
              class="text-link"
              href="https://turningpointtoday.com/"
              target="_blank"
              >
```

## Academic planner

### Add and display tasks

Submitting the form trims input and rejects empty text with an inline error and focus feedback. The input has a 160-character limit in HTML. Each task is stored as `{ id, text, completed }`; adding a task saves state, rerenders the list, clears the input and announces success.

[script.js:91](script.js#L91)

```javascript
        tasks.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, completed: false });
        saveTasks();
        renderTasks();
        input.value = '';
        input.focus();
        announce('Task added.');
```

`renderTasks()` builds list items with native DOM APIs. Task text is assigned through `textContent`, so user-entered markup is displayed as text. Checkbox changes support completing and uncompleting tasks:

[script.js:47](script.js#L47)

```javascript
            const text = document.createElement('span');
            text.textContent = task.text;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                updateCount();
                announce(task.completed ? 'Task completed. Well done!' : 'Task marked as incomplete.');
            });
```

Each item also has a Delete button. Deletion removes its record by ID, saves and rerenders, then focuses the next available delete button or the task input. `updateCount()` refreshes the completed/total count and hides the empty-state message when tasks exist.

### Browser persistence

Tasks use the localStorage key `chukwunonso-portfolio-tasks-v1`. Startup parses saved JSON and retains records only when their ID/text are strings, text is nonblank and completion is boolean. Storage access is guarded; on failure, tasks remain in memory for the current page session and status messages explain the limitation.

[script.js:27](script.js#L27)

```javascript
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

```

Storage belongs to the current browser and origin; there is no account, server synchronisation or task-sharing feature.

## Contact validation

`contact.html` provides a `mailto:` link and a four-field form with `novalidate`, allowing JavaScript to manage feedback. Every field is required after trimming. Email uses a regular expression plus the browser's `typeMismatch` check; phone accepts digits only.

[script.js:109](script.js#L109)

```javascript
        if (!value) message = 'Please complete this field.';
        else if (id === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || field.validity.typeMismatch)) {
            message = 'Enter a valid email address, e.g. alex@example.com.';
        } else if (id === 'phone' && !/^[0-9]+$/.test(value)) {
            message = 'Use digits only (0–9), with no spaces or symbols.';
        }
        field.setAttribute('aria-invalid', String(Boolean(message)));
        document.getElementById(`${id}-error`).textContent = message;
        return !message;
```

On submit, all fields are validated and focus moves to the first invalid field. Input events revalidate previously checked fields and clear the status message. Errors are connected to inputs with `aria-describedby`, and `aria-invalid` exposes their state.

The form has no network request or delivery integration. Its current success text is misleading: it says “sent” even though the handler only validates locally:

[script.js:134](script.js#L134)

```javascript
        status.textContent = 'Your message passed validation and sent.';
```

## Styling and accessibility

`index.css` defines a shared paper/green/rust palette with CSS custom properties. Grid handles hero, project, planner and contact layouts; Flexbox handles navigation, actions and task rows. At 1000px, project cards use two columns and the planner stacks. At 640px, primary content grids become single-column:

[index.css:563](index.css#L563)

```css
  .hero,
  .two-column,
  .project-grid,
  .contact-layout {
    grid-template-columns: 1fr;
  }
```

Accessibility provisions include semantic sections, labelled inputs, visible keyboard focus, an active-page indicator, audio transcript, task deletion focus management and `role="status"` feedback. Reduced-motion preferences disable transitions:

[index.css:614](index.css#L614)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
  }
}
```

## Current implementation notes

- The audio file is `introduction.opus`, but its `<source>` declares `audio/wav`; the media type needs alignment with the actual file.
- Some content remains inconsistent or placeholder text: the home portrait alt text describes an illustration, the education table says Computer Science while other sections say Software Engineering, and the hotel project is titled “Campus Library”.
- There is no backend, authentication, contact delivery or cloud task storage. This documentation describes source behaviour; it does not claim browser or external-site verification.
