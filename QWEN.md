# Project Context: Kushal Banda's Portfolio Website

## Project Overview
This project is the personal portfolio website for Kushal Banda, a Data Scientist and Machine Learning Engineer. It is a static website hosted on GitHub Pages (`Kushalbanda.github.io`). The site showcases his education, experience, skills, and various projects in AI, ML, and Data Science.

## Core Technologies
*   **Structure:** HTML5
*   **Styling:** CSS3, Bootstrap (Personal v2.1.0 template)
*   **Scripting:** JavaScript, jQuery
*   **Libraries/Plugins:**
    *   **Isotope:** For filtering and sorting the portfolio/project grid.
    *   **Owl Carousel:** For sliders/carousels (e.g., testimonials).
    *   **Venobox:** For lightbox functionality (displaying project details in a modal/iframe).
    *   **Typed.js:** For the typing text animation in the header.
    *   **Waypoints & CounterUp:** For scrolling animations and number counters.
    *   **Boxicons, Icofont, Remixicon:** Icon sets.

## Project Structure

### Root Directory
*   `index.html`: The main entry point of the website. Contains all the primary sections: Home, About, Education, Experience, Projects (Portfolio), Skills, and Contact.
*   `projects/`: Contains individual HTML files for specific projects (e.g., `Stocks.html`, `skimlit.html`). These pages are designed to be loaded within a Venobox iframe when a user clicks on a project in the main portfolio grid.
*   `assets/`: Contains all static resources.
    *   `css/`: Custom styles (`style.css`).
    *   `img/`: Images for the profile, projects, certifications, etc.
    *   `js/`: Main application logic (`main.js`).
    *   `vendor/`: Third-party libraries (Bootstrap, jQuery, etc.).
*   `README.md`: Basic documentation and deployment instructions.

### Key Files
*   **`index.html`**: This is the core file to edit for changing content in the main sections (About, Experience, etc.).
*   **`assets/js/main.js`**: Handles the navigation menu, mobile toggle, smooth scrolling, and initialization of plugins like Isotope and Venobox.
*   **`assets/css/style.css`**: Contains custom overrides and specific styling for the template.

## Development Workflow

### Making Changes
1.  **Main Content:** Edit `index.html` to update text, links, or section structure.
2.  **Adding a Project:**
    *   Create a new HTML file in the `projects/` directory (e.g., `NewProject.html`). Use an existing project file like `projects/Stocks.html` as a template.
    *   In `index.html`, under the `#portfolio` section, add a new grid item linked to your new project file. Ensure you add the correct filter classes (e.g., `filter-ml`, `filter-genai`) for the Isotope sorter to work.
    *   Example link: `<a href="projects/NewProject.html" data-gall="portfolioDetailsGallery" data-vbtype="iframe" class="venobox" ...>`
3.  **Images:** Place new images in `assets/img/` or its subdirectories (`project/`, `certification/`, etc.).

### Local Development
Since this is a static site, you can simply open `index.html` in your web browser. However, for a better experience (and to avoid CORS issues with some local file loading), it is recommended to run a simple local HTTP server.
*   **Python:** `python3 -m http.server 8000`
*   **Node.js:** `npx http-server`

### Deployment
The site is hosted on GitHub Pages.
1.  Commit your changes: `git add . && git commit -m "Update portfolio"`
2.  Push to the master branch: `git push origin master`
3.  GitHub Pages will automatically rebuild and deploy the site.
