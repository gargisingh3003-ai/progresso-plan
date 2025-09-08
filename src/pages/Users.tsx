import { useState } from "react";
import { Plus, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const sampleUsers = [
  {
    id: "USR-001",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    role: "Product Manager",
    status: "active",
    department: "Product",
    avatar: undefined,
  },
  {
    id: "USR-002",
    name: "Mike Johnson", 
    email: "mike.johnson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Senior Developer",
    status: "active", 
    department: "Engineering",
    avatar: undefined,
  },
  {
    id: "USR-003",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com", 
    phone: "+1 (555) 345-6789",
    role: "DevOps Engineer",
    status: "active",
    department: "Engineering",
    avatar: undefined,
  },
  {
    id: "USR-004",
    name: "Emma Davis",
    email: "emma.davis@company.com",
    phone: "+1 (555) 456-7890", 
    role: "UX Designer",
    status: "inactive",
    department: "Design",
    avatar: undefined,
  },
];

export default function Users() {
  const [users, setUsers] = useState(sampleUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "active",
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
          type: "user",
          data,
          timestamp: new Date().toISOString(),
          source: "TaskFlow Pro",
        }),
      });

      toast({
        title: "Data sent to n8n",
        description: `User ${action} data sent successfully to webhook`,
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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      ...formData,
      avatar: undefined,
    };

    setUsers([...users, newUser]);
    await sendToWebhook(newUser, "created");
    
    setFormData({ name: "", email: "", phone: "", role: "", department: "", status: "active" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "User Created",
      description: `${newUser.name} has been added to the system`,
    });
  };

  const handleDeleteUser = async (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    
    if (userToDelete) {
      await sendToWebhook(userToDelete, "deleted");
    }
    
    toast({
      title: "User Deleted",
      description: "User has been removed from the system",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage team members and their access</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-elevated">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook">n8n Webhook URL (optional)</Label>
                <Input
                  id="webhook"
                  placeholder="https://your-n8n-instance.com/webhook/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">Add User</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="bg-gradient-card hover:shadow-elevated transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                  <p className="text-xs text-muted-foreground">{user.department}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}