'use client';

import { MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AssistantFAB() {
  const pathname = usePathname();

  if (pathname === '/assistant') return null;

  return (
    <Link
      href="/assistant"
      className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group"
    >
      <MessageSquareText className="size-6 group-hover:rotate-12 transition-transform" />
    </Link>
  );
}
