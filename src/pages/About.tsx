import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import RevealOnScroll from '../components/RevealOnScroll'

import slide1 from '../assets/slideshow/img_1556.webp'
import slide2 from '../assets/slideshow/img_1561.webp'
import slide3 from '../assets/slideshow/img_1574.webp'
import slide4 from '../assets/slideshow/img_1914.webp'

/* ========================================
   PAGE HEADER
   ======================================== */

function PageHeader() {
  return (
    <RevealOnScroll direction="left">
      <div className="mb-16">
        <p
          className="font-mono text-text-muted mb-3"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          // WHO WE ARE
        </p>
        <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: '56px' }}>
          <span className="text-text-base">About </span>
          <span className="text-techfest">ApexFest</span>
        </h1>
        <div className="w-24 h-[1px] bg-techfest" />
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   PROSE COLUMN — new generated content
   ======================================== */

const paragraphs = [
  {
    key: 'intro',
    content: (
      <>
        ApexFest is a premier two-day tech and gaming festival organized by the Google
        Developer Group on Campus Universiti Sains Malaysia (GDGoC USM). Happening on May
        23 and 24, 2026, the series brings together the thrill of esports and the
        innovation of Google technologies.
      </>
    ),
  },
  {
    key: 'middle',
    content: (
      <>
        Whether you are looking to level up your gaming skills, dive into hands-on tech
        workshops, or connect with a passionate community of students, ApexFest has
        something for everyone.
      </>
    ),
  },
  {
    key: 'gamefest',
    content: (
      <>
        <span className="text-gamefest font-semibold">Day 1: GameFest</span> – A hybrid
        gaming event bridging competitive esports with casual campus engagement.
      </>
    ),
  },
  {
    key: 'techfest',
    content: (
      <>
        <span className="text-techfest font-semibold">Day 2: TechFest</span> – An
        interactive showcase empowering students with hands-on experience across major
        Google technologies.
      </>
    ),
  },
]

function ProseColumn() {
  return (
    <div className="space-y-6 pr-0 md:pr-8">
      {paragraphs.map((para, i) => (
        <motion.p
          key={para.key}
          className="font-body text-text-muted"
          style={{ fontSize: '17px', lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.15 }}
        >
          {para.content}
        </motion.p>
      ))}
    </div>
  )
}

/* ========================================
   ABOUT SLIDESHOW — replacing stat cards
   ======================================== */

function AboutSlideshow() {
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
  ]

  return (
    <RevealOnScroll direction="up" delay={0.2}>
      <div className="w-full lg:w-[40vw] max-w-[550px] lg:max-w-[470px]">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: '1px solid rgba(0, 220, 192, 0.2)',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Swiper
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Navigation, Autoplay]}
            className="w-full rounded-xl"
          >
            {slides.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="aspect-[4/3] w-full">
                  <img
                    alt={`ApexFest Highlight ${i + 1}`}
                    className="w-full h-full object-cover select-none"
                    src={src}
                  />
                  {/* Subtle dark gradient overlay to tie into the theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c0e]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   MISSION STATEMENT
   ======================================== */

function MissionStatement() {
  return (
    <motion.section
      className="mt-20 mb-16"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.6 }}
    >
      <div className="flex gap-6">
        <div className="w-[2px] flex-shrink-0 bg-gamefest" />
        <div>
          <p
            className="font-mono text-text-muted mb-3"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            OUR MISSION
          </p>
          <p
            className="font-body text-text-base"
            style={{ fontSize: '18px', lineHeight: 1.7 }}
          >
            To build a thriving community of student developers, gamers, and innovators
            at USM through events that inspire, challenge, and connect.
          </p>
        </div>
      </div>
    </motion.section>
  )
}

/* ========================================
   GDGoC BADGE
   ======================================== */

function GDGoCBadge() {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      }}
    >
      <div
        className="inline-flex items-center gap-3 px-6 py-3"
        style={{ border: '1px solid rgba(0,220,192,0.3)' }}
      >
        <div
          className="flex items-center justify-center px-3 py-1"
          style={{ border: '1px solid rgba(0,220,192,0.4)' }}
        >
          <span
            className="font-display font-bold text-techfest"
            style={{ fontSize: '11px', letterSpacing: '2px' }}
          >
            GDGoC
          </span>
        </div>
        <div className="flex flex-col">
          <span
            className="font-mono text-text-base"
            style={{ fontSize: '11px', letterSpacing: '1px' }}
          >
            Universiti Sains Malaysia
          </span>
          <span
            className="font-mono text-text-muted"
            style={{ fontSize: '9px', letterSpacing: '2px' }}
          >
            CAMPUS CHAPTER // VERIFIED
          </span>
        </div>
        <span
          className="w-[8px] h-[8px] flex-shrink-0"
          style={{
            backgroundColor: '#00dcc0',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(0,220,192,0.5)',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function About() {
  return (
    <section id="about" className="min-h-screen max-w-7xl mx-auto px-6 py-16">
      <PageHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <ProseColumn />
        </div>
        <div className="flex justify-center lg:justify-end w-full">
          <AboutSlideshow />
        </div>
      </div>

      {/* <MissionStatement /> */}
      {/* <GDGoCBadge /> */}
    </section>
  )
}
