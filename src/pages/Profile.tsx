import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Calendar, Shield, Ticket, Upload } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  display_name: string | null;
  avatar_url: string | null;
  discord_username: string;
  discord_avatar: string | null;
  created_at: string;
}

const Profile = () => {
  const { user, userRole } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchTicketCount();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && data) {
      setProfile(data);
      setDisplayName((data as any).display_name || "");
      setIsEditingName(!(data as any).display_name);
    }
    setIsLoading(false);
  };

  const fetchTicketCount = async () => {
    if (!user) return;

    const { count } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    setTicketCount(count || 0);
  };

  const handleUpdateDisplayName = async () => {
    if (!user || !displayName.trim()) {
      toast.error("Jméno nesmí být prázdné");
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName.trim() } as any)
      .eq('id', user.id);

    if (error) {
      toast.error("Chyba při ukládání jména");
    } else {
      toast.success("Jméno uloženo");
      setIsEditingName(false);
      fetchProfile();
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Soubor je příliš velký (max 2MB)");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Soubor musí být obrázek");
      return;
    }

    setIsUploading(true);

    try {
      // Delete old avatar if exists
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl } as any)
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success("Profilová fotka nahrána");
      fetchProfile();
    } catch (error) {
      toast.error("Chyba při nahrávání fotky");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Načítání profilu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Můj Profil</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar_url || profile?.discord_avatar || undefined} />
                  <AvatarFallback>
                    <UserCircle className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer hover:bg-primary/90 transition-colors">
                  <Upload className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">
                  {profile?.display_name || profile?.discord_username || user?.email || 'Uživatel'}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4" />
                  <Badge className={getRoleBadgeColor(userRole || 'user')}>
                    {userRole || 'user'}
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            
            {/* Display Name Section */}
            {(!profile?.display_name || isEditingName) && (
              <div className="space-y-2">
                <Label htmlFor="display-name">Zobrazované jméno</Label>
                <div className="flex gap-2">
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Zadejte své jméno"
                    maxLength={50}
                  />
                  <Button onClick={handleUpdateDisplayName}>
                    Uložit
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Toto jméno se bude zobrazovat v ticketech místo emailu
                </p>
              </div>
            )}

            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Registrován:</span>
                <span className="font-medium">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('cs-CZ') : 'N/A'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Ticket className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Celkem ticketů:</span>
                <span className="font-medium">{ticketCount}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold">Oprávnění</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${userRole === 'user' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>Základní přístup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${userRole === 'moderator' || userRole === 'admin' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>Moderátorské nástroje</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${userRole === 'admin' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>Admin panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-green-500`} />
                  <span>Ticket systém</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Aktivita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ticketCount}</div>
              <p className="text-xs text-muted-foreground">Vytvořených ticketů</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${getRoleBadgeColor(userRole || 'user')} text-lg px-3 py-1`}>
                {userRole || 'user'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Online</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;