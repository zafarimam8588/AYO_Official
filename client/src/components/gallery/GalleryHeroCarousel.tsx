import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { ZoomIn } from "lucide-react";
import type { Picture } from "@/types";
import { formatImageIdentifier } from "@/types";
import { getPresetUrl } from "@/utils/cloudinaryTransforms";
import { AdminImageBadge } from "@/components/common/AdminImageOverlay";

import "swiper/swiper-bundle.css";

interface GalleryHeroCarouselProps {
  images: Picture[];
  onImageClick: (index: number) => void;
}

export function GalleryHeroCarousel({
  images,
  onImageClick,
}: GalleryHeroCarouselProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-12 sm:mb-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1200}
        loop={images.length > 3}
        className="gallery-hero-swiper"
      >
        {images.map((picture, index) => (
          <SwiperSlide
            key={picture._id}
            className="!w-[90%] sm:!w-[75%] lg:!w-[55%]"
          >
            <div
              className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
              onClick={() => onImageClick(index)}
            >
              {/* Image - using hero preset for optimized large images */}
              <img
                src={getPresetUrl(picture.imageUrl, "hero")}
                alt={`Gallery image ${picture.imageNumber}`}
                className="h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[450px] lg:h-[500px]"
              />

              {/* Admin image badge overlay */}
              <AdminImageBadge picture={picture} position="top-left" />

              {/* Gradient overlay - always visible but subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/10" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Zoom icon */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <div className="rounded-full bg-gradient-to-br from-saffron-500/90 to-india-green-500/90 p-4 backdrop-blur-sm">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Image identifier - always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="line-clamp-2 text-lg font-medium text-white drop-shadow-lg">
                  {formatImageIdentifier(picture)}
                </p>
              </div>

              {/* Tricolor accent border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-white to-india-green-500" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper styles */}
      <style>{`
        .gallery-hero-swiper {
          padding: 40px 0 60px;
        }

        .gallery-hero-swiper .swiper-button-next,
        .gallery-hero-swiper .swiper-button-prev {
          color: #FF9933;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .gallery-hero-swiper .swiper-button-next:hover,
        .gallery-hero-swiper .swiper-button-prev:hover {
          background: #FF9933;
          color: white;
          transform: scale(1.1);
        }

        .gallery-hero-swiper .swiper-button-next:after,
        .gallery-hero-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .gallery-hero-swiper .swiper-pagination {
          bottom: 10px;
        }

        .gallery-hero-swiper .swiper-pagination-bullet {
          background: #FF9933;
          opacity: 0.4;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .gallery-hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 28px;
          border-radius: 5px;
          background: linear-gradient(to right, #FF9933, #138808);
        }

        @media (max-width: 640px) {
          .gallery-hero-swiper {
            padding: 30px 0 50px;
          }

          .gallery-hero-swiper .swiper-button-next,
          .gallery-hero-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
          }

          .gallery-hero-swiper .swiper-button-next:after,
          .gallery-hero-swiper .swiper-button-prev:after {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-hero-swiper .swiper-slide img {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
