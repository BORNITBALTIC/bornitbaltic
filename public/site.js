/* ============ SISU: siit haldab klient tootegruppe ============ */
const CATEGORIES = [
  {
    "icon": "i-hydro",
    "href": "/tootekategooria/vundamendi-hudroisolatsioon/",
    "nm": {
      "et": "Vundamendi hüdroisolatsioon",
      "en": "Foundation waterproofing",
      "fi": "Perustusten vedeneristys",
      "lv": "Pamatu hidroizolācija",
      "lt": "Pamatų hidroizoliacija"
    },
    "ds": {
      "et": "Membraanid, pakskihtmassid, võõbad, kaitsekihid ja mineraalsed segud.",
      "en": "Membranes, thick-layer compounds, primers, protection boards and mineral mixes.",
      "fi": "Kermit, paksukerrosmassat, primerit, suojalevyt ja mineraaliset seokset.",
      "lv": "Membrānas, biezslāņa masas, gruntis, aizsargplāksnes un minerālie maisījumi.",
      "lt": "Membranos, storasluoksnės masės, gruntai, apsauginės plokštės ir mineraliniai mišiniai."
    }
  },
  {
    "icon": "i-road",
    "href": "/tootekategooria/teedeehituses-kasutatavad-tooted/",
    "nm": {
      "et": "Teedeehituses kasutatavad tooted",
      "en": "Road construction products",
      "fi": "Tienrakennustuotteet",
      "lv": "Ceļu būves produkti",
      "lt": "Kelių tiesimo produktai"
    },
    "ds": {
      "et": "Vuugiliimid, vuugilindid, külmad asfaltsegud ja praoparandusmaterjalid.",
      "en": "Joint adhesives, joint tapes, cold asphalt mixes and crack repair materials.",
      "fi": "Saumaliimat, saumanauhat, kylmäasfalttimassat ja halkeamien korjausaineet.",
      "lv": "Šuvju līmes, šuvju lentes, aukstā asfalta maisījumi un plaisu remonta materiāli.",
      "lt": "Siūlių klijai, siūlių juostos, šalto asfalto mišiniai ir įtrūkimų remonto medžiagos."
    }
  },
  {
    "icon": "i-joint",
    "href": "/tootekategooria/vuugitihendustooted/",
    "nm": {
      "et": "Vuugitihendustooted",
      "en": "Joint sealing",
      "fi": "Saumatiivisteet",
      "lv": "Šuvju blīvēšana",
      "lt": "Siūlių sandarinimas"
    },
    "ds": {
      "et": "Tihendusmassid ja vuugitäited betoonvuukidele ning liitekohtadele.",
      "en": "Sealants and joint fillers for concrete joints and connections.",
      "fi": "Tiivistysmassat ja saumatäytteet betonisaumoihin ja liitoksiin.",
      "lv": "Blīvēšanas masas un šuvju pildījumi betona šuvēm un savienojumiem.",
      "lt": "Sandarinimo masės ir siūlių užpildai betono siūlėms bei sujungimams."
    }
  },
  {
    "icon": "i-roof",
    "href": "/tootekategooria/katuse-saneerimistooted/",
    "nm": {
      "et": "Katuse saneerimistooted",
      "en": "Roof renovation",
      "fi": "Katon saneeraus",
      "lv": "Jumtu renovācija",
      "lt": "Stogų renovacija"
    },
    "ds": {
      "et": "Võõbad ja katted vana katusekatte parandamiseks ilma lammutamata.",
      "en": "Coatings that renew an old roof without tearing it off.",
      "fi": "Pinnoitteet, jotka uusivat vanhan katteen ilman purkamista.",
      "lv": "Pārklājumi, kas atjauno veco jumta segumu bez nojaukšanas.",
      "lt": "Dangos, kurios atnaujina seną stogo dangą jos neardant."
    }
  },
  {
    "icon": "i-silikal",
    "href": "/tootekategooria/silikal-tooted/",
    "nm": {
      "et": "SILIKAL tooted",
      "en": "SILIKAL products",
      "fi": "SILIKAL-tuotteet",
      "lv": "SILIKAL produkti",
      "lt": "SILIKAL produktai"
    },
    "ds": {
      "et": "Metakrülaatvaigud, mis kivistuvad tunniga — põrandad ja sillakatendid.",
      "en": "Methacrylate resins that cure within the hour — floors and bridge decks.",
      "fi": "Metakrylaattihartsit, jotka kovettuvat tunnissa — lattiat ja siltakannet.",
      "lv": "Metakrilāta sveķi, kas sacietē stundas laikā — grīdas un tiltu segumi.",
      "lt": "Metakrilato dervos, sukietėjančios per valandą — grindys ir tiltų dangos."
    }
  },
  {
    "icon": "i-special",
    "href": "/tootekategooria/eritooted/",
    "nm": {
      "et": "Eritooted",
      "en": "Special products",
      "fi": "Erikoistuotteet",
      "lv": "Īpašie produkti",
      "lt": "Specialūs produktai"
    },
    "ds": {
      "et": "Kaitse soola, niiskuse ja käärimishapete eest, sh põllumajanduses.",
      "en": "Protection against salt, moisture and fermentation acids, incl. agriculture.",
      "fi": "Suoja suolaa, kosteutta ja käymishappoja vastaan, myös maataloudessa.",
      "lv": "Aizsardzība pret sāli, mitrumu un rūgšanas skābēm, arī lauksaimniecībā.",
      "lt": "Apsauga nuo druskos, drėgmės ir rūgimo rūgščių, taip pat žemės ūkyje."
    }
  },
  {
    "icon": "i-spray",
    "href": "/tootekategooria/markeerimisvarvid/",
    "nm": {
      "et": "Markeerimisvärvid",
      "en": "Marking paints",
      "fi": "Merkintämaalit",
      "lv": "Marķēšanas krāsas",
      "lt": "Žymėjimo dažai"
    },
    "ds": {
      "et": "Kiirkuivavad värvid trasside, kaevetööde ja platside märkimiseks.",
      "en": "Fast-drying sprays for utilities, excavation and site marking.",
      "fi": "Nopeasti kuivuvat maalit putkilinjojen, kaivuutöiden ja alueiden merkintään.",
      "lv": "Ātri žūstošas krāsas komunikāciju, rakšanas darbu un laukumu marķēšanai.",
      "lt": "Greitai džiūstantys dažai komunikacijų, kasimo darbų ir aikštelių ženklinimui."
    }
  },
  {
    "icon": "i-marking",
    "href": "/tootekategooria/teekattemargistus/",
    "nm": {
      "et": "Teekattemärgistus",
      "en": "Road markings",
      "fi": "Tiemerkinnät",
      "lv": "Ceļa marķējums",
      "lt": "Kelio ženklinimas"
    },
    "ds": {
      "et": "Püsimärgistus parklatele, teedele ja tööstusaladele.",
      "en": "Durable markings for car parks, roads and industrial areas.",
      "fi": "Kestävät merkinnät pysäköintialueille, teille ja teollisuusalueille.",
      "lv": "Izturīgs marķējums stāvlaukumiem, ceļiem un rūpnieciskajām teritorijām.",
      "lt": "Ilgaamžis ženklinimas automobilių aikštelėms, keliams ir pramonės teritorijoms."
    }
  },
  {
    "icon": "i-tool",
    "href": "/tootekategooria/bornit-tooriistad/",
    "nm": {
      "et": "BORNIT tööriistad",
      "en": "BORNIT tools",
      "fi": "BORNIT-työkalut",
      "lv": "BORNIT instrumenti",
      "lt": "BORNIT įrankiai"
    },
    "ds": {
      "et": "Paigaldustööriistad ja tarvikud BORNIT®-i materjalidele.",
      "en": "Application tools and accessories for BORNIT® materials.",
      "fi": "Asennustyökalut ja tarvikkeet BORNIT®-materiaaleille.",
      "lv": "Montāžas instrumenti un piederumi BORNIT® materiāliem.",
      "lt": "Montavimo įrankiai ir priedai BORNIT® medžiagoms."
    }
  },
  {
    "icon": "i-grun",
    "href": "/tootekategooria/grun-tooriistad/",
    "nm": {
      "et": "GRÜN tööriistad",
      "en": "GRÜN equipment",
      "fi": "GRÜN-laitteet",
      "lv": "GRÜN iekārtas",
      "lt": "GRÜN įranga"
    },
    "ds": {
      "et": "Bituumenikatlad ja paigaldusseadmed vuugiliimile ning praomastiksile.",
      "en": "Bitumen boilers and applicators for joint adhesive and crack mastic.",
      "fi": "Bitumipadat ja levityslaitteet saumaliimalle ja halkeamamassalle.",
      "lv": "Bitumena katli un uzklāšanas iekārtas šuvju līmei un plaisu mastikai.",
      "lt": "Bitumo katilai ir klojimo įranga siūlių klijams bei įtrūkimų mastikai."
    }
  }
];

/* ============ Probleemid → lahendused ============ */
const SPOTS = [
  {
    "id": "katus",
    "layer": "L-katus",
    "label": {
      "et": "Katus laseb vett läbi",
      "en": "The roof leaks",
      "fi": "Katto vuotaa",
      "lv": "Jumts tek",
      "lt": "Stogas praleidžia vandenį"
    },
    "sym": {
      "et": "Vana katusekate on pragunenud, ühenduskohad lekivad, aga lammutamine ei tule kõne alla.",
      "en": "The old covering is cracked and the joints leak, but tearing it off is not an option.",
      "fi": "Vanha kate on halkeillut ja liitokset vuotavat, mutta purkaminen ei tule kysymykseen.",
      "lv": "Vecais segums ir ieplaisājis, savienojumi tek, bet nojaukšana nav iespējama.",
      "lt": "Sena danga sutrūkinėjusi, sandūros praleidžia vandenį, o ardyti neįmanoma."
    },
    "sol": {
      "et": "Bituumenvõõbad ja pakskihtmassid uuendavad katusekatte kohapeal, ilma vana kihti eemaldamata.",
      "en": "Bitumen coatings renew the roof in place, without removing the old layer.",
      "fi": "Bitumipinnoitteet ja paksukerrosmassat uusivat katteen paikan päällä, vanhaa kerrosta poistamatta.",
      "lv": "Bitumena pārklājumi un biezslāņa masas atjauno segumu uz vietas, nenoņemot veco kārtu.",
      "lt": "Bitumo dangos ir storasluoksnės masės atnaujina dangą vietoje, nenuimant senojo sluoksnio."
    },
    "items": {
      "et": [
        "Külmalt paigaldatav — leegita",
        "Sobib bituumen-, betoon- ja plekkalusele",
        "Elastne ka miinuskraadidel"
      ],
      "en": [
        "Cold-applied, no open flame",
        "Works on bitumen, concrete and metal",
        "Stays elastic below zero"
      ],
      "fi": [
        "Kylmäasennus, ei avotulta",
        "Sopii bitumi-, betoni- ja peltialustalle",
        "Pysyy joustavana pakkasellakin"
      ],
      "lv": [
        "Uzklāj aukstā veidā, bez atklātas liesmas",
        "Der bitumena, betona un skārda pamatnei",
        "Saglabā elastību arī mīnus grādos"
      ],
      "lt": [
        "Klojama šaltuoju būdu, be atviros liepsnos",
        "Tinka bitumo, betono ir skardos pagrindui",
        "Išlieka elastinga ir esant minusinei temperatūrai"
      ]
    },
    "cat": 0
  },
  {
    "id": "fassaad",
    "layer": "L-fassaad",
    "label": {
      "et": "Sokkel imab niiskust",
      "en": "The plinth draws damp",
      "fi": "Sokkeli imee kosteutta",
      "lv": "Cokols uzsūc mitrumu",
      "lt": "Cokolis traukia drėgmę"
    },
    "sym": {
      "et": "Sokli värv koorub ja seina alumine osa jääb pidevalt tumedaks.",
      "en": "Paint peels off the plinth and the bottom of the wall stays dark.",
      "fi": "Sokkelin maali hilseilee ja seinän alaosa pysyy jatkuvasti tummana.",
      "lv": "Cokola krāsa lobās un sienas apakšdaļa pastāvīgi paliek tumša.",
      "lt": "Cokolio dažai lupasi, o apatinė sienos dalis nuolat lieka tamsi."
    },
    "sol": {
      "et": "Bituumenvõõp ja kaitsekiht maapinnaga kokkupuutuvale pinnale katkestavad niiskuse liikumise.",
      "en": "A bitumen primer plus protection layer on the below-grade surface stops moisture rising.",
      "fi": "Bitumipinnoite ja suojakerros maanvastaiselle pinnalle katkaisevat kosteuden nousun.",
      "lv": "Bitumena pārklājums un aizsargkārta uz zemei pieguļošās virsmas pārtrauc mitruma kustību.",
      "lt": "Bitumo danga ir apsauginis sluoksnis prie grunto esančiame paviršiuje nutraukia drėgmės kilimą."
    },
    "items": {
      "et": [
        "Krunt, võõp ja kaitseplaat ühest majast",
        "Kannatab pinnase survet",
        "Ühildub olemasoleva soojustusega"
      ],
      "en": [
        "Primer, coating and board from one supplier",
        "Withstands soil pressure",
        "Compatible with existing insulation"
      ],
      "fi": [
        "Primeri, pinnoite ja suojalevy yhdeltä toimittajalta",
        "Kestää maanpaineen",
        "Yhteensopiva olemassa olevan eristeen kanssa"
      ],
      "lv": [
        "Grunts, pārklājums un aizsargplāksne no viena piegādātāja",
        "Iztur grunts spiedienu",
        "Savietojams ar esošo siltinājumu"
      ],
      "lt": [
        "Gruntas, danga ir apsauginė plokštė iš vieno tiekėjo",
        "Atlaiko grunto slėgį",
        "Suderinama su esama šiluminė izoliacija"
      ]
    },
    "cat": 0
  },
  {
    "id": "vundament",
    "layer": "L-vundament",
    "label": {
      "et": "Keldriseinad on märjad",
      "en": "Basement walls are wet",
      "fi": "Kellarin seinät ovat märät",
      "lv": "Pagraba sienas ir mitras",
      "lt": "Rūsio sienos šlapios"
    },
    "sym": {
      "et": "Vesi tuleb keldrisse läbi seina või põrandaliite, sees on hallituse lõhn.",
      "en": "Water comes through the wall or the floor joint and the basement smells of mould.",
      "fi": "Vesi tulee kellariin seinän tai lattialiitoksen kautta ja sisällä haisee home.",
      "lv": "Ūdens nāk pagrabā caur sienu vai grīdas šuvi, iekšā jūtama pelējuma smaka.",
      "lt": "Vanduo į rūsį patenka pro sieną ar grindų sandūrą, viduje jaučiamas pelėsio kvapas."
    },
    "sol": {
      "et": "Pakskihtmass või membraan vundamendi välispinnale, koos vuugitäidete ja mineraalse seguga sisepinnal.",
      "en": "Thick-layer compound or membrane outside, with joint fillers and a mineral mix inside.",
      "fi": "Paksukerrosmassa tai kermi perustuksen ulkopinnalle, saumatäytteet ja mineraaliseos sisäpuolelle.",
      "lv": "Biezslāņa masa vai membrāna pamatu ārpusē, šuvju pildījumi un minerālais maisījums iekšpusē.",
      "lt": "Storasluoksnė masė arba membrana pamatų išorėje, siūlių užpildai ir mineralinis mišinys viduje."
    },
    "items": {
      "et": [
        "Lahendus nii uus- kui renoveerimisobjektile",
        "Kulunormid arvutame joonise järgi",
        "Vajadusel paigaldame ise"
      ],
      "en": [
        "For both new build and renovation",
        "We calculate consumption from your drawing",
        "We can install it ourselves"
      ],
      "fi": [
        "Sekä uudis- että korjauskohteisiin",
        "Laskemme menekin piirustuksen mukaan",
        "Tarvittaessa asennamme itse"
      ],
      "lv": [
        "Gan jaunbūvēm, gan renovācijai",
        "Aprēķinām patēriņu pēc rasējuma",
        "Vajadzības gadījumā uzstādām paši"
      ],
      "lt": [
        "Tinka tiek naujoms statyboms, tiek renovacijai",
        "Sąnaudas apskaičiuojame pagal brėžinį",
        "Prireikus sumontuojame patys"
      ]
    },
    "cat": 0
  },
  {
    "id": "vuuk",
    "layer": "L-vuuk",
    "label": {
      "et": "Betoonvuugid lekivad",
      "en": "Concrete joints leak",
      "fi": "Betonisaumat vuotavat",
      "lv": "Betona šuves tek",
      "lt": "Betono siūlės praleidžia"
    },
    "sym": {
      "et": "Elementide vahed avanevad, vuuk ei pea vett ega liikumist.",
      "en": "Gaps open between elements and the joint holds neither water nor movement.",
      "fi": "Elementtien välit avautuvat, sauma ei pidä vettä eikä liikettä.",
      "lv": "Elementu atstarpes atveras, šuve netur ne ūdeni, ne kustību.",
      "lt": "Tarpai tarp elementų prasiveria, siūlė nelaiko nei vandens, nei judesio."
    },
    "sol": {
      "et": "Vuugilindid, vuugitäited ja tihendusmassid, mis püsivad elastsed ka liikuvas vuugis.",
      "en": "Joint tapes, fillers and sealants that stay elastic in a moving joint.",
      "fi": "Saumanauhat, saumatäytteet ja tiivistysmassat, jotka pysyvät joustavina liikkuvassakin saumassa.",
      "lv": "Šuvju lentes, pildījumi un blīvēšanas masas, kas saglabā elastību arī kustīgā šuvē.",
      "lt": "Siūlių juostos, užpildai ir sandarinimo masės, išliekančios elastingos ir judančioje siūlėje."
    },
    "items": {
      "et": [
        "Töö- ja liikumisvuukidele",
        "Püsib elastne temperatuurikõikumisel",
        "Sobib ka veesurve alla"
      ],
      "en": [
        "For construction and movement joints",
        "Elastic through temperature swings",
        "Suitable under water pressure"
      ],
      "fi": [
        "Työ- ja liikuntasaumoihin",
        "Joustava lämpötilan vaihdellessa",
        "Kestää myös vedenpaineen"
      ],
      "lv": [
        "Darba un deformācijas šuvēm",
        "Elastīgs temperatūras svārstībās",
        "Der arī zem ūdens spiediena"
      ],
      "lt": [
        "Darbo ir deformacinėms siūlėms",
        "Elastinga esant temperatūros svyravimams",
        "Tinka ir esant vandens slėgiui"
      ]
    },
    "cat": 2
  },
  {
    "id": "pragu",
    "layer": "L-pragu",
    "label": {
      "et": "Asfaldis on praod",
      "en": "Cracks in the asphalt",
      "fi": "Asfaltissa on halkeamia",
      "lv": "Asfaltā ir plaisas",
      "lt": "Asfalte yra įtrūkimų"
    },
    "sym": {
      "et": "Praod laienevad iga talvega, servad murenevad ja augud tulevad tagasi.",
      "en": "Cracks widen every winter, edges crumble and the potholes come back.",
      "fi": "Halkeamat levenevät joka talvi, reunat murenevat ja kuopat palaavat.",
      "lv": "Plaisas paplašinās ar katru ziemu, malas drūp un bedres atgriežas.",
      "lt": "Įtrūkimai kas žiemą platėja, kraštai byra, o duobės sugrįžta."
    },
    "sol": {
      "et": "Praosaneerimismastiks, vuugiliim ja külm asfaltsegu — paranda enne, kui kahjustus läheb aluskihti.",
      "en": "Crack mastic, joint adhesive and cold asphalt — repair before the damage reaches the base.",
      "fi": "Halkeamamassa, saumaliima ja kylmäasfaltti — korjaa ennen kuin vaurio ulottuu alusrakenteeseen.",
      "lv": "Plaisu mastika, šuvju līme un aukstais asfalts — salabo, pirms bojājums sasniedz pamatni.",
      "lt": "Įtrūkimų mastika, siūlių klijai ir šaltas asfaltas — sutvarkyk, kol pažeidimas nepasiekė pagrindo."
    },
    "items": {
      "et": [
        "Kasutatav ka väljaspool asfaldihooaega",
        "Paigaldusseade müügiks ja rendiks",
        "Sobib teele, parklale ja platsile"
      ],
      "en": [
        "Usable outside the paving season",
        "Applicator for sale and for hire",
        "For roads, car parks and yards"
      ],
      "fi": [
        "Käytettävissä myös päällystyskauden ulkopuolella",
        "Levityslaite myyntiin ja vuokralle",
        "Teille, pysäköintialueille ja kentille"
      ],
      "lv": [
        "Izmantojams arī ārpus asfaltēšanas sezonas",
        "Uzklāšanas iekārta pārdošanai un nomai",
        "Ceļiem, stāvlaukumiem un laukumiem"
      ],
      "lt": [
        "Tinka naudoti ir ne asfaltavimo sezonu",
        "Klojimo įranga parduoti ir nuomai",
        "Keliams, aikštelėms ir statybvietėms"
      ]
    },
    "cat": 1
  },
  {
    "id": "margistus",
    "layer": "L-margistus",
    "label": {
      "et": "Märgistus on kulunud",
      "en": "Markings have worn off",
      "fi": "Merkinnät ovat kuluneet",
      "lv": "Marķējums ir nodilis",
      "lt": "Ženklinimas nusitrynęs"
    },
    "sym": {
      "et": "Parkla jooned ja nooled ei paista enam, trassid vajavad märkimist.",
      "en": "Bay lines and arrows have faded, and utility runs need marking.",
      "fi": "Pysäköintiruutujen viivat ja nuolet eivät enää näy, ja linjat kaipaavat merkintää.",
      "lv": "Stāvvietu līnijas un bultas vairs nav redzamas, komunikācijas jāmarķē.",
      "lt": "Stovėjimo vietų linijos ir rodyklės nebematomos, komunikacijas reikia paženklinti."
    },
    "sol": {
      "et": "Püsiv teekattemärgistus objektidele ja kiirkuivavad markeerimisvärvid ajutiseks tähistamiseks.",
      "en": "Durable road markings for finished sites, fast-drying sprays for temporary marking.",
      "fi": "Kestävä tiemerkintä valmiisiin kohteisiin ja nopeasti kuivuvat merkintämaalit tilapäiseen merkintään.",
      "lv": "Izturīgs ceļa marķējums gataviem objektiem un ātri žūstošas krāsas pagaidu marķēšanai.",
      "lt": "Ilgaamžis kelio ženklinimas baigtiems objektams ir greitai džiūstantys dažai laikinam žymėjimui."
    },
    "items": {
      "et": [
        "Parklad, teed ja tööstusalad",
        "Kiirkuivavad värvid kaevetöödele",
        "Paigaldame kogu Eestis"
      ],
      "en": [
        "Car parks, roads, industrial areas",
        "Fast-drying sprays for excavation",
        "We apply across Estonia"
      ],
      "fi": [
        "Pysäköintialueet, tiet ja teollisuusalueet",
        "Nopeasti kuivuvat maalit kaivuutöihin",
        "Asennamme koko Virossa"
      ],
      "lv": [
        "Stāvlaukumi, ceļi un rūpnieciskās teritorijas",
        "Ātri žūstošas krāsas rakšanas darbiem",
        "Uzklājam visā Igaunijā"
      ],
      "lt": [
        "Automobilių aikštelės, keliai ir pramonės teritorijos",
        "Greitai džiūstantys dažai kasimo darbams",
        "Dirbame visoje Estijoje"
      ]
    },
    "cat": 7
  },
  {
    "id": "porand",
    "layer": "L-porand",
    "label": {
      "et": "Tööstuspõrand vajab katet",
      "en": "Industrial floor needs a coating",
      "fi": "Teollisuuslattia vaatii pinnoitteen",
      "lv": "Rūpnieciskajai grīdai vajag pārklājumu",
      "lt": "Pramoninėms grindims reikia dangos"
    },
    "sym": {
      "et": "Põrand kulub kiiresti, aga tootmist ei saa nädalaks seisma panna.",
      "en": "The floor wears fast, but production cannot stop for a week.",
      "fi": "Lattia kuluu nopeasti, mutta tuotantoa ei voi pysäyttää viikoksi.",
      "lv": "Grīda ātri nolietojas, bet ražošanu nevar apturēt uz nedēļu.",
      "lt": "Grindys greitai dėvisi, bet gamybos savaitei sustabdyti negalima."
    },
    "sol": {
      "et": "SILIKAL metakrülaatvaigud kivistuvad umbes tunniga — pind on samal päeval kasutatav.",
      "en": "SILIKAL methacrylate resins cure in about an hour — the floor is usable the same day.",
      "fi": "SILIKAL-metakrylaattihartsit kovettuvat noin tunnissa — lattia on käytettävissä samana päivänä.",
      "lv": "SILIKAL metakrilāta sveķi sacietē aptuveni stundas laikā — grīda ir lietojama tajā pašā dienā.",
      "lt": "SILIKAL metakrilato dervos sukietėja maždaug per valandą — grindimis galima naudotis tą pačią dieną."
    },
    "items": {
      "et": [
        "Kivistub ka madalal temperatuuril",
        "Keemia- ja kulumiskindel",
        "Sobib ka sillakatenditele"
      ],
      "en": [
        "Cures even at low temperatures",
        "Chemical and abrasion resistant",
        "Also used on bridge decks"
      ],
      "fi": [
        "Kovettuu myös matalassa lämpötilassa",
        "Kemikaali- ja kulutuskestävä",
        "Sopii myös siltakansille"
      ],
      "lv": [
        "Sacietē arī zemā temperatūrā",
        "Izturīgs pret ķimikālijām un nodilumu",
        "Der arī tiltu segumiem"
      ],
      "lt": [
        "Sukietėja ir esant žemai temperatūrai",
        "Atsparus chemikalams ir dilimui",
        "Tinka ir tiltų dangoms"
      ]
    },
    "cat": 4
  },
  {
    "id": "pollumajandus",
    "layer": "L-siilo",
    "label": {
      "et": "Silo söövitab betooni",
      "en": "Silage is eating the concrete",
      "fi": "Rehu syövyttää betonia",
      "lv": "Skābbarība grauž betonu",
      "lt": "Silosas ėda betoną"
    },
    "sym": {
      "et": "Silo- ja sõnnikuhoidla seinad murenevad käärimishapete ja soola mõjul.",
      "en": "Silage and manure store walls crumble under fermentation acids and salt.",
      "fi": "Säilörehu- ja lantavarastojen seinät murenevat käymishappojen ja suolan vaikutuksesta.",
      "lv": "Skābbarības un kūtsmēslu krātuvju sienas drūp rūgšanas skābju un sāls ietekmē.",
      "lt": "Siloso ir mėšlo saugyklų sienos byra dėl rūgimo rūgščių ir druskos poveikio."
    },
    "sol": {
      "et": "Eritooted pinnakaitseks, mis peavad vastu hapetele, soolale ja pidevale niiskusele.",
      "en": "Special coatings that withstand acids, salt and constant moisture.",
      "fi": "Erikoispinnoitteet, jotka kestävät happoja, suolaa ja jatkuvaa kosteutta.",
      "lv": "Īpašie pārklājumi, kas iztur skābes, sāli un pastāvīgu mitrumu.",
      "lt": "Specialios dangos, atsparios rūgštims, druskai ir nuolatinei drėgmei."
    },
    "items": {
      "et": [
        "Põllumajandushoonetele ja loomapidamisele",
        "Kaitseb betooni söövituse eest",
        "Uuendatav ka kasutuses olevas hoones"
      ],
      "en": [
        "For farm buildings and livestock housing",
        "Protects concrete from corrosion",
        "Can be renewed in a building in use"
      ],
      "fi": [
        "Maatalousrakennuksiin ja eläinsuojiin",
        "Suojaa betonia syöpymiseltä",
        "Uusittavissa myös käytössä olevassa rakennuksessa"
      ],
      "lv": [
        "Lauksaimniecības ēkām un lopu novietnēm",
        "Aizsargā betonu no korozijas",
        "Atjaunojams arī ekspluatācijā esošā ēkā"
      ],
      "lt": [
        "Žemės ūkio pastatams ir gyvulių laikymo patalpoms",
        "Saugo betoną nuo korozijos",
        "Atnaujinama ir naudojamame pastate"
      ]
    },
    "cat": 5
  }
];

/* ============ Tõlked ============ */
const T = {
  "et": {},
  "en": {
    "nav1": "Find a solution",
    "nav2": "Products",
    "nav3": "Services",
    "nav4": "Projects",
    "nav5": "BORNIT®",
    "nav6": "Contact",
    "ctaTop": "Get a quote",
    "h1a": "Materials that keep",
    "h1b": "water out and the road",
    "h1c": "together.",
    "heroP": "Official BORNIT® representative in the Baltics and Finland. Project sales of bituminous materials to road builders, contractors and property owners — with technical advice and installation.",
    "heroBtn1": "Show me where the problem is",
    "heroBtn2": "Get a quote",
    "m1": "BORNIT® factory in Zwickau",
    "m2": "markets: Estonia, Latvia, Lithuania, Finland",
    "m3": "product groups in stock and to order",
    "m4": "we answer within one working day",
    "ey1": "Find a solution",
    "ey2": "Product groups",
    "ey3": "Services",
    "ey4": "Projects",
    "ey5": "Manufacturer",
    "ey6": "Request a quote",
    "f-h2": "Show us where the problem is. We'll name the material.",
    "f-lede": "Pick the spot on the drawing that leaks, cracks or needs protection. We show the material that belongs there and take you straight to the right product group.",
    "f-or": "Or pick a situation from the list:",
    "p-h2": "The full BORNIT® range, sorted by the job",
    "p-lede": "Each group holds technical data sheets, consumption rates and application instructions.",
    "s-h2": "We sell the material and install it ourselves",
    "s1h": "Project sales",
    "s1p": "We pick the right material for the site, calculate consumption and deliver to the yard.",
    "s2h": "Installation",
    "s2p": "We install what we sell: waterproofing, joints, crack repair and markings.",
    "s3h": "Equipment",
    "s3p": "Applicators for joint adhesive and crack mastic, and bitumen boilers — for sale and hire.",
    "s4h": "Technical advice",
    "s4p": "Technical data sheets, consumption rates and installation instructions before you order.",
    "w-h2": "Sites where the material is already at work",
    "w1h": "Shopping centre car park",
    "w1m": "Joint adhesive, crack repair and markings — Harju county",
    "w2h": "Apartment building basement",
    "w2m": "Foundation waterproofing with thick-layer compound — Tartu",
    "w3h": "Viaduct deck waterproofing",
    "w3m": "Bitumen membrane and joint sealing — Ida-Viru county",
    "b-h2": "Five generations of bitumen from Zwickau",
    "b-p1": "BORNIT-Werk Aschenborn GmbH began in 1868 as a roofing felt and asphalt factory founded by Alwin Aschenborn. Today it is a modern construction chemicals manufacturer whose products rest mainly on its own research and development.",
    "b-p2": "Bornit Baltic OÜ represents BORNIT® in Estonia, Latvia, Lithuania and Finland — the same range, local stock and technical support in your language.",
    "b-f1": "Year the factory was founded",
    "b-f2": "generations of family production",
    "b-f3": "BORNIT® factory in Zwickau, Germany",
    "b-f4": "representative for the Baltics and Finland",
    "k-h2": "Describe the site, we'll send a price",
    "k-lede": "The type of site and a rough quantity is enough. If you need it, we help choose the material and calculate consumption.",
    "l-nm": "Name",
    "l-co": "Company",
    "l-em": "Email",
    "l-ph": "Phone",
    "l-ob": "Site and approximate quantity",
    "l-ms": "Message",
    "l-send": "Send enquiry",
    "ph-ob": "e.g. 340 m² of basement wall, work in August",
    "f-about": "Bornit Baltic OÜ — representative of the BORNIT® brand in the Baltics and Finland.",
    "f-t1": "Products",
    "f-t2": "Company",
    "f-t3": "Contact",
    "f-legal": "BORNIT® is a registered trademark of BORNIT-Werk Aschenborn GmbH.",
    "aAdd": "Add to enquiry",
    "aAdded": "Added",
    "aView": "View products",
    "aPick": "Pick a spot on the drawing",
    "aPickP": "Choose the place that leaks, cracks or needs protection — we'll show the material that belongs there.",
    "doneH": "Enquiry sent",
    "doneP": "We'll come back to you within one working day. For anything urgent, call +372 526 5087."
  },
  "fi": {
    "nav1": "Etsi ratkaisu",
    "nav2": "Tuotteet",
    "nav3": "Palvelut",
    "nav4": "Referenssit",
    "nav5": "BORNIT®",
    "nav6": "Yhteystiedot",
    "ctaTop": "Pyydä tarjous",
    "heroBtn1": "Näytä missä ongelma on",
    "heroBtn2": "Pyydä tarjous",
    "ey1": "Ratkaisun haku",
    "ey2": "Tuoteryhmät",
    "ey3": "Palvelut",
    "ey4": "Referenssit",
    "ey5": "Valmistaja",
    "ey6": "Tarjouspyyntö",
    "f-or": "Tai valitse tilanne listasta:",
    "l-send": "Lähetä pyyntö",
    "f-t1": "Tuotteet",
    "f-t2": "Yritys",
    "f-t3": "Yhteystiedot",
    "aAdd": "Lisää pyyntöön",
    "aAdded": "Lisätty",
    "aView": "Katso tuotteet",
    "aPick": "Valitse kohta piirroksesta",
    "h1a": "Materiaalit, jotka pitävät",
    "h1b": "veden poissa ja tien",
    "h1c": "kasassa.",
    "heroP": "BORNIT®-tuotteiden virallinen edustaja Baltiassa ja Suomessa. Bitumimateriaalien projektimyynti tienrakentajille, rakennusliikkeille ja kiinteistönomistajille — teknisen neuvonnan ja asennuksen kanssa.",
    "m1": "BORNIT®-tehdas Zwickaussa",
    "m2": "markkinaa: Viro, Latvia, Liettua, Suomi",
    "m3": "tuoteryhmää varastossa ja tilauksesta",
    "m4": "vastaamme kyselyyn yhden työpäivän kuluessa",
    "f-h2": "Näytä, missä ongelma on. Kerromme, mikä siihen sopii.",
    "f-lede": "Valitse piirroksesta kohta, joka vuotaa, halkeilee tai kaipaa suojaa. Näytämme, mikä materiaali siihen kuuluu, ja viemme suoraan oikeaan tuoteryhmään.",
    "p-h2": "Koko BORNIT®-valikoima, jaoteltuna työn mukaan",
    "p-lede": "Jokaisen ryhmän alla ovat tekniset tuotetiedot, menekit ja asennusohjeet.",
    "s-h2": "Myymme materiaalin ja asennamme sen itse",
    "s1h": "Projektimyynti",
    "s1p": "Valitsemme kohteeseen sopivan materiaalin, laskemme menekin ja toimitamme suoraan työmaalle.",
    "s2h": "Asennus",
    "s2p": "Asennamme myymämme materiaalit: vedeneristys, saumat, halkeamat, merkinnät.",
    "s3h": "Laitteet",
    "s3p": "Saumaliiman ja halkeamamassan levityslaitteet sekä bitumipadat — myyntiin ja vuokralle.",
    "s4h": "Tekninen neuvonta",
    "s4p": "Tekniset tietolehdet, menekit ja asennusohjeet ennen tilausta.",
    "w-h2": "Kohteet, joissa materiaali on jo työssä",
    "w1h": "Kauppakeskuksen pysäköintialue",
    "w1m": "Saumaliima, halkeamien korjaus ja merkinnät — Harjumaa",
    "w2h": "Kerrostalon kellarin saneeraus",
    "w2m": "Perustusten vedeneristys paksukerrosmassalla — Tartto",
    "w3h": "Ylikulkusillan päällysteen vedeneristys",
    "w3m": "Bitumikermi ja saumatiivistys — Ida-Virumaa",
    "b-h2": "Viisi sukupolvea bitumia Zwickausta",
    "b-p1": "BORNIT-Werk Aschenborn GmbH sai alkunsa vuonna 1868 Alwin Aschenbornin perustamasta kattohuopa- ja asfalttitehtaasta. Tänään se on nykyaikainen rakennuskemian valmistaja, jonka tuotteet perustuvat pääosin omaan tutkimus- ja kehitystyöhön.",
    "b-p2": "Bornit Baltic OÜ edustaa BORNIT®-merkkiä Virossa, Latviassa, Liettuassa ja Suomessa — sama valikoima, paikallinen varasto ja tekninen tuki omalla kielelläsi.",
    "b-f1": "Tehtaan perustamisvuosi",
    "b-f2": "sukupolvea perheyritystä",
    "b-f3": "BORNIT®-tehdas sijaitsee Zwickaussa, Saksassa",
    "b-f4": "edustaja Baltiassa ja Suomessa",
    "k-h2": "Kerro kohteesta, lähetämme hinnan",
    "k-lede": "Kohteen tyyppi ja suuntaa-antava määrä riittävät. Tarvittaessa autamme materiaalin valinnassa ja laskemme menekin puolestasi.",
    "l-nm": "Nimi",
    "l-co": "Yritys",
    "l-em": "Sähköposti",
    "l-ph": "Puhelin",
    "l-ob": "Kohde ja arvioitu määrä",
    "l-ms": "Viesti",
    "ph-ob": "Esim. 340 m² kellarin seinää, työt elokuussa",
    "f-about": "Bornit Baltic OÜ — BORNIT®-tavaramerkin edustaja Baltiassa ja Suomessa.",
    "f-legal": "BORNIT® on BORNIT-Werk Aschenborn GmbH:n rekisteröity tavaramerkki.",
    "aPickP": "Valitse kohta, joka vuotaa, halkeilee tai kaipaa suojaa — näytämme, mikä materiaali siihen kuuluu.",
    "doneH": "Kysely lähetetty",
    "doneP": "Vastaamme yhden työpäivän kuluessa. Kiireellisissä asioissa soita +372 526 5087."
  },
  "lv": {
    "nav1": "Atrast risinājumu",
    "nav2": "Produkti",
    "nav3": "Pakalpojumi",
    "nav4": "Objekti",
    "nav5": "BORNIT®",
    "nav6": "Kontakti",
    "ctaTop": "Pieprasīt cenu",
    "heroBtn1": "Parādi, kur ir problēma",
    "heroBtn2": "Pieprasīt cenu",
    "ey1": "Risinājuma meklēšana",
    "ey2": "Produktu grupas",
    "ey3": "Pakalpojumi",
    "ey4": "Objekti",
    "ey5": "Ražotājs",
    "ey6": "Cenu pieprasījums",
    "f-or": "Vai izvēlies situāciju no saraksta:",
    "l-send": "Nosūtīt pieprasījumu",
    "f-t1": "Produkti",
    "f-t2": "Uzņēmums",
    "f-t3": "Kontakti",
    "aAdd": "Pievienot pieprasījumam",
    "aAdded": "Pievienots",
    "aView": "Skatīt produktus",
    "aPick": "Izvēlies vietu zīmējumā",
    "h1a": "Materiāli, kas notur",
    "h1b": "ūdeni ārpusē un ceļu",
    "h1c": "veselu.",
    "heroP": "Oficiālais BORNIT® pārstāvis Baltijā un Somijā. Bitumena materiālu projektu pārdošana ceļu būvētājiem, būvuzņēmumiem un īpašumu īpašniekiem — kopā ar tehniskajām konsultācijām un montāžu.",
    "m1": "BORNIT® rūpnīca Cvikavā",
    "m2": "tirgi: Igaunija, Latvija, Lietuva, Somija",
    "m3": "produktu grupas noliktavā un pēc pasūtījuma",
    "m4": "atbildam uz pieprasījumu vienas darba dienas laikā",
    "f-h2": "Parādi, kur ir problēma. Pateiksim, kas tur der.",
    "f-lede": "Izvēlies zīmējumā vietu, kas tek, plaisā vai kam vajadzīga aizsardzība. Parādīsim, kurš materiāls tur der, un aizvedīsim uz pareizo produktu grupu.",
    "p-h2": "Viss BORNIT® klāsts, sakārtots pēc darba veida",
    "p-lede": "Katrā grupā ir tehniskās datu lapas, patēriņa normas un montāžas instrukcijas.",
    "s-h2": "Pārdodam materiālu un uzstādām to paši",
    "s1h": "Projektu pārdošana",
    "s1p": "Izvēlamies objektam piemērotu materiālu, aprēķinām patēriņu un piegādājam tieši uz būvlaukumu.",
    "s2h": "Montāža",
    "s2p": "Veicam pārdoto materiālu montāžu: hidroizolācija, šuves, plaisas, marķējums.",
    "s3h": "Iekārtas",
    "s3p": "Šuvju līmes un plaisu mastikas uzklāšanas iekārtas un bitumena katli — pārdošanai un nomai.",
    "s4h": "Tehniskās konsultācijas",
    "s4p": "Tehniskās datu lapas, patēriņa normas un uzstādīšanas instrukcijas pirms pasūtīšanas.",
    "w-h2": "Objekti, kur materiāls jau strādā",
    "w1h": "Tirdzniecības centra stāvlaukums",
    "w1m": "Šuvju līme, plaisu remonts un marķējums — Harjumaa",
    "w2h": "Daudzdzīvokļu mājas pagraba renovācija",
    "w2m": "Pamatu hidroizolācija ar biezslāņa masu — Tartu",
    "w3h": "Viadukta seguma hidroizolācija",
    "w3m": "Bitumena membrāna un šuvju blīvēšana — Ida-Virumaa",
    "b-h2": "Piecas paaudzes bitumena no Cvikavas",
    "b-p1": "BORNIT-Werk Aschenborn GmbH sākās 1868. gadā ar Alvina Ašenborna dibinātu jumta papes un asfalta rūpnīcu. Šodien tas ir mūsdienīgs būvķīmijas ražotājs, kura produkti balstās galvenokārt uz paša pētniecību un attīstību.",
    "b-p2": "Bornit Baltic OÜ pārstāv BORNIT® Igaunijā, Latvijā, Lietuvā un Somijā — tas pats klāsts, vietēja noliktava un tehniskais atbalsts tavā valodā.",
    "b-f1": "Rūpnīcas dibināšanas gads",
    "b-f2": "paaudzes ģimenes ražošanas",
    "b-f3": "BORNIT® rūpnīca atrodas Cvikavā, Vācijā",
    "b-f4": "pārstāvis Baltijā un Somijā",
    "k-h2": "Apraksti objektu, nosūtīsim cenu",
    "k-lede": "Pietiek ar objekta veidu un aptuvenu daudzumu. Ja vajag, palīdzēsim izvēlēties materiālu un aprēķināsim patēriņu.",
    "l-nm": "Vārds",
    "l-co": "Uzņēmums",
    "l-em": "E-pasts",
    "l-ph": "Tālrunis",
    "l-ob": "Objekts un aptuvens daudzums",
    "l-ms": "Ziņa",
    "ph-ob": "Piem. 340 m² pagraba sienas, darbi augustā",
    "f-about": "Bornit Baltic OÜ — BORNIT® preču zīmes pārstāvis Baltijā un Somijā.",
    "f-legal": "BORNIT® ir BORNIT-Werk Aschenborn GmbH reģistrēta preču zīme.",
    "aPickP": "Izvēlies vietu, kas tek, plaisā vai kam vajadzīga aizsardzība — parādīsim, kurš materiāls tur der.",
    "doneH": "Pieprasījums nosūtīts",
    "doneP": "Atbildēsim vienas darba dienas laikā. Steidzamos jautājumos zvani +372 526 5087."
  },
  "lt": {
    "nav1": "Rasti sprendimą",
    "nav2": "Produktai",
    "nav3": "Paslaugos",
    "nav4": "Objektai",
    "nav5": "BORNIT®",
    "nav6": "Kontaktai",
    "ctaTop": "Gauti kainą",
    "heroBtn1": "Parodyk, kur problema",
    "heroBtn2": "Gauti kainą",
    "ey1": "Sprendimo paieška",
    "ey2": "Produktų grupės",
    "ey3": "Paslaugos",
    "ey4": "Objektai",
    "ey5": "Gamintojas",
    "ey6": "Kainos užklausa",
    "f-or": "Arba pasirink situaciją iš sąrašo:",
    "l-send": "Siųsti užklausą",
    "f-t1": "Produktai",
    "f-t2": "Įmonė",
    "f-t3": "Kontaktai",
    "aAdd": "Pridėti prie užklausos",
    "aAdded": "Pridėta",
    "aView": "Žiūrėti produktus",
    "aPick": "Pasirink vietą brėžinyje",
    "h1a": "Medžiagos, kurios neįleidžia",
    "h1b": "vandens ir laiko kelią",
    "h1c": "vientisą.",
    "heroP": "Oficialus BORNIT® atstovas Baltijos šalyse ir Suomijoje. Bituminių medžiagų projektinis pardavimas kelininkams, statybos bendrovėms ir nekilnojamojo turto savininkams — su technine konsultacija ir montavimu.",
    "m1": "BORNIT® gamykla Cvikau",
    "m2": "rinkos: Estija, Latvija, Lietuva, Suomija",
    "m3": "produktų grupės sandėlyje ir pagal užsakymą",
    "m4": "atsakome į užklausą per vieną darbo dieną",
    "f-h2": "Parodyk, kur problema. Pasakysime, kas čia tinka.",
    "f-lede": "Pasirink brėžinyje vietą, kuri praleidžia vandenį, trūkinėja ar reikalauja apsaugos. Parodysime, kuri medžiaga čia tinka, ir nuvesime tiesiai į reikiamą produktų grupę.",
    "p-h2": "Visas BORNIT® asortimentas, suskirstytas pagal darbą",
    "p-lede": "Kiekvienoje grupėje yra techniniai duomenų lapai, sąnaudų normos ir montavimo instrukcijos.",
    "s-h2": "Parduodame medžiagą ir patys ją sumontuojame",
    "s1h": "Projektinis pardavimas",
    "s1p": "Parenkame objektui tinkamą medžiagą, apskaičiuojame sąnaudas ir pristatome tiesiai į statybvietę.",
    "s2h": "Montavimas",
    "s2p": "Montuojame parduodamas medžiagas: hidroizoliacija, siūlės, įtrūkimai, ženklinimas.",
    "s3h": "Įranga",
    "s3p": "Siūlių klijų ir įtrūkimų mastikos klojimo įranga bei bitumo katilai — parduoti ir nuomai.",
    "s4h": "Techninės konsultacijos",
    "s4p": "Duomenų lapai, sąnaudų normos ir montavimo instrukcijos tavo kalba, dar prieš užsakant.",
    "w-h2": "Objektai, kuriuose medžiaga jau dirba",
    "w1h": "Prekybos centro automobilių aikštelė",
    "w1m": "Siūlių klijai, įtrūkimų remontas ir ženklinimas — Harjumaa",
    "w2h": "Daugiabučio rūsio renovacija",
    "w2m": "Pamatų hidroizoliacija storasluoksne mase — Tartu",
    "w3h": "Viaduko dangos hidroizoliacija",
    "w3m": "Bitumo membrana ir siūlių sandarinimas — Ida-Virumaa",
    "b-h2": "Penkios kartos bitumo iš Cvikau",
    "b-p1": "BORNIT-Werk Aschenborn GmbH prasidėjo 1868 metais nuo Alwino Aschenborno įkurtos stogo dangos ir asfalto gamyklos. Šiandien tai modernus statybinės chemijos gamintojas, kurio produktai remiasi daugiausia savais moksliniais tyrimais ir plėtra.",
    "b-p2": "Bornit Baltic OÜ atstovauja BORNIT® Estijoje, Latvijoje, Lietuvoje ir Suomijoje — tas pats asortimentas, vietinis sandėlis ir techninė pagalba tavo kalba.",
    "b-f1": "Gamyklos įkūrimo metai",
    "b-f2": "kartos šeimos gamybos",
    "b-f3": "pagaminta Vokietijoje, Cvikau",
    "b-f4": "atstovas Baltijos šalyse ir Suomijoje",
    "k-h2": "Aprašyk objektą, atsiųsime kainą",
    "k-lede": "Užtenka objekto tipo ir apytikslio kiekio. Jei reikia, padėsime parinkti medžiagą ir apskaičiuosime sąnaudas.",
    "l-nm": "Vardas",
    "l-co": "Įmonė",
    "l-em": "El. paštas",
    "l-ph": "Telefonas",
    "l-ob": "Objektas ir apytikslis kiekis",
    "l-ms": "Žinutė",
    "ph-ob": "Pvz. 340 m² rūsio sienos, darbai rugpjūtį",
    "f-about": "Bornit Baltic OÜ — BORNIT® prekės ženklo atstovas Baltijos šalyse ir Suomijoje.",
    "f-legal": "BORNIT® yra registruotas BORNIT-Werk Aschenborn GmbH prekės ženklas.",
    "aPickP": "Pasirink vietą, kuri praleidžia vandenį, trūkinėja ar reikalauja apsaugos — parodysime, kuri medžiaga čia tinka.",
    "doneH": "Užklausa išsiųsta",
    "doneP": "Atsakysime per vieną darbo dieną. Skubiais klausimais skambink +372 526 5087."
  }
};
const ET_DEFAULTS = {aAdd:"Lisa päringusse",aAdded:"Lisatud",aView:"Vaata tooteid",aPick:"Vali jooniselt koht",
  aPickP:"Vali koht, mis lekib, praguneb või vajab kaitset — näitame, milline materjal sinna kuulub.",
  doneH:"Päring saadetud",doneP:"Vastame tööpäeva jooksul. Kiire asja korral helista +372 526 5087."};

/* Keel tuleb serverist (<html lang>): igal keelel on oma URL (/en, /fi, /lv). */
let LANG = (document.documentElement.lang || "et").slice(0,2);
const PREFIX = LANG === "et" ? "" : "/" + LANG;
const lp = href => (href && href.startsWith("/") && !href.startsWith("//")) ? (PREFIX && href === "/" ? PREFIX : PREFIX + href) : href;
const ET_SNAP = new Map();
document.querySelectorAll("[data-i18n]").forEach(el=>ET_SNAP.set(el,el.textContent));
document.querySelectorAll("[data-i18n-ph]").forEach(el=>ET_SNAP.set(el,el.placeholder));

function t(key){
  if(LANG==="et") return ET_DEFAULTS[key] ?? "";
  return T[LANG]?.[key] ?? T.en?.[key] ?? ET_DEFAULTS[key] ?? "";
}
function loc(obj){ return obj[LANG] || obj.en || obj.et; }

function setLang(l){
  LANG = l;
  document.documentElement.lang = l;
  document.getElementById("langNow").textContent = l.toUpperCase();
  document.querySelectorAll("#lang [data-lang]").forEach(b=>b.setAttribute("aria-current", b.dataset.lang===l));
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.dataset.i18n;
    el.textContent = (l==="et") ? ET_SNAP.get(el) : (T[l]?.[k] ?? T.en?.[k] ?? ET_SNAP.get(el));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const k = el.dataset.i18nPh;
    el.placeholder = (l==="et") ? ET_SNAP.get(el) : (T[l]?.[k] ?? T.en?.[k] ?? ET_SNAP.get(el));
  });
  buildIndex(); buildSymptoms(); renderAnswer(current);
}

/* ---------- product index ---------- */
function buildIndex(){
  const host = document.getElementById("idx");
  if(host) host.innerHTML = CATEGORIES.map(c=>`
    <a href="${lp(c.href)}">
      <span class="ico"><svg><use href="#${c.icon}"/></svg></span>
      <span class="nm">${loc(c.nm)}</span>
      <span class="ds">${loc(c.ds)}</span>
      <span class="go"><svg><use href="#i-arrow"/></svg></span>
    </a>`).join("");
  const fCats = document.getElementById("fCats");
  if(fCats) fCats.innerHTML =
    CATEGORIES.slice(0,5).map(c=>`<li><a href="${lp(c.href)}">${loc(c.nm)}</a></li>`).join("");
}

/* ---------- finder ---------- */
let current = null;
function buildSymptoms(){
  const host = document.getElementById("symptoms");
  if(!host) return;
  host.innerHTML =
    SPOTS.map(s=>`<button type="button" data-pick="${s.id}"${current===s.id?' class="on"':''}>${loc(s.label)}</button>`).join("");
}
function renderAnswer(id){
  const box = document.getElementById("answer");
  if(!box) return;
  const s = SPOTS.find(x=>x.id===id);
  if(!s){
    box.innerHTML = `<div class="tag">01</div><h3>${t("aPick")}</h3><p class="sol">${t("aPickP")}</p>`;
    box.querySelector(".tag").textContent = "";
    return;
  }
  const cat = CATEGORIES[s.cat];
  box.innerHTML = `
    <div class="tag">${loc(cat.nm)}</div>
    <h3>${loc(s.label)}</h3>
    <p class="sym">${loc(s.sym)}</p>
    <p class="sol">${loc(s.sol)}</p>
    <ul>${loc(s.items).map(i=>`<li>${i}</li>`).join("")}</ul>
    <div class="acts">
      <a class="btn btn-primary" href="${lp(cat.href)}">${t("aView")}</a>
    </div>`;
  box.classList.remove("fade-swap"); void box.offsetWidth; box.classList.add("fade-swap");
}
function select(id){
  current = id;
  document.querySelectorAll(".spot").forEach(g=>g.classList.toggle("on", g.dataset.spot===id));
  document.querySelectorAll("#symptoms button").forEach(b=>b.classList.toggle("on", b.dataset.pick===id));
  const s = SPOTS.find(x=>x.id===id);
  document.querySelectorAll(".layer").forEach(l=>l.classList.add("dim"));
  if(s) document.getElementById(s.layer)?.classList.remove("dim");
  renderAnswer(id);
}
document.querySelectorAll(".spot").forEach(g=>{
  g.addEventListener("click",()=>select(g.dataset.spot));
  g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();select(g.dataset.spot);}});
});
document.getElementById("symptoms")?.addEventListener("click",e=>{
  const b = e.target.closest("[data-pick]"); if(b) select(b.dataset.pick);
});

/* ---------- form ---------- */
document.getElementById("ask")?.addEventListener("submit",async e=>{
  e.preventDefault();
  const f = e.target;
  if(!f.nm.value.trim() || !f.em.value.trim()){
    (!f.nm.value.trim() ? f.nm : f.em).focus(); return;
  }
  const btn = f.querySelector("button[type=submit]");
  if(btn){ btn.disabled = true; btn.dataset.was = btn.textContent; btn.textContent = "Saadan..."; }
  try{
    const res = await fetch("/paring/saada",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        name: f.nm.value, company: f.co.value, email: f.em.value,
        phone: f.ph.value, quantity: f.ob.value, message: f.ms.value,
        productTitle: "Avalehe hinnaparing", sourceUrl: location.pathname, locale: LANG
      })
    });
    const data = await res.json();
    if(!data.ok) throw new Error(data.message || "viga");
    document.getElementById("formHost").innerHTML =
      `<div class="done"><h3>${t("doneH")}</h3><p>${t("doneP")}</p></div>`;
  }catch(err){
    if(btn){ btn.disabled = false; btn.textContent = btn.dataset.was || "Saada paring"; }
    let box = f.querySelector(".form-error");
    if(!box){ box = document.createElement("p"); box.className = "form-error"; f.appendChild(box); }
    box.textContent = "Saatmine ebaonnestus. Palun helista +372 526 5087 voi kirjuta info@bornitbaltic.ee";
  }
});

/* ---------- keelevalik pysib ja jouab serverisse ---------- */
const LANGS = ["et","en","fi","lv","lt"];
function rememberLang(l){
  if(!LANGS.includes(l)) return;
  try{ localStorage.setItem("bornit_lang", l); }catch(e){}
  // kupsis laheb kaasa ka serveripoolsele renderdusele (tooted, kategooriad)
  document.cookie = "bornit_lang=" + l + ";path=/;max-age=" + 60*60*24*365 + ";samesite=lax";
}
function storedLang(){
  const m = document.cookie.match(/(?:^|;\s*)bornit_lang=([a-z]{2})/);
  if(m && LANGS.includes(m[1])) return m[1];
  try{ const v = localStorage.getItem("bornit_lang"); if(v && LANGS.includes(v)) return v; }catch(e){}
  return null;
}

/* ---------- header / nav ---------- */
const burger = document.getElementById("burger"), nav = document.getElementById("nav");
if(burger && nav){
  burger.addEventListener("click",()=>{burger.classList.toggle("on");nav.classList.toggle("open");});
  nav.addEventListener("click",e=>{if(e.target.tagName==="A"){burger.classList.remove("on");nav.classList.remove("open");}});
}
const lang = document.getElementById("lang");
if(lang){
  lang.querySelector("button").addEventListener("click",()=>{
    lang.classList.toggle("open");
    lang.querySelector("button").setAttribute("aria-expanded", lang.classList.contains("open"));
  });
  // keelevaliku lingid viivad sama lehe teise keeleversiooni; kypsis jatab valiku meelde
  lang.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{rememberLang(b.dataset.lang);}));
  document.addEventListener("click",e=>{if(!lang.contains(e.target))lang.classList.remove("open");});
}

const links = [...document.querySelectorAll("nav.main a")];
const hashOf = a => { const h = a.getAttribute("href") || ""; const i = h.indexOf("#"); return i < 0 ? "" : h.slice(i); };
const secs = links.map(a=>{ const h = hashOf(a); return h.length > 1 ? document.querySelector(h) : null; }).filter(Boolean);
const io = new IntersectionObserver(es=>{
  es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle("on", hashOf(a)==="#"+en.target.id));}});
},{rootMargin:"-45% 0px -50% 0px"});
secs.forEach(s=>io.observe(s));

/* ---------- reveal ---------- */
const rv = new IntersectionObserver(es=>{
  es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");rv.unobserve(en.target);}});
},{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>rv.observe(el));

const yr = document.getElementById("yr");
if(yr) yr.textContent = new Date().getFullYear();
buildIndex(); buildSymptoms(); renderAnswer(null);

// keel on URL-is; leht tuleb serverist juba oiges keeles
rememberLang(LANG);

/* ---- */

