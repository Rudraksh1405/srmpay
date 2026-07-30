# SRMPAY

SRMPAY is an all-in-one payment application for student payments within the
SRM KTR campus.

## Project structure

```
SRMPAY/
├── client/     # React frontend (Vite)
├── server/     # Node.js backend
├── docs/       # Project documentation
├── .gitignore
├── README.md
└── LICENSE
```

## Getting started

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm start
```

The backend starts on `http://localhost:3000` by default. Its health endpoint
is available at `GET /health`.
