import { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TicketCard } from "@/components/ticket-card";

const sampleTickets = [
  {
    id: "PM-001",
    title: "Implement user authentication system",
    description: "Create a secure login and registration system with email verification and password reset functionality.",
    priority: "high" as const,
    status: "in-progress" as const,
    assignee: { name: "Sarah Chen", avatar: undefined },
    dueDate: "Oct 15",
    comments: 3,
    storyPoints: 8,
  },
  {
    id: "PM-002",
    title: "Design responsive dashboard layout",
    description: "Create a modern, mobile-first dashboard that works across all device sizes with clean navigation.",
    priority: "medium" as const,
    status: "todo" as const,
    assignee: { name: "Mike Johnson", avatar: undefined },
    dueDate: "Oct 20",
    comments: 1,
    storyPoints: 5,
  },
  {
    id: "PM-003",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment pipeline using GitHub Actions for continuous integration.",
    priority: "critical" as const,
    status: "review" as const,
    assignee: { name: "Alex Rodriguez", avatar: undefined },
    dueDate: "Oct 12",
    comments: 7,
    storyPoints: 13,
  },
  {
    id: "PM-004",
    title: "API documentation update",
    description: "Update all API endpoints documentation with latest changes and add example requests/responses.",
    priority: "low" as const,
    status: "done" as const,
    assignee: { name: "Emma Davis", avatar: undefined },
    dueDate: "Oct 8",
    comments: 2,
    storyPoints: 3,
  },
  {
    id: "PM-005",
    title: "Database performance optimization",
    description: "Analyze and optimize slow database queries, add proper indexing, and implement caching strategies.",
    priority: "high" as const,
    status: "blocked" as const,
    assignee: { name: "David Kim", avatar: undefined },
    dueDate: "Oct 25",
    comments: 5,
    storyPoints: 8,
  },
  {
    id: "PM-006",
    title: "Mobile app push notifications",
    description: "Implement push notification system for mobile app with customizable user preferences.",
    priority: "medium" as const,
    status: "todo" as const,
    assignee: { name: "Lisa Wang", avatar: undefined },
    dueDate: "Nov 1",
    comments: 0,
    storyPoints: 5,
  },
];

export default function Backlog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTickets = sampleTickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Backlog</h1>
          <p className="text-muted-foreground">Manage and prioritize your project tasks</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-elevated">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            description={ticket.description}
            priority={ticket.priority}
            status={ticket.status}
            assignee={ticket.assignee}
            dueDate={ticket.dueDate}
            comments={ticket.comments}
            storyPoints={ticket.storyPoints}
          />
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tickets found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPriorityFilter("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}