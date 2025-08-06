# AI Prompt Log — Login & Signup Feature

## Date
2025-08-06

## AI Tool
ChatGPT (chat.openai.com)

---

## Prompts I gave
I used the following prompts (summarized from this development session):

1. Asked ChatGPT to "give me the login and signup page" — initial output was a basic page with both forms on the same screen, without routing.
2. Asked ChatGPT to "change the layout" — found it difficult to get exactly the layout I wanted from the AI output.
3. Decided to manually build the layout using Bootstrap, creating separate and better-structured signup and login sections.
4. Asked ChatGPT to "enhance the CSS" — got helpful tweaks for colors, shadow effects, border radius, and alignment.
5. Continued to work on backend integration, mentioning "I am having a few errors" and discussing fixes.
6. Asked multiple Git-related questions — how to commit to a feature branch, how `.gitignore` works, and how to avoid pushing large files.

---

## AI Responses (summary)
- Provided a basic backend and frontend implementation for login and signup, including example Express routes and React components.
- Suggested layout improvements and Bootstrap integration, though my manual Bootstrap approach gave me more control over the final layout.
- Recommended CSS enhancements (colors, shadows, border radius, alignment) to make forms look modern.
- Guided on backend setup using Express, MongoDB, Mongoose, bcrypt, and JWT for authentication.
- Explained Git feature branching, `.gitignore` usage, and large file push troubleshooting.

---

## What I implemented (actual work)
- Created `SignupForm.jsx` and `LoginForm.jsx` in React with a Bootstrap-based layout I built manually.
- Applied AI-suggested CSS enhancements to improve visuals.
- Implemented backend signup/login API endpoints.
- Integrated MongoDB with password hashing and JWT authentication.
- Worked through GitHub push issues caused by large files; updated `.gitignore` and removed unwanted tracked files.

---

## Result / Current status
- Login and signup pages are complete with a modern layout and styling.
- Backend authentication logic is functional locally.
- Feature branch exists locally; remote push is pending cleanup of large files.

---

## Reflection / Notes
- AI was good for code snippets and backend logic examples.
- For layout and UI structure, manual control with Bootstrap worked better for my needs.
- CSS enhancement suggestions were useful and quick to apply.
- Git guidance helped in managing the feature branch and avoiding unnecessary file pushes.

---

## Related files
- `frontend/src/components/SignupForm.jsx`
- `frontend/src/components/LoginForm.jsx`
- `backend/index.js`
- `.gitignore`
- `evaluation.md`
