import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import RevealOnScroll from '../components/RevealOnScroll'

interface Sponsor {
  name: string
  image: string
  role: string
  imageWidth?: string
}

const sponsors: Sponsor[] = [
  { name: 'Hilti', image: '/images/Hilti.jpg', role: 'Main Sponsor', imageWidth: 'w-[80%]' },
  { name: 'Micro Modular System', image: '/images/MMS.png', role: 'Co-Sponsor', imageWidth: 'w-[70%]' },
  { name: 'Digital Penang', image: '/images/Digital Penang.png', role: 'Co-Sponsor', imageWidth: 'w-[70%]' },
  { name: 'The Empyrean', image: '/images/Empyrean.jpg', role: 'Co-Sponsor', imageWidth: 'w-[50%]' },
  { name: 'ZUS Coffee', image: '/images/ZUS.png', role: 'In-Kind Sponsor', imageWidth: 'w-full' },
  { name: 'Vida', image: '/images/vida.png', role: 'In-kind Sponsor', imageWidth: 'w-[80%]' },
  { name: 'Printcious', image: '/images/printcious.jpg', role: 'In-kind Sponsor', imageWidth: 'w-[85%]' },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative w-full min-h-[80vh] max-w-7xl mx-auto px-6 py-24 flex flex-col items-center overflow-hidden">
      
      {/* Header */}
      <RevealOnScroll direction="up">
        <div className="mb-16 flex flex-col items-center text-center">
          <p
            className="font-mono text-text-muted mb-3"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            // PARTNERS & SPONSORS
          </p>
          <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>
            <span className="text-text-base">Our </span>
            <span className="text-techfest">Sponsors</span>
          </h1>
          <div className="w-24 h-[1px] bg-techfest" />
        </div>
      </RevealOnScroll>

      {/* Swiper Carousel */}
      <RevealOnScroll direction="up">
        <div className="w-full max-w-5xl mx-auto pb-12">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full !pb-14"
          >
            {sponsors.map((sponsor, index) => (
              <SwiperSlide 
                key={index} 
                className="!w-[320px] sm:!w-[340px]"
              >
                <div 
                  className="flex flex-col space-y-8 items-center justify-start rounded-2xl pt-8 pb-6 px-6 h-full transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(19, 22, 26, 0.95)',
                    border: '1px solid rgba(70, 244, 255, 0.15)',
                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    willChange: 'transform'
                  }}
                >
                  {/* Image Container with White Background for Logo Legibility */}
                  <div className={`h-40 ${sponsor.imageWidth || 'w-[80%]'} flex items-center justify-center overflow-hidden rounded-xl bg-white p-4 shadow-inner`}>
                    <img 
                      alt={sponsor.name} 
                      className="w-full h-full object-contain select-none" 
                      src={sponsor.image} 
                      draggable="false"
                    />
                  </div>
                  
                  {/* Role Text */}
                  <p 
                    className="text-center font-display font-semibold tracking-wide text-xl"
                    style={{
                      color: sponsor.role.includes('Main') ? '#ff007f' : '#00b4d8'
                    }}
                  >
                    {sponsor.role}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </RevealOnScroll>
    </section>
  )
}
