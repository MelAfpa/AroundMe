CREATE TABLE
    IF NOT EXISTS entreprise (
        id_entreprise INTEGER PRIMARY KEY,
        nom_entreprise TEXT,
        telephone_entreprise TEXT,
        adresse_entreprise TEXT,
        infos_entreprise TEXT,
        sous_titre_entreprise TEXT,
        description_entreprise TEXT,
        site_internet_entreprise TEXT,
        reseaux_sociaux_entreprise TEXT,
        monnaie_locale_entreprise BOOLEAN,
        livraison_entreprise BOOLEAN,
        latitude_entreprise INTEGER,
        longitude_entreprise INTEGER,
        id_departement INTEGER,
        lien_image TEXT,
        FOREIGN KEY (id_departement) REFERENCES departement (id_departement)
    );
/*
INSERT or IGNORE INTO entreprise
VALUES (
        5343,
        'Terre de Pixels',
        '0241505916',
        '6 Rue de l’Espoir, 49700 Doué-en-Anjou, France',
        'Agence de communication',
        'Nous avons créé ce site bénévolement au service du développement de la création et l’achat local. Jeune pousse d’Anjou semée en 2011, Terre de Pixels est une agence de communication plurimedia (web et papier) qui fait fleurir votre communication.',
        'https://terredepixels.fr',
        'https://www.facebook.com/terredepixels/,https://www.instagram.com/terredepixels/',
        1,
        0,
        47.193153,
        -0.275333,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        10863,
        'LogoSapience',
        '0241368141',
        '3 Rue Pierre et Marie Curie,49298 Saint-Léger-de-Linière, France',
        'Logiciels informatiques',
        'Créé en 1995 à Angers, LogoSapience est un bureau d’études spécialisé dans les logiciels.Depuis 27 ans LogoSapience propose des prestations d’accompagnement pour permettre aux entreprises d’atteindre leurs objectifs en terme de stratégie numérique. Les solutions logicielles de LogoSapience sont installées dans plus de 3000 établissements en France et à l’étranger. ',
        'https://www.logosapience.fr/',
        'https://www.linkedin.com/company/3533117',
        0,
        0,
        47.463510,
        -0.664117,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11016,
        'Lanvolduphenix',
        '0607966304',
        '64 Rue Eugénie Grandet,37700 Saint-Pierre-des-Corp, France',
        'Naturopathie',
        'Soin par machines fréquentielles : TimeWaver & Spooky, Écoute du corps et soin manuel, Conseil en alimentation hygiénique',
        '',
        'https://www.facebook.com/anneeschenbrennerlanvolduphenix/, https://www.instagram.com/lanvolduphenix/',
        0,
        0,
        47.397730,
        0.755751,
        192
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11017,
        'GTRANDYS',
        '0298412366',
        '20 Rue de l’Eau Blanche,29019 Brest, France',
        'Transport routier de marchandises',
        'Transport routier de marchandise sur la Bretagne, les Pays de la Loire et la région parisienne. ',
        '',
        '',
        0,
        0,
        48.414292,
        -4.460714,
        177
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11021,
        'ITANOVA EasyProf',
        '0631628950',
        '10 Rue de Laborde, Paris, France',
        'Fabricant de logiciels pour la création de cours e-learning',
        'ITANOVA conçoit et développe des logiciels permettant de créer des cours e-learning en toute simplicité et avec une grande efficacité pédagogique.Son logiciel EasyProf se dirige aux entreprises avec des besoins de formation de leur personnel, et au secteur éducatif, au niveau local, national et international.',
        'https://easyprof.com/en/',
        '',
        0,
        1,
        48.875827,
        2.321642,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11022,
        'AUDIT CONSEIL ASSISTANCE ( ACA )',
        '0241097732',
        '22 Rue de Belgique, Montreuil-Juigné, France',
        'Assurances et gestion des risques',
        'Audit de contrats assurances,\ncourtier en assurances ',
        'https://aca-pl.com/',
        '',
        0,
        0,
        47.528329,
        -0.599373,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11138,
        'SCI DEAUMAT',
        '0682562481',
        '3 Rue Pierre et Marie Curie, Saint-Léger-de-Linière, France',
        'Location de bureaux',
        'Bureaux avec parking privé et climatisation,  surfaces disponibles de 13 m² a 73 m². Possibilité de domiciliation',
        '',
        '',
        0,
        0,
        47.463510,
        -0.664116,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11172,
        'Crêperie Les blés d’or',
        '0981799804',
        '78 Avenue Albert de Mun, Saint-Nazaire, France',
        'Crêperie',
        'Toutes nos galettes sont élaborées à partir d’une farine BIO, de blé Français, les garnitures sont cuisinées par le chef à partir de produits frais du marché. Nous sollicitons le plus possible, des fournisseurs locaux, pour nos préparations, pommes de Donges, les légumes de La Turballe, le Cidre de Plessée, les moules de Penestin… Venez déguster les spécialités régionales, la l’angouille, le curé Nantais, et notre spécialité le KIG HA FARZ, le premier vendredi et samedi du mois. Un pot au feu Breton cuisiné avec soin par notre chef Thierry. Magit mat ho korf, hoc’h ene a chomo pelloc’h e-barzh.” “Nourris bien ton corps, ton âme y restera plus longtemps.” (proverbe Breton) ',
        '',
        '',
        0,
        0,
        47.278950,
        -2.213679,
        182
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11187,
        'Asp événements',
        '0612668174',
        '49170 Saint-Martin-du-Fouilloux, France',
        'Sécurité des biens et des personnes  ',
        'Asp événements vous accompagne lors de vos événements et sécurise vos biens et le public, gardiennage, sécurité incendie, conseil ',
        'https://www.asp-evenements.fr/',
        '',
        0,
        0,
        47.431388,
        -0.727806,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11231,
        'Magraph',
        '0768596026',
        '11 Rue du Chemin de Fer,18370 Châteaumeillant, France',
        'Réalisation audiovisuelle ',
        'Toujours en recherche de clarté pour transmettre un message je propose tout le panel d’outils techniques pour réaliser la vidéo nécessaire à votre communication. De l’écriture du scénario jusqu’au générique je prends en main toutes les étapes de création et vous guide dans les choix les mieux adaptés pour atteindre votre objectif.',
        'https://www.magraphist.com/',
        'https://www.facebook.com/mag.magraph,https://www.linkedin.com/company/magraph/,https://www.instagram.com/magali_ledissez/',
        1,
        0,
        46.561258,
        2.202832,
        180
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11234,
        'NowProds',
        '0611727438',
        '27340 Criquebeuf-sur-Seine, France',
        'Production vidéo ',
        'NowProds est un société de production vidéo qui accompagne ses clients dans leurs stratégies audiovisuelle, digital, commerciale, marketing, communications B2B et B2C, RH et formations.',
        'https://www.nowprods.fr/',
        'https://www.linkedin.com/in/christophepetitprez/',
        1,
        0,
        49.305294,
        1.096674,
        207
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11241,
        'PARIGRAFIC Imprimerie Éditions',
        '0672385624',
        '53 Rue des Vinaigriers, 75000 Paris, France',
        'Imprimerie tous travaux - Éditions livres ',
        'Artisan imprimeur , pour des impressions traditionnelles  en Offset, Typo, Dorure, Gaufrage, Découpe. Des impressions modernes en  numériques de toutes les innovations récentes quadri, vernis sélectifs et 3D, pelliculage pour vos cartes, flyers, dépliants, plaquettes, brochures, affiches, étiquettes, signalétique, PLV et Roll Up. Mais aussi de l’édition d’ouvrage à compte d’auteur ainsi que tous nos conseils prodigués avec l’ attention d’un artisan à votre écoute.',
        '',
        '',
        0,
        0,
        48.873162,
        2.359896,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11389,
        'Elodie PONT',
        '  06332568',
        '45 Mnt Saint-Clément, 73790 Tours-en-Savoie, France',
        'Immobilier vente conseil, design écologique du batiment',
        'Conseillère en immobilier sur le secteur d’Albertville, je vous accompagne dans tous vos projets ! Spécialisation en cours en design écologique du bâtiment pour optimiser votre rénovation,  Trouver de la résilience, réduire vos charges, Acquérir un habitat léger.',
        '',
        'https://www.facebook.com/profile.php?id=100086618374464',
        0,
        0,
        45.655207,
        6.442577,
        208
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11411,
        'EPITOME CONSEIL',
        '0607562999',
        '12 Pl. Danton, 95600 Eaubonne, France',
        'Conseil , Organisation/Management/Prévention/QVTC/Formation et coaching/Qualiopi',
        'Cabinet créé il y a 15 pour améliorer l’efficacité opérationnelle et relationnelle dans les entreprises privées et publiques et les CSE Améliorations des pratiques : Spécialisé sur les RPS et la mise en place de la QVTC Intervient dans toute la France et dans les DOM-TOM',
        'https://epitome-conseil.com/',
        'https://https/linkedin/Evelyne%20Guffens',
        '',
        '',
        48.983932,
        2.274684,
        187
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11610,
        'Lionel Brot',
        '0637437927',
        '112 Rue Rambuteau, 75001 Paris, France',
        'artisan électricien',
        '',
        'https://www.linkedin.com/in/brot-lionel-16780b1bb',
        'https://www.linkedin.com/in/brot-lionel-16780b1bb',
        1,
        0,
        48.862606,
        2.347688,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11624,
        'Magileads',
        '0189322180',
        '40 Rue de Plaisance, 75014 Paris, France',
        'Solution de prospection commerciale ',
        'Prospectez, fidélisez et transformez de nouveaux clients grâce à une stratégie digitale simple et globale. Solution de prospection automatisée qui inclut un onboarding personnalisé et un chef de projet dédié.',
        'https://www.magileads.eu/',
        'https://fr.linkedin.com/company/magi-leads?original_referer=https%3A%2F%2Fautourdemoi.colentre.com%2F',
        0,
        0,
        48.833244,
        2.318578,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11632,
        'BIMConseil',
        '0662707502',
        '28 Rue de Gramont, 75002 Paris, France',
        'Architecture - Formation modélisation 3D. Logiciels Revit AutoCAD Méthode B.I.M.',
        ' Architecte DPLG, spécialisé dans les nouvelles technologies appliquées à mon métier. Ex professeur d’Universités, 30 années consacrées à l’architecture et à la formation continue pour les architectes. Honoré par Autodesk avec le prix de l’excellence française 2021.',
        'https://bimconseil.com/',
        'https://www.linkedin.com/in/terifeugeas/',
        1,
        0,
        48.870969,
        2.337032,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11649,
        'DJINN',
        '0620835815',
        '12 avenue Maurice Thorez, Groupe Abcare, 94200 Ivry-sur-Seine, France',
        'Coaching vocal, Chant',
        'Découvrir le potentiel de sa voix, développer sa créativité, favoriser la spontanéité. Se ressourcer en travaillant le souffle, la vibration, le son. Mettre le corps en vibration pour une meilleure émission vocale. Gagner en confort autant avec sa voix parlée que sa voix chantée. Développer son écoute. Affirmer sa singularité vocale pour soi ou au sein d’un groupe.',
        'https://valealpaga8.wixsite.com/de-vive-voix---val-a',
        '',
        0,
        0,
        48.818744,
        2.373776,
        186
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11651,
        'Flot vital IDC',
        '065988234',
        '1 Pl. des Roses, 94400 Vitry-sur-Seine, France',
        'Praticienne en irrigation du colon , hygiene preventive et bien être ',
        'Infirmière de formation, j’ai effectué la formation en irrigation / Hydrothérapie du colon il y a quelques mois . C’est un soin d’hygiène préventive, consistant à faire passer de l’eau purifiée à différentes températures (entre 35 et 40 degrés) et différents débits ( toujours très doux, pas de karcher) dans le colon afin d’éliminer les toxines accumulées. A l’aide d’une machine j’effectue des “bains” du colons , accompagnés de massages de l’abdomen facilitant le passage de l’eau en stimulant le système parasympathique et aidant à l’évacuation en détendant les plexus de cette région .  La séance du 1h30 à 2h et l’iirigation en elle même 45 minutes.',
        '',
        '',
        1,
        0,
        48.801456,
        2.371244,
        186
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11673,
        'PUMP’SKIN',
        '  06250228',
        '32 Rue de Caumartin, 75009 Paris, France',
        'Vente de produits cosmétiques Bio à base de potimarron, soins certifiées Ecocert. ',
        'Le Dr. Eraud a créé et signé sa collection de cosmétiques authentiques, bienveillants, conscients des enjeux de l’environnement et 100% certifiés bio aux ingrédients garantis origine France.',
        'https://www.pumpskin.fr/',
        'https://www.facebook.com/PumpSkinDrERAUD, https://www.instagram.com/pumpskin_skincare/?igshid=YmMyMTA2M2Y%3D',
        0,
        1,
        48.872559,
        2.328330,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11688,
        'Coifr bio végétal',
        '0148787856',
        '71 Rue Marguerite de Rochechouart, 75009 Paris, France',
        'Un salon de coiffure dédié aux couleurs végétales ',
        'Coifr bio végétal est un petit salon de coiffure qui garde l’empreinte forte d’un salon traditionnel, excepté le fait qu’il se soit dégagé de la main mise exercé par des franchises ou fournisseurs chronophages . Son but ultime et j’en suis l’investigatrice est de rendre les cheveux beaux ,soyeux et plein de force en appliquant des produits végétaux et de bonnes qualité.',
        'https://coifr.typepad.fr/',
        'https://www.facebook.com/profile.php?id=100039815302627',
        1,
        0,
        48.881208,
        2.346383,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11710,
        'Lucilecoach',
        '0663337571',
        '42 Rue Dulong, 75017 Paris, France',
        'coaching de vie, coaching développement personnel',
        'J’accompagne en période de transition Eclaircissement de situation Confiance en soi Projet personnel  Projet professionnel ',
        'https://lucilecoach.fr/',
        'https://www.facebook.com/lucile.poitoucoach, ,https://www.linkedin.com/in/lucile-poitou, https://www.instagram.com/lucile_coach/?igshid=ZDdkNTZiNTM%3D',
        0,
        0,
        48.884897,
        2.316745,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11750,
        'Steph’Fabrik',
        '',
        '12 Rue des Rabières, 49140 Seiches-sur-le-Loir, France',
        'Créations d’objets, gravure personnalisée',
        'Créations d’objets personnalisés pour évènements, cadeaux et publicités. Gravure pour objets public',
        'https://www.stephfabrik.fr/',
        'https://www.facebook.com/StephFabrik/, https://www.instagram.com/stephfabrik/',
        0,
        1,
        47.577279,
        -0.357548,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11758,
        'Marnie coach de vie en ligne',
        '0652439948',
        '15 Rue Moreau de Jonnes, 35000 Rennes, France',
        'Coach personnel',
        ' Un coaching avec Marnie Duarte est une expérience de vie. Avec compassion, elle vous permet de prendre conscience de vos éventuels blocages et profiter pleinement de vos ressources et talents, pour oser vous lancer. Sa devise : « Il n’est jamais trop tard pour changer ! » ',
        'https://marnie.coach/',
        '',
        1,
        0,
        48.108162,
        -1.654353,
        178
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11760,
        'LABORATOIRE AIMEE',
        '0784084657',
        '883 Rte de Breuzy, 45700 Montcresson, France',
        'Aromaparfumerie ',
        'Des parfums et des soins vibrants, plus naturels, plus bio, vegan et plus respectueux de la Terre et des Humains qui révèlent notre personnalité avec autant de plaisir et de tenue que les produits synthétiques.',
        'https://www.aimeedemars.com/',
        'https://www.facebook.com/aimeedemarsparfums/?locale=fr_FR, https://www.instagram.com/aimee_de_mars/?hl=fr, ',
        0,
        1,
        47.914420,
        2.816141,
        211
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11777,
        'déployer son ÊTRE',
        '0698138294',
        '1 Rue Pierre Demours, 75017 Paris, France',
        'Therapeute psychogénéalogie ',
        'Je vous accompagne pour vous reconnecter à votre puissance intérieure, la laisser rayonner et déployer votre ÊTRE. Une source de joie infinie pour soi, les autres et le monde. Les outils proposés sont la psychogénéalogie, le ressenti corporel et la créativité. ',
        'https://www.deployersonetre.com/',
        '',
        1,
        0,
        48.879759,
        2.291250,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11793,
        'Guayapi',
        '0143465243',
        '55 Rue Traversière, 75012 Paris, France',
        'Vente de compléments alimentaires et de cosmétiques bio',
        ' Guayapi a pour objectif de valoriser des plantes de cueillette sauvage d’Amazonie et du Sri Lanka qui respectent 3 critères fondamentaux : le biologique, le social (commerce équitable) et l’environnement (la biodiversité). Guayapi est un bâtisseur de filières nobles et éthiques de plantes issues de leurs Terres d’Origine. ',
        'https://www.guayapi.com/',
        'https://www.facebook.com/Guayapi, https://www.linkedin.com/company/guayapiparis, https://www.instagram.com/guayapi/, https://twitter.com/Guayapi',
        1,
        1,
        48.848469,
        2.374086,
        184
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11806,
        'HOLONAGE',
        '0666824490',
        '2 Rue de la Châtaigneraie, 92310 Sèvres, France',
        'Mélanges d’huiles végétales riches en oméga-3 ',
        'Nous avons conçu et faisons fabriquer en France 3 mélanges d’huiles bio, 1ère pression.',
        'https://www.holonage.com/',
        'https://www.linkedin.com/in/marion-lelong-70843475/',
        1,
        1,
        48.818101,
        2.206615,
        185
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11810,
        'Design Ta Com',
        '0663026447',
        '27 Rue Louis Leroy, 49100 Angers, France',
        'Webmaster (création sites internet) & Graphiste ',
        'Atelier digital sur Angers, je conçois des sites internet sur WordPress et des visuels de communication (logo, identité visuelle, carte de visite…)',
        'https://design-ta-com.fr/',
        'https://www.facebook.com/DesignTaCom, https://www.instagram.com/design_ta_com/, https://www.linkedin.com/in/alexandra-genest/',
        1,
        0,
        47.473180,
        -0.534474,
        176
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11813,
        'Les mots se réveillent',
        '0643699790',
        '354 Kerignan, 29380 Bannalec, France',
        'Formation humour positif pour les salariés ',
        'Centre de formation agréé, nous proposons des formations pour les entreprises et leurs salariés, les travailleurs indépendants, les collectivités locales… basées sur l’optimisme et l’humour positif.  Les objectifs sont de permettre aux participants de ces formations de travailler sur leurs stress, la cohésion d’équipe, la communication… ',
        'https://www.humour-au-travail.fr/',
        'https://www.linkedin.com/in/christophe-tricart-501b7855/',
        1,
        0,
        47.951529,
        -3.705877,
        177
    );

INSERT or IGNORE INTO entreprise
VALUES (
        11835,
        'LOIC PIERROIS PHOTOGRAPHIE',
        '',
        '7 Rue de Candé, 49370 Bécon-les-Granits, France',
        'Photographie ',
        'Photographe spécialisée, dans la mise en scène et le portrait, je réalise vos images de la direction artistique à la réalisation de votre projet',
        'https://loicpierrois.fr/',
        'https://www.facebook.com/LoicPierroisphotographe, https://www.instagram.https://www.linkedin.com/in/loicpierroispro/com/loicpierrois.photographe/,',
        1,
        0,
        47.503469,
        -0.801850,
        176
    );
*/
CREATE TABLE
    IF NOT EXISTS secteur (
        id_secteur INTEGER PRIMARY KEY,
        nom_secteur TEXT,
        slug_secteur TEXT,
        code_type_activite INTEGER
    );

INSERT or IGNORE INTO secteur
VALUES (
        9,
        'Géomètre expert',
        'geometre-expert',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        10,
        'Ingénierie VRD',
        'ingenierie-vrd',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        11,
        'Immobilier',
        'immobilier',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        12,
        'Expertise foncière',
        'expertise-fonciere',
        4
    );

INSERT or IGNORE INTO secteur VALUES (37, 'Tabac', 'tabac', 1);

INSERT or IGNORE INTO secteur
VALUES (
        40,
        'Produits bio et écoproduits',
        'produits-bio-et-ecoproduits',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        41,
        'Presse / librairie',
        'presse-librairie',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        42,
        'Plats à emporter / restaurant',
        'Plats-a-emporter-restaurant',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        43,
        'Matériel médicale',
        'materiel-medicale',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        71,
        'Vins et spiritueux',
        'vins-caviste',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (73, 'Superette', 'superette', 2);

INSERT or IGNORE INTO secteur
VALUES (
        76,
        'Presse / librairie',
        'presse-librairie',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        79,
        'Fromager',
        'fromager-creme-lait',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        80,
        'Fleuristes',
        'fleuristes',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        81,
        'Épicerie fine',
        'epicerie-fine',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        82,
        'Boulangerie / pâtisserie / chocolaterie',
        'boulangerie-patisserie-chocolaterie',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        83,
        'Boucherie / charcuterie / traiteur',
        'boucherie-charcuterie-traiteur',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        84,
        'Œufs',
        'oeufs-fermier-poules',
        1
    );

INSERT or IGNORE INTO secteur VALUES (85, 'Vin', 'vin-anjou', 1);

INSERT or IGNORE INTO secteur
VALUES (
        86,
        'Viande',
        'viande-colis-volaille',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        87,
        'Miel/confiture',
        'miel-confiture-bonbons',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        88,
        'Lait / produits laitiers',
        'lait-fromage-chevre-vache',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        89,
        'Fruits / légumes',
        'fruits-legumes-panier',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        90,
        'Fleurs / plantes / plan',
        'fleurs-plantes-plans-graines',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        91,
        'Champignons',
        'Champignons-champignonnieres',
        1
    );

INSERT or IGNORE INTO secteur VALUES (96, 'Farine', 'farine', 1);

INSERT or IGNORE INTO secteur
VALUES (
        97,
        'Fruits secs / infusion',
        'fruits-secs',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        99,
        'Fruits et légumes',
        'fruits-et-legumes',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        101,
        'Bière',
        'bierre-liqueur-alcool',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        102,
        'Savon / cosmétique',
        'savon-cosmetique-artisanal',
        1
    );

INSERT or IGNORE INTO secteur VALUES (106, 'Couture', 'couture', 1);

INSERT or IGNORE INTO secteur
VALUES (
        107,
        'Mécanique / garage / réparation',
        'garage-reparation-auto',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        108,
        'Pour les animaux',
        'pour-les-animaux',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        109,
        'Santé / bien-être',
        'soin-a-la-personne',
        3
    );

INSERT or IGNORE INTO secteur
VALUES (
        110,
        'Informatique',
        'informatique',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        111,
        'Friperie / textile',
        'friperie-vetements',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        114,
        'Déco / intérieur',
        'deco-interieur',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        115,
        'Image / communication',
        'image-communication',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        116,
        'Bars / Restaurants / Hotels',
        'bar-restaurant-hotel',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        117,
        'Restauration à emporter',
        'restauration-rapide',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        118,
        'Loisirs / jeux',
        'loisirs-jeux',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        119,
        'Bâtiment',
        'artisan-habitat',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        138,
        'Mercerie / couture',
        'Mercerie-couture',
        2
    );

INSERT or IGNORE INTO secteur VALUES (149, 'Terrine', 'terrine', 1);

INSERT or IGNORE INTO secteur
VALUES (
        157,
        'Pâtes fraîches',
        'pates-fraiches',
        1
    );

INSERT or IGNORE INTO secteur VALUES (159, 'Pains', 'pains', 1);

INSERT or IGNORE INTO secteur
VALUES (
        164,
        'Escargots',
        'escargots',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (167, 'Poissons', 'poissons', 1);

INSERT or IGNORE INTO secteur
VALUES (
        174,
        'Torréfacteur',
        'torrefacteur',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        175,
        'Pour les animaux',
        'pour-les-animaux',
        2
    );

INSERT or IGNORE INTO secteur
VALUES (
        195,
        'Assurances (Gestion des risques)',
        'assurances',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        196,
        'Transport et Logistique',
        'transports-logistiques',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (
        199,
        'Immobilier',
        'immobilier',
        3
    );

INSERT or IGNORE INTO secteur
VALUES (
        200,
        'Services à domicile',
        'services-a-domicile',
        3
    );

INSERT or IGNORE INTO secteur
VALUES (
        201,
        'Coiffeurs',
        'coiffeurs',
        3
    );

INSERT or IGNORE INTO secteur
VALUES (
        202,
        'Agriculteur',
        'agriculteur',
        1
    );

INSERT or IGNORE INTO secteur
VALUES (
        203,
        'Sécurité des biens et des personnes',
        'securite-des-biens-et-des-personnes',
        4
    );

INSERT or IGNORE INTO secteur
VALUES (205, 'Sécurité', 'securite', 3);

INSERT or IGNORE INTO secteur
VALUES (
        206,
        'Artisanat',
        'artisanat',
        1
    );

INSERT or IGNORE INTO secteur VALUES (211, 'Conseil', 'conseil', 4);

INSERT or IGNORE INTO secteur
VALUES (
        213,
        'Aliments et compléments alimentaires',
        'aliments-et-complements-alimentaires',
        1
    );

CREATE TABLE
    IF NOT EXISTS departement (
        id_departement INTEGER PRIMARY KEY,
        nom_departement TEXT,
        numero_departement INTEGER,
        slug_departement TEXT
    );

INSERT or IGNORE INTO departement
VALUES (
        176,
        'Maine-et-Loire',
        49,
        'maine-et-loire'
    );

INSERT or IGNORE INTO departement
VALUES (
        177,
        'Finistère',
        29,
        'finistere'
    );

INSERT or IGNORE INTO departement
VALUES (
        178,
        'Îlle-et-Vilaine',
        35,
        'ille-et-vilaine'
    );

INSERT or IGNORE INTO departement
VALUES (179, 'Morbihan', 56, 'morbihan');

INSERT or IGNORE INTO departement VALUES (180, 'Cher', 18, 'cher');

INSERT or IGNORE INTO departement VALUES (181, 'Doubs', 25, 'doubs');

INSERT or IGNORE INTO departement
VALUES (
        182,
        'Loire-Atlantique',
        44,
        'loire-atlantique'
    );

INSERT or IGNORE INTO departement
VALUES (
        183,
        'Côtes-d’Armor',
        22,
        'cote-darmor'
    );

INSERT or IGNORE INTO departement VALUES (184, 'Paris', 75, 'paris');

INSERT or IGNORE INTO departement
VALUES (
        185,
        'Hauts-de-Seine',
        92,
        'hauts-de-seine'
    );

INSERT or IGNORE INTO departement
VALUES (
        186,
        'Val-de-Marne',
        94,
        'val-de-marne'
    );

INSERT or IGNORE INTO departement
VALUES (
        187,
        'Val-d’Oise',
        95,
        'val-doise'
    );

INSERT or IGNORE INTO departement VALUES (188, 'Yonne', 89, 'yonne');

INSERT or IGNORE INTO departement VALUES (189, 'Rhône', 69, 'rhone');

INSERT or IGNORE INTO departement
VALUES (
        190,
        'Pyrénées-Orientales',
        66,
        'pyrenees-orientales'
    );

INSERT or IGNORE INTO departement VALUES (191, 'Lot', 46, 'lot');

INSERT or IGNORE INTO departement
VALUES (
        192,
        'Indre-et-Loire',
        37,
        'indre-et-loire'
    );

INSERT or IGNORE INTO departement
VALUES (193, 'Vendée', 85, 'vendee');

INSERT or IGNORE INTO departement
VALUES (
        204,
        'Seine-Saint-Denis',
        93,
        'seine-saint-denis'
    );

INSERT or IGNORE INTO departement
VALUES (
        207,
        'Eure-en-Normandie',
        27,
        'eure-en-normadie'
    );

INSERT or IGNORE INTO departement
VALUES (208, 'Savoie', 73, 'savoie');

INSERT or IGNORE INTO departement
VALUES (
        209,
        'Seine-et-Marne',
        77,
        'seine-et-marne'
    );

INSERT or IGNORE INTO departement
VALUES (210, 'Sarthe', 72, 'sarthe');

INSERT or IGNORE INTO departement
VALUES (211, 'Loiret', 45, 'loiret');

CREATE TABLE
    IF NOT EXISTS compter (
        id_secteur INTEGER,
        id_departement INTEGER,
        PRIMARY KEY(id_secteur, id_departement)
    );
/*
INSERT or IGNORE INTO compter VALUES (115, 5343);

INSERT or IGNORE INTO compter VALUES (110, 10863);

INSERT or IGNORE INTO compter VALUES (109, 11016);

INSERT or IGNORE INTO compter VALUES (196, 11017);

INSERT or IGNORE INTO compter VALUES (110, 11021);

INSERT or IGNORE INTO compter VALUES (195, 11022);

INSERT or IGNORE INTO compter VALUES (119, 11138);

INSERT or IGNORE INTO compter VALUES (116, 11172);

INSERT or IGNORE INTO compter VALUES (203, 11187);

INSERT or IGNORE INTO compter VALUES (205, 11187);

INSERT or IGNORE INTO compter VALUES (115, 11231);

INSERT or IGNORE INTO compter VALUES (115, 11234);

INSERT or IGNORE INTO compter VALUES (115, 11241);

INSERT or IGNORE INTO compter VALUES (206, 11241);

INSERT or IGNORE INTO compter VALUES (199, 11389);

INSERT or IGNORE INTO compter VALUES (211, 11411);

INSERT or IGNORE INTO compter VALUES (206, 11610);

INSERT or IGNORE INTO compter VALUES (110, 11624);

INSERT or IGNORE INTO compter VALUES (119, 11632);

INSERT or IGNORE INTO compter VALUES (115, 11649);

INSERT or IGNORE INTO compter VALUES (109, 11651);

INSERT or IGNORE INTO compter VALUES (102, 11673);

INSERT or IGNORE INTO compter VALUES (201, 11688);

INSERT or IGNORE INTO compter VALUES (109, 11710);

INSERT or IGNORE INTO compter VALUES (211, 11710);

INSERT or IGNORE INTO compter VALUES (115, 11750);

INSERT or IGNORE INTO compter VALUES (206, 11750);

INSERT or IGNORE INTO compter VALUES (109, 11758);

INSERT or IGNORE INTO compter VALUES (102, 11760);

INSERT or IGNORE INTO compter VALUES (109, 11777);

INSERT or IGNORE INTO compter VALUES (81, 11793);

INSERT or IGNORE INTO compter VALUES (109, 11793);

INSERT or IGNORE INTO compter VALUES (213, 11806);

INSERT or IGNORE INTO compter VALUES (115, 11810);

INSERT or IGNORE INTO compter VALUES (115, 11813);

INSERT or IGNORE INTO compter VALUES (115, 11835);
*/
