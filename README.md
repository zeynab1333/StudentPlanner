✅ Phase 1: User Authentication
🔧 Backend
Set up POST /api/auth/register — create user (hash password with bcrypt).

Set up POST /api/auth/login — login user (verify credentials, return JWT token).

Middleware: create authMiddleware to protect future routes using JWT.

🎨 Frontend
Create Register.jsx page with form (username, email, password).

Create Login.jsx page with form (email, password).

On success, store token in localStorage, navigate to Home/Dashboard.

Show basic auth error messages (e.g., wrong password, user exists).

✅ Phase 2: Timetable Upload
🔧 Backend
Create POST /api/timetable (protected) — accept timetable data.

Create GET /api/timetable — fetch user’s timetable.

Use MongoDB schema with fields like: day, subject, startTime, endTime.

🎨 Frontend
Create Timetable.jsx with a form for entering timetable rows.

Display saved timetable in a table after submission.

Add loading/error states.

✅ Phase 3: Assignments
🔧 Backend
Create POST /api/assignments — create new assignment (title, dueDate).

Create GET /api/assignments — fetch list of user’s assignments.

Create DELETE /api/assignments/:id — delete assignment if needed.

🎨 Frontend
Create Assignments.jsx — show add-assignment form and list.

Allow deleting an assignment from the list.

Add validation: due date must be in the future.

✅ Phase 4: Alerts/Reminders (MVP only — not real-time)
🔧 Backend
Create GET /api/alerts — return static list of alerts:
e.g., HELB deadline, exam week, registration dates.

🎨 Frontend
Create Alerts.jsx page to display alerts in a card/list format.

✅ Final Polish
Create Dashboard.jsx with navigation links to:

Timetable

Assignments

Alerts

Add protected routing (don’t show Dashboard unless user is logged in).

Add logout button (clear token).

Optional: Add loading spinners and clean UI with Tailwind.

