import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight, Mail, MapPin, Instagram, Twitter, Send, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Filter, Award, BookOpen, Mic, Pen, Users, Calendar, ArrowLeft } from 'lucide-react';
// Jerry Saltz Editorial Personal Website - Complete Implementation

type Page = 'home' | 'about' | 'gallery' | 'contact' | 'mentorship';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

// Navigation Component
const Navigation: React.FC<{ currentPage: Page; setCurrentPage: (page: Page) => void }> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'gallery', label: 'Gallery' },
    { page: 'contact', label: 'Contact' },
    { page: 'mentorship', label: 'Mentorship Program' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <button onClick={() => handleNavClick('home')} className="font-serif text-xl lg:text-2xl tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors duration-300">
              Jerry Saltz
            </button>
            <div className="hidden lg:flex items-center space-x-12">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative text-sm tracking-wide uppercase transition-colors duration-300 group ${currentPage === link.page ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-neutral-900 transition-all duration-300 ${currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-neutral-900 hover:text-neutral-600 transition-colors" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full px-6 py-8">
          <div className="flex items-center justify-between mb-16">
            <button onClick={() => handleNavClick('home')} className="font-serif text-xl tracking-tight text-neutral-900">Jerry Saltz</button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-neutral-900 hover:text-neutral-600 transition-colors" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => handleNavClick(link.page)} className={`font-serif text-4xl tracking-tight text-left transition-all duration-300 ${currentPage === link.page ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-900'}`}>
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 tracking-wide">Art Critic • Writer • Curator</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Footer Component
const Footer: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-6">Jerry Saltz</h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md mb-8">
              Art critic, writer, and cultural observer. Exploring the boundaries of contemporary art and challenging conventional perspectives.
            </p>
            <div className="flex items-center space-x-6">
              <a href="https://instagram.com/jerrysaltz" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/jerrysaltz" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contact@jerrysaltz.com" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">Navigation</h3>
            <ul className="space-y-4">
              {(['home', 'about', 'gallery', 'contact'] as Page[]).map((page) => (
                <li key={page}>
                  <button onClick={() => handleNavClick(page)} className="text-neutral-300 hover:text-white transition-colors duration-300 inline-flex items-center group capitalize">
                    {page}
                    <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">Programs</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleNavClick('mentorship')} className="text-neutral-300 hover:text-white transition-colors duration-300 inline-flex items-center group">
                  Mentorship Program
                  <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">© {currentYear} Jerry Saltz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const HomePage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredWorks = [
    { id: 1, title: 'The Death of the Gallery', category: 'Essay', date: '2025', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092103201_49698acf.jpg' },
    { id: 2, title: 'On Looking', category: 'Criticism', date: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092108794_ed495723.png' },
    { id: 3, title: 'The New Avant-Garde', category: 'Feature', date: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092102941_04384d27.jpg' },
  ];

  const pressLogos = ['The New York Times', 'Artforum', 'Frieze', 'The New Yorker', 'Art in America'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 z-0" style={{ backgroundImage: `url(https://i.ibb.co/HQZZQwL/r9y-Oa-Igl-400x400-1.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-0">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">Art Critic • Writer • Curator</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl tracking-tight text-neutral-900 mb-8 leading-[0.95]">
              Art is not<br /><span className="italic">about</span> something.<br />Art <span className="italic">is</span> something.
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed mb-12 max-w-xl">
              Challenging conventions, questioning boundaries, and finding beauty in the unexpected. Over three decades of writing about what art means—and why it matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 group">
                Explore My Work
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button onClick={() => { setCurrentPage('mentorship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center justify-center px-8 py-4 border border-neutral-900 text-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all duration-300">
                Mentorship Program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="py-24 lg:py-40 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-6xl tracking-tight leading-tight mb-8">
            "The art world is a place where people go to be confused, challenged, and ultimately changed."
          </blockquote>
          <cite className="text-neutral-500 text-sm uppercase tracking-widest not-italic">— Jerry Saltz</cite>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Selected Works</p>
              <h2 className="font-serif text-4xl lg:text-6xl tracking-tight text-neutral-900">Recent Writing</h2>
            </div>
            <button onClick={() => { setCurrentPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mt-6 lg:mt-0 inline-flex items-center text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group">
              <span className="text-sm uppercase tracking-widest">View All</span>
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredWorks.map((work) => (
              <article key={work.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">{work.category}</span>
                  <span className="w-8 h-px bg-neutral-300" />
                  <span className="text-xs text-neutral-500">{work.date}</span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300">{work.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 lg:py-40 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="https://i.ibb.co/HQZZQwL/r9y-Oa-Igl-400x400-1.jpg" alt="Jerry Saltz" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-neutral-900 hidden lg:block" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">About</p>
              <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-neutral-900 mb-8 leading-tight">
                Three decades of<br />looking, writing,<br />and questioning.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Jerry Saltz-winning art critic and senior art critic at New York Magazine. Known for passionate, accessible writing that bridges the gap between the art world and everyone else.
              </p>
              <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group">
                <span className="text-sm uppercase tracking-widest">Read Full Bio</span>
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship CTA Section */}
      <section className="py-24 lg:py-40 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6">Now Accepting Applications</p>
          <h2 className="font-serif text-4xl lg:text-6xl tracking-tight mb-8 leading-tight">
            The Jerry Saltz<br />Mentorship Program
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            An intensive program for emerging art critics and writers. Develop your voice, sharpen your eye, and learn to write about art with clarity and passion.
          </p>
          <button onClick={() => { setCurrentPage('mentorship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center justify-center px-10 py-5 bg-white text-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-200 transition-all duration-300 group">
            Apply Now
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 lg:py-24 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-neutral-500 mb-12">Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {pressLogos.map((logo) => (
              <span key={logo} className="font-serif text-xl lg:text-2xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300 cursor-pointer">{logo}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// About Page
const AboutPage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const timeline = [
    { year: '1951', event: 'Born in Chicago, Illinois' },
    { year: '1980', event: 'Began career as an art critic' },
    { year: '1998', event: 'Joined The Village Voice' },
    { year: '2006', event: 'Senior Art Critic at New York Magazine' },
    { year: '2018', event: 'Jerry Saltz for Criticism' },
    { year: '2024', event: 'Launched Mentorship Program' },
  ];

  const stats = [
    { number: '40+', label: 'Years in Criticism' },
    { number: '5000+', label: 'Articles Written' },
    { number: '1', label: 'Jerry Saltz' },
    { number: '∞', label: 'Opinions Shared' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src="https://i.ibb.co/HQZZQwL/r9y-Oa-Igl-400x400-1.jpg" alt="Jerry Saltz" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-neutral-900 text-white p-6 hidden lg:block">
                    <p className="text-sm uppercase tracking-widest">Jerry Saltz</p>
                    <p className="font-serif text-2xl">2018</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">About</p>
              <h1 className="font-serif text-4xl lg:text-6xl tracking-tight text-neutral-900 mb-8 leading-tight">
                The critic who<br />changed how we<br />talk about art.
              </h1>
              <div className="prose prose-lg max-w-none text-neutral-600 space-y-6">
                <p className="text-xl leading-relaxed">
                  Jerry Saltz is one of the most influential art critics of our time. His writing combines deep knowledge with accessible passion, making contemporary art understandable—and urgent—for everyone.
                </p>
                <p>
                  Born in Chicago in 1951, Saltz didn't follow a traditional path to art criticism. He drove a long-haul truck for ten years before becoming a critic, an experience that gave him a unique perspective on American life and culture.
                </p>
                <p>
                  His approach to criticism is democratic and passionate. He believes that everyone can engage with art, that the art world's elitism is its greatest weakness, and that criticism should be a conversation, not a lecture.
                </p>
                <p>
                  In 2018, he won the Jerry Saltz for Criticism, recognizing his "exuberant, passionate criticism that connects art to the broader culture."
                </p>
              </div>
              <div className="mt-12">
                <button onClick={() => { setCurrentPage('mentorship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 group">
                  Join the Mentorship Program
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-5xl lg:text-7xl text-neutral-900 mb-2">{stat.number}</p>
                <p className="text-sm uppercase tracking-widest text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6 text-center">Philosophy</p>
            <h2 className="font-serif text-3xl lg:text-5xl tracking-tight text-neutral-900 mb-16 text-center leading-tight">On Art, Criticism, and Life</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { icon: Pen, title: 'On Writing', text: '"Write what you see. Write what you feel. Don\'t try to sound smart—try to be clear."' },
                { icon: BookOpen, title: 'On Looking', text: '"Looking is a skill. It takes practice. Stand in front of a work for longer than you think you should."' },
                { icon: Award, title: 'On Success', text: '"Success in the art world isn\'t about being right. It\'s about being engaged."' },
                { icon: Mic, title: 'On Voice', text: '"Your voice is your fingerprint. Don\'t try to sound like anyone else."' },
              ].map((item, index) => (
                <div key={index} className="p-8 border border-neutral-200 hover:border-neutral-900 transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-neutral-900 mb-6" />
                  <h3 className="font-serif text-xl mb-4">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 lg:py-40 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">Timeline</p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-16">A Life in Art</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-800 hidden lg:block" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="lg:pl-12 relative group">
                  <div className="absolute left-0 top-2 w-2 h-2 bg-neutral-500 group-hover:bg-white transition-colors duration-300 hidden lg:block" style={{ marginLeft: '-3.5px' }} />
                  <div className="flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8">
                    <span className="font-serif text-3xl lg:text-4xl text-neutral-500 group-hover:text-white transition-colors duration-300">{item.year}</span>
                    <span className="text-lg text-neutral-300">{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Gallery Page
const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', 'Paintings', 'Sculpture', 'Installation'];

  const galleryItems: GalleryItem[] = [
    { id: 1, title: 'Chromatic Dissolution', category: 'Paintings', year: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092033695_a921f5c9.jpg', description: 'Abstract expressionist work exploring color theory.' },
    { id: 2, title: 'Urban Fragments', category: 'Paintings', year: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092055360_b4f718a3.png', description: 'Mixed media on canvas.' },
    { id: 3, title: 'Temporal Shift', category: 'Paintings', year: '2023', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092036804_5c342617.jpg', description: 'Oil on linen exploring time.' },
    { id: 4, title: 'Echo Chamber', category: 'Paintings', year: '2023', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092039839_52312837.jpg', description: 'Large-scale work on communication.' },
    { id: 5, title: 'Void Form I', category: 'Sculpture', year: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092085246_04789bad.png', description: 'Bronze and steel sculpture.' },
    { id: 6, title: 'Equilibrium', category: 'Sculpture', year: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092068018_04d90662.jpg', description: 'Marble work on balance.' },
    { id: 7, title: 'Ascending', category: 'Sculpture', year: '2023', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092084713_3fe32942.png', description: 'Kinetic sculpture.' },
    { id: 8, title: 'Material Memory', category: 'Sculpture', year: '2023', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092071746_ed97119e.jpg', description: 'Found object assemblage.' },
    { id: 9, title: 'Threshold', category: 'Installation', year: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092103201_49698acf.jpg', description: 'Immersive light installation.' },
    { id: 10, title: 'Collective Unconscious', category: 'Installation', year: '2024', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092108794_ed495723.png', description: 'Multi-room installation.' },
    { id: 11, title: 'Digital Archaeology', category: 'Installation', year: '2023', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092102941_04384d27.jpg', description: 'Interactive installation.' },
    { id: 12, title: 'Resonance Field', category: 'Installation', year: '2023', image: 'https://d64gsuwffb70l.cloudfront.net/6981759f96c5e36bfd4bb367_1770092103789_14faa95f.jpg', description: 'Sound and light installation.' },
  ];

  const filteredItems = selectedCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">Gallery</p>
          <h1 className="font-serif text-4xl lg:text-7xl tracking-tight text-neutral-900 mb-8 leading-tight">Curated Works</h1>
          <p className="text-lg lg:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            A selection of contemporary artworks that challenge, inspire, and provoke.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-12 lg:pb-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-4 h-4 text-neutral-400" />
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 text-sm uppercase tracking-widest transition-all duration-300 ${selectedCategory === category ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-900'}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredItems.map((item, index) => (
              <article key={item.id} className="group cursor-pointer" onClick={() => openLightbox(index)}>
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-neutral-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">View</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">{item.category}</span>
                  <span className="w-8 h-px bg-neutral-300" />
                  <span className="text-xs text-neutral-500">{item.year}</span>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10" aria-label="Close">
            <X className="w-8 h-8" />
          </button>
          <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10" aria-label="Previous">
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length)} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10" aria-label="Next">
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-5xl max-h-[80vh] px-16">
            <img src={filteredItems[currentImageIndex].image} alt={filteredItems[currentImageIndex].title} className="max-w-full max-h-[70vh] object-contain" />
            <div className="mt-6 text-center">
              <h3 className="font-serif text-2xl text-white mb-2">{filteredItems[currentImageIndex].title}</h3>
              <p className="text-white/60 text-sm">{filteredItems[currentImageIndex].category} • {filteredItems[currentImageIndex].year}</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">{currentImageIndex + 1} / {filteredItems.length}</div>
        </div>
      )}

      {/* Quote Section */}
      <section className="py-24 lg:py-40 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <blockquote className="font-serif text-2xl lg:text-4xl tracking-tight leading-relaxed mb-8">"Art is not what you see, but what you make others see."</blockquote>
          <cite className="text-neutral-500 text-sm uppercase tracking-widest not-italic">— Edgar Degas</cite>
        </div>
      </section>
    </>
  );
};

// Contact Page
const ContactPage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/mdadjndn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">Contact</p>
          <h1 className="font-serif text-4xl lg:text-7xl tracking-tight text-neutral-900 mb-8 leading-tight">Let's Talk</h1>
          <p className="text-lg lg:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            For press inquiries, speaking engagements, or general questions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h2 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-8">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-neutral-400 mt-1" />
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Email</p>
                        <a href="mailto:contact@jerrysaltz.com" className="text-neutral-900 hover:text-neutral-600 transition-colors duration-300">contact@jerrysaltz.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-neutral-400 mt-1" />
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Location</p>
                        <p className="text-neutral-900">New York City</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-8">Follow</h2>
                  <div className="flex gap-4">
                    <a href="https://instagram.com/jerrysaltz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300" aria-label="Instagram">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com/jerrysaltz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300" aria-label="Twitter">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="p-8 bg-neutral-100">
                  <h3 className="font-serif text-xl mb-4">Looking to Apply?</h3>
                  <p className="text-neutral-600 mb-6 text-sm leading-relaxed">For the Mentorship Program, please use the dedicated application form.</p>
                  <button onClick={() => { setCurrentPage('mentorship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group text-sm uppercase tracking-widest">
                    Apply Here
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h2 className="font-serif text-3xl text-neutral-900 mb-4">Message Sent</h2>
                  <p className="text-neutral-600 mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-sm uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-sm uppercase tracking-widest text-neutral-500 mb-3">Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-neutral-300 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-transparent" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm uppercase tracking-widest text-neutral-500 mb-3">Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-b border-neutral-300 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-transparent" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm uppercase tracking-widest text-neutral-500 mb-3">Subject *</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full border-b border-neutral-300 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-transparent appearance-none cursor-pointer">
                      <option value="">Select a subject</option>
                      <option value="press">Press Inquiry</option>
                      <option value="speaking">Speaking Engagement</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm uppercase tracking-widest text-neutral-500 mb-3">Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full border-b border-neutral-300 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-transparent resize-none" placeholder="Your message..." />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-10 py-5 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group">
                    {isSubmitting ? 'Sending...' : (<>Send Message<Send className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" /></>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Mentorship Page
const MentorshipPage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', location: '', background: '', experience: '', statement: '', portfolio: '', samples: '', howHeard: '', availability: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.background) errors.background = 'Please select your background';
    if (!formData.statement.trim()) errors.statement = 'Statement of interest is required';
    else if (formData.statement.trim().split(/\s+/).length < 50) errors.statement = 'Please write at least 50 words';
    if (!formData.availability) errors.availability = 'Please select your availability';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/xpwzgvqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: 'Mentorship Program Application', ...formData }),
      });
      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const programFeatures = [
    { icon: Users, title: 'Small Cohorts', description: 'Intimate groups of 8-10 participants.' },
    { icon: Calendar, title: '12-Week Program', description: 'Intensive curriculum covering criticism and writing.' },
    { icon: BookOpen, title: 'Weekly Sessions', description: 'Live sessions with Jerry and guest critics.' },
    { icon: Award, title: 'Publication Opportunity', description: 'Top participants may be featured in publications.' },
  ];

  if (isSubmitted) {
    return (
      <section className="pt-32 lg:pt-40 pb-24 lg:pb-40">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-8" />
          <h1 className="font-serif text-4xl lg:text-5xl tracking-tight text-neutral-900 mb-6">Application Received</h1>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">Thank you for applying. We'll review your application and get back to you within 2-3 weeks.</p>
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm uppercase tracking-widest">Return Home</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center text-neutral-400 hover:text-white transition-colors duration-300 mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm uppercase tracking-widest">Back to Home</span>
          </button>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6">Now Accepting Applications</p>
          <h1 className="font-serif text-4xl lg:text-7xl tracking-tight mb-8 leading-tight">The Jerry Saltz<br />Mentorship Program</h1>
          <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            An intensive 12-week program for emerging art critics and cultural writers.
          </p>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 lg:py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programFeatures.map((feature, index) => (
              <div key={index} className="text-center lg:text-left">
                <feature.icon className="w-8 h-8 text-neutral-900 mx-auto lg:mx-0 mb-4" />
                <h3 className="font-serif text-xl mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl tracking-tight text-neutral-900 mb-4">Application Form</h2>
            <p className="text-neutral-600 leading-relaxed">Please complete all required fields. Take your time with the statement of interest.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6 pb-2 border-b border-neutral-200">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-neutral-700 mb-2">First Name *</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full border ${fieldErrors.firstName ? 'border-red-500' : 'border-neutral-300'} px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300`} placeholder="Jerry" />
                  {fieldErrors.firstName && <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-neutral-700 mb-2">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full border ${fieldErrors.lastName ? 'border-red-500' : 'border-neutral-300'} px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300`} placeholder="Saltz" />
                  {fieldErrors.lastName && <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-neutral-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full border ${fieldErrors.email ? 'border-red-500' : 'border-neutral-300'} px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300`} placeholder="your@email.com" />
                  {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-neutral-700 mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm text-neutral-700 mb-2">Location (City, Country)</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300" placeholder="New York, USA" />
                </div>
              </div>
            </div>

            {/* Background */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6 pb-2 border-b border-neutral-200">Background</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="background" className="block text-sm text-neutral-700 mb-2">Your Background *</label>
                  <select id="background" name="background" value={formData.background} onChange={handleChange} className={`w-full border ${fieldErrors.background ? 'border-red-500' : 'border-neutral-300'} px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-white`}>
                    <option value="">Select your background</option>
                    <option value="student">Student</option>
                    <option value="emerging-writer">Emerging Writer/Critic</option>
                    <option value="artist">Practicing Artist</option>
                    <option value="curator">Curator/Gallery Professional</option>
                    <option value="journalist">Journalist/Editor</option>
                    <option value="academic">Academic/Educator</option>
                    <option value="career-change">Career Changer</option>
                    <option value="other">Other</option>
                  </select>
                  {fieldErrors.background && <p className="text-red-500 text-sm mt-1">{fieldErrors.background}</p>}
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm text-neutral-700 mb-2">Writing Experience</label>
                  <textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} rows={3} className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 resize-none" placeholder="Briefly describe your writing experience..." />
                </div>
              </div>
            </div>

            {/* Statement of Interest */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6 pb-2 border-b border-neutral-200">Statement of Interest</h3>
              <div>
                <label htmlFor="statement" className="block text-sm text-neutral-700 mb-2">Why do you want to join this program? *</label>
                <p className="text-sm text-neutral-500 mb-4">Tell us about your passion for art criticism. (Minimum 50 words)</p>
                <textarea id="statement" name="statement" value={formData.statement} onChange={handleChange} rows={8} className={`w-full border ${fieldErrors.statement ? 'border-red-500' : 'border-neutral-300'} px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 resize-none`} placeholder="Write your statement here..." />
                <div className="flex justify-between mt-2">
                  {fieldErrors.statement && <p className="text-red-500 text-sm">{fieldErrors.statement}</p>}
                  <p className="text-sm text-neutral-400 ml-auto">{formData.statement.trim().split(/\s+/).filter(Boolean).length} words</p>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6 pb-2 border-b border-neutral-200">Portfolio & Samples</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="portfolio" className="block text-sm text-neutral-700 mb-2">Portfolio/Website URL</label>
                  <input type="url" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300" placeholder="https://yourportfolio.com" />
                </div>
                <div>
                  <label htmlFor="samples" className="block text-sm text-neutral-700 mb-2">Writing Samples (URLs)</label>
                  <textarea id="samples" name="samples" value={formData.samples} onChange={handleChange} rows={3} className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 resize-none" placeholder="Share links to any published writing samples..." />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6 pb-2 border-b border-neutral-200">Additional Information</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="howHeard" className="block text-sm text-neutral-700 mb-2">How did you hear about this program?</label>
                  <select id="howHeard" name="howHeard" value={formData.howHeard} onChange={handleChange} className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-white">
                    <option value="">Select an option</option>
                    <option value="-media">Social Media</option>
                    <option value="jerry-writing">Jerry's Writing</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="publication">Publication/Article</option>
                    <option value="search">Search Engine</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm text-neutral-700 mb-2">Availability *</label>
                  <select id="availability" name="availability" value={formData.availability} onChange={handleChange} className={`w-full border ${fieldErrors.availability ? 'border-red-500' : 'border-neutral-300'} px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors duration-300 bg-white`}>
                    <option value="">Select your availability</option>
                    <option value="spring-2026">Spring 2026 Cohort</option>
                    <option value="fall-2026">Fall 2026 Cohort</option>
                    <option value="either">Either/Flexible</option>
                  </select>
                  {fieldErrors.availability && <p className="text-red-500 text-sm mt-1">{fieldErrors.availability}</p>}
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="pt-6">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 py-5 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
              <p className="text-sm text-neutral-500 mt-4">By submitting, you agree to be contacted regarding the Mentorship Program.</p>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-neutral-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-tight text-neutral-900 mb-16 text-center">Program FAQ</h2>
          <div className="space-y-8">
            {[
              { q: 'What is the time commitment?', a: 'The program runs for 12 weeks with weekly 2-hour live sessions plus 5-8 hours of independent work.' },
              { q: 'Is this program online or in-person?', a: 'The program is primarily online with optional in-person meetups in New York City.' },
              { q: 'Do I need prior writing experience?', a: 'While helpful, we value passion and potential over credentials.' },
              { q: 'When will I hear back?', a: 'Applications are reviewed on a rolling basis. You\'ll hear back within 2-3 weeks.' },
            ].map((faq, index) => (
              <div key={index} className="border-b border-neutral-300 pb-8">
                <h3 className="font-serif text-xl text-neutral-900 mb-3">{faq.q}</h3>
                <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Main AppLayout Component
const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'mentorship':
        return <MentorshipPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default AppLayout;
