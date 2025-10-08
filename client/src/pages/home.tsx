import { motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import logoImage from "@assets/Pi7_Mysterious_luxury_logo_for_Maison_Noir_b188d82c-removebg-preview (1)_1759959217879.png";

const dropdownSections = [
  {
    id: "about",
    title: "À propos",
    content: [
      "Maison Noir est une agence créative indépendante fondée à Paris. Sa mission : réinventer la création artistique en fusionnant musique, art visuel et stratégie digitale au sein d'une même maison.",
      "Elle réunit des talents émergents et des marques ambitieuses dans un lieu unique où l'esthétique rencontre la stratégie.",
      "Maison Noir, c'est la rencontre entre la vision artistique et la rigueur d'une agence moderne.",
    ],
  },
  {
    id: "philosophy",
    title: "Philosophie et vision",
    content: [
      "Maison Noir repose sur trois piliers : création authentique, excellence esthétique et innovation stratégique.",
      "Elle soutient les jeunes artistes comme les figures établies, leur offrant une direction artistique exigeante, une production complète et une stratégie de communication solide.",
      "Maison Noir est un espace où les artistes deviennent des légendes.",
    ],
  },
  {
    id: "divisions",
    title: "Nos pôles créatifs",
    content: [
      "NOIR STUDIO : pôle de création visuelle — photo, vidéo, design graphique, identité visuelle.",
      "NOIR RECORDS : label musical — enregistrement, mixage, mastering, distribution et clips.",
      "NOIR DIGITAL : agence digitale — stratégie, community management, storytelling et développement web.",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans overflow-x-hidden">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          
          {/* Logo Section with Fade In */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center"
            data-testid="logo-section"
          >
            <img
              src={logoImage}
              alt="Maison Noir Logo"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain"
              data-testid="img-logo"
            />
          </motion.div>

          {/* Title with Progressive Appearance */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-center tracking-wider"
            data-testid="text-title"
          >
            MAISON NOIR
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-center text-[#e5e5e5]/90 font-light italic"
            data-testid="text-tagline"
          >
            « Là où la rose noire fait éclore les légendes. »
          </motion.p>

          {/* Dropdowns Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="space-y-4 md:space-y-6 pt-8 md:pt-12"
            data-testid="dropdowns-section"
          >
            {dropdownSections.map((section, index) => (
              <Disclosure key={section.id}>
                {({ open }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="border border-[#e5e5e5]/10 rounded-md overflow-hidden hover-elevate"
                    data-testid={`dropdown-${section.id}`}
                  >
                    <Disclosure.Button
                      className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left transition-colors duration-300 group"
                      data-testid={`button-toggle-${section.id}`}
                    >
                      <span className="text-xl md:text-2xl font-serif font-medium group-hover:text-[#c6a664] transition-colors duration-300">
                        {section.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 md:w-6 md:h-6 text-[#c6a664] transition-transform duration-500 ${
                          open ? "rotate-180" : "rotate-0"
                        }`}
                        data-testid={`icon-chevron-${section.id}`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-500 ease-out"
                      enterFrom="transform opacity-0 -translate-y-2"
                      enterTo="transform opacity-100 translate-y-0"
                      leave="transition duration-300 ease-in"
                      leaveFrom="transform opacity-100 translate-y-0"
                      leaveTo="transform opacity-0 -translate-y-2"
                    >
                      <Disclosure.Panel className="px-6 pb-5 md:px-8 md:pb-6 border-t border-[#e5e5e5]/10">
                        <div className="pt-4 space-y-3 md:space-y-4">
                          {section.content.map((paragraph, idx) => (
                            <p
                              key={idx}
                              className="text-base md:text-lg leading-relaxed text-[#e5e5e5]/80"
                              data-testid={`text-content-${section.id}-${idx}`}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </motion.div>
                )}
              </Disclosure>
            ))}
          </motion.div>

          {/* Project Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="pt-8 md:pt-12 space-y-3 md:space-y-4 text-center"
            data-testid="section-status"
          >
            <p className="text-base md:text-lg leading-relaxed text-[#e5e5e5]/70" data-testid="text-status-development">
              Le site complet de Maison Noir est actuellement en développement.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#e5e5e5]/70" data-testid="text-status-newsletter">
              Les adresses mail professionnelles et la possibilité de s'abonner pour être informé de la sortie seront bientôt disponibles.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#e5e5e5]/70" data-testid="text-status-platform">
              Maison Noir prépare une plateforme prestigieuse, pensée pour accueillir autant les talents émergents que les icônes établies.
            </p>
          </motion.div>

          {/* Quote Section with Fade */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="pt-12 md:pt-16 space-y-4 md:space-y-6"
            data-testid="section-quote"
          >
            <p className="text-base md:text-lg lg:text-xl leading-relaxed italic text-center text-[#e5e5e5]/60 max-w-3xl mx-auto" data-testid="text-quote-main">
              « Dans l'obscurité, la rose noire s'épanouit, portant en elle la promesse de la lumière.
              Chaque pétale est une vision, chaque épine une épreuve, et chaque fleur une légende en devenir.
              Maison Noir ne suit pas les tendances — elle façonne les mythes, dans le silence des créateurs et la clarté de la passion. »
            </p>
            <p className="text-sm md:text-base text-center text-[#c6a664] italic" data-testid="text-signature">
              — Maison Noir
            </p>
          </motion.blockquote>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="pt-16 md:pt-20 pb-8 text-center"
            data-testid="footer"
          >
            <p className="text-sm text-[#e5e5e5]/40" data-testid="text-copyright">
              © 2026 Maison Noir. Tous droits réservés.
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
