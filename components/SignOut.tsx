"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  );
}
