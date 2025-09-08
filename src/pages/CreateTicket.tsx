import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignee: "",
    dueDate: "",
    storyPoints: "",
    tags: "",
    acceptanceCriteria: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

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
          type: "ticket",
          data,
          timestamp: new Date().toISOString(),
          source: "TaskFlow Pro",
        }),
      });

      toast({
        title: "Data sent to n8n",
        description: `Ticket ${action} data sent successfully to webhook`,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket = {
      id: `PM-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...formData,
      storyPoints: parseInt(formData.storyPoints) || 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      comments: [],
    };

    await sendToWebhook(newTicket, "created");
    
    toast({
      title: "Ticket Created",
      description: `Ticket ${newTicket.id} has been created successfully`,
    });

    // Reset form or navigate back
    navigate("/backlog");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Ticket</h1>
          <p className="text-muted-foreground">Add a new task to your project backlog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    placeholder="Enter ticket title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the task in detail..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acceptanceCriteria">Acceptance Criteria</Label>
                  <Textarea
                    id="acceptanceCriteria"
                    placeholder="Define what constitutes completion of this task..."
                    className="min-h-[100px]"
                    value={formData.acceptanceCriteria}
                    onChange={(e) => setFormData({ ...formData, acceptanceCriteria: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select
                      value={formData.assignee}
                      onValueChange={(value) => setFormData({ ...formData, assignee: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
                        <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                        <SelectItem value="alex-rodriguez">Alex Rodriguez</SelectItem>
                        <SelectItem value="emma-davis">Emma Davis</SelectItem>
                        <SelectItem value="david-kim">David Kim</SelectItem>
                        <SelectItem value="lisa-wang">Lisa Wang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="frontend, api, urgent, bug-fix"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storyPoints">Story Points</Label>
                  <Select
                    value={formData.storyPoints}
                    onValueChange={(value) => setFormData({ ...formData, storyPoints: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select points" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="13">13</SelectItem>
                      <SelectItem value="21">21</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="pt-6">
                <Button type="submit" className="w-full bg-gradient-primary hover:shadow-elevated">
                  <Save className="h-4 w-4 mr-2" />
                  Create Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}