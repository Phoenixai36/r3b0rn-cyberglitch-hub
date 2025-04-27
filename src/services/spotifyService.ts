
import { toast } from "@/hooks/use-toast";

// Constantes de la API
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const CLIENT_ID = 'TU_CLIENT_ID'; // Reemplazar con tu Client ID de Spotify

// Interfaz para los datos de pistas
export interface PistaSpotify {
  id: string;
  nombre: string;
  artista: string;
  albumImagen: string;
  previewUrl: string | null;
  uri: string;
}

// Interfaz para los stems extraídos/simulados
export interface StemsExtraccion {
  vocal: string;
  instrumental: string;
  efectos: string;
  original: string;
}

// Clase de servicio para Spotify
export class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor() {
    // Intentar recuperar el token del localStorage si existe
    const storedToken = localStorage.getItem('spotify_token');
    const storedExpiry = localStorage.getItem('spotify_token_expiry');
    
    if (storedToken && storedExpiry && Number(storedExpiry) > Date.now()) {
      this.accessToken = storedToken;
      this.tokenExpiresAt = Number(storedExpiry);
    }
  }

  // Iniciar proceso de autenticación con Spotify
  public iniciarAutenticacion(): void {
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('user-read-private user-read-email streaming user-library-read');
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&show_dialog=true`;
    
    window.location.href = authUrl;
  }

  // Procesar callback después de autenticación
  public procesarCallback(): boolean {
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get('access_token');
      const expiresIn = params.get('expires_in');
      
      if (token && expiresIn) {
        this.accessToken = token;
        this.tokenExpiresAt = Date.now() + Number(expiresIn) * 1000;
        
        localStorage.setItem('spotify_token', token);
        localStorage.setItem('spotify_token_expiry', this.tokenExpiresAt.toString());
        
        // Limpiar la URL
        window.history.pushState({}, document.title, window.location.pathname);
        return true;
      }
    }
    return false;
  }

  // Verificar si el usuario está autenticado
  public estaAutenticado(): boolean {
    return this.accessToken !== null && this.tokenExpiresAt > Date.now();
  }

  // Cerrar sesión
  public cerrarSesion(): void {
    this.accessToken = null;
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiry');
    toast({
      description: "Sesión de Spotify cerrada"
    });
  }

  // Método para realizar peticiones a la API de Spotify
  private async fetchApi(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    if (!this.estaAutenticado()) {
      throw new Error('Usuario no autenticado en Spotify');
    }

    try {
      const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado
          this.cerrarSesion();
          throw new Error('Sesión expirada, por favor inicia sesión nuevamente');
        }
        throw new Error(`Error de API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en Spotify API:', error);
      toast({
        variant: "destructive",
        description: `Error de Spotify: ${error instanceof Error ? error.message : 'Desconocido'}`
      });
      throw error;
    }
  }

  // Buscar canciones
  public async buscarCanciones(query: string): Promise<PistaSpotify[]> {
    if (!query.trim()) return [];

    const data = await this.fetchApi(`/search?q=${encodeURIComponent(query)}&type=track&limit=10`);
    
    return data.tracks.items.map((track: any): PistaSpotify => ({
      id: track.id,
      nombre: track.name,
      artista: track.artists.map((a: any) => a.name).join(', '),
      albumImagen: track.album.images[0]?.url || '',
      previewUrl: track.preview_url,
      uri: track.uri
    }));
  }

  // Obtener canciones guardadas del usuario
  public async obtenerCancionesGuardadas(): Promise<PistaSpotify[]> {
    const data = await this.fetchApi('/me/tracks?limit=20');
    
    return data.items.map((item: any): PistaSpotify => ({
      id: item.track.id,
      nombre: item.track.name,
      artista: item.track.artists.map((a: any) => a.name).join(', '),
      albumImagen: item.track.album.images[0]?.url || '',
      previewUrl: item.track.preview_url,
      uri: item.track.uri
    }));
  }

  // Simular extracción de stems (en producción real utilizaría un servicio de separación)
  public async obtenerStems(trackId: string): Promise<StemsExtraccion> {
    // En un entorno real, llamaríamos a un servicio de separación de stems
    // Aquí simulamos el resultado con URLs ficticias para demostrar la interfaz
    
    // Obtener la URL de preview de la canción original
    const track = await this.fetchApi(`/tracks/${trackId}`);
    const originalUrl = track.preview_url || '';
    
    return {
      vocal: originalUrl, // En producción real: URL al stem vocal separado
      instrumental: originalUrl, // En producción real: URL al stem instrumental separado
      efectos: originalUrl, // En producción real: URL al stem de efectos separado
      original: originalUrl
    };
  }
}

// Instancia singleton del servicio
export const spotifyService = new SpotifyService();
