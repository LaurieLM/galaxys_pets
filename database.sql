CREATE DATABASE galaxys_pets;
USE galaxys_pets;

CREATE TABLE animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(25) NOT NULL,
    image_url VARCHAR(255)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE food_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE shelters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(25) NOT NULL,
    address VARCHAR(100),
    phone VARCHAR(50),
    website VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


CREATE TABLE advantages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE disadvantages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE health_infos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL UNIQUE,
    deworming_frequency VARCHAR(100),
    vet_check_frequency VARCHAR(100),
    general_advice TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE vaccines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    first_dose VARCHAR(50),
    reminders VARCHAR(255)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE animal_vaccines (
    animal_id INT NOT NULL,
    vaccine_id INT NOT NULL,

    PRIMARY KEY (animal_id, vaccine_id),

    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (vaccine_id) REFERENCES vaccines(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE common_diseases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE animal_common_diseases (
    animal_id INT NOT NULL,
    disease_id INT NOT NULL,

    PRIMARY KEY (animal_id, disease_id),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES common_diseases(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE shelter_animals (
    shelter_id INT NOT NULL,
    animal_id INT NOT NULL,
    PRIMARY KEY (shelter_id, animal_id),
    FOREIGN KEY (shelter_id) REFERENCES shelters(id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dangerous_foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE animal_dangerous_foods (
    animal_id INT NOT NULL,
    dangerous_food_id INT NOT NULL,
    PRIMARY KEY (animal_id, dangerous_food_id),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (dangerous_food_id) REFERENCES dangerous_foods(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE animal_foods (
    animal_id INT NOT NULL,
    food_type_id INT NOT NULL,
    PRIMARY KEY (animal_id, food_type_id),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (food_type_id) REFERENCES food_types(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE food_type_advantages (
    food_type_id INT NOT NULL,
    advantage_id INT NOT NULL,
    PRIMARY KEY (food_type_id, advantage_id),
    FOREIGN KEY (food_type_id) REFERENCES food_types(id) ON DELETE CASCADE,
    FOREIGN KEY (advantage_id) REFERENCES advantages(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE food_type_disadvantages (
    food_type_id INT NOT NULL,
    disadvantage_id INT NOT NULL,
    PRIMARY KEY (food_type_id, disadvantage_id),
    FOREIGN KEY (food_type_id) REFERENCES food_types(id) ON DELETE CASCADE,
    FOREIGN KEY (disadvantage_id) REFERENCES disadvantages(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- DATA INSERTS

-- ANIMAL TYPES
INSERT INTO animals (type, image_url) VALUES
('Chien', 'public/animals/dog.jpg'),
('Chat', 'public/animals/cat.jpg'),
('Cheval', 'public/animals/horse.jpg'),
('Lapin', 'public/animals/rabbit.jpg'),
('Hamster', 'public/animals/hamster.jpg');

-- NUTRITION
INSERT INTO food_types (name, description) VALUES
('Croquettes', 'Les croquettes sont complète et équilibrée mais attention à la composition ! En fonction de la marque la qualité des ingrédients diffère et peut contenir des additifs ainsi que des céréales qui ne sont pas toujours bonne pour votre animal. Elles sont majoritairement industrielle mais de plus en plus de marques artisanales apparaissent. Il existe beaucoup de variantes en fonction de l''âge, de la race et des problèmes de santé mais aussi différentes quantité. C''est une alimentation sèche et donc peu hydratante, attention à ce que votre animal boive bien. '),
('Pâtée', 'La pâtée est très appétente, et plus facile à mâcher pour les animaux âgés.  Cependant attention à l''hygiène dentaire, car elle n''est pas très bonne pour les dents. La qualité de sa composition varie également en fonction des marques. Comme c''est une alimentation humide elle offre une bonne hydratation.'),
('BARF', 'Le BARF ou Aliments crus biologiquement appropriés est une alimentation naturelle pour les carnivores qui consiste à se rapprocher au plus prés de leurs alimentation à l''état sauvage. Pour cela, on va faire un mélange de viande crue, d''os charnus, d''abats, de légumes et de compléments naturels comme des huiles, des algues ou des levures. Cependant attention, c''est un régime alimentaire déconseillé pour les animaux aillant des maladies rénales ou hépatiques. Je vous conseille d''en parler avec votre vétérinaire avant de l''utiliser afin de convenir de la meilleure ration pour votre animal et éviter un déséquilibre nutritionnel. '),
('Ration ménagère', 'La ration ménagère est un mode d''alimentation qui consiste à préparer soi-même les repas avec des ingrédients frais et non industriels. Cela permet de contrôler l''équilibre viande/légume/céréales et la qualité des aliments tout en évitant les additifs, les conservateurs ou les farines animales qui sont présente dans les croquettes et la pâtée industrielle. Il faut faire extrêmement attention aux besoins nutritionnels de votre animal. De façon général, une ration doit être composée de protéines animales (viande, poisson, œufs), de légumes (carottes, courgettes, haricots verts), féculents cuit (riz, pâtes), huiles végétales (colza, soja), complément vitaminique et minéral.'),
('Alimentation mixte', 'Le mode d''alimentation mixte consiste à combiner les croquettes avec de la pâtée ou une ration ménagère. Cela permet de rendre les rations plus appétente, plus hydratante, de gérer un besoin spécifique à votre animal comme la perte de poids ou des problèmes de santé.'),
('Fourrage','Le fourrage est l''aliment principal de votre animal, c''est la base de sa ration quotidienne, il faut absolument lui en donner. Il est composé d''herbe fraîche, de foin, de luzerne, d''ensilage d''herbe ou encore de paille (consommable mais en quantité limitée). C''est un aliment à donner à volonté afin d''éviter des troubles digestifs.'),
('Concentrés', 'Les aliments concentrés sont des aliments à haute valeur énergétique et à forte concentration nutritionnelle, à donner en complément du fourrage. Il existe plusieurs type d''aliments concentrés : simple (céréales entières comme l''avoine, l''orge ou le maïs), composé (granulés, floconnés, mueslis), complet. Le choix dépend de l''âge, de la santé ainsi que du niveau d''activité. Attention aux risques de surpoids et de troubles digestifs si utilisés sans activité physique.'),
('Compléments alimentaire', 'Les compléments alimentaires ont pour objectif de corriger des carences ou de répondre à des besoins spécifiques en fonction de l''âge, de l''activité (sport, travail), du stade physiologique (croissance, gestation, lactation) et des problèmes de santé. Ils ne doivent pas être donnés en continu, mais selon le besoin et il faut toujours consulter un vétérinaire ou un nutritionniste afin d''éviter un surdosage et de garantir une alimentation équilibrée. '),
('Légumes frais', 'En plus du fourrage, votre animal à besoin de légumes frais. Certains comme les feuilles et les fanes sont à donnés à volontés. D''autres, comme les carottes, les concombres, les courgettes, les épinards ou encore les patates douces sont à donner avec modération en raison de leurs forts apport en sucre, eau ou amidon. Attention aux légumes toxiques.'),
('Granulés', 'Le granulés sont des aliments complets qui vient en complément du fourrage et des légumes afin d''apporter à votre animal des fibres, des protéines, des vitamines et des minéraux. Faites attention à la composition et privilégiez des granulés sans céréales, lait en poudre, farines animales et OGM afin d''éviter les risques d''obésité et de déséquilibre.'),
('Mélange de graines', 'Les mélanges de graines sont des aliments composés de céréales, graines, légumes et fruits séchés, d''insectes déshydratés et d''herbes. Privilégiez des mélanges sans sucre ajouté et sans colorants.'),
('Extrudés', 'Les extrudés sont des granulés ou croquettes, c''est une alimentation complète, équilibrée et uniforme, chaque granulé contient la même composition ce qui évite le tri et donc les carences ou le risque d''obésité. Ils sont plus digeste et permette à votre animal de mieux absorber les protéines, vitamines et minéraux. Ils sont également riche en protéines et contiennent des omégas 3 et 6 ce qui prévient des problèmes dentaires.');

INSERT INTO advantages (label) VALUES
('Large choix selon âge/race/activité/santé'),
('Facile à stocker'),
('Bonne hygiène dentaire'),
('Trés appétente'),
('Bonne hydratation'),
('Facile à mâcher'),
('Bonne digestion'),
('Naturelle'),
('Contrôle total des ingrédients'),
('Adaptable aux besoins spécifiques'),
('Economique'),
('Conservation longue'),
('Corrige les carences'),
('Répond à des besoins spécifiques'),
('Apport en vitamines'),
('Trés nutritif'),
('Evite le tri alimentaire'),
('Riche en protéines'),
('Contient des omégas 3 et 6');

INSERT INTO disadvantages (label) VALUES
('Qualité variable'),
('Peut contenir des additifs'),
('Peut contenir des céréales'),
('Peu hydratante'),
('Conservation limitée'),
('Peut causer des problèmes dentaires'),
('Risque de carences'),
('Demande des connaissances en nutrition'),
('Nécessite du temps de préparation'),
('Compléments souvent nécessaires'),
('Risque de suralimentation'),
('Coûteux'),
('Besoin de grandes quantités'),
('Troubles digestifs possibles'),
('Trop riche si mal dosé'),
('Tri alimentaire'),
('Moins appétent');

INSERT INTO food_type_advantages (food_type_id, advantage_id) VALUES
(1,1),
(1,2),
(1,3),
(1,12),
(2,4),
(2,5),
(2,6),
(4,8),
(4,9),
(4,10),
(5,4),
(5,5),
(5,6),
(5,9),
(5,10),
(5,14),
(6,5),
(6,4),
(6,10),
(8,1),
(8,15),
(8,16),
(9,1),
(9,13),
(9,14),
(11,1),
(11,16),
(11,18),
(13,16),
(13,17),
(13,18),
(13,19);

INSERT INTO food_type_disadvantages (food_type_id, disadvantage_id) VALUES
(1,1),
(1,2),
(1,3),
(2,1),
(2,2),
(2,5),
(2,6),
(4,5),
(4,8),
(4,10),
(4,11),
(4,12),
(4,15),
(5,7),
(5,8),
(5,9),
(5,10),
(5,11),
(5,12),
(6,11),
(6,15),
(7,1),
(7,10),
(7,13),
(8,1),
(8,14),
(8,15),
(9,11),
(9,15),
(10,1),
(10,5),
(11,1),
(11,2),
(11,3),
(11,11),
(11,14),
(11,15),
(12,1),
(12,10),
(12,16),
(13,11),
(13,15);

INSERT INTO animal_foods (animal_id, food_type_id) VALUES
(1,1),
(1,2),
(1,4),
(1,5),
(1,6),
(2,1),
(2,2),
(2,4),
(2,5),
(2,6),
(3,7),
(3,8),
(3,9),
(3,10),
(3,11),
(4,7),
(4,8),
(4,10),
(4,11),
(5,7),
(5,10),
(5,12),
(5,13);

INSERT INTO dangerous_foods (name) VALUES
('Chocolat'),
('Raisins et raisins secs'),
('Oignons'),
('Ail'),
('Echalotes'),
('Poiraux'),
('Avocat'),
('Xylitol'),
('Noix de macadamia'),
('Pommes de terre crues'),
('Fruits à noyau'),
('Os cuits'),
('Lait'),
('Pâtes crues'),
('Café, thé et boissons énergisantes'),
('Alcool'),
('Ciboulette'),
('Thon en conserve'),
('Champignons sauvages'),
('Pain'),
('Légumes crucifères'),
('Noyaux et pépins de fruits'),
('Foin moisi ou poussiéreux'),
('Patate douce'),
('Maïs'),
('Blé'),
('Rhubarbe'),
('Fèves'),
('Aubergines');

INSERT INTO animal_dangerous_foods (animal_id, dangerous_food_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(2,11),
(2,12),
(2,13),
(2,14),
(2,15),
(2,16),
(2,17),
(2,18),
(2,19),
(3,1),
(3,4),
(3,7),
(3,10),
(3,20),
(3,21),
(3,22),
(4,1),
(4,3),
(4,4),
(4,6),
(4,7),
(4,10),
(4,13),
(4,23),
(4,24),
(4,25),
(4,26),
(4,27),
(5,1),
(5,3),
(5,4),
(5,5),
(5,6),
(5,10),
(5,13),
(5,21),
(5,26),
(5,28),
(5,29);

-- HEALTH
INSERT INTO vaccines (name, description, first_dose, reminders) VALUES
('CHPPi/L', 'Protège contre la maladie de Carré, l''hépatite de Rubarth, la parvovirose, la parainfluenza et la leptospirose.', 'A partir de 8 semaines', 'Rappel après 1 mois, puis tous les ans'),
('Rage', 'Protège contre la rage, une maladie virale mortelle qui affecte le système nerveux central. Obligatoire pour les voyages à l''étranger', 'A partir de 12 semaines', 'Rappel tous les 3 ans'),
('Leptospirose', 'Protège contre la leptospirose, une maladie bactérienne qui peut être transmise à l''homme.', 'A partir de 8 semaines', 'Rappel tous les ans'),
('Leishmaniose', 'Protège contre la leishmaniose, une maladie parasitaire transmise par les phlébotomes.', 'A partir de 12 semaines', 'Rappel tous les ans'),
('Piroplasmose', 'Protège contre la piroplasmose, une maladie parasitaire transmise par les tiques.', 'A partir de 8 semaines', 'Rappel tous les ans'),
('Typhus félin', 'Protège contre le typhus félin, une maladie virale grave qui affecte le système digestif.', 'A partir de 8 semaines', 'Rappel après 1 mois, puis tous les ans'),
('Coryza', 'Protège contre le coryza, une maladie virale très contagieuse qui affecte les voies respiratoires.', 'A partir de 8 semaines', 'Rappel après 1 mois, puis tous les ans'),
('Leucose féline', 'Protège contre la leucose féline, une maladie virale qui affecte le système immunitaire.', 'A partir de 8 semaines', 'Rappel après 1 mois, puis tous les ans'),
('Chlamydiose', 'Protège contre la chlamydiose, une maladie bactérienne qui peut être transmise à l''homme.', 'A partir de 8 semaines', 'Rappel tous les ans'),
('Pneumonie bactérienne', 'Protège contre la pneumonie bactérienne, une infection des voies respiratoires.', 'A partir de 8 semaines', 'Rappel tous les ans'),
('Grippe équine', 'Protège contre la grippe équine, une maladie virale très contagieuse qui affecte les voies respiratoires.', 'A partir de 6 mois', 'Rappel tous les ans'),
('Rhinopneumonie', 'Protège contre la rhinopneumonie, une maladie virale qui affecte les voies respiratoires et le système reproducteur.', 'A partir de 6 mois', 'Rappel tous les ans'),
('Tétanos', 'Protège contre le tétanos, une maladie bactérienne grave qui affecte le système nerveux.', 'A partir de 6 mois', 'Rappel tous les 5 ans'),
('VHD', 'Protège contre la VHD (Viral Hemorrhagic Disease), une maladie virale très contagieuse qui affecte le foie.', 'A partir de 10 semaines', 'Rappel tous les ans'),
('Myxomatose', 'Protège contre la myxomatose, une maladie virale transmise par les moustiques et les puces.', 'A partir de 10 semaines', 'Rappel tous les ans'),
('VHD2', 'Protège contre la VHD2, une nouvelle souche de la VHD qui est également très contagieuse.', 'A partir de 10 semaines', 'Rappel tous les ans');

INSERT INTO animal_vaccines (animal_id, vaccine_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(2,2),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(3,11),
(3,12),
(3,13),
(4,14),
(4,15),
(4,16),
(5,14);

INSERT INTO common_diseases (name, description) VALUES
('Maladie de Carré', 'Maladie virale grave et très contagieuse affectant le système respiratoire, digestif et nerveux. Les symptômes sont : fièvre, perte d''appétit, écoulements oculaires et nasaux, vomissements, diarrhée, convulsions et troubles neurologiques. La vaccination est essentielle pour prévenir cette maladie.'),
('Parvorirose', 'Maladie virale grave qui affecte les chiens, en particulier les chiots. Les symptômes sont : fièvre, perte d''appétit, vomissements, diarrhée sévère et déshydratation. La vaccination est essentielle pour prévenir cette maladie.'),
('Leptospirose', 'Maladie bactérienne qui peut être transmise à l''homme. Les symptômes sont : fièvre, douleurs musculaires, vomissements, diarrhée, jaunisse et insuffisance rénale. La vaccination est essentielle pour prévenir cette maladie.'),
('Leishmaniose', 'Maladie parasitaire transmise par les phlébotomes. Les symptômes sont : fièvre, perte d''appétit, perte de poids, lésions cutanées, troubles oculaires et insuffisance rénale. La vaccination est essentielle pour prévenir cette maladie.'),
('Maladie de Lyme', 'Maladie bactérienne transmise par les tiques. Les symptômes sont : fièvre, fatigue, douleurs musculaires et articulaires, éruption cutanée en forme de cible. La vaccination est recommandée pour les chiens exposés aux tiques.'),
('Typhus félin', 'Maladie virale grave qui affecte le système digestif des chats. Les symptômes sont : fièvre, perte d''appétit, vomissements, diarrhée sévère et déshydratation. La vaccination est essentielle pour prévenir cette maladie.'),
('Coryza', 'Maladie virale très contagieuse qui affecte les voies respiratoires des chats. Les symptômes sont : éternuements, écoulements oculaires et nasaux, toux et difficultés respiratoires. La vaccination est essentielle pour prévenir cette maladie.'),
('Leucose féline', 'Maladie virale qui affecte le système immunitaire des chats. Les symptômes sont : fièvre, perte d''appétit, perte de poids, infections récurrentes et troubles sanguins. La vaccination est essentielle pour prévenir cette maladie.'),
('Grippe équine', 'Maladie virale très contagieuse qui affecte les voies respiratoires des chevaux. Les symptômes sont : fièvre, toux, écoulements nasaux et difficultés respiratoires. La vaccination est essentielle pour prévenir cette maladie.'),
('Rhinopneumonie', 'Maladie virale qui affecte les voies respiratoires et le système reproducteur des chevaux. Les symptômes sont : fièvre, toux, écoulements nasaux, avortements et troubles neurologiques. La vaccination est essentielle pour prévenir cette maladie.'),
('Tétanos', 'Maladie bactérienne grave qui affecte le système nerveux des chevaux. Les symptômes sont : raideur musculaire, difficulté à marcher, spasmes musculaires et difficulté à ouvrir la bouche. La vaccination est essentielle pour prévenir cette maladie.'),
('VHD', 'Maladie virale très contagieuse qui affecte le foie. Les symptômes sont : fièvre, perte d''appétit, léthargie, jaunisse et décès rapide. La vaccination est essentielle pour prévenir cette maladie.'),
('Myxomatose', 'Maladie virale transmise par les moustiques et les puces qui affecte les lapins. Les symptômes sont : fièvre, perte d''appétit, léthargie, œdème du visage et des yeux, lésions cutanées et décès. La vaccination est essentielle pour prévenir cette maladie.'),
('VHD2', 'Nouvelle souche de la VHD qui est également très contagieuse et affecte le foie. Les symptômes sont similaires à ceux de la VHD classique. La vaccination est essentielle pour prévenir cette maladie.');

INSERT INTO animal_common_diseases (animal_id, disease_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(2,6),
(2,7),
(2,8),
(3,9),
(3,10),
(3,11),
(4,12),
(4,13),
(4,14),
(5,12),
(5,14);

INSERT INTO health_infos (animal_id, deworming_frequency, vet_check_frequency, general_advice) VALUES
(1, 'Tous les 3 mois', 'Une fois par an', 'Brossez régulièrement votre chien pour éviter les nœuds et les problèmes de peau. Assurez-vous qu''il fasse suffisamment d''exercice pour maintenir un poids santé. Donnez-lui une alimentation équilibrée adaptée à son âge, sa taille et son niveau d''activité.'),
(2, 'Tous les 3 mois', 'Une fois par an', 'Brossez régulièrement votre chat pour éviter les nœuds et les boules de poils. Assurez-vous qu''il ait accès à de l''eau fraîche en permanence. Donnez-lui une alimentation équilibrée adaptée à son âge, sa taille et son niveau d''activité.'),
(3, 'Tous les 6 mois', 'Deux fois par an', 'Brossez régulièrement votre cheval pour éviter les nœuds et les problèmes de peau. Assurez-vous qu''il fasse suffisamment d''exercice pour maintenir un poids santé. Donnez-lui une alimentation équilibrée adaptée à son âge, sa taille et son niveau d''activité.'),
(4, 'Tous les 3 mois', 'Une fois par an', 'Brossez régulièrement votre lapin pour éviter les nœuds et les problèmes de peau. Assurez-vous qu''il ait accès à de l''eau fraîche en permanence. Donnez-lui une alimentation équilibrée adaptée à son âge, sa taille et son niveau d''activité.'),
(5, 'Tous les 3 mois', 'Une fois par an', 'Brossez régulièrement votre hamster pour éviter les nœuds et les problèmes de peau. Assurez-vous qu''il ait accès à de l''eau fraîche en permanence. Donnez-lui une alimentation équilibrée adaptée à son âge, sa taille et son niveau d''activité.');

-- SHELTERS
INSERT INTO shelters (name, city, address, phone, website, description, image_url) VALUES
('Croc Blanc', 'Lyon', null, null, 'https://www.crocblanc.org/', 'Le refuge Croc Blanc à Lyon accueille et prend soin des animaux abandonnés, maltraités ou perdus.', 'public/shelters/croc_blanc.jpg'),
('SPA - Refuge de Marennes', 'Marennes', '660 chemin de Chantemerle, 69970 Marennes', '0472704636', 'https://www.la-spa.fr/etablissement/refuge-spa-de-marennes-lyon/', 'Le refuge porte secours à de nombreux chiens, chats, mais aussi quelques NAC (Nouveaux Animaux de Compagnie). ', 'public/shelters/spa.jpg'),
('Ron''Rhône', 'Lyon', null, null, 'https://www.association-ronrhone.fr/', 'Notre mission première est de promouvoir la bienveillance envers tous les animaux, en sensibilisant le public et en agissant concrètement sur le terrain.', 'public/shelters/ron_rhone.jpg'),
('SPA - Refuge de l''Angoumois', 'Mornac', 'Route de Bois Long, 16600 Mornac', '0545657699', 'https://refugedelangoumois.fr/', 'Le refuge de l''Angoumois accueille des chiens et des chats en détresse, leur offrant un refuge sûr et des soins attentionnés.', 'public/shelters/spa.jpg'),
('Agir Pour Les Animaux', 'Castelginest', '13 Chemin du Loup', '0612165957', 'https://agir-pourlesanimaux.com/', 'Agir Pour Les Animaux est une association de protection animale qui recueille et prend soin des animaux abandonnés, maltraités ou perdus.', 'public/shelters/agir_pour_les_animaux.png');

INSERT INTO shelter_animals (shelter_id, animal_id) VALUES
(1,1),
(1,2),
(1,5),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(3,1),
(3,2),
(4,1),
(4,2),
(5,1),
(5,2),
(5,4),
(5,5);
