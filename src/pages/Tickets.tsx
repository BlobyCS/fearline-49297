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
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="flex flex-col lg:flex-row gap-6 max-h-[calc(100vh-12rem)]">
        {/* Left side - Tickets list */}
        <div className="w-full lg:w-1/3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Tickety</h1>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nový ticket
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Vytvořit nový ticket</DialogTitle>
                  <DialogDescription>
                    Vyplňte informace o vašem problému nebo dotazu
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Nadpis</Label>
                    <Input
                      id="title"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Popis</Label>
                    <Textarea
                      id="description"
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priorita</Label>
                    <Select 
                      value={newTicket.priority}
                      onValueChange={(value) => setNewTicket({...newTicket, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Nízká</SelectItem>
                        <SelectItem value="normal">Normální</SelectItem>
                        <SelectItem value="high">Vysoká</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Vytvořit ticket</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-3 pr-4">
              {isLoading ? (
                <p className="text-muted-foreground">Načítání...</p>
              ) : tickets.length === 0 ? (
                <p className="text-muted-foreground">Žádné tickety</p>
              ) : (
                tickets.map((ticket) => (
                  <Card 
                    key={ticket.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedTicket?.id === ticket.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority === 'low' ? 'Nízká' : ticket.priority === 'high' ? 'Vysoká' : 'Normální'}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status === 'open' ? 'Otevřený' : 
                           ticket.status === 'in_progress' ? 'Zpracovává se' : 'Uzavřený'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right side - Conversation */}
        <div className="w-full lg:w-2/3 flex flex-col">
          {selectedTicket ? (
            <>
              <Card className="mb-4">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedTicket.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {selectedTicket.description}
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <Select 
                        value={selectedTicket.status}
                        onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Otevřený</SelectItem>
                          <SelectItem value="in_progress">Zpracovává se</SelectItem>
                          <SelectItem value="closed">Uzavřený</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardHeader>
              </Card>

              <ScrollArea className="flex-1 mb-4 h-[calc(100vh-28rem)]">
                <div className="space-y-4 pr-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.profiles?.avatar_url || undefined} />
                        <AvatarFallback>
                          {msg.profiles?.display_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-sm">
                            {msg.profiles?.display_name || 'Uživatel'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.created_at).toLocaleString('cs-CZ')}
                          </span>
                        </div>
                        <p className="text-sm text-foreground mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Card>
                <CardContent className="pt-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Napište zprávu..."
                      required
                    />
                    <Button type="submit">Odeslat</Button>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Vyberte ticket pro zobrazení konverzace</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;