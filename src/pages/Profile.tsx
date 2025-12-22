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
import { UserCircle, Calendar, Shield, Ticket, Upload, Link2, Unlink } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProfileData {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  discord_id: string | null;
  discord_username: string | null;
  discord_avatar: string | null;
  created_at: string;
}

const DISCORD_CLIENT_ID = "1266090505117372570";

const Profile = () => {
  const { user, userRole } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
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
      setProfile(data as ProfileData);
      setDisplayName(data.display_name || "");
      setIsEditingName(!data.display_name);
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
      .update({ display_name: displayName.trim() })
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
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Soubor je příliš velký (max 2MB)");
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Soubor musí být obrázek");
      return;
    }

    setIsUploading(true);

    try {
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
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

  const handleLinkDiscord = () => {
    const redirectUri = "https://fearline.eu/discord-link-callback";
    const scopes = "identify";
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes}`;
    window.location.href = discordAuthUrl;
  };

  const handleUnlinkDiscord = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        discord_id: null,
        discord_username: null,
        discord_avatar: null,
      })
      .eq('id', user.id);

    if (error) {
      toast.error("Chyba při odpojování Discord účtu");
    } else {
      toast.success("Discord účet byl odpojen");
      fetchProfile();
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrátor';
      case 'moderator': return 'Moderátor';
      default: return 'Uživatel';
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

  const avatarToShow = profile?.avatar_url || profile?.discord_avatar;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gradient"
      >
        Můj Profil
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card className="glass-strong border-[#ff3333]/20">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-[#ff3333]/50">
                    <AvatarImage src={avatarToShow || undefined} />
                    <AvatarFallback className="bg-[#ff3333]/20">
                      <UserCircle className="h-12 w-12 text-[#ff3333]" />
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-[#ff3333] text-white rounded-full p-2 cursor-pointer hover:bg-[#ff4444] transition-colors shadow-lg">
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
                  <CardTitle className="text-2xl text-white">
                    {profile?.display_name || profile?.discord_username || user?.email || 'Uživatel'}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Shield className="h-4 w-4" />
                    <Badge className={`${getRoleBadgeColor(userRole || 'user')} text-white`}>
                      {getRoleLabel(userRole || 'user')}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator className="bg-[#333]" />
              
              {/* Display Name Section */}
              <div className="space-y-2">
                <Label htmlFor="display-name" className="text-white">Zobrazované jméno</Label>
                <div className="flex gap-2">
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Zadejte své jméno"
                    maxLength={50}
                    className="bg-[#1a1a1a] border-[#333]"
                  />
                  <Button 
                    onClick={handleUpdateDisplayName}
                    className="bg-[#ff3333] hover:bg-[#ff4444]"
                  >
                    Uložit
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Toto jméno se bude zobrazovat v ticketech
                </p>
              </div>

              <Separator className="bg-[#333]" />

              {/* Discord Connection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FaDiscord className="text-[#5865F2]" />
                  Discord propojení
                </h3>
                
                {profile?.discord_id ? (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.discord_avatar || undefined} />
                        <AvatarFallback className="bg-[#5865F2]">
                          <FaDiscord />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{profile.discord_username}</p>
                        <p className="text-sm text-muted-foreground">Propojeno</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleUnlinkDiscord}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Unlink className="h-4 w-4 mr-2" />
                      Odpojit
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#1a1a1a] border border-[#333]">
                    <div>
                      <p className="text-white">Discord účet není propojen</p>
                      <p className="text-sm text-muted-foreground">
                        Propojte svůj Discord pro lepší identifikaci
                      </p>
                    </div>
                    <Button 
                      onClick={handleLinkDiscord}
                      className="bg-[#5865F2] hover:bg-[#4752C4]"
                    >
                      <Link2 className="h-4 w-4 mr-2" />
                      Propojit Discord
                    </Button>
                  </div>
                )}
              </div>

              <Separator className="bg-[#333]" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Registrován:</span>
                  <span className="font-medium text-white">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('cs-CZ') : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Celkem ticketů:</span>
                  <span className="font-medium text-white">{ticketCount}</span>
                </div>
              </div>

              <Separator className="bg-[#333]" />

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Oprávnění</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${userRole === 'user' || userRole === 'moderator' || userRole === 'admin' ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-muted-foreground">Základní přístup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${userRole === 'moderator' || userRole === 'admin' ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-muted-foreground">Moderátorské nástroje</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${userRole === 'admin' ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-muted-foreground">Admin panel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Ticket systém</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card className="glass-strong border-[#ff3333]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aktivita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{ticketCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Vytvořených ticketů</p>
            </CardContent>
          </Card>

          <Card className="glass-strong border-[#ff3333]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${getRoleBadgeColor(userRole || 'user')} text-lg px-4 py-1`}>
                {getRoleLabel(userRole || 'user')}
              </Badge>
            </CardContent>
          </Card>

          <Card className="glass-strong border-[#ff3333]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-white">Online</span>
              </div>
            </CardContent>
          </Card>

          {profile?.discord_id && (
            <Card className="glass-strong border-[#5865F2]/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FaDiscord className="text-[#5865F2]" />
                  Discord
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.discord_avatar || undefined} />
                    <AvatarFallback className="bg-[#5865F2] text-xs">
                      <FaDiscord />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-white truncate">
                    {profile.discord_username}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
