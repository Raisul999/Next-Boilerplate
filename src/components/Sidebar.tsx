// "use client";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command";
// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";

// const SidebarMenu = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   return (
//     <div>
//       <div className="flex justify-end">
//         <Button
//           variant="ghost"
//           // className="absolute top-2 right-2 z-10"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//         >
//           {isCollapsed ? (
//             <ChevronsRight className="h-5 w-5" />
//           ) : (
//             <ChevronsLeft className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//       {isCollapsed && (
//         <Command className="bg-secondary h-screen">
//           <CommandInput placeholder="Type a command or search..." />
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup heading="Suggestions">
//               <CommandItem>
//                 <Link href="/">Dashboard</Link>
//               </CommandItem>
//               <CommandItem>Search Emoji</CommandItem>
//               <CommandItem>Calculator</CommandItem>
//             </CommandGroup>
//             <CommandSeparator />
//             <CommandGroup heading="Settings">
//               <CommandItem>Profile</CommandItem>
//               <CommandItem>Billing</CommandItem>
//               <CommandItem>Settings</CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       )}
//     </div>
//   );
// };

// export default SidebarMenu;
"use client";
import React, { useState } from "react";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  StickyNote,
} from "lucide-react";
import Link from "next/link";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const SidebarNav = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleItem = (title: string) => {
    if (isCollapsed) return;
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);

    setOpenItems({});
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "#",
      icon: Home,
      children: [
        {
          title: "Posts",
          href: "/posts",
          icon: StickyNote,
        },
        {
          title: "Analytics",
          href: "#",
          icon: Home,
        },
      ],
    },
    {
      title: "Inbox",
      href: "#",
      icon: Inbox,
      children: [
        {
          title: "Messages",
          href: "#",
          icon: Inbox,
        },
        {
          title: "Notifications",
          href: "#",
          icon: Inbox,
        },
      ],
    },
    {
      title: "Calendar",
      href: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      href: "#",
      icon: Search,
    },
    {
      title: "Settings",
      href: "#",
      icon: Settings,
    },
  ];

  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems[item.title];

    if (isCollapsed) {
      return (
        <div
          key={item.title}
          className="flex items-center justify-center rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          title={item.title}
        >
          <item.icon className="h-5 w-5" />
        </div>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.title} className="space-y-1">
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 cursor-pointer"
            onClick={() => toggleItem(item.title)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>

          {isOpen && (
            <div className="pl-8 space-y-1">
              {item?.children?.map((child) => (
                <Link
                  key={child.title}
                  href={child.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <child.icon className="h-4 w-4" />
                  <span>{child.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.title}
        href={item.href}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <item.icon className="h-5 w-5" />
        <span>{item.title}</span>
      </a>
    );
  };

  return (
    <div
      className={`border-r h-full transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <nav
          className={`space-y-2 flex-grow ${
            isCollapsed ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {navItems.map(renderNavItem)}
        </nav>

        <div
          className="flex  items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-6 w-6" />
          ) : (
            <ChevronsLeft className="h-6 w-6" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
