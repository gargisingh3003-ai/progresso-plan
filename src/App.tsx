import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectSidebar } from "@/components/project-sidebar";
import Dashboard from "./pages/Dashboard";
import Backlog from "./pages/Backlog";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import CreateTicket from "./pages/CreateTicket";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <ProjectSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center h-full px-6 gap-4">
                  <SidebarTrigger className="hover:bg-accent" />
                  <div className="h-6 w-px bg-border" />
                  <div className="flex items-center flex-1">
                    <h2 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
                      TaskFlow Pro
                    </h2>
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/backlog" element={<Backlog />} />
                  <Route path="/create-ticket" element={<CreateTicket />} />
                  <Route path="/users" element={<Users />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
