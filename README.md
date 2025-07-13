# Clockio

This project is a robust, production-ready task manager and time tracking
application built with **Next.js**, **Supabase**, and **chadcn/ui**. It serves
as a template for modern web development, incorporating best practices for app
architecture, state management, and data handling.

## Features

- **Advanced Routing with Parallel and Intercepting Routes**: Leverages
**parallel routes** and **intercepting routes** to create a highly interactive
and seamless user experience.

- **Enhanced User Experience with `loading.tsx` and `error.tsx`**: Leverages
**`loading.tsx`** and **`error.tsx`** to handle loading and error states
gracefully. 

- **Data Management**: Efficient data fetching and mutation strategies using
Supabase client and a combination of server-side data fetching for the initial
render, and client-side data-fetching when updates and re-fetching is
necessary.

- **Form Handling**: Integrated with **React Hook Form** and **Zod** for
performant and scalable form management and input validation.

- **Migrations**: Database schema management via Supabase migrations for easy
deployment and version control.

- **Authentication**: Seamless cookie-based user authentication powered by
Supabase Auth.

- **UI Components**: Pre-built, customizable UI components from **Chadcn** for
a polished and consistent design.

## Why Use This Template?

This project is designed to accelerate your development process by providing a
well-structured, scalable foundation for building full-stack applications with
Next.js and Supabase. Whether you're building a simple todo list or a complex
web app, this template ensures you start with a solid, maintainable codebase.

## Advanced Routing with Parallel Routes and Intercepting Routes

The project takes full advantage of Next.JS advanced routing features, and
makes full use of parallel and intercepting routes.

The authentication widget, for example, (for `/sign-in` and `/sign-up`) is also
present as a **slot** with an intercepting route in the layout of most pages.

When a user clicks a link to navigate to `/sign-in` or
`/sign-up`, the route is intercepted by the parallel route, and the
authentication widget is rendered as a **modal**. This keeps the user on the
current page while providing a seamless authentication experience.

If the user navigates directly to `/sign-in` or
`/sign-up` (e.g., by entering the URL in the address bar), the authentication
widget is rendered as a **full page**. This ensures a consistent experience
regardless of how the user accesses the route.

## Enhanced User Experience with loading.tsx and error.tsx

The project takes full advantage of Next.JS implementation of React's suspense
mechanism, as well as Next.JS's error handling features.

The `loading.tsx` file is used extensively to display loading states while data
is being fetched or components are being rendered.

The `error.tsx` file is used to gracefully handle and display errors, providing
users with helpful feedback when something goes wrong.

## Supabase Integration

This project is seamlessly integrated with **Supabase** for backend
functionality, including authentication, database management, and real-time
updates.

To get started, you need to set the following environment variables in your
`.env.local` file:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase public (anon) key.

The project includes utility functions to create client and server instances of
the Supabase client:

- **Client-Side**: Use `createClient()` from `@/utils/supabase/client.ts`
to interact with Supabase in the browser.

- **Server-Side**: Use `createClient()` from `@/utils/supabase/server.ts` for
server-side operations, such as fetching data in Next.js API routes or
server-side rendering (SSR).

## Data Fetching and Mutation Strategies

(...)

## Authentication

- **Cookie-Based Authentication**: Secure and persistent user sessions are
managed using cookies. The middleware is configured to refresh the session if
it's expired, so it works seamlessly with Server Components.

- **Auth Routes**:

  - `/sign-in`: Allows users to sign in. Cannot be accessed by authenticated
  users.

  - `/sign-up`: Allows users to create an account. Cannot be accessed by
  authenticated users.

- **Protected Routes**:

  - `/tasks`: The main task list page. Accessible only to authenticated users.

  - `/profile`: The user profile page. Accessible only to authenticated users.

  - `/change-password`: Enables users to update their password. Acessible only
  to authenticated users.

