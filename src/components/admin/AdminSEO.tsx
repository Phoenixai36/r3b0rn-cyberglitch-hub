
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Save, BarChart } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import GlitchText from '../GlitchText';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  twitterImage: string;
}

const AdminSEO = () => {
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<SEOData>({
    title: "R3B0RN | CyberGlitch Audio-Visual Hub",
    description: "Experimenta música y visuales con estética cyberpunk. Modifica stems, aplica efectos y genera videoclips únicos.",
    keywords: "cyberpunk, música, audio, visual, glitch, efectos, stems, videoclips",
    ogImage: "https://reborn-cyberglitch.com/og-image.jpg",
    twitterImage: "https://reborn-cyberglitch.com/twitter-image.jpg"
  });
  
  const [seoScores] = useState({
    titleScore: 85,
    descriptionScore: 78,
    keywordsScore: 92,
    imagesScore: 70,
    overallScore: 81
  });

  const handleInputChange = (field: keyof SEOData, value: string) => {
    setSeoData({
      ...seoData,
      [field]: value
    });
  };

  const handleSave = () => {
    // Aquí se guardarían los datos mediante API
    toast({
      description: "Configuración SEO guardada correctamente",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyber-purple">
          <GlitchText text="Optimización SEO" className="text-2xl" />
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-cyber-dark/80 border-cyber-purple/40">
            <CardHeader>
              <CardTitle className="text-cyber-purple flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Metadatos SEO
              </CardTitle>
              <CardDescription>
                Configura los metadatos para mejorar el posicionamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-purple">Título (50-60 caracteres)</label>
                <Input
                  value={seoData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  maxLength={60}
                  className="bg-cyber-dark/60"
                />
                <p className="text-xs text-muted-foreground text-right">{seoData.title.length}/60</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-purple">Descripción (150-160 caracteres)</label>
                <Textarea
                  value={seoData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  maxLength={160}
                  className="bg-cyber-dark/60 min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground text-right">{seoData.description.length}/160</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-purple">Palabras clave (separadas por comas)</label>
                <Input
                  value={seoData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  className="bg-cyber-dark/60"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-purple">Imagen para OpenGraph</label>
                <Input
                  value={seoData.ogImage}
                  onChange={(e) => handleInputChange('ogImage', e.target.value)}
                  placeholder="URL de la imagen (1200x630px recomendado)"
                  className="bg-cyber-dark/60"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-purple">Imagen para Twitter</label>
                <Input
                  value={seoData.twitterImage}
                  onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                  placeholder="URL de la imagen (1200x600px recomendado)"
                  className="bg-cyber-dark/60"
                />
              </div>
              
              <Button 
                onClick={handleSave} 
                className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar configuración SEO
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-cyber-dark/80 border-cyber-purple/40">
            <CardHeader>
              <CardTitle className="text-cyber-purple flex items-center">
                <BarChart className="w-5 h-5 mr-2" />
                Puntuación SEO
              </CardTitle>
              <CardDescription>
                Análisis de tu configuración actual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Título</span>
                  <span className="text-cyber-pink">{seoScores.titleScore}%</span>
                </div>
                <div className="h-2 bg-cyber-dark rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink" 
                    style={{ width: `${seoScores.titleScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Descripción</span>
                  <span className="text-cyber-pink">{seoScores.descriptionScore}%</span>
                </div>
                <div className="h-2 bg-cyber-dark rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink" 
                    style={{ width: `${seoScores.descriptionScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Palabras clave</span>
                  <span className="text-cyber-pink">{seoScores.keywordsScore}%</span>
                </div>
                <div className="h-2 bg-cyber-dark rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink" 
                    style={{ width: `${seoScores.keywordsScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Imágenes</span>
                  <span className="text-cyber-pink">{seoScores.imagesScore}%</span>
                </div>
                <div className="h-2 bg-cyber-dark rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink" 
                    style={{ width: `${seoScores.imagesScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-2 mt-4 border-t border-cyber-purple/20">
                <div className="flex justify-between font-medium mb-1">
                  <span>Puntuación global</span>
                  <span className="text-cyber-pink text-lg">{seoScores.overallScore}%</span>
                </div>
                <div className="h-3 bg-cyber-dark rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink" 
                    style={{ width: `${seoScores.overallScore}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark/80 border-cyber-purple/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyber-purple text-sm">Vista previa</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-3 border border-cyber-purple/20 rounded bg-cyber-dark">
                <p className="text-cyber-blue text-sm font-medium truncate">{seoData.title}</p>
                <p className="text-green-500 text-xs truncate">reborn-cyberglitch.com</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{seoData.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSEO;
