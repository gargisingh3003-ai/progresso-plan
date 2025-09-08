import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  CheckSquare, 
  Users, 
  Settings, 
  Plus,
  FolderKanban,
  Calendar,
  Target,
  Home,
  Briefcase
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: Briefcase },
  { title: "Backlog", url: "/backlog", icon: CheckSquare },
  { title: "Users", url: "/users", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const settingsItems = [
  { title: "Project Settings", url: "/settings", icon: Settings },
];

export function ProjectSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-gradient-card">
        <div className="p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <FolderKanban className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">TaskFlow Pro</h2>
                <p className="text-xs text-muted-foreground">Project Management</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <FolderKanban className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3">
          <Button 
            className="w-full bg-gradient-primary hover:shadow-elevated transition-all" 
            size={isCollapsed ? "icon" : "default"}
            onClick={() => window.location.href = "/create-ticket"}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Create Ticket</span>}
          </Button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {!isCollapsed && "Settings"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}