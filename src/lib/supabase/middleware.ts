import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const user = await supabase.auth.getUser();
  const isSignedIn = !user.error;

  // Protected routes. If the user isn't signed in, they can't access these routes.
  if (request.nextUrl.pathname.startsWith("/profile") && !isSignedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/tasks") && !isSignedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/lists") && !isSignedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Authentication routes. If the user is already signed in, they can't access these routes.
  if (request.nextUrl.pathname.startsWith("/sign-in") && isSignedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/sign-up") && isSignedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
};
