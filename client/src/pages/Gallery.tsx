import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import {
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  ZoomIn,
  X,
} from "lucide-react";
import { getAllPictures } from "@/services/pictureService";
import type { Picture } from "@/types";
import toast from "react-hot-toast";

// Import Swiper styles
import "swiper/swiper-bundle.css";

const Gallery = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);

  useEffect(() => {
    fetchGalleryPictures();
  }, []);

  const fetchGalleryPictures = async () => {
    try {
      setIsLoading(true);
      // Fetch only pictures with pageToDisplay = "gallery"
      const response = await getAllPictures({
        pageToDisplay: "gallery",
        limit: 100,
      });
      setPictures(response.data);
    } catch (error: any) {
      console.error("Error fetching gallery pictures:", error);
      toast.error("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  const openLightbox = (picture: Picture) => {
    setSelectedImage(picture);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-slate-600 text-lg font-medium">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }

  if (pictures.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100/50 p-12 max-w-md">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-orange-100 to-green-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            No Images Yet
          </h2>
          <p className="text-slate-600">
            Our gallery is being prepared. Check back soon for inspiring images
            from our work!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-green-500 p-4 rounded-2xl shadow-lg">
              <ImageIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-4">
            Our Gallery
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore moments that capture our journey, achievements, and the
            lives we've touched
          </p>
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mx-auto" />
        </div>

        {/* Main Swiper Slider - Coverflow Effect */}
        <div className="mb-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={pictures.length > 3}
            className="gallery-swiper"
          >
            {pictures.map((picture) => (
              <SwiperSlide
                key={picture._id}
                className="!w-[90%] sm:!w-[70%] lg:!w-[50%]"
              >
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                  onClick={() => openLightbox(picture)}
                >
                  <img
                    src={picture.imageUrl}
                    alt={picture.imageDescription}
                    className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-lg font-medium line-clamp-2">
                        {picture.imageDescription}
                      </p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                        <ZoomIn className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid View */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            All Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pictures.map((picture) => (
              <div
                key={picture._id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
                onClick={() => openLightbox(picture)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={picture.imageUrl}
                    alt={picture.imageDescription}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {picture.imageDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-6xl max-h-[90vh] w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.imageDescription}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-white text-lg font-medium">
                {selectedImage.imageDescription}
              </p>
              {selectedImage.createdAt && (
                <p className="text-white/70 text-sm mt-2">
                  {new Date(selectedImage.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-swiper {
          padding: 50px 0;
        }
        
        .gallery-swiper .swiper-button-next,
        .gallery-swiper .swiper-button-prev {
          color: #f97316;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-swiper .swiper-button-next:after,
        .gallery-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        
        .gallery-swiper .swiper-pagination-bullet {
          background: #f97316;
          opacity: 0.5;
        }
        
        .gallery-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(to right, #f97316, #10b981);
        }
        
        @media (max-width: 640px) {
          .gallery-swiper .swiper-button-next,
          .gallery-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
          
          .gallery-swiper .swiper-button-next:after,
          .gallery-swiper .swiper-button-prev:after {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
