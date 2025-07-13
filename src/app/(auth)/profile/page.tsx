import { getCurrentUser } from "@/lib/actions/auth";
import { getCurrentProfile } from "@/lib/actions/profiles";
import { formatResponse } from "@/lib/utils";

import { Profile } from "./profile";

export default async function Page() {
  const userPromise = getCurrentUser();
  const profilePromise = await getCurrentProfile();

  const [userResonse, profileResponse] = await Promise.all([userPromise, profilePromise]);

  if (userResonse.error) {
    return null;
  }

  if (profileResponse.error) {
    return null;
  }

  const profileData = formatResponse(profileResponse.data);

  return (
    <main className="flex grow flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="mb-8 text-center text-4xl">Profile</h1>
        <Profile defaultValues={profileData} />
      </div>
    </main>
  );
}
