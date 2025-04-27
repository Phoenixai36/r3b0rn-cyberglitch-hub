
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Play, Users, Music, Video, TrendingUp } from "lucide-react";
import GlitchText from '../GlitchText';

const AdminDashboard = () => {
  // Datos simulados para estadísticas (estos datos vendrán de las APIs en el futuro)
  const [stats] = useState({
    usuariosActivos: 2458,
    reproduccionesHoy: 1287,
    cancionesCargadas: 156,
    videosGenerados: 89,
    crecimiento: "+12.5%"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyber-purple">
          <GlitchText text="Panel de Control" className="text-2xl" />
        </h2>
        <p className="text-sm text-cyber-pink">Actualizado: Hoy, 16:45</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-cyber-dark/80 border-cyber-purple/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-cyber-purple flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Usuarios Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.usuariosActivos.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-cyber-dark/80 border-cyber-purple/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-cyber-purple flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Reproducciones Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.reproduccionesHoy.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-cyber-dark/80 border-cyber-purple/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-cyber-purple flex items-center">
              <Music className="w-5 h-5 mr-2" />
              Canciones Cargadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.cancionesCargadas.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-cyber-dark/80 border-cyber-purple/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-cyber-purple flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Videos Generados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.videosGenerados.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-cyber-dark/80 border-cyber-purple/40">
        <CardHeader>
          <CardTitle className="text-cyber-purple flex items-center">
            <BarChart className="w-5 h-5 mr-2" />
            Actividad Reciente
          </CardTitle>
          <CardDescription>
            Análisis de actividad en la plataforma en los últimos 30 días
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-cyber-purple mx-auto mb-4" />
            <p className="text-xl font-bold text-cyber-pink">{stats.crecimiento} Crecimiento</p>
            <p className="text-sm text-muted-foreground mt-2">
              La implementación de gráficos y estadísticas avanzadas estará disponible al integrar las APIs.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-cyber-purple/20 text-sm text-muted-foreground">
          Los datos mostrados son simulados y serán reemplazados por datos reales de la API.
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
