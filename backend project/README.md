# StudyFlow backend

A small Express.js API that serves study data for the dashboard app.

## Install and run

```bash
npm install
npm start
```

The server starts at `http://localhost:5000`.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/study/dashboard` | Return both courses and tasks |
| GET | `/api/study/courses` | Return all courses |
| GET | `/api/study/tasks` | Return all tasks |
| POST | `/api/study/tasks` | Create a task |
| PATCH | `/api/study/tasks/:id` | Update a task |

### Example task body

```json
{
  "title": "Finish calculus problem set",
  "course": "Calculus II",
  "due": "Due today",
  "type": "Coursework"
}
```

### Notes

- The API accepts JSON and exposes CORS for the Angular app on `http://localhost:4200`.
- The default port is `5000` and is configured in `index.js`.
