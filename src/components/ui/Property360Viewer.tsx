
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize,
  X 
} from 'lucide-react';

interface Property360ViewerProps {
  imageUrls: string[];
  onClose: () => void;
}

const Property360Viewer: React.FC<Property360ViewerProps> = ({ imageUrls, onClose }) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  
  // The total number of angles in the 360 view
  const totalAngles = imageUrls.length;
  const angleStep = 360 / totalAngles;
  
  // Calculate current image index based on the current angle
  const currentImageIndex = Math.floor(currentAngle / angleStep) % totalAngles;
  
  const handleRotateLeft = () => {
    setCurrentAngle((prev) => (prev - angleStep + 360) % 360);
  };
  
  const handleRotateRight = () => {
    setCurrentAngle((prev) => (prev + angleStep) % 360);
  };
  
  const handleZoomIn = () => {
    if (zoom < 2) setZoom((prev) => prev + 0.1);
  };
  
  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom((prev) => prev - 0.1);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    
    if (Math.abs(deltaX) > 10) {
      if (deltaX > 0) {
        handleRotateLeft();
      } else {
        handleRotateRight();
      }
      setStartX(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleReset = () => {
    setCurrentAngle(0);
    setZoom(1);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'relative'}`}>
      <Card className={`${
        isFullscreen 
          ? 'h-full w-full rounded-none' 
          : 'rounded-lg overflow-hidden shadow-lg'
      }`}>
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="bg-white/80 hover:bg-white text-gray-700 rounded-full"
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="bg-white/80 hover:bg-white text-gray-700 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* 360 Viewer */}
        <div 
          className={`relative w-full ${isFullscreen ? 'h-full' : 'h-[400px]'} overflow-hidden bg-gray-100 flex items-center justify-center`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {imageUrls.length > 0 ? (
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200 cursor-grab"
              style={{ transform: `scale(${zoom})` }}
            >
              <img 
                src={imageUrls[currentImageIndex]} 
                alt={`Property view ${currentImageIndex}`} 
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {Math.round(currentAngle)}° / 360°
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No 360° view available</div>
          )}
        </div>
        
        {/* Controls */}
        <div className={`flex items-center justify-between ${isFullscreen ? 'absolute bottom-4 left-0 right-0 px-4' : 'p-4 border-t'}`}>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRotateLeft}
              className="bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRotateRight}
              className="bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="bg-white"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 2}
              className="bg-white"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="bg-white"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Property360Viewer;
