import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MessageSquare } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  user_id: string;
}

interface TicketMessage {
  id: string;
  message: string;
  created_at: string;
  user_id: string;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

const Tickets = () => {
  const { user, isAdmin } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "normal"
  });

  useEffect(() => {
    fetchTickets();
    
    // Real-time subscription
    const channel = supabase
      .channel('tickets-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () => {
        fetchTickets();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
      
      const channel = supabase
        .channel(`ticket-messages-${selectedTicket.id}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'ticket_messages',
          filter: `ticket_id=eq.${selectedTicket.id}`
        }, () => {
          fetchMessages(selectedTicket.id);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedTicket]);

  const fetchTickets = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Chyba při načítání ticketů");
    } else {
      setTickets(data || []);
    }
    setIsLoading(false);
  };

  const fetchMessages = async (ticketId: string) => {
    const { data: messagesData, error } = await supabase
      .from('ticket_messages')
      .select('id, message, created_at, user_id, ticket_id')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) {
      toast.error("Chyba při načítání zpráv");
      return;
    }

    // Fetch profile data separately
    const userIds = [...new Set(messagesData.map(m => m.user_id))];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds);

    const profilesMap = new Map(
      profilesData?.map((p: any) => [
        p.id, 
        { 
          display_name: p.display_name, 
          avatar_url: p.avatar_url 
        }
      ]) || []
    );

    const messagesWithProfiles = messagesData.map(msg => ({
      ...msg,
      profiles: {
        display_name: profilesMap.get(msg.user_id)?.display_name || null,
        avatar_url: profilesMap.get(msg.user_id)?.avatar_url || null
      }
    }));

    setMessages(messagesWithProfiles);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const { error } = await supabase
      .from('tickets')
      .insert({
        user_id: user.id,
        title: newTicket.title,
        description: newTicket.description,
        priority: newTicket.priority,
      });

    if (error) {
      toast.error("Chyba při vytváření ticketu");
    } else {
      toast.success("Ticket vytvořen!");
      setIsCreateOpen(false);
      setNewTicket({ title: "", description: "", priority: "normal" });
      fetchTickets();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedTicket || !newMessage.trim()) return;

    const { error } = await supabase
      .from('ticket_messages')
      .insert({
        ticket_id: selectedTicket.id,
        user_id: user.id,
        message: newMessage,
      });

    if (error) {
      toast.error("Chyba při odesílání zprávy");
    } else {
      setNewMessage("");
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    const { error } = await supabase
      .from('tickets')
      .update({ status: newStatus })
      .eq('id', ticketId);

    if (error) {
      toast.error("Chyba při změně statusu");
    } else {
      toast.success("Status změněn");
      fetchTickets();
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ticket Systém</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nový Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vytvořit nový ticket</DialogTitle>
              <DialogDescription>
                Popište váš problém nebo dotaz
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Název</Label>
                <Input
                  id="title"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Popis</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priorita</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Nízká</SelectItem>
                    <SelectItem value="normal">Normální</SelectItem>
                    <SelectItem value="high">Vysoká</SelectItem>
                    <SelectItem value="urgent">Urgentní</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Vytvořit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Moje Tickety</h2>
          {isLoading ? (
            <div className="text-center py-8">Načítání...</div>
          ) : tickets.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                Zatím nemáte žádné tickety
              </CardContent>
            </Card>
          ) : (
            tickets.map((ticket) => (
              <Card 
                key={ticket.id}
                className={`cursor-pointer transition-colors ${selectedTicket?.id === ticket.id ? 'border-primary' : ''}`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{ticket.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{ticket.description}</CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        <div>
          {selectedTicket ? (
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedTicket.title}</CardTitle>
                  {isAdmin && (
                    <Select
                      value={selectedTicket.status}
                      onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg ${
                        msg.user_id === user?.id ? 'bg-primary/10 ml-8' : 'bg-muted mr-8'
                      }`}
                    >
                  <div className="flex gap-2 items-start mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={msg.profiles?.avatar_url || undefined} />
                      <AvatarFallback className="text-xs">
                        {(msg.profiles?.display_name || 'U')[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm">
                          {msg.profiles?.display_name || 'Uživatel'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.created_at).toLocaleString('cs-CZ')}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{msg.message}</p>
                    </div>
                  </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Napište zprávu..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={selectedTicket.status === 'closed'}
                  />
                  <Button type="submit" disabled={selectedTicket.status === 'closed'}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <CardContent className="text-center text-muted-foreground">
                Vyberte ticket pro zobrazení konverzace
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;