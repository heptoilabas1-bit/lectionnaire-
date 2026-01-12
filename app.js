// Fichier: app.js (VERSION FINALE - ANNÉE LITURGIQUE COMPLÈTE)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LISTE DE RÉFÉRENCE DES DIMANCHES (Index Complet) ---
    // Les clés correspondent aux noms des fichiers .json dans le dossier /data/
    const liturgicalList = {
        // --- Période du Triode (Préparation et Carême) ---
        '00_publican_pharisee': 'A. Dimanche du Publicain et du Pharisien',
        '01_prodigal_son': 'B. Dimanche du Fils Prodigue',
        '02_meatfare': 'C. Dimanche du Jugement Dernier (Viande)',
        '03_cheese_fare': 'D. Dimanche du Pardon (Fromages)',
        '10_great_lent_1': '1. 1er Dim. du Carême (Orthodoxie)',
        '11_great_lent_2': '2. 2e Dim. du Carême (St Grégoire Palamas)',
        '12_great_lent_3': '3. 3e Dim. du Carême (Vénération de la Croix)',
        '13_great_lent_4': '4. 4e Dim. du Carême (St Jean Climaque)',
        '14_great_lent_5': '5. 5e Dim. du Carême (Ste Marie l\'Égyptienne)',
        '15_palm_sunday': '6. Dimanche des Rameaux',

        // --- Période du Pentecostaire (de Pâques à la Pentecôte) ---
        '21_pascha': '7. Pâques - Sainte Résurrection',
        '22_thomas_sunday': '8. 2e Dim. de Pâques (Thomas)',
        '23_myrrhbearers': '9. 3e Dim. de Pâques (Myrrhophores)',
        '24_paralytic': '10. 4e Dim. de Pâques (Paralytique)',
        '25_samaritan': '11. 5e Dim. de Pâques (Samaritaine)',
        '26_blind_man': '12. 6e Dim. de Pâques (Aveugle-né)',
        '27_holy_fathers_1': '13. 7e Dim. de Pâques (Pères de Nicée I)',
        '28_pentecost': '14. Dimanche de la Pentecôte',
        '29_all_saints': '15. 1er Dim. après Pentecôte (Tous les Saints)',

        // --- Période de l'Octoèque (Après la Pentecôte) ---
        '302_after_pentecost_2': '16. 2e Dimanche après Pentecôte',
        '303_after_pentecost_3': '17. 3e Dimanche après Pentecôte',
        '304_after_pentecost_4': '18. 4e Dimanche après Pentecôte',
        '305_after_pentecost_5': '19. 5e Dimanche après Pentecôte',
        '306_after_pentecost_6': '20. 6e Dimanche après Pentecôte',
        '307_after_pentecost_7': '21. 7e Dimanche après Pentecôte',
        '308_after_pentecost_8': '22. 8e Dimanche après Pentecôte',
        '309_after_pentecost_9': '23. 9e Dimanche après Pentecôte',
        '310_after_pentecost_10': '24. 10e Dimanche après Pentecôte',
        '311_after_pentecost_11': '25. 11e Dimanche après Pentecôte',
        '312_after_pentecost_12': '26. 12e Dimanche après Pentecôte',
        '313_after_pentecost_13': '27. 13e Dimanche après Pentecôte',
        '314_after_pentecost_14': '28. 14e Dimanche après Pentecôte',
        '315_after_pentecost_15': '29. 15e Dimanche après Pentecôte',
        '316_after_pentecost_16': '30. 16e Dimanche après Pentecôte',
        '317_after_pentecost_17': '31. 17e Dimanche après Pentecôte',
        '318_after_pentecost_18': '32. 18e Dimanche après Pentecôte',
        '319_after_pentecost_19': '33. 19e Dimanche après Pentecôte',
        '320_after_pentecost_20': '34. 20e Dimanche après Pentecôte',
        '321_after_pentecost_21': '35. 21e Dimanche après Pentecôte',
        '322_after_pentecost_22': '36. 22e Dimanche après Pentecôte',
        '323_after_pentecost_23': '37. 23e Dimanche après Pentecôte',
        '324_after_pentecost_24': '38. 24e Dimanche après Pentecôte',
        '325_after_pentecost_25': '39. 25e Dimanche après Pentecôte',
        '326_after_pentecost_26': '40. 26e Dimanche après Pentecôte',
        '327_after_pentecost_27': '41. 27e Dimanche après Pentecôte',
        '328_after_pentecost_28': '42. 28e Dimanche après Pentecôte',
        '329_after_pentecost_29': '43. 29e Dimanche après Pentecôte',
        '330_after_pentecost_30': '44. 30e Dimanche après Pentecôte',
        '331_after_pentecost_31': '45. 31e Dimanche après Pentecôte',
        '332_after_pentecost_32': '46. 32e Dimanche après Pentecôte',

        // --- Cycle de la Nativité et Théophanie ---
        '90_advent_2': '47. 2e Dim. avant la Nativité (Sts Ancêtres)',
        '91_advent_1': '48. Dim. avant la Nativité (Sts Pères)',
        '92_nativity_after': '49. Dimanche après la Nativité',
        '93_theophany_before': '50. Dimanche avant la Théophanie',
        '94_theophany_after': '51. Dimanche après la Théophanie',
        '95_canaanite': '52. Dimanche de la Cananéenne'
    };

    let currentSundayKey = '21_pascha'; 
    let currentReadingType = 'gospel';

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
        
        mainText.innerHTML = '<p style="text-align:center;"><em>Chargement...</em></p>';

        try {
            const response = await fetch(`data/${sundayKey}.json`);
            if (!response.ok) throw new Error("Fichier JSON manquant dans le dossier /data/");

            const data = await response.json();
            const reading = data[readingType];

            verseTitle.textContent = reading.title;
            mainText.innerHTML = reading.interlinear;
            greekFull.innerText = reading.greek_only;
            frenchFull.innerText = reading.french_only;
            myNotes.innerText = reading.personal_analysis;

            // Gestion PDF
            if (reading.pdf_link && reading.pdf_link !== "") {
                pdfButtonContainer.href = reading.pdf_link;
                pdfButtonContainer.style.display = "inline-flex";
            } else {
                pdfButtonContainer.style.display = "none";
            }

            // Mise à jour visuelle des boutons Évangile/Apôtre
            document.querySelectorAll('#text-selector button').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`select-${readingType}`).classList.add('active');

        } catch (error) {
            mainText.innerHTML = `<p style="color:red; text-align:center;">Erreur : ${error.message}<br><small>(Vérifiez que le fichier data/${sundayKey}.json existe)</small></p>`;
            pdfButtonContainer.style.display = "none";
        }
    };

    // --- 3. INITIALISATION ---
    const populateSundaySelect = () => {
        const select = document.getElementById('sunday-select');
        // Les clés sont déjà préfixées (00, 10, 20...) pour un tri naturel correct
        const sortedKeys = Object.keys(liturgicalList).sort();
        
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
    document.getElementById('sunday-select').addEventListener('change', (e) => loadTextContext(e.target.value, currentReadingType));
    document.getElementById('select-gospel').addEventListener('click', () => loadTextContext(currentSundayKey, 'gospel'));
    document.getElementById('select-apostle').addEventListener('click', () => loadTextContext(currentSundayKey, 'apostle'));

    // Panneaux latéraux
    const greekView = document.getElementById('greek-view');
    const frenchView = document.getElementById('french-view');
    
    document.getElementById('toggle-greek').addEventListener('click', () => {
        frenchView.classList.add('hidden');
        greekView.classList.toggle('hidden');
    });

    document.getElementById('toggle-french').addEventListener('click', () => {
        greekView.classList.add('hidden');
        frenchView.classList.toggle('hidden');
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            greekView.classList.add('hidden');
            frenchView.classList.add('hidden');
        });
    });
});