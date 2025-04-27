
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlitchText from '@/components/GlitchText';
import NavToggle from '@/components/NavToggle';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminKanban from '@/components/admin/AdminKanban';
import AdminSEO from '@/components/admin/AdminSEO';
import AdminMediaManager from '@/components/admin/AdminMediaManager';
import { useToast } from "@/hooks/use-toast";
import { Shield, Kanban, BarChart, Search, Music, Video } from "lucide-react";

const AdminPanel = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-cyber-dark flex flex-col">
      <NavToggle />
      
      <header className="pt-6 pb-2 px-6 border-b border-cyber-purple/30">
        <div className="flex justify-center items-center">
          <Shield className="text-cyber-pink w-6 h-6 mr-2" />
          <GlitchText 
            text="R3B0RN ADMIN" 
            className="text-3xl md:text-4xl"
          />
        </div>
        <p className="text-center text-sm text-cyber-purple mt-1">
          Panel de Administración CyberGlitch
        </p>
      </header>
      
      <nav className="py-3 px-6 border-b border-cyber-purple/20 bg-cyber-dark/70">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-4 mb-2">
            <Link to="/admin">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyber-purple">
                <BarChart className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
            </Link>
            <Link to="/admin/kanban">
              <TabsTrigger value="kanban" className="data-[state=active]:bg-cyber-purple">
                <Kanban className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
            </Link>
            <Link to="/admin/seo">
              <TabsTrigger value="seo" className="data-[state=active]:bg-cyber-purple">
                <Search className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">SEO</span>
              </TabsTrigger>
            </Link>
            <Link to="/admin/media">
              <TabsTrigger value="media" className="data-[state=active]:bg-cyber-purple">
                <Video className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Media</span>
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </nav>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/kanban" element={<AdminKanban />} />
          <Route path="/seo" element={<AdminSEO />} />
          <Route path="/media" element={<AdminMediaManager />} />
        </Routes>
      </main>
      
      <footer className="py-3 px-6 text-center border-t border-cyber-purple/20">
        <div className="text-sm text-muted-foreground">
          <span className="text-cyber-purple">R3B0RN</span> © 2025 | Admin Panel
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
