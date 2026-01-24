import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RotateCcw, ZoomIn, ZoomOut, Move, FlipHorizontal2 } from 'lucide-react';
import { Product, ProductColor } from '@/types/product';
import { getDeviceTypeIcon } from '@/data/categories';

interface ARPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  color: ProductColor;
}

export const ARPreview = ({ isOpen, onClose, product, color }: ARPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productScale, setProductScale] = useState(1);
  const [productPosition, setProductPosition] = useState({ x: 0, y: 0 });
  const [productRotation, setProductRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasCamera(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Camera access denied. Please allow camera permissions to use AR Preview.');
      setHasCamera(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setHasCamera(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, startCamera, stopCamera]);

  const handleZoomIn = () => setProductScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setProductScale(prev => Math.max(prev - 0.2, 0.3));
  const handleRotate = () => setProductRotation(prev => prev + 45);
  const handleFlip = () => setIsFlipped(prev => !prev);
  const handleReset = () => {
    setProductScale(1);
    setProductPosition({ x: 0, y: 0 });
    setProductRotation(0);
    setIsFlipped(false);
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const ProductIcon = getDeviceTypeIcon(product.deviceType);

  // Product dimensions based on type
  const getProductDimensions = () => {
    switch (product.productType) {
      case 'mobile': return { width: 80, height: 160 };
      case 'laptop': return { width: 200, height: 130 };
      case 'tablet': return { width: 150, height: 200 };
      case 'watch': return { width: 60, height: 70 };
      case 'tv': return { width: 280, height: 180 };
      case 'camera': return { width: 100, height: 80 };
      case 'drone': return { width: 140, height: 100 };
      case 'vr': return { width: 120, height: 80 };
      case 'pc': return { width: 120, height: 200 };
      default: return { width: 100, height: 100 };
    }
  };

  const dimensions = getProductDimensions();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Camera Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white text-lg">Initializing Camera...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90">
              <div className="text-center max-w-md p-6">
                <Camera size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-white text-lg mb-4">{error}</p>
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* AR Product Overlay */}
          {hasCamera && (
            <motion.div
              drag
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ x: productPosition.x, y: productPosition.y }}
              className="absolute top-1/2 left-1/2 cursor-move"
            >
              <motion.div
                animate={{
                  scale: productScale,
                  rotate: productRotation,
                  scaleX: isFlipped ? -1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative"
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  marginLeft: -dimensions.width / 2,
                  marginTop: -dimensions.height / 2,
                }}
              >
                {/* Product Visual Representation */}
                <div
                  className="w-full h-full rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: `0 25px 50px -12px ${color.hex}50, 0 0 0 4px rgba(255,255,255,0.2)`,
                  }}
                >
                  {/* Inner Screen/Detail */}
                  <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/10 to-transparent">
                    <div className="absolute inset-1 rounded-lg bg-black/80 flex items-center justify-center">
                      <ProductIcon size={dimensions.width * 0.3} className="text-white/60" />
                    </div>
                  </div>
                  
                  {/* Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Drag Indicator */}
                {isDragging && (
                  <div className="absolute -inset-2 border-2 border-dashed border-white/50 rounded-3xl animate-pulse" />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                  <Camera size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">AR Preview</h2>
                  <p className="text-white/70 text-sm">{product.name} - {color.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Controls */}
          {hasCamera && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 p-2 bg-black/50 backdrop-blur-md rounded-2xl">
                <button
                  onClick={handleZoomOut}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={22} className="text-white" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={22} className="text-white" />
                </button>
                <div className="w-px h-8 bg-white/20" />
                <button
                  onClick={handleRotate}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                  title="Rotate"
                >
                  <RotateCcw size={22} className="text-white" />
                </button>
                <button
                  onClick={handleFlip}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                  title="Flip"
                >
                  <FlipHorizontal2 size={22} className="text-white" />
                </button>
                <div className="w-px h-8 bg-white/20" />
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white text-sm font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          {hasCamera && (
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2">
              <p className="text-white/60 text-sm flex items-center gap-2">
                <Move size={16} />
                Drag to move product
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
