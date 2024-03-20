import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-5 pt-20">
      <div className="text-xl">
        {session?.user === undefined ? "Login required" : "AuthorizedContent"}
      </div>
    </main>
  );
}
