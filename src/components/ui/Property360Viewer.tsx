
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Pause, 
  Play, 
  Settings, 
  PanelLeft, 
  PanelRight
} from 'lucide-react';

interface Property360ViewerProps {
  imageUrls: string[];
  autoRotate?: boolean;
  initialIndex?: number;
  fullWidth?: boolean;
}

const Property360Viewer: React.FC<Property360ViewerProps> = ({
  imageUrls,
  autoRotate = true,
  initialIndex = 0,
  fullWidth = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar rotação automática
  useEffect(() => {
    if (isAutoRotating) {
      startAutoRotate();
    } else {
      stopAutoRotate();
    }

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [isAutoRotating]);

  // Função para iniciar rotação automática
  const startAutoRotate = () => {
    stopAutoRotate(); // Limpar intervalo anterior se existir
    autoRotateIntervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 150);
  };

  // Função para parar rotação automática
  const stopAutoRotate = () => {
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
  };

  // Navegar para a próxima imagem
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // Navegar para a imagem anterior
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  // Alternar modo de tela cheia
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (viewerRef.current?.requestFullscreen) {
        viewerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Eventos para controle de arrasto
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (isAutoRotating) {
      setIsAutoRotating(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 10) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Eventos de toque para dispositivos móveis
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (isAutoRotating) {
      setIsAutoRotating(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 10) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Gerar URLs de imagens de demonstração
  const getDemoImages = (): string[] => {
    // Retornar as imagens passadas ou usar imagens de demonstração
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls;
    }
    
    // Imagens de demonstração para o tour 360°
    const baseUrl = 'https://images.unsplash.com/photo-';
    const demoImages = [
      '1600585154340-be6161a56a0c',
      '1556912172-d718ef3e7a7a',
      '1560448204-e02f11c3d0e2',
      '1512917774080-9991f1c4c750',
      '1628592146834-092fde5df6e9',
      '1565182999596-3918f7655fc1',
      '1600047509358-9dc75507daeb',
      '1600566753851-47a85d5f3a82',
      '1600210492493-0946911123ea',
      '1600607687939-ce8a6c25118c',
      '1560448204-e02f11c3d0e2',
      '1600585154340-be6161a56a0c'
    ];
    
    return demoImages.map(id => `${baseUrl}${id}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`);
  };

  const actualImages = getDemoImages();

  return (
    <div
      ref={viewerRef}
      className={`relative overflow-hidden ${fullWidth ? 'w-full' : 'rounded-lg'} ${isFullscreen ? 'h-screen' : 'h-80 md:h-96'}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(!isAutoRotating)}
    >
      {/* Imagem principal */}
      <div
        className="h-full w-full bg-gray-100 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={actualImages[currentIndex]}
          alt={`Vista 360° - Frame ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Controles de navegação (visíveis apenas em hover ou quando não está em autorotação) */}
      {showControls && (
        <>
          {/* Setas de navegação */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Controles inferiores */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
              >
                {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                onClick={() => setCurrentIndex(0)}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
      
      {/* Indicador de progresso */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/30">
        <div
          className="h-full bg-kubico-blue transition-all duration-150"
          style={{ width: `${((currentIndex + 1) / actualImages.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Texto informativo */}
      <div className="absolute top-3 left-3 bg-black/30 text-white text-xs rounded-full px-3 py-1 backdrop-blur-sm">
        Tour virtual 360°
      </div>
    </div>
  );
};

export default Property360Viewer;
