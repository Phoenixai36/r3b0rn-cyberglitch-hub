
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, Music } from "lucide-react";
import GlitchText from './GlitchText';
import { cn } from "@/lib/utils";

const NavToggle = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      <Button
        variant={isAdmin ? "outline" : "default"}
        size="sm"
        asChild
        className={cn(
          "border border-cyber-purple/40",
          !isAdmin && "bg-cyber-purple hover:bg-cyber-purple/90"
        )}
      >
        <Link to="/">
          <Music className="w-4 h-4 mr-1" />
          <span className="text-xs">Fans</span>
        </Link>
      </Button>
      
      <Button
        variant={isAdmin ? "default" : "outline"}
        size="sm"
        asChild
        className={cn(
          "border border-cyber-purple/40",
          isAdmin && "bg-cyber-purple hover:bg-cyber-purple/90"
        )}
      >
        <Link to="/admin">
          <Shield className="w-4 h-4 mr-1" />
          <span className="text-xs">Admin</span>
        </Link>
      </Button>
    </div>
  );
};

export default NavToggle;
