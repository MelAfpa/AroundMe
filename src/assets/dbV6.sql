CREATE TABLE
    IF NOT EXISTS departement (
        id_departement INTEGER PRIMARY KEY,
        nom_departement TEXT,
        numero_departement INTEGER,
        slug_departement TEXT,
        name_media TEXT,
        md5_media TEXT
    );

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
        name_media TEXT,
        md5_media TEXT,
        FOREIGN KEY (id_departement) REFERENCES departement (id_departement)
    );

CREATE TABLE
    IF NOT EXISTS secteur (
        id_secteur INTEGER PRIMARY KEY,
        nom_secteur TEXT,
        slug_secteur TEXT,
        code_type_activite INTEGER,
        name_media TEXT,
        md5_media TEXT
    );
/*
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

*/
/*
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
*/
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
