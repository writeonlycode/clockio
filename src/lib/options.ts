export const options = {
  title: "Taskio w/ Supabase",
  menus: {
    main: [
      {
        label: "Tasks",
        href: "/tasks",
      },
    ],
  },
  links: {
    baseUrl: "/",
    auth: {
      signIn: "/sign-in",
      signUp: "/sign-up",
      resetPassword: "/reset-password",
      profile: "/profile",
    },
  },
  tasks: {
    pagination: 10,
  },
};
