import { useState } from "react";
import { Plus, Settings, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const sampleProjects = [
  {
    id: "PROJ-001",
    name: "E-commerce Platform",
    description: "Modern e-commerce solution with React and Node.js",
    status: "active",
    members: 8,
    dueDate: "Dec 15, 2024",
    progress: 65,
  },
  {
    id: "PROJ-002", 
    name: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    status: "active",
    members: 12,
    dueDate: "Jan 30, 2025",
    progress: 40,
  },
  {
    id: "PROJ-003",
    name: "Analytics Dashboard",
    description: "Real-time analytics dashboard for business intelligence",
    status: "planning",
    members: 5,
    dueDate: "Nov 20, 2024",
    progress: 15,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(sampleProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    dueDate: "",
    members: "",
  });
  const { toast } = useToast();

  const sendToWebhook = async (data: any, action: string) => {
    if (!webhookUrl) return;

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          action,
          type: "project",
          data,
          timestamp: new Date().toISOString(),
          source: "TaskFlow Pro",
        }),
      });

      toast({
        title: "Data sent to n8n",
        description: `Project ${action} data sent successfully to webhook`,
      });
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "Webhook Error",
        description: "Failed to send data to n8n webhook",
        variant: "destructive",
      });
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      id: `PROJ-${String(projects.length + 1).padStart(3, '0')}`,
      name: formData.name,
      description: formData.description,
      status: formData.status,
      members: parseInt(formData.members) || 0,
      dueDate: formData.dueDate,
      progress: 0,
    };

    setProjects([...projects, newProject]);
    await sendToWebhook(newProject, "created");
    
    setFormData({ name: "", description: "", status: "planning", dueDate: "", members: "" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Project Created",
      description: `${newProject.name} has been created successfully`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your organization's projects</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-elevated">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook">n8n Webhook URL (optional)</Label>
                <Input
                  id="webhook"
                  placeholder="https://your-n8n-instance.com/webhook/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="members">Team Size</Label>
                  <Input
                    id="members"
                    type="number"
                    min="0"
                    value={formData.members}
                    onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Project</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gradient-card hover:shadow-elevated transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge 
                  variant={
                    project.status === 'active' ? 'default' : 
                    project.status === 'completed' ? 'secondary' : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{project.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.dueDate}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}