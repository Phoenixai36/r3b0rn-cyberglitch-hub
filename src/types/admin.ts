
export interface AdminUser {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'editor' | 'viewer';
  ultimoAcceso: string;
}

export interface KanbanTask {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'progreso' | 'completado';
  asignadoA?: string;
  fechaCreacion: string;
  fechaVencimiento?: string;
  prioridad: 'baja' | 'media' | 'alta';
  etiquetas: string[];
}

export interface MediaItem {
  id: string;
  nombre: string;
  tipo: 'video' | 'audio' | 'imagen';
  url: string;
  fechaCreacion: string;
  tamaño: string;
  metadatos?: Record<string, any>;
}

export interface SEOConfig {
  titulo: string;
  descripcion: string;
  palabrasClave: string[];
  imagenOG: string;
  imagenTwitter: string;
  urlCanonica: string;
  estructuraDatos: Record<string, any>;
}

export type DashboardStats = {
  usuariosActivos: number;
  reproduccionesTotales: number;
  videosGenerados: number;
  cancionesCargadas: number;
  crecimientoPorcentaje: number;
};

export type AdminAPIEndpoints = {
  usuarios: string;
  kanban: string;
  media: string;
  seo: string;
  estadisticas: string;
};
