# Student portfolio

Open `index.html` directly in a modern browser. No installation or build is needed. For consistent browser storage behaviour, use a local static server or publish all site files together.

## Files

- index.html: homepage
- about.html: education, aspirations, skills, hobbies and local audio
- projects.html: three projects with linked working or simulated previews
- planner.html: interactive task management
- contact.html: contact form
- index.css: shared responsive styles
- script.js: planner and contact validation
- assets/: local portrait, project illustrations and introduction.wav

## Personalise

Replace Chukwunonso and the sample biography, education, skills, projects and email throughout the HTML. Replace assets/portrait.svg with your own photograph and update its image path and alt text in index.html. Replace the sample project images and audio as needed. The audio transcript is in about.html. All details and achievements are illustrative placeholders.

## Behaviour and limitations

The planner supports adding, completing, uncompleting and deleting tasks. Tasks persist in localStorage where available; otherwise they remain available only in the current page session. Storage is local to this browser and origin.

The contact form checks all four required fields, email format and digits-only phone numbers. It validates locally and never sends a message. A working delivery service would require a backend outside this dependency-free static brief.

## Brief audit

- Homepage: student name, image placeholder, welcome, navigation, short biography and consistent layout.
- About: educational background, career aspirations, technical skills, hobbies and interests.
- Projects: three named samples, descriptions, local images and functional relative links to working or clearly labelled simulated previews.
- Planner: JavaScript add, complete and delete; also uncomplete and local persistence.
- Contact: name, email, phone and message; required-field, email and digits-only phone validation.
- HTML: semantic header/nav/main/section/article/aside/footer, forms, education/results tables, images, links, lists and native audio with transcript.
- CSS: shared external stylesheet, responsive mobile/tablet/desktop rules, Grid/Flexbox, navigation styles, transitions, consistent colours and reduced-motion support.
- JavaScript: event handlers, DOM manipulation, validation, dynamic counts/status, arrays and functions.
- Constraints: no frameworks, libraries, build tools, external dependencies, remote fonts or CDNs; all linked resources use relative paths.
- Accessibility: skip link, current-page navigation, labels, keyboard controls, focus indicators, errors associated with fields and live status messages.

## Verification

JavaScript syntax passed. Automated behaviour checks passed for empty/add/complete/uncomplete/delete tasks, saved data, safe task text rendering, required fields, invalid/valid email and phone, and whitespace-only input. All relative asset/page links and fragment targets resolve. Responsive CSS was inspected at mobile, tablet and desktop breakpoints. Visual browser testing could not be completed because the browser tool failed to connect; actual viewport rendering and audio playback remain unverified.

## Hosting and GitHub submission

This project is prepared locally. No hosting account or GitHub repository was provided, so there is no deployed URL or repository URL yet. Upload these files to a GitHub repository. In GitHub Pages settings, publish from the main branch and root folder. Keep index.html at the root and preserve assets/. Submit the resulting public Pages URL and repository URL as required by the brief. Do not upload private academic information.
# Miva-sudent-portfolio
