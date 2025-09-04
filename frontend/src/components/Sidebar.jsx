"use client";
import Link from "next/link";
import { BarChart2, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/insights", label: "Insights", icon: <BarChart2 className="w-5 h-5" /> },
    // { href: "/config", label: "Config", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className=" w-64 bg-gray-950 text-gray-200 shadow-xl flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-4 text-lg font-bold tracking-wide border-b border-gray-800">
        Dashboard
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-4 space-y-2">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
     
      </div>
    </aside>
  );
}
