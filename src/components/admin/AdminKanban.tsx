
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kanban, Plus, Trash } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import GlitchText from '../GlitchText';
import { cn } from "@/lib/utils";

// Tipos para Kanban
interface KanbanTask {
  id: string;
  title: string;
  description: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

const AdminKanban = () => {
  const { toast } = useToast();
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: "pendiente",
      title: "Pendiente",
      tasks: [
        { id: "task-1", title: "Integrar API de Spotify", description: "Conectar con API para obtener canciones" },
        { id: "task-2", title: "Mejorar generador de video", description: "Añadir más opciones visuales" }
      ]
    },
    {
      id: "progreso",
      title: "En Progreso",
      tasks: [
        { id: "task-3", title: "Diseño de UI para móviles", description: "Adaptación responsive" },
      ]
    },
    {
      id: "completado",
      title: "Completado",
      tasks: [
        { id: "task-4", title: "Configuración base", description: "Setup inicial del proyecto" },
      ]
    }
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const handleAddTask = (columnId: string) => {
    if (!newTaskTitle.trim()) {
      toast({
        description: "El título de la tarea no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: "Nueva tarea añadida"
    };

    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] } 
        : col
    ));

    setNewTaskTitle("");
    toast({
      description: "Tarea añadida correctamente",
    });
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) } 
        : col
    ));

    toast({
      description: "Tarea eliminada correctamente",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyber-purple">
          <GlitchText text="Kanban" className="text-2xl" />
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-cyber-pink">{column.title}</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setActiveColumn(activeColumn === column.id ? null : column.id)}
                className="text-xs"
              >
                <Plus className="h-4 w-4 mr-1" />
                Añadir
              </Button>
            </div>
            
            {activeColumn === column.id && (
              <div className="flex space-x-2">
                <Input
                  placeholder="Nueva tarea..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-cyber-dark/60"
                />
                <Button 
                  size="sm"
                  onClick={() => handleAddTask(column.id)}
                  className="bg-cyber-purple hover:bg-cyber-purple/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="space-y-3 min-h-40">
              {column.tasks.map(task => (
                <Card key={task.id} className="bg-cyber-dark/80 border-cyber-purple/40 hover:border-cyber-pink/40 transition-colors">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      {task.title}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTask(column.id, task.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                  </CardContent>
                </Card>
              ))}
              
              {column.tasks.length === 0 && (
                <div className={cn(
                  "h-20 border border-dashed rounded-md flex items-center justify-center",
                  "border-cyber-purple/20 text-muted-foreground"
                )}>
                  <p className="text-xs">No hay tareas</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Card className="bg-cyber-dark/80 border-cyber-purple/40">
        <CardHeader>
          <CardTitle className="text-cyber-purple flex items-center">
            <Kanban className="w-5 h-5 mr-2" />
            Sobre el Kanban
          </CardTitle>
          <CardDescription>
            Este Kanban está preparado para conectarse con la API de gestión de proyectos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Este componente permite organizar tareas en columnas de estado. 
            Actualmente funciona con datos locales, pero está diseñado para integrarse 
            con una API de backend para sincronización en tiempo real entre todos los administradores.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminKanban;
