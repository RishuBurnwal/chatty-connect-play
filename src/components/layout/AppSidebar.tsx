import { NavLink, useLocation } from "react-router-dom";
import {
  Shield,
  Activity,
  Zap,
  Brain,
  NetworkIcon,
  Database,
  Settings,
  AlertTriangle,
  FileText,
  HardDrive,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "AI Agent", url: "/ai-agent", icon: Brain },
  { title: "Network Monitor", url: "/network", icon: NetworkIcon },
  { title: "Training Data", url: "/training", icon: Database },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Logs", url: "/logs", icon: FileText },
  { title: "Backup & Recovery", url: "/backup", icon: HardDrive },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="sidebar-cyber border-r border-border" collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary cyber-glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-lg">CyberShield</h2>
                <p className="text-sm text-muted-foreground">DDoS Protection</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Security Center
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent">
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive(item.url)
                            ? "bg-primary/10 text-primary cyber-border"
                            : "text-sidebar-foreground hover:text-primary"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {!isCollapsed && (
              <span className="text-sm text-muted-foreground">System Active</span>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}