"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import Image from "next/image";

export default function UserAvatar() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
          <User className="w-4 h-4 text-amber-700" />
        </div>
      )}
      <div className="text-sm">
        <p className="font-medium text-gray-900">{session.user.name}</p>
        <p className="text-gray-600 text-xs">{session.user.email}</p>
      </div>
    </div>
  );
}
