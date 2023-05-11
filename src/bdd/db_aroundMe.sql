-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 10 mai 2023 à 13:13
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `around-me`
--

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `id_departement` int NOT NULL,
  `nom_departement` varchar(50) NOT NULL,
  `numero_departement` int NOT NULL,
  `slug_departement` varchar(50) NOT NULL,
  PRIMARY KEY (`id_departement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`id_departement`, `nom_departement`, `numero_departement`, `slug_departement`) VALUES
(176, 'Maine-et-Loire', 49, 'maine-et-loire'),
(177, 'Finistère', 29, 'finistere'),
(178, 'Îlle-et-Vilaine', 35, 'ille-et-vilaine'),
(179, 'Morbihan', 56, 'morbihan'),
(180, 'Cher', 18, 'cher'),
(181, 'Doubs', 25, 'doubs'),
(182, 'Loire-Atlantique', 44, 'loire-atlantique'),
(183, 'Côtes-d\'Armor', 22, 'cote-darmor'),
(184, 'Paris', 75, 'paris'),
(185, 'Hauts-de-Seine', 92, 'hauts-de-seine'),
(186, 'Val-de-Marne', 94, 'val-de-marne'),
(187, 'Val-d\'Oise', 95, 'val-doise'),
(188, 'Yonne', 89, 'yonne'),
(189, 'Rhône', 69, 'rhone'),
(190, 'Pyrénées-Orientales', 66, 'pyrenees-orientales'),
(191, 'Lot', 46, 'lot'),
(192, 'Indre-et-Loire', 37, 'indre-et-loire'),
(193, 'Vendée', 85, 'vendee'),
(204, 'Seine-Saint-Denis', 93, 'seine-saint-denis'),
(207, 'Eure-en-Normandie', 27, 'eure-en-normadie'),
(208, 'Savoie', 73, 'savoie'),
(209, 'Seine-et-Marne', 77, 'seine-et-marne'),
(210, 'Sarthe', 72, 'sarthe'),
(211, 'Loiret', 45, 'loiret');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id_entreprise` int NOT NULL,
  `nom_entreprise` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telephone_entreprise` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `adresse_entreprise` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `infos_entreprise` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description_entreprise` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `site_internet_entreprise` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `reseaux_sociaux_entreprise` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `monnaie_locale_entreprise` tinyint(1) DEFAULT NULL,
  `livraison_entreprise` tinyint(1) DEFAULT NULL,
  `latitude_entreprise` decimal(8,6) NOT NULL,
  `longitude_entreprise` decimal(8,6) NOT NULL,
  `id_departement` int NOT NULL,
  PRIMARY KEY (`id_entreprise`),
  KEY `id_departement` (`id_departement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id_entreprise`, `nom_entreprise`, `telephone_entreprise`, `adresse_entreprise`, `infos_entreprise`, `description_entreprise`, `site_internet_entreprise`, `reseaux_sociaux_entreprise`, `monnaie_locale_entreprise`, `livraison_entreprise`, `latitude_entreprise`, `longitude_entreprise`, `id_departement`) VALUES
(5343, 'Terre de Pixels', '0241505916', '6 Rue de l\'Espoir, 49700 Doué-en-Anjou, France', 'Agence de communication\r\n\r\nlundi au vendredi 08h30 – 12h30 / 14h00 – 18h00', 'Nous avons créé ce site bénévolement au service du développement de la création et l’achat local.\n\nJeune pousse d’Anjou semée en 2011, Terre de Pixels est une agence de communication plurimedia (web et papier) qui fait fleurir votre communication.', 'https://terredepixels.fr', 'https://www.facebook.com/terredepixels/,https://www.instagram.com/terredepixels/', 1, 0, '47.193153', '-0.275333', 176),
(10863, 'LogoSapience', '0241368141', '3 Rue Pierre et Marie Curie,49298 Saint-Léger-de-L', 'Logiciels informatiques', 'Créé en 1995 à Angers, LogoSapience est un bureau d’études spécialisé dans les logiciels.\r\n\r\nDepuis 27 ans LogoSapience propose des prestations d’accompagnement pour permettre aux entreprises d’atteindre leurs objectifs en terme de stratégie numérique. Les solutions logicielles de LogoSapience sont installées dans plus de 3000 établissements en France et à l’étranger. ', 'https://www.logosapience.fr/', 'https://www.linkedin.com/company/3533117', 0, 0, '47.463510', '-0.664117', 176),
(11016, 'Lanvolduphenix', '0607966304', '64 Rue Eugénie Grandet,37700 Saint-Pierre-des-Corp', 'Naturopathie', 'Soin par machines fréquentielles :\r\nTimeWaver & Spooky, Écoute du corps et soin manuel, Conseil en alimentation hygiénique', NULL, 'https://www.facebook.com/anneeschenbrennerlanvolduphenix/, https://www.instagram.com/lanvolduphenix/', 0, 0, '47.397730', '0.755751', 192),
(11017, 'GTRANDYS', '0298412366', '20 Rue de l\'Eau Blanche,29019 Brest, France', 'Transport routier de marchandises', 'Transport routier de marchandise sur la Bretagne, les Pays de la Loire et la région parisienne. ', NULL, NULL, 0, 0, '48.414292', '-4.460714', 177),
(11021, 'ITANOVA EasyProf', '0631628950', '10 Rue de Laborde, Paris, France', 'Fabricant de logiciels pour la création de cours e-learning', 'ITANOVA conçoit et développe des logiciels permettant de créer des cours e-learning en toute simplicité et avec une grande efficacité pédagogique.\r\n\r\nSon logiciel EasyProf se dirige aux entreprises avec des besoins de formation de leur personnel, et au secteur éducatif, au niveau local, national et international.', 'https://easyprof.com/en/', NULL, 0, 1, '48.875827', '2.321642', 184),
(11022, 'AUDIT CONSEIL ASSISTANCE ( ACA )', '0241097732', '22 Rue de Belgique, Montreuil-Juigné, France', 'Assurances et gestion des risques', 'Audit de contrats assurances,\ncourtier en assurances ', 'https://aca-pl.com/', NULL, 0, 0, '47.528329', '-0.599373', 176),
(11138, 'SCI DEAUMAT', '0682562481', '3 Rue Pierre et Marie Curie, Saint-Léger-de-Linièr', 'Location de bureaux', 'Bureaux avec parking privé et climatisation, \r\nsurfaces disponibles de 13 m² a 73 m².\r\nPossibilité de domiciliation', NULL, NULL, 0, 0, '47.463510', '-0.664116', 176),
(11172, 'Crêperie Les blés d’or', '0981799804', '78 Avenue Albert de Mun, Saint-Nazaire, France', 'Crêperie\r\n\r\nMardi : 11:45 – 14:45\r\nMercredi : 11:45 – 14:45\r\nJeudi : 11:45 – 14:45 + 18:45 – 21:30\r\n', 'Toutes nos galettes sont élaborées à partir d’une farine BIO, de blé Français, les garnitures sont cuisinées par le chef à partir de produits frais du marché. Nous sollicitons le plus possible, des fournisseurs locaux, pour nos préparations, pommes de Donges, les légumes de La Turballe, le Cidre de Plessée, les moules de Penestin… Venez déguster les spécialités régionales, la l’angouille, le curé Nantais, et notre spécialité le KIG HA FARZ, le premier vendredi et samedi du mois. Un pot au feu Breton cuisiné avec soin par notre chef Thierry.\r\nMagit mat ho korf, hoc’h ene a chomo pelloc’h e-barzh.”\r\n“Nourris bien ton corps, ton âme y restera plus longtemps.” (proverbe Breton) ', NULL, NULL, 0, 0, '47.278950', '-2.213679', 182),
(11187, 'Asp événements', '0612668174', '49170 Saint-Martin-du-Fouilloux, France', 'Sécurité des biens et des personnes\n\n9h/12h\n14h/18h ', 'Asp événements vous accompagne lors de vos événements et sécurise vos biens et le public, gardiennage, sécurité incendie, conseil\n\n', 'https://www.asp-evenements.fr/', NULL, 0, 0, '47.431388', '-0.727806', 176),
(11231, 'Magraph', '0768596026', '11 Rue du Chemin de Fer,18370 Châteaumeillant, Fra', 'Réalisation audiovisuelle\r\n\r\n09H – 18H du lundi au vendredi\r\n10H – 17H le samedi ', 'Toujours en recherche de clarté pour transmettre un message je propose tout le panel d’outils techniques pour réaliser la vidéo nécessaire à votre communication.\r\n\r\nDe l’écriture du scénario jusqu’au générique je prends en main toutes les étapes de création et vous guide dans les choix les mieux adaptés pour atteindre votre objectif.', 'https://www.magraphist.com/', 'https://www.facebook.com/mag.magraph,https://www.linkedin.com/company/magraph/,https://www.instagram.com/magali_ledissez/', 1, 0, '46.561258', '2.202832', 180),
(11234, 'NowProds', '0611727438', '27340 Criquebeuf-sur-Seine, France', 'Production vidéo\r\n\r\nTous les jours \r\n\r\n\r\n', 'NowProds est un société de production vidéo qui accompagne ses clients dans leurs stratégies audiovisuelle, digital, commerciale, marketing, communications B2B et B2C, RH et formations.', 'https://www.nowprods.fr/', 'https://www.linkedin.com/in/christophepetitprez/', 1, 0, '49.305294', '1.096674', 207),
(11241, 'PARIGRAFIC Imprimerie Éditions', '0672385624', '53 Rue des Vinaigriers, 75000 Paris, France', 'Imprimerie tous travaux - Éditions livres\r\n\r\nSur RDV du lundi au jeudi de 9h à 15h ', 'Artisan imprimeur , pour des impressions traditionnelles  en Offset, Typo, Dorure, Gaufrage, Découpe. Des impressions modernes en  numériques de toutes les innovations récentes quadri, vernis sélectifs et 3D, pelliculage pour vos cartes, flyers, dépliants, plaquettes, brochures, affiches, étiquettes, signalétique, PLV et Roll Up. Mais aussi de l’édition d’ouvrage à compte d’auteur ainsi que tous nos conseils prodigués avec l’ attention d’un artisan à votre écoute.', NULL, NULL, 0, 0, '48.873162', '2.359896', 184),
(11389, 'Elodie PONT', '  06332568', '45 Mnt Saint-Clément, 73790 Tours-en-Savoie, Franc', 'Immobilier vente conseil, design écologique du batiment', 'Conseillère en immobilier sur le secteur d’Albertville, je vous accompagne dans tous vos projets !\r\nSpécialisation en cours en design écologique du bâtiment pour optimiser votre rénovation, \r\nTrouver de la résilience, réduire vos charges,\r\nAcquérir un habitat léger.', NULL, 'https://www.facebook.com/profile.php?id=100086618374464', 0, 0, '45.655207', '6.442577', 208),
(11411, 'EPITOME CONSEIL', '0607562999', '12 Pl. Danton, 95600 Eaubonne, France', 'Conseil , Organisation/Management/Prévention/QVTC/Formation et coaching/Qualiopi', 'Cabinet créé il y a 15 pour améliorer l’efficacité opérationnelle et relationnelle dans les entreprises privées et publiques et les CSE\r\n\r\nAméliorations des pratiques : Spécialisé sur les RPS et la mise en place de la QVTC\r\n\r\nIntervient dans toute la France et dans les DOM-TOM', 'https://epitome-conseil.com/', 'https://https/linkedin/Evelyne%20Guffens', NULL, NULL, '48.983932', '2.274684', 187),
(11610, 'Lionel Brot', '0637437927', '112 Rue Rambuteau, 75001 Paris, France', 'artisan électricien', NULL, 'https://www.linkedin.com/in/brot-lionel-16780b1bb', 'https://www.linkedin.com/in/brot-lionel-16780b1bb', 1, 0, '48.862606', '2.347688', 184),
(11624, 'Magileads', '0189322180', '40 Rue de Plaisance, 75014 Paris, France', 'Solution de prospection commerciale\r\n\r\n9h-18h', 'Prospectez, fidélisez et transformez de nouveaux clients grâce à une stratégie digitale simple et globale.\r\n\r\nSolution de prospection automatisée qui inclut un onboarding personnalisé et un chef de projet dédié.', 'https://www.magileads.eu/', 'https://fr.linkedin.com/company/magi-leads?original_referer=https%3A%2F%2Fautourdemoi.colentre.com%2F', 0, 0, '48.833244', '2.318578', 184),
(11632, 'BIMConseil', '0662707502', '28 Rue de Gramont, 75002 Paris, France', 'Architecture - Formation modélisation 3D. Logiciels Revit AutoCAD Méthode B.I.M.-Création des protot', '\r\nArchitecte DPLG, spécialisé dans les nouvelles technologies appliquées à mon métier. Ex professeur d’Universités, 30 années consacrées à l’architecture et à la formation continue pour les architectes. Honoré par Autodesk avec le prix de l’excellence française 2021.', 'https://bimconseil.com/', 'https://www.linkedin.com/in/terifeugeas/', 1, 0, '48.870969', '2.337032', 184),
(11649, 'DJINN', '0620835815', '12 avenue Maurice Thorez, Groupe Abcare, 94200 Ivr', 'Coaching vocal, Chant', 'Découvrir le potentiel de sa voix, développer sa créativité, favoriser la spontanéité.\r\nSe ressourcer en travaillant le souffle, la vibration, le son.\r\nMettre le corps en vibration pour une meilleure émission vocale.\r\nGagner en confort autant avec sa voix parlée que sa voix chantée.\r\nDévelopper son écoute.\r\nAffirmer sa singularité vocale pour soi ou au sein d’un groupe.', 'https://valealpaga8.wixsite.com/de-vive-voix---val-a', NULL, 0, 0, '48.818744', '2.373776', 186),
(11651, 'Flot vital IDC', '065988234', '1 Pl. des Roses, 94400 Vitry-sur-Seine, France', 'Praticienne en irrigation du colon , hygiene preventive et bien être\r\n\r\ndu lundi au vendredi 10h30 f', 'Infirmière de formation, j’ai effectué la formation en irrigation / Hydrothérapie du colon il y a quelques mois .\r\n\r\nC’est un soin d’hygiène préventive, consistant à faire passer de l’eau purifiée à différentes températures (entre 35 et 40 degrés) et différents débits ( toujours très doux, pas de karcher) dans le colon afin d’éliminer les toxines accumulées. A l’aide d’une machine j’effectue des “bains” du colons , accompagnés de massages de l’abdomen facilitant le passage de l’eau en stimulant le système parasympathique et aidant à l’évacuation en détendant les plexus de cette région . \r\n\r\nLa séance du 1h30 à 2h et l’iirigation en elle même 45 minutes.', NULL, NULL, 1, 0, '48.801456', '2.371244', 186),
(11673, 'PUMP’SKIN', '  06250228', '32 Rue de Caumartin, 75009 Paris, France', 'Vente de produits cosmétiques Bio à base de potimarron, soins certifés Ecocert.\r\n\r\nMardi, Jeudi et S', 'Le Dr. Eraud a créé et signé sa collection de cosmétiques authentiques, bienveillants, conscients des enjeux de l’environnement et 100% certifiés bio aux ingrédients garantis origine France.', 'https://www.pumpskin.fr/', 'https://www.facebook.com/PumpSkinDrERAUD, https://www.instagram.com/pumpskin_skincare/?igshid=YmMyMTA2M2Y%3D', 0, 1, '48.872559', '2.328330', 184),
(11688, 'Coifr bio végétal', '0148787856', '71 Rue Marguerite de Rochechouart, 75009 Paris, Fr', 'Un salon de coiffure dédié aux couleurs végétales .Tous les produits utilisées au sein du salon sont', 'Coifr bio végétal est un petit salon de coiffure qui garde l’empreinte forte d’un salon traditionnel, excepté le fait qu’il se soit dégagé de la main mise exercé par des franchises ou fournisseurs chronophages .\r\n\r\nSon but ultime et j’en suis l’investigatrice est de rendre les cheveux beaux ,soyeux et plein de force en appliquant des produits végétaux et de bonnes qualité.', 'https://coifr.typepad.fr/', 'https://www.facebook.com/profile.php?id=100039815302627', 1, 0, '48.881208', '2.346383', 184),
(11710, 'Lucilecoach', '0663337571', '42 Rue Dulong, 75017 Paris, France', 'coaching de vie, coaching développement personnel', 'J’accompagne en période de transition\r\nEclaircissement de situation\r\nConfiance en soi\r\nProjet personnel \r\nProjet professionnel ', 'https://lucilecoach.fr/', 'https://www.facebook.com/lucile.poitoucoach, ,https://www.linkedin.com/in/lucile-poitou,\r\nhttps://www.instagram.com/lucile_coach/?igshid=ZDdkNTZiNTM%3D', 0, 0, '48.884897', '2.316745', 184),
(11750, 'Steph’Fabrik', NULL, '12 Rue des Rabières, 49140 Seiches-sur-le-Loir, Fr', 'Créations d\'objets, gravure personnalisée', 'Créations d’objets personnalisés pour évènements, cadeaux et publicités.\r\nGravure pour objets public', 'https://www.stephfabrik.fr/', 'https://www.facebook.com/StephFabrik/, https://www.instagram.com/stephfabrik/', 0, 1, '47.577279', '-0.357548', 176),
(11758, 'Marnie coach de vie en ligne', '0652439948', '15 Rue Moreau de Jonnes, 35000 Rennes, France', 'Coach personnel', '\r\nUn coaching avec Marnie Duarte est une expérience de vie. Avec compassion, elle vous permet de prendre conscience de vos éventuels blocages et profiter pleinement de vos ressources et talents, pour oser vous lancer. Sa devise : « Il n’est jamais trop tard pour changer ! » ', 'https://marnie.coach/', NULL, 1, 0, '48.108162', '-1.654353', 178),
(11760, 'LABORATOIRE AIMEE', '0784084657', '883 Rte de Breuzy, 45700 Montcresson, France', 'Aromaparfumerie\r\n\r\nlundi au vendredi 10h à 12h et 14h à 17h', 'Des parfums et des soins vibrants, plus naturels, plus bio, vegan et plus respectueux de la Terre et des Humains qui révèlent notre personnalité avec autant de plaisir et de tenue que les produits synthétiques.', 'https://www.aimeedemars.com/', 'https://www.facebook.com/aimeedemarsparfums/?locale=fr_FR, https://www.instagram.com/aimee_de_mars/?hl=fr, ', 0, 1, '47.914420', '2.816141', 211),
(11777, 'déployer son ÊTRE', '0698138294', '1 Rue Pierre Demours, 75017 Paris, France', 'Therapeute psychogénéalogie\r\n\r\nmardi au jeudi de 9h à 20h', 'Je vous accompagne pour vous reconnecter à votre puissance intérieure, la laisser rayonner et déployer votre ÊTRE. Une source de joie infinie pour soi, les autres et le monde.\r\n\r\nLes outils proposés sont la psychogénéalogie, le ressenti corporel et la créativité. ', 'https://www.deployersonetre.com/', NULL, 1, 0, '10.000000', '2.291251', 184),
(11793, 'Guayapi', '0143465243', '55 Rue Traversière, 75012 Paris, France', 'Nous sommes une entreprise spécialisée dans la vente de compléments alimentaires, de cosmétiques bio', ' Guayapi a pour objectif de valoriser des plantes de cueillette sauvage d’Amazonie et du Sri Lanka qui respectent 3 critères fondamentaux : le biologique, le social (commerce équitable) et l’environnement (la biodiversité). Guayapi est un bâtisseur de filières nobles et éthiques de plantes issues de leurs Terres d’Origine. ', 'https://www.guayapi.com/', 'https://www.facebook.com/Guayapi, https://www.linkedin.com/company/guayapiparis, https://www.instagram.com/guayapi/, https://twitter.com/Guayapi', 1, 1, '48.848469', '2.374086', 184),
(11806, 'HOLONAGE', '0666824490', '2 Rue de la Châtaigneraie, 92310 Sèvres, France', 'Mélanges d\'huiles végétales riches en oméga-3\r\n\r\n9H à 19H du lundi au vendredi ', 'Nous avons conçu et faisons fabriquer en France 3 mélanges d’huiles bio, 1ère pression.', 'https://www.holonage.com/', 'https://www.linkedin.com/in/marion-lelong-70843475/', 1, 1, '48.818101', '2.206615', 185),
(11810, 'Design Ta Com', '0663026447', '27 Rue Louis Leroy, 49100 Angers, France', 'Webmaster (création sites internet) & Graphiste\r\n\r\nDu lundi au vendredi de 9h00 à 18h00', 'Atelier digital sur Angers, je conçois des sites internet sur WordPress et des visuels de communication (logo, identité visuelle, carte de visite…)', 'https://design-ta-com.fr/', 'https://www.facebook.com/DesignTaCom, https://www.instagram.com/design_ta_com/,\r\nhttps://www.linkedin.com/in/alexandra-genest/', 1, 0, '47.473180', '-0.534474', 176),
(11813, 'Les mots se réveillent', '0643699790', '354 Kerignan, 29380 Bannalec, France', 'Formation humour positif pour les salariés\r\n\r\n9h à 18h ', 'Centre de formation agréé, nous proposons des formations pour les entreprises et leurs salariés, les travailleurs indépendants, les collectivités locales… basées sur l’optimisme et l’humour positif. \r\n\r\nLes objectifs sont de permettre aux participants de ces formations de travailler sur leurs stress, la cohésion d’équipe, la communication… ', 'https://www.humour-au-travail.fr/', 'https://www.linkedin.com/in/christophe-tricart-501b7855/', 1, 0, '47.951529', '-3.705877', 177),
(11835, 'LOIC PIERROIS PHOTOGRAPHIE', '', '7 Rue de Candé, 49370 Bécon-les-Granits, France', 'Photographie\r\n\r\nDu Mardi au vendredi de 10 h 00 à 19 h 00\r\nLe Samedi de 10 h 00 à 14 h 00 ', 'Photographe spécialisée, dans la mise en scène et le portrait, je réalise vos images de la direction artistique à la réalisation de votre projet', 'https://loicpierrois.fr/', 'https://www.facebook.com/LoicPierroisphotographe, https://www.instagram.https://www.linkedin.com/in/loicpierroispro/com/loicpierrois.photographe/,', 1, 0, '47.503469', '-0.801850', 176);

-- --------------------------------------------------------

--
-- Structure de la table `lnk`
--

DROP TABLE IF EXISTS `lnk`;
CREATE TABLE IF NOT EXISTS `lnk` (
  `id_secteur` int NOT NULL,
  `id_entreprise` int NOT NULL,
  PRIMARY KEY (`id_secteur`,`id_entreprise`),
  KEY `lnk_ibfk_2` (`id_entreprise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `lnk`
--

INSERT INTO `lnk` (`id_secteur`, `id_entreprise`) VALUES
(115, 5343),
(110, 10863),
(109, 11016),
(196, 11017),
(110, 11021),
(195, 11022),
(119, 11138),
(116, 11172),
(203, 11187),
(205, 11187),
(115, 11231),
(115, 11234),
(115, 11241),
(206, 11241),
(199, 11389),
(211, 11411),
(206, 11610),
(110, 11624),
(119, 11632),
(115, 11649),
(109, 11651),
(102, 11673),
(201, 11688),
(109, 11710),
(211, 11710),
(115, 11750),
(206, 11750),
(109, 11758),
(102, 11760),
(109, 11777),
(81, 11793),
(109, 11793),
(213, 11806),
(115, 11810),
(115, 11813),
(115, 11835);

-- --------------------------------------------------------

--
-- Structure de la table `secteur`
--

DROP TABLE IF EXISTS `secteur`;
CREATE TABLE IF NOT EXISTS `secteur` (
  `id_secteur` int NOT NULL,
  `nom_secteur` varchar(50) NOT NULL,
  `slug_secteur` varchar(50) NOT NULL,
  `code_type_activite` int NOT NULL,
  PRIMARY KEY (`id_secteur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `secteur`
--

INSERT INTO `secteur` (`id_secteur`, `nom_secteur`, `slug_secteur`, `code_type_activite`) VALUES
(9, 'Géomètre expert', 'geometre-expert', 4),
(10, 'Ingénierie VRD', 'ingenierie-vrd', 4),
(11, 'Immobilier', 'immobilier', 4),
(12, 'Expertise foncière', 'expertise-fonciere', 4),
(37, 'Tabac', 'tabac', 1),
(40, 'Produits bio et écoproduits', 'produits-bio-et-ecoproduits', 2),
(41, 'Presse / librairie', 'presse-librairie', 2),
(42, 'Plats à emporter / restaurant', 'Plats-a-emporter-restaurant', 2),
(43, 'Matériel médicale', 'materiel-medicale', 2),
(71, 'Vins et spiritueux', 'vins-caviste', 2),
(73, 'Superette', 'superette', 2),
(76, 'Presse / librairie', 'presse-librairie', 2),
(79, 'Fromager', 'fromager-creme-lait', 2),
(80, 'Fleuristes', 'fleuristes', 2),
(81, 'Épicerie fine', 'epicerie-fine', 2),
(82, 'Boulangerie / pâtisserie / chocolaterie', 'boulangerie-patisserie-chocolaterie', 2),
(83, 'Boucherie / charcuterie / traiteur', 'boucherie-charcuterie-traiteur', 2),
(84, 'Œufs', 'oeufs-fermier-poules', 1),
(85, 'Vin', 'vin-anjou', 1),
(86, 'Viande', 'viande-colis-volaille', 1),
(87, 'Miel/confiture', 'miel-confiture-bonbons', 1),
(88, 'Lait / produits laitiers', 'lait-fromage-chevre-vache', 1),
(89, 'Fruits / légumes', 'fruits-legumes-panier', 1),
(90, 'Fleurs / plantes / plan', 'fleurs-plantes-plans-graines', 1),
(91, 'Champignons', 'Champignons-champignonnieres', 1),
(96, 'Farine', 'farine', 1),
(97, 'Fruits secs / infusion', 'fruits-secs', 1),
(99, 'Fruits et légumes', 'fruits-et-legumes', 2),
(101, 'Bière', 'bierre-liqueur-alcool', 1),
(102, 'Savon / cosmétique', 'savon-cosmetique-artisanal', 1),
(106, 'Couture', 'couture', 1),
(107, 'Mécanique / garage / réparation', 'garage-reparation-auto', 4),
(108, 'Pour les animaux', 'pour-les-animaux', 4),
(109, 'Santé / bien-être', 'soin-a-la-personne', 3),
(110, 'Informatique', 'informatique', 4),
(111, 'Friperie / textile', 'friperie-vetements', 2),
(114, 'Déco / intérieur', 'deco-interieur', 4),
(115, 'Image / communication', 'image-communication', 4),
(116, 'Bars / Restaurants / Hotels', 'bar-restaurant-hotel', 2),
(117, 'Restauration à emporter', 'restauration-rapide', 4),
(118, 'Loisirs / jeux', 'loisirs-jeux', 2),
(119, 'Bâtiment', 'artisan-habitat', 4),
(138, 'Mercerie / couture', 'Mercerie-couture', 2),
(149, 'Terrine', 'terrine', 1),
(157, 'Pâtes fraîches', 'pates-fraiches', 1),
(159, 'Pains', 'pains', 1),
(164, 'Escargots', 'escargots', 1),
(167, 'Poissons', 'poissons', 1),
(174, 'Torréfacteur', 'torrefacteur', 2),
(175, 'Pour les animaux', 'pour-les-animaux', 2),
(195, 'Assurances (Gestion des risques)', 'assurances', 4),
(196, 'Transport et Logistique', 'transports-logistiques', 4),
(199, 'Immobilier', 'immobilier', 3),
(200, 'Services à domicile', 'services-a-domicile', 3),
(201, 'Coiffeurs', 'coiffeurs', 3),
(202, 'Agriculteur', 'agriculteur', 1),
(203, 'Sécurité des biens et des personnes', 'securite-des-biens-et-des-personnes', 4),
(205, 'Sécurité', 'securite', 3),
(206, 'Artisanat', 'artisanat', 1),
(211, 'Conseil', 'conseil', 4),
(213, 'Aliments et compléments alimentaires', 'aliments-et-complements-alimentaires', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD CONSTRAINT `entreprise_ibfk_1` FOREIGN KEY (`id_departement`) REFERENCES `departement` (`id_departement`);

--
-- Contraintes pour la table `lnk`
--
ALTER TABLE `lnk`
  ADD CONSTRAINT `lnk_ibfk_1` FOREIGN KEY (`id_secteur`) REFERENCES `secteur` (`id_secteur`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `lnk_ibfk_2` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id_entreprise`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
