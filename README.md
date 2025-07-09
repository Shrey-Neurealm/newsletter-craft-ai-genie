# Welcome to our AI generated newsletter project

## Project info

**URL**: https://lovable.dev/projects/2f58e90c-978e-4a43-b559-3cd6842f56fa

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2f58e90c-978e-4a43-b559-3cd6842f56fa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

### Sample final output
[🌐 View Final Output Newsletter](Sample-Final-Output.html)

## Prompt used to generate final output
```sh
"Data team improved dashboard loading speed by 60%, QA achieved 100% test coverage on core modules, BizOps automated monthly reporting"

"Portal for IJP(Internal job portal) has launched on Darwin box.
The annual performance appraisals were completed on May 4, 2025, recognizing the dedication and growth shown by all team members."

"We are planning annual AI-Thon on 9th July, results will be declared on 15th July
Also, we are planning a weekend recruitment drive on last weekend of July."
```

## Prompts used to create this project:
```sh
# Prompt 1:
Build a fully functional and responsive web application called **Internal Newsletter Content Generator**. This tool will help HR or DevOps teams generate polished monthly or quarterly internal newsletters from raw departmental updates.

### Features to Implement:

#### 1. Frontend (User Interface)
- A clean and modern UI with the following:
  - A large `<textarea>` for users to paste raw text input (departmental updates, announcements, achievements).
  - A **"Generate Newsletter"** button to submit the input for processing.
  - A read-only `<textarea>` or styled content block to display the generated newsletter.
  - A **"Copy to Clipboard"** button to copy the final draft.

#### 2. Backend (Content Generator)
- A backend service (Node.js with Express or Python with Flask) that:
  - Accepts a POST request with the raw input and selected newsletter type.
    - Clean up and organize the raw input.
    - Generate a professional, well-structured newsletter draft.
    - Include the following sections where appropriate:
      - **📌 Key Highlights**
      - **🏆 Team Achievements**
      - **📅 Upcoming Events**
      - **📣 Announcements**
    - Improve grammar, tone, formatting, and structure.
    - Output content in either markdown (based on implementation).

#### 3. Prompt Design for AI (Backend usage)
- Include the following when prompting the AI model:
  - "You are an expert communication writer helping HR generate internal newsletters."
  - "Take the following raw departmental notes and generate a structured, engaging newsletter."
  - "Organize into logical sections with clear headers."
  - "Use a friendly but professional tone suitable for a company-wide internal audience."
  - "Improve grammar, clarity, and formatting."
  - "Return the result in markdown or HTML."

#### 4. Technologies to Use
- Frontend: HTML, CSS, and JavaScript (or vue.js).
- Backend: Node.js with Express (or Python with Flask).
- Deployment-ready (can run locally or deploy to platforms like Vercel, Netlify, Heroku, or Render).

#### 5. Bonus (Optional)
- Export the newsletter as a downloadable **PDF**.
- Simple email preview or "Send Test Email" option.

### Final Notes:
- Ensure code is modular, clean, and well-commented.
- Use a minimal yet professional UI layout (e.g., Tailwind CSS, Bootstrap, or custom CSS).
- All functionality should work in a browser, and backend should expose clear API endpoints.

Build the complete application with frontend, backend, and AI integration.
you can use Gemini (Google AI) via its API to process the raw text input and generate a structured, grammatically correct internal newsletter draft. The AI should organize content under headings like "Highlights", "Achievements", "Announcements", and "Upcoming Events", and return a professional, readable newsletter using a friendly tone.

# Prompt 2: 
Add below functionalities in existing project 
- Rather that downloding the final output in pdf format, please change it into HTML format
- One final HTML file should be downloaded when we click on download button
- Add Light and dark theme in the project

# Prompt 3: 
Add below functionalities in existing project 
- Store previously generated drafts (in localStorage or backend memory).

# Prompt 4:
Add below functionalities in existing project 
- Add one section/button to upload single/multiple images for the newsletter.
- These images will be come after the key highlight text.
```