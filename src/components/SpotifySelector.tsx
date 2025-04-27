
import React, { useState, useEffect } from 'react';
import { spotifyService, PistaSpotify } from '@/services/spotifyService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SpotifySelectorProps {
  onSeleccionarPista: (pista: PistaSpotify) => void;
}

const SpotifySelector: React.FC<SpotifySelectorProps> = ({ onSeleccionarPista }) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<PistaSpotify[]>([]);
  const [cancionesGuardadas, setCancionesGuardadas] = useState<PistaSpotify[]>([]);
  const [cargando, setCargando] = useState(false);
  const [autenticado, setAutenticado] = useState(false);
  const { toast } = useToast();

  // Comprobar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      // Procesar callback si estamos en una redirección de Spotify
      if (window.location.hash) {
        const success = spotifyService.procesarCallback();
        if (success) {
          toast({
            description: "Autenticación con Spotify exitosa"
          });
          cargarCancionesGuardadas();
        }
      }
      
      const isAuth = spotifyService.estaAutenticado();
      setAutenticado(isAuth);
      
      if (isAuth) {
        cargarCancionesGuardadas();
      }
    };
    
    checkAuth();
  }, [toast]);

  // Cargar canciones guardadas del usuario
  const cargarCancionesGuardadas = async () => {
    try {
      setCargando(true);
      const canciones = await spotifyService.obtenerCancionesGuardadas();
      setCancionesGuardadas(canciones);
    } catch (error) {
      console.error("Error al cargar canciones guardadas:", error);
    } finally {
      setCargando(false);
    }
  };

  // Manejador de búsqueda
  const handleBuscar = async () => {
    if (!busqueda.trim()) return;
    
    try {
      setCargando(true);
      const resultados = await spotifyService.buscarCanciones(busqueda);
      setResultados(resultados);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    } finally {
      setCargando(false);
    }
  };

  // Iniciar sesión con Spotify
  const handleLogin = () => {
    spotifyService.iniciarAutenticacion();
  };

  // Cerrar sesión
  const handleLogout = () => {
    spotifyService.cerrarSesion();
    setAutenticado(false);
    setCancionesGuardadas([]);
    setResultados([]);
  };

  // Renderizar tarjeta de pista
  const renderPista = (pista: PistaSpotify) => (
    <div 
      key={pista.id}
      className="flex items-center p-2 hover:bg-cyber-dark/50 rounded-md cursor-pointer transition-colors"
      onClick={() => onSeleccionarPista(pista)}
    >
      {pista.albumImagen ? (
        <img src={pista.albumImagen} alt={pista.nombre} className="h-10 w-10 mr-3 rounded" />
      ) : (
        <div className="h-10 w-10 mr-3 bg-cyber-dark flex items-center justify-center rounded">
          <Music className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <div className="overflow-hidden">
        <p className="text-sm font-medium truncate">{pista.nombre}</p>
        <p className="text-xs text-muted-foreground truncate">{pista.artista}</p>
      </div>
    </div>
  );

  return (
    <div className="cyber-border bg-cyber-dark/70 backdrop-blur-sm rounded-lg p-4 border-cyber-purple/40">
      <h3 className="text-lg font-semibold mb-4 text-cyber-purple">Explorar Spotify</h3>
      
      {!autenticado ? (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Conéctate a Spotify para acceder a tu biblioteca de música
          </p>
          <Button onClick={handleLogin} className="bg-[#1DB954] hover:bg-[#1DB954]/90">
            Conectar con Spotify
          </Button>
        </div>
      ) : (
        <>
          <div className="flex mb-4">
            <Input
              placeholder="Buscar canciones..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="mr-2 bg-cyber-dark/60"
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
            />
            <Button onClick={handleBuscar} disabled={cargando} className="bg-cyber-purple">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {cargando ? (
            <div className="py-8 flex justify-center">
              <div className="animate-pulse text-cyber-purple">Cargando...</div>
            </div>
          ) : (
            <>
              {resultados.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 text-cyber-purple">Resultados</h4>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {resultados.map(renderPista)}
                  </div>
                </div>
              )}
              
              {cancionesGuardadas.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-cyber-purple">Tu Biblioteca</h4>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {cancionesGuardadas.map(renderPista)}
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="mt-4 pt-2 border-t border-cyber-purple/20">
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
              Desconectar Spotify
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SpotifySelector;
