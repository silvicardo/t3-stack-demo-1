import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import Image from "next/image";

export async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center w-screen p-3 px-5 text-white bg-gray-800">
      {/* logo */}
      <div className="flex-1">
        <Link href="/" className="text-3xl">
          develrock t3-todo
        </Link>
      </div>

      {/* login */}
      {session?.user === undefined && (
        <Link href={"/api/auth/signin"} className="btn btn-sm">
          Login
        </Link>
      )}

      {/* user & logout */}
      {session?.user !== undefined && (
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden bg-white border rounded-full">
            <Image
              fill={true}
              objectFit="cover"
              alt={session.user.name ?? "user"}
              src={session.user.image ? session.user.image : "/user.png"}
            />
          </div>
          {session.user.name}
          <Link className="btn btn-sm" href={"/api/auth/signout"}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
