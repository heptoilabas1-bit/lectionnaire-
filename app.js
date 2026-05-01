// Fichier: app.js (VERSION CORRIGÉE AVEC VOS TITRES PERSONNALISÉS)

document.addEventListener('DOMContentLoaded', () => {

 // --- 1. LISTE DE RÉFÉRENCE DES DIMANCHES (VERSION CORRIGÉE) ---
const liturgicalList = {
    // --- Période du Triode ---
    '00_publican_pharisee': 'A. Dimanche du Publicain et du Pharisien',
    '01_prodigal_son': 'B. Dimanche du Fils Prodigue',
    '02_meatfare': 'C. Dimanche du Jugement Dernier (Carnaval)',
    '03_cheese_fare': 'D. Dimanche du Pardon (Tyrophagie)',
    
    // --- Grand Carême ---
    '10_great_lent_1': '1. 1er Dim. du Carême (Orthodoxie)',
    '11_great_lent_2': '2. 2e Dim. du Carême (St Grégoire Palamas)',
    '12_great_lent_3': '3. 3e Dim. du Carême (Vénération de la Croix)',
    '13_great_lent_4': '4. 4e Dim. du Carême (St Jean Climaque)',
    '14_great_lent_5': '5. 5e Dim. du Carême (Ste Marie l\'Égyptienne)',
    '15_palm_sunday': '6. Dimanche des Rameaux (entrée à Jérusalem)',

    // --- Période du Pentecostaire ---
   '21_pascha': 'PÂQUES - La Sainte Résurrection',
'22_thomas_sunday': 'Dimanche de Saint Thomas (2e de Pâques)',
'23_myrrhbearers': 'Dimanche des Myrophores (3e de Pâques)',
'24_paralytic': 'Dimanche du Paralytique (4e de Pâques)',
'25_samaritan': 'Dimanche de la Samaritaine (5e de Pâques)',
'26_blind_man': 'Dimanche de l\'Aveugle-né (6e de Pâques)',
'27_holy_fathers_1': 'Saints Pères du 1er Concile (7e de Pâques)',
'28_pentecost': 'PENTECÔTE - La Descente du Saint-Esprit',
'29_all_saints': 'Dimanche de Tous les Saints (1er ap. Pentecôte)',

    // --- Cycle de Matthieu (Été) ---
    '302_after_pentecost_2': 'Tous les Saints de la Terre (2e de Matthieu)',
'303_after_pentecost_3': 'La Lumière du corps (3e de Matthieu)',
'304_after_pentecost_4': 'Le Centurion (4e de Matthieu)',
'305_after_pentecost_5': 'Les deux démoniaques (5e de Matthieu)',
'306_after_pentecost_6': 'La guérison du Paralytique (6e de Matthieu)',
'307_after_pentecost_7': 'Les deux aveugles (7e de Matthieu)',
'308_after_pentecost_8': 'Multiplication des pains (8e de Matthieu)',
'309_after_pentecost_9': 'Marche sur les eaux (9e de Matthieu)',
'310_after_pentecost_10': 'La guérison du lunatique (10e de Matthieu)',
'311_after_pentecost_11': 'Le débiteur impitoyable (11e de Matthieu)',
'312_after_pentecost_12': 'Le jeune homme riche (12e de Matthieu)',
'313_after_pentecost_13': 'Les vignerons homicides (13e de Matthieu)',
'314_after_pentecost_14': 'Les noces royales (14e de Matthieu)',
'315_after_pentecost_15': 'Le plus grand commandement (15e de Matthieu)',
'316_after_pentecost_16': 'La parabole des talents (16e de Matthieu)',
'317_after_pentecost_17': 'La Cananéenne (17e de Matthieu)',

    // --- Cycle de Luc (Automne - Octoèque suite) ---
   '318_after_pentecost_18': 'La Pêche miraculeuse (1er de Luc)',
'319_after_pentecost_19': 'L\'Amour des ennemis (2e de Luc)',
'320_after_pentecost_20': 'Le Fils de la veuve de Naïn (3e de Luc)',
'321_after_pentecost_21': 'Le Semeur (4e de Luc)',
'322_after_pentecost_22': 'Le Riche et Lazare (5e de Luc)',
'323_after_pentecost_23': 'Le Démoniaque de Gérasa (6e de Luc)',
'324_after_pentecost_24': 'La Fille de Jaïre (7e de Luc)',
'325_after_pentecost_25': 'Le Bon Samaritain (8e de Luc)',
'326_after_pentecost_26': 'Le Riche insensé (9e de Luc)',
'327_after_pentecost_27': 'La Femme courbée (10e de Luc)',
'328_after_pentecost_28': 'Les Dix Lépreux (12e de Luc)', // Note : le 11e est souvent sauté
'329_after_pentecost_29': 'Les Saints Ancêtres (Grand Souper)',
'330_after_pentecost_30': 'Le Jeune Homme Riche (13e de Luc)',
'331_after_pentecost_31': 'L\'Aveugle de Jéricho (14e de Luc)',
'332_after_pentecost_32': 'Zachée (15e de Luc)',
    // --- Cycle de la Nativité et Épiphanie ---
   // --- Cycle de la Nativité et de la Théophanie ---
'90_advent_2': 'Les Saints Ancêtres (2e dimanche avant la Nativité)',
'91_advent_1': 'Généalogie du Seigneur (Dimanche avant la Nativité)',
'92_nativity_after': 'La Fuite en Égypte (Dimanche après la Nativité)',
'93_theophany_before': 'Commencement de l’Évangile (Dimanche avant la Théophanie)',
'94_theophany_after': 'Le début de la Prédication (Dimanche après la Théophanie)',
'95_canaanite': 'La Cananéenne (Dimanche tampon de janvier)'
};

    // --- SÉCURITÉ : CHOIX PAR DÉFAUT ---
    let currentSundayKey = '01_prodigal_son'; 
    let currentReadingType = 'gospel';
    let currentTranslation = 'segond';
 // --- 2. FONCTION DE BASCULEMENT ---
    const changeTranslation = (version) => {
        currentTranslation = version;

        // Mise à jour visuelle des boutons (S'assurer qu'ils ont ces ID dans le HTML)
        const btnSegond = document.getElementById('btn-segond');
        const btnDarby = document.getElementById('btn-darby');
        
        if (btnSegond && btnDarby) {
            btnSegond.classList.toggle('active', version === 'segond');
            btnDarby.classList.toggle('active', version === 'darby');
        }

        // Ajoute la classe au body pour l'interlinéaire (CSS)
        if (version === 'darby') {
            document.body.classList.add('show-darby');
        } else {
            document.body.classList.remove('show-darby');
        }

        // On rafraîchit l'affichage du texte intégral sans recharger le fichier
        loadTextContext(currentSundayKey, currentReadingType);
    };
    // --- 2. FONCTION DE CHARGEMENT DES DONNÉES (FETCH) ---
    const loadTextContext = async (sundayKey, readingType) => {
        currentSundayKey = sundayKey;
        currentReadingType = readingType;

        const verseTitle = document.getElementById('verse-title');
        const mainText = document.getElementById('gospel-text');
        const greekFull = document.getElementById('greek-full-text');
        const frenchFull = document.getElementById('french-full-text');
        const myNotes = document.getElementById('my-notes');
        const pdfButtonContainer = document.getElementById('pdf-button-container');
        
        // Indicateur de chargement
        if(mainText) mainText.innerHTML = '<p style="text-align:center;"><em>Chargement...</em></p>';

        try {
            const response = await fetch(`data/${sundayKey}.json`);
            if (!response.ok) throw new Error("Fichier JSON manquant dans le dossier /data/");

            const data = await response.json();
            const reading = data[readingType];

            // --- Affichage de la Référence + Titre ---
            if (!reading) throw new Error(`Section "${readingType}" manquante dans le fichier JSON.`);

            const referenceHtml = reading.reference 
                ? `<span style="display:block; font-size: 0.7em; color: #d9534f; margin-bottom: 5px;">${reading.reference}</span>` 
                : '';
            
            if(verseTitle) verseTitle.innerHTML = referenceHtml + (reading.title || "Titre inconnu");

           // --- GESTION DE L'AFFICHAGE ET DE LA NUMÉROTATION ---
         if (mainText) {
    // Cas 1 : Nouveau format (Tableau JSON)
    if (Array.isArray(reading.interlinear)) {
        let htmlFinal = "";
        reading.interlinear.forEach(verset => {
            // On s'assure que le data-num est bien sur le verse-row
            htmlFinal += `<div class="verse-row" data-num="${verset.verse_number}.">
                            ${verset.html_content}
                          </div>`;
        });
        mainText.innerHTML = htmlFinal;
    } 
    // Cas 2 : Ancien format (Texte brut)
    else {
        // On entoure l'ancien texte d'un verse-row par défaut pour voir le numéro
        mainText.innerHTML = `<div class="verse-row" data-num="1.">${reading.interlinear}</div>`;
    }
}
            if(greekFull) greekFull.innerText = reading.greek_only || "";
            // --- GESTION DU FRANÇAIS INTÉGRAL (DYNAMIQUE) ---
            if(frenchFull) {
                // On vérifie quelle clé prendre selon le bouton cliqué
                const textKey = (currentTranslation === 'darby') ? 'french_darby' : 'french_only';
                // Si la version Darby est absente du JSON, on remet Segond par sécurité
                frenchFull.innerText = reading[textKey] || reading['french_only'] || "Traduction non disponible.";
            }
            if(myNotes) myNotes.innerText = reading.personal_analysis || "Pas d'analyse disponible.";

            // Gestion PDF
            if (pdfButtonContainer) {
                if (reading.pdf_link && reading.pdf_link !== "") {
                    pdfButtonContainer.href = reading.pdf_link;
                    pdfButtonContainer.style.display = "inline-flex";
                } else {
                    pdfButtonContainer.style.display = "none";
                }
            }

            // Mise à jour visuelle des boutons Évangile/Apôtre
            document.querySelectorAll('#text-selector button').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(`select-${readingType}`);
            if(activeBtn) activeBtn.classList.add('active');

        } catch (error) {
            console.error(error);
            if(mainText) mainText.innerHTML = `<p style="color:red; text-align:center;">Erreur : ${error.message}<br><small>(Vérifiez que le fichier data/${sundayKey}.json existe et est valide)</small></p>`;
            if(verseTitle) verseTitle.textContent = "Erreur de chargement";
            if(pdfButtonContainer) pdfButtonContainer.style.display = "none";
        }
    };

    // --- 3. INITIALISATION ---
    const populateSundaySelect = () => {
        const select = document.getElementById('sunday-select');
        if (!select) return;

        const sortedKeys = Object.keys(liturgicalList).sort();
        
        // Vider le menu
        select.innerHTML = '';

        sortedKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = liturgicalList[key];
            select.appendChild(option);
        });
        select.value = currentSundayKey;
    };

    populateSundaySelect();
    loadTextContext(currentSundayKey, currentReadingType);

    // --- 4. ÉCOUTEURS D'ÉVÉNEMENTS ---
    const selectElement = document.getElementById('sunday-select');
    if (selectElement) {
        selectElement.addEventListener('change', (e) => loadTextContext(e.target.value, currentReadingType));
    }

    const btnGospel = document.getElementById('select-gospel');
    if (btnGospel) {
        btnGospel.addEventListener('click', () => loadTextContext(currentSundayKey, 'gospel'));
    }

    const btnApostle = document.getElementById('select-apostle');
    if (btnApostle) {
        btnApostle.addEventListener('click', () => loadTextContext(currentSundayKey, 'apostle'));
    }

    // Panneaux latéraux
    const greekView = document.getElementById('greek-view');
    const frenchView = document.getElementById('french-view');
    const toggleGreek = document.getElementById('toggle-greek');
    const toggleFrench = document.getElementById('toggle-french');
    
    if (toggleGreek && greekView && frenchView) {
        toggleGreek.addEventListener('click', () => {
            frenchView.classList.add('hidden');
            greekView.classList.toggle('hidden');
        });
    }

    if (toggleFrench && greekView && frenchView) {
        toggleFrench.addEventListener('click', () => {
            greekView.classList.add('hidden');
            frenchView.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (greekView) greekView.classList.add('hidden');
            if (frenchView) frenchView.classList.add('hidden');
        });
    });
const btnVersionSegond = document.getElementById('btn-segond');
    const btnVersionDarby = document.getElementById('btn-darby');

    if (btnVersionSegond) {
        btnVersionSegond.addEventListener('click', () => changeTranslation('segond'));
    }
    if (btnVersionDarby) {
        btnVersionDarby.addEventListener('click', () => changeTranslation('darby'));
    }
    // =========================================================

});
