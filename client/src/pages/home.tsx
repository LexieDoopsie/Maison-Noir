import { motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import logoImage from "@assets/Pi7_Mysterious_luxury_logo_for_Maison_Noir_b188d82c-removebg-preview (1)_1759959217879.png";

const dropdownSections = [
  {
    id: "about",
    title: "À propos",
    content: [
      "Maison Noir est une agence créative indépendante fondée à Paris, née de la volonté de créer un espace unique où l'art, la musique et la stratégie digitale se rencontrent pour donner naissance à des créations exceptionnelles.",
      "Notre mission est de réinventer la création artistique en fusionnant musique, art visuel et stratégie digitale au sein d'une même maison. Nous croyons que la véritable innovation naît de la collaboration entre disciplines, où chaque métier enrichit l'autre pour créer quelque chose de plus grand que la somme de ses parties.",
      "Maison Noir réunit des talents émergents et des marques ambitieuses dans un lieu unique où l'esthétique rencontre la stratégie, où la créativité se mêle à l'excellence opérationnelle. Nous accompagnons nos artistes et nos clients dans leur quête d'authenticité et d'impact culturel.",
      "Au cœur de Paris, notre maison est plus qu'une agence : c'est un écosystème créatif, un laboratoire d'idées, un sanctuaire pour les visionnaires. Nous cultivons un environnement où les artistes peuvent s'épanouir, expérimenter et repousser les limites de leur art.",
      "Maison Noir, c'est la rencontre entre la vision artistique et la rigueur d'une agence moderne, entre l'intuition créative et l'expertise stratégique. C'est l'alchimie parfaite entre le rêve et sa réalisation.",
    ],
  },
  {
    id: "philosophy",
    title: "Philosophie et vision",
    content: [
      "Maison Noir repose sur trois piliers fondamentaux : la création authentique, l'excellence esthétique et l'innovation stratégique. Ces principes guident chacune de nos actions et définissent notre approche unique du métier créatif.",
      "Nous croyons que chaque artiste porte en lui une histoire unique qui mérite d'être racontée avec élégance et puissance. Notre rôle n'est pas de formater ou de standardiser, mais d'amplifier, de sublimer, de révéler l'essence même de chaque projet.",
      "Notre vision est de créer un nouvel écosystème créatif où les frontières entre les disciplines s'estompent, où un photographe peut collaborer avec un producteur musical, où un designer peut inspirer un vidéaste. C'est dans cette fusion que naissent les œuvres les plus marquantes.",
      "Nous soutenons les jeunes artistes comme les figures établies, leur offrant une direction artistique exigeante, une production complète d'exception et une stratégie de communication solide. Chaque projet bénéficie de notre réseau, de notre expertise et de notre passion pour l'excellence.",
      "Chez Maison Noir, nous ne suivons pas les tendances — nous les créons. Nous ne cherchons pas le succès éphémère, mais l'impact durable. Nous bâtissons des légendes, nous façonnons des mythes, nous écrivons l'histoire culturelle de demain.",
      "Maison Noir est un espace où les artistes deviennent des légendes, où chaque projet est une opportunité de créer quelque chose d'inoubliable, où la rose noire s'épanouit pour révéler toute sa beauté mystérieuse.",
    ],
  },
  {
    id: "divisions",
    title: "Nos pôles créatifs",
    content: [
      "NOIR STUDIO — Notre pôle de création visuelle incarne l'excellence esthétique dans chaque image. Nous proposons des services de photographie artistique et commerciale, de réalisation vidéo cinématographique, de design graphique innovant et de création d'identité visuelle complète. Notre studio est équipé des dernières technologies et dirigé par des directeurs artistiques primés qui transforment chaque brief en œuvre d'art.",
      "Que ce soit pour un shooting éditorial, une campagne publicitaire, un clip musical ou une identité de marque, NOIR STUDIO apporte une touche d'élégance parisienne et une vision contemporaine qui captive et inspire. Nous collaborons avec les meilleurs talents créatifs pour livrer des visuels qui ne se contentent pas de communiquer — ils racontent des histoires, ils évoquent des émotions, ils créent des univers.",
      "NOIR RECORDS — Notre label musical est dédié à la découverte et au développement de talents exceptionnels. Nous offrons un accompagnement complet : enregistrement dans nos studios de pointe, mixage et mastering par des ingénieurs du son reconnus, production de clips vidéo artistiques, distribution digitale stratégique et promotion ciblée.",
      "NOIR RECORDS ne se limite pas à produire de la musique : nous construisons des carrières, nous développons des univers artistiques cohérents, nous créons des moments culturels. Du premier enregistrement à la tournée internationale, nous accompagnons nos artistes avec la même passion et la même exigence de qualité.",
      "NOIR DIGITAL — Notre agence digitale conçoit des stratégies de communication sur mesure qui amplifient la présence et l'impact de nos clients. Nous maîtrisons l'art du storytelling digital, du community management engageant, de la création de contenu viral et du développement web sophistiqué.",
      "Dans un monde saturé d'informations, NOIR DIGITAL aide les marques et les artistes à se démarquer avec authenticité. Nous créons des écosystèmes digitaux cohérents où chaque point de contact renforce l'identité de marque, où chaque interaction crée de la valeur, où chaque campagne génère un impact mesurable et durable.",
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
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain select-none pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              data-testid="img-logo"
            />
          </motion.div>

          {/* Title with Progressive Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-center space-y-3"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wider"
              data-testid="text-title"
            >
              MAISON NOIR
            </h1>
            <p 
              className="text-base sm:text-lg md:text-xl text-[#c6a664] font-serif tracking-widest"
              data-testid="text-coming-soon"
            >
              COMING SOON 2026
            </p>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center gap-4"
            data-testid="decorative-divider"
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#c6a664]"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#c6a664]"></div>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#c6a664]"></div>
          </motion.div>

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

          {/* Decorative Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#c6a664]"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#c6a664]"></div>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#c6a664]"></div>
          </motion.div>

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

          {/* Decorative Section - Three Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12"
            data-testid="section-pillars"
          >
            <div className="text-center space-y-3 p-6 border border-[#e5e5e5]/10 rounded-md hover-elevate" data-testid="pillar-creation">
              <div className="flex justify-center">
                <div className="w-12 h-12 flex items-center justify-center border border-[#c6a664] rounded-md">
                  <span className="text-2xl text-[#c6a664] font-serif">I</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#c6a664]">Création Authentique</h3>
              <p className="text-sm text-[#e5e5e5]/70 leading-relaxed">
                L'art véritable naît de l'authenticité. Nous cultivons l'originalité et la sincérité dans chaque projet.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 border border-[#e5e5e5]/10 rounded-md hover-elevate" data-testid="pillar-excellence">
              <div className="flex justify-center">
                <div className="w-12 h-12 flex items-center justify-center border border-[#c6a664] rounded-md">
                  <span className="text-2xl text-[#c6a664] font-serif">II</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#c6a664]">Excellence Esthétique</h3>
              <p className="text-sm text-[#e5e5e5]/70 leading-relaxed">
                La beauté n'est jamais un accident. Nous poursuivons la perfection dans chaque détail, chaque pixel.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 border border-[#e5e5e5]/10 rounded-md hover-elevate" data-testid="pillar-innovation">
              <div className="flex justify-center">
                <div className="w-12 h-12 flex items-center justify-center border border-[#c6a664] rounded-md">
                  <span className="text-2xl text-[#c6a664] font-serif">III</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#c6a664]">Innovation Stratégique</h3>
              <p className="text-sm text-[#e5e5e5]/70 leading-relaxed">
                L'innovation sans stratégie est chaos. Nous allions créativité audacieuse et vision claire.
              </p>
            </div>
          </motion.div>

          {/* Project Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pt-12 md:pt-16 space-y-4 md:space-y-5 text-center border-t border-[#e5e5e5]/10"
            data-testid="section-status"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-[#c6a664] pt-8" data-testid="text-status-title">
              Le Lancement Approche
            </h2>
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
