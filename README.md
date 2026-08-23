# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- HostelHive
- Student PG and hostel finder for Jaipur and Jodhpur.
- Frontend: `npm run dev`
- Backend: copy `.env.example` to `.env`, start MongoDB, run `npm run seed`, then `npm run server`
- API: `http://localhost:5000`
- Auth: JWT bearer tokens with student, owner, and admin roles
- Uploads: multipart `photos` files on property create/update routes

Key routes: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/properties`, `POST /api/bookings`, `GET /api/bookings`, `GET /api/admin/overview`, and `POST/PATCH /api/properties/:id`.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
