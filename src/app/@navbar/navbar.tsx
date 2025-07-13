import { SignOutForm } from "@/components/auth/sign-out-link";
import { Button } from "@/components/ui/button";
import { options } from "@/lib/options";
import { createClient } from "@/lib/supabase/server";
import { ListCheck } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="flex gap-4">
          <Link className="mr-4 flex items-center gap-2 lg:mr-6" href={options.links.baseUrl}>
            <ListCheck />
            <span className="hidden font-bold lg:inline-block">{options.title}</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {options.menus.main.map((menu, index) => (
              <Link
                key={index}
                className="text-foreground/80 transition-colors hover:text-foreground/80"
                href={menu.href}
              >
                {menu.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-8">
          <nav className="flex items-center gap-4">
            {!user ? (
              <>
                <Button size="sm" asChild>
                  <Link href={options.links.auth.signUp}>Sign Up</Link>
                </Button>
                <Button size="sm" variant="outline">
                  <Link href={options.links.auth.signIn}>Sign In</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="link" size="sm" asChild>
                  <Link href={options.links.auth.profile}>{user?.email}</Link>
                </Button>
                <SignOutForm />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
