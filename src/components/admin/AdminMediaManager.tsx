
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Video, Music, Image, UploadCloud, Trash, Eye, Edit } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import GlitchText from '../GlitchText';
import { cn } from "@/lib/utils";

// Tipos para medios
interface MediaItem {
  id: string;
  nombre: string;
  tipo: 'video' | 'audio' | 'imagen';
  url: string;
  fechaCreacion: string;
  tamaño: string;
}

const AdminMediaManager = () => {
  const { toast } = useToast();
  
  // Datos de ejemplo que serían reemplazados por la API
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: "media-1",
      nombre: "videoclip_neon_city.mp4",
      tipo: "video",
      url: "/videos/videoclip_neon_city.mp4",
      fechaCreacion: "2025-03-15",
      tamaño: "24.5 MB"
    },
    {
      id: "media-2",
      nombre: "cyber_punk_beat.mp3",
      tipo: "audio",
      url: "/audio/cyber_punk_beat.mp3",
      fechaCreacion: "2025-03-20",
      tamaño: "8.2 MB"
    },
    {
      id: "media-3",
      nombre: "neon_background.jpg",
      tipo: "imagen",
      url: "/images/neon_background.jpg",
      fechaCreacion: "2025-03-25",
      tamaño: "3.7 MB"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTipo, setActiveTipo] = useState<'todos' | 'video' | 'audio' | 'imagen'>('todos');

  const filtrarMediaItems = () => {
    return mediaItems.filter(item => {
      const matchesTerm = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTipo = activeTipo === 'todos' || item.tipo === activeTipo;
      return matchesTerm && matchesTipo;
    });
  };

  const handleUpload = () => {
    toast({
      description: "La funcionalidad de subida se implementará con la API de medios"
    });
  };

  const handleDelete = (id: string) => {
    toast({
      description: "Elemento eliminado (simulado)",
    });
  };

  const renderMediaIcon = (tipo: string) => {
    switch (tipo) {
      case 'video':
        return <Video className="h-5 w-5 text-cyber-pink" />;
      case 'audio':
        return <Music className="h-5 w-5 text-cyber-purple" />;
      case 'imagen':
        return <Image className="h-5 w-5 text-cyber-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyber-purple">
          <GlitchText text="Gestor de Medios" className="text-2xl" />
        </h2>
      </div>
      
      <Card className="bg-cyber-dark/80 border-cyber-purple/40">
        <CardHeader>
          <CardTitle className="text-cyber-purple flex items-center">
            <UploadCloud className="w-5 h-5 mr-2" />
            Subir Nuevos Medios
          </CardTitle>
          <CardDescription>
            Sube archivos de audio, video o imágenes para usar en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-cyber-purple/30 rounded-lg p-8 text-center">
            <UploadCloud className="h-10 w-10 text-cyber-purple mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Arrastra y suelta archivos aquí o haz clic para seleccionarlos
            </p>
            <Button 
              onClick={handleUpload}
              className="bg-cyber-purple hover:bg-cyber-purple/90"
            >
              Seleccionar Archivos
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-cyber-dark/80 border-cyber-purple/40">
        <CardHeader>
          <CardTitle className="text-cyber-purple flex items-center">
            <Video className="w-5 h-5 mr-2" />
            Biblioteca de Medios
          </CardTitle>
          <CardDescription>
            Gestiona los archivos multimedia de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-cyber-dark/60"
            />
            <Tabs 
              value={activeTipo}
              onValueChange={(val) => setActiveTipo(val as any)}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="imagen">Imágenes</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="border border-cyber-purple/20 rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-cyber-dark">
                <tr>
                  <th className="py-3 px-4 text-left text-sm text-cyber-purple">Tipo</th>
                  <th className="py-3 px-4 text-left text-sm text-cyber-purple">Nombre</th>
                  <th className="py-3 px-4 text-left text-sm text-cyber-purple hidden sm:table-cell">Fecha</th>
                  <th className="py-3 px-4 text-left text-sm text-cyber-purple hidden sm:table-cell">Tamaño</th>
                  <th className="py-3 px-4 text-right text-sm text-cyber-purple">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-purple/20">
                {filtrarMediaItems().map(item => (
                  <tr key={item.id} className="hover:bg-cyber-dark/40">
                    <td className="py-2 px-4">
                      {renderMediaIcon(item.tipo)}
                    </td>
                    <td className="py-2 px-4 text-sm font-medium">
                      {item.nombre}
                    </td>
                    <td className="py-2 px-4 text-sm hidden sm:table-cell text-muted-foreground">
                      {item.fechaCreacion}
                    </td>
                    <td className="py-2 px-4 text-sm hidden sm:table-cell text-muted-foreground">
                      {item.tamaño}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filtrarMediaItems().length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No se encontraron archivos que coincidan con la búsqueda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMediaManager;
