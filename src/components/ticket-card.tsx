import { Calendar, MessageSquare, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { StatusBadge } from "@/components/ui/status-badge";

interface TicketCardProps {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low" | "minimal";
  status: "todo" | "in-progress" | "review" | "done" | "blocked";
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  comments?: number;
  storyPoints?: number;
}

export function TicketCard({
  id,
  title,
  description,
  priority,
  status,
  assignee,
  dueDate,
  comments = 0,
  storyPoints,
}: TicketCardProps) {
  return (
    <Card className="group hover:shadow-elevated transition-all cursor-pointer animate-fade-in bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">#{id}</span>
              <PriorityBadge priority={priority} />
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {assignee && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={assignee.avatar} alt={assignee.name} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{assignee.name}</span>
              </div>
            )}
            
            {comments > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                <span className="text-xs">{comments}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {storyPoints && (
              <div className="px-2 py-1 rounded-md bg-accent text-accent-foreground text-xs font-medium">
                {storyPoints} SP
              </div>
            )}
            {dueDate && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span className="text-xs">{dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}