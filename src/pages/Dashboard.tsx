import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Calendar,
  Target,
  Activity
} from "lucide-react";

const stats = [
  {
    title: "Active Sprints",
    value: "2",
    change: "+1 from last month",
    icon: Activity,
    color: "text-primary",
  },
  {
    title: "Completed Tasks",
    value: "89",
    change: "+12% from last week",
    icon: CheckCircle,
    color: "text-success",
  },
  {
    title: "In Progress",
    value: "24",
    change: "6 due this week",
    icon: Clock,
    color: "text-warning",
  },
  {
    title: "Team Members",
    value: "8",
    change: "2 new this month",
    icon: Users,
    color: "text-accent-foreground",
  },
];

const recentActivity = [
  {
    id: "1",
    type: "completed",
    message: "User authentication system completed",
    user: "Sarah Chen",
    time: "2 hours ago",
  },
  {
    id: "2", 
    type: "assigned",
    message: "Database optimization task assigned to Mike",
    user: "John Doe",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "commented",
    message: "New comment on Payment Gateway Integration",
    user: "Alice Johnson",
    time: "6 hours ago",
  },
  {
    id: "4",
    type: "created",
    message: "New ticket: Mobile App Performance Issues",
    user: "David Kim",
    time: "1 day ago",
  },
];

const upcomingDeadlines = [
  {
    id: "PM-123",
    title: "API Documentation Update",
    dueDate: "Tomorrow",
    priority: "high",
  },
  {
    id: "PM-124", 
    title: "Security Audit Report",
    dueDate: "Oct 15",
    priority: "critical",
  },
  {
    id: "PM-125",
    title: "User Testing Session",
    dueDate: "Oct 18",
    priority: "medium",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your project overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-primary text-white border-0">
            Sprint 23.4
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gradient-card hover:shadow-elevated transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.type === 'completed' ? 'bg-success' :
                  activity.type === 'assigned' ? 'bg-primary' :
                  activity.type === 'commented' ? 'bg-warning' :
                  'bg-accent-foreground'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">by {activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">#{item.id}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={item.priority === 'critical' ? 'destructive' : item.priority === 'high' ? 'default' : 'secondary'} className="text-xs">
                    {item.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{item.dueDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}