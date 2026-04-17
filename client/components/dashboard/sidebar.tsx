'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  FileText,
  Star,
  Archive,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/dashboard', label: 'All Notes', icon: FileText },
    { href: '/dashboard?filter=favorites', label: 'Favorites', icon: Star },
    { href: '/dashboard?filter=archived', label: 'Archived', icon: Archive },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    // <>
    //   {/* Mobile Menu Button */}
    //   <button
    //     onClick={() => setIsOpen(!isOpen)}
    //     className="md:hidden fixed top-6 left-52 z-40 p-2 bg-primary text-primary-foreground rounded-lg"
    //   >
    //     {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    //   </button>

    //   {/* Sidebar */}
    //   <aside
    //     className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
    //       } md:translate-x-0 z-30`}
    //   >
    //     <div className="p-6 space-y-8 h-full flex flex-col">
    //       {/* Logo */}
    //       <Link href="/" className="flex items-center gap-1">
    //         <Image
    //           src="/logo.png"
    //           alt="ttt Logo"
    //           width={40}
    //           height={40}
    //           className="h-10 w-10"
    //         />
    //         <span className="text-md font-bold text-primary">The True Topper</span>
    //       </Link>

    //       {/* User Info */}
    //       <div className="space-y-2">
    //         <p className="text-xs font-semibold text-muted-foreground uppercase">Account</p>
    //         <div className="p-3 bg-background rounded-lg">
    //           <p className="font-semibold text-foreground text-sm">{user?.name}</p>
    //           <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
    //         </div>
    //       </div>

    //       {/* Navigation */}
    //       <nav className="space-y-2 flex-1">
    //         {menuItems.map(({ href, label, icon: Icon }) => (
    //           <Link
    //             key={href}
    //             href={href}
    //             onClick={() => setIsOpen(false)}
    //             className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(href)
    //               ? 'bg-primary text-primary-foreground'
    //               : 'text-foreground hover:bg-muted'
    //               }`}
    //           >
    //             <Icon className="w-5 h-5" />
    //             <span className="font-medium">{label}</span>
    //           </Link>
    //         ))}
    //       </nav>

    //       {/* Logout */}
    //       <Button
    //         onClick={logout}
    //         variant="ghost"
    //         className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
    //       >
    //         <LogOut className="w-4 h-4 mr-2" />
    //         Logout
    //       </Button>
    //     </div>
    //   </aside>

    //   {/* Overlay */}
    //   {isOpen && (
    //     <div
    //       className="fixed inset-0 bg-black/50 md:hidden z-20"
    //       onClick={() => setIsOpen(false)}
    //     />
    //   )}
    // </>


    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 z-40`}
      >
        <div className="p-5  space-y-6 h-full flex flex-col">

          {/* Logo */}
          <div className="pl-12 flex items-center justify-center">

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="ttt Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-sm sm:text-base font-bold text-primary text-wrap">
                The True Topper
              </span>
            </Link>

          </div>
          {/* User Info */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Account
            </p>
            <div className="p-3 bg-background rounded-lg">
              <p className="font-semibold text-foreground text-sm truncate">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
            ${isActive(href)
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'text-foreground hover:bg-muted'
                  }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
