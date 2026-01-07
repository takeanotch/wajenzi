'use client'
import { Linkedin, Twitter, Instagram, Mail, ArrowUpRight, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12 md:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="mb-6">
              <span className="text-xl font-bold text-white tracking-tight">
                <img src='/logo.png' className='w-[120px] brightness-0 invert' alt="Architecture Logo"/>
              </span>
              <p className="text-gray-400 text-sm mt-2 max-w-xs">
                Transformons vos rêves en réalité architecturale. Design innovant, construction précise.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="mailto:contact@architecture.com" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Nos Services
            </h3>
            <ul className="space-y-3">
              {['Architecture', 'Plans 3D', 'Design Intérieur', 'Construction', 'Rénovation', 'Consultation'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group"
                  >
                    {item}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

       

          {/* Informations */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Informations
            </h3>
            <ul className="space-y-3">
              {['À propos', 'Nos Projets', 'Témoignages', 'Carrières', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group"
                  >
                    {item}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-3">
                Demandez un Devis
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                250+ projets réalisés<br/>
                8 ans d'expérience
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Téléphone: +243 89 3000 416
              </p>
              <a 
                href="mailto:contact@architecture.com" 
                className="inline-flex items-center text-sm text-white font-medium hover:text-gray-300 transition-colors group"
              >
                contact@architecture.com
                <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <button className="mt-4 w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                Demander un Devis
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 md:my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Architecture & Design. Tous droits réservés.
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Plan du site
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Accessibilité
            </a>
          </div>
        </div>

        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors z-40"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;