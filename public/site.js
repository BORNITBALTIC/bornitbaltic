/* ============ SISU: siit haldab klient tootegruppe ============ */
const CATEGORIES = [
  {icon:"i-hydro",   href:"/tootekategooria/vundamendi-hudroisolatsioon/", nm:{et:"Vundamendi hüdroisolatsioon",en:"Foundation waterproofing",fi:"Perustusten vedeneristys",lv:"Pamatu hidroizolācija",lt:"Pamatų hidroizoliacija"}, ds:{et:"Membraanid, pakskihtmassid, võõbad, kaitsekihid ja mineraalsed segud.",en:"Membranes, thick-layer compounds, primers, protection boards and mineral mixes."}},
  {icon:"i-road",    href:"/tootekategooria/teedeehituses-kasutatavad-tooted/", nm:{et:"Teedeehituses kasutatavad tooted",en:"Road construction products",fi:"Tienrakennustuotteet",lv:"Ceļu būves produkti",lt:"Kelių tiesimo produktai"}, ds:{et:"Vuugiliimid, vuugilindid, külmad asfaltsegud ja praoparandusmaterjalid.",en:"Joint adhesives, joint tapes, cold asphalt mixes and crack repair materials."}},
  {icon:"i-joint",   href:"/tootekategooria/vuugitihendustooted/", nm:{et:"Vuugitihendustooted",en:"Joint sealing",fi:"Saumatiivisteet",lv:"Šuvju blīvēšana",lt:"Siūlių sandarinimas"}, ds:{et:"Tihendusmassid ja vuugitäited betoonvuukidele ning liitekohtadele.",en:"Sealants and joint fillers for concrete joints and connections."}},
  {icon:"i-roof",    href:"/tootekategooria/katuse-saneerimistooted/", nm:{et:"Katuse saneerimistooted",en:"Roof renovation",fi:"Katon saneeraus",lv:"Jumtu renovācija",lt:"Stogų renovacija"}, ds:{et:"Võõbad ja katted vana katusekatte parandamiseks ilma lammutamata.",en:"Coatings that renew an old roof without tearing it off."}},
  {icon:"i-silikal", href:"/tootekategooria/silikal-tooted/", nm:{et:"SILIKAL tooted",en:"SILIKAL products",fi:"SILIKAL-tuotteet",lv:"SILIKAL produkti",lt:"SILIKAL produktai"}, ds:{et:"Metakrülaatvaigud, mis kivistuvad tunniga — põrandad ja sillakatendid.",en:"Methacrylate resins that cure within the hour — floors and bridge decks."}},
  {icon:"i-special", href:"/tootekategooria/eritooted/", nm:{et:"Eritooted",en:"Special products",fi:"Erikoistuotteet",lv:"Īpašie produkti",lt:"Specialūs produktai"}, ds:{et:"Kaitse soola, niiskuse ja käärimishapete eest, sh põllumajanduses.",en:"Protection against salt, moisture and fermentation acids, incl. agriculture."}},
  {icon:"i-spray",   href:"/tootekategooria/markeerimisvarvid/", nm:{et:"Markeerimisvärvid",en:"Marking paints",fi:"Merkintämaalit",lv:"Marķēšanas krāsas",lt:"Žymėjimo dažai"}, ds:{et:"Kiirkuivavad värvid trasside, kaevetööde ja platside märkimiseks.",en:"Fast-drying sprays for utilities, excavation and site marking."}},
  {icon:"i-marking", href:"/tootekategooria/teekattemargistus/", nm:{et:"Teekattemärgistus",en:"Road markings",fi:"Tiemerkinnät",lv:"Ceļa marķējums",lt:"Kelio ženklinimas"}, ds:{et:"Püsimärgistus parklatele, teedele ja tööstusaladele.",en:"Durable markings for car parks, roads and industrial areas."}},
  {icon:"i-tool",    href:"/tootekategooria/bornit-tooriistad/", nm:{et:"BORNIT tööriistad",en:"BORNIT tools",fi:"BORNIT-työkalut",lv:"BORNIT instrumenti",lt:"BORNIT įrankiai"}, ds:{et:"Paigaldustööriistad ja tarvikud BORNIT®-i materjalidele.",en:"Application tools and accessories for BORNIT® materials."}},
  {icon:"i-grun",    href:"/tootekategooria/grun-tooriistad/", nm:{et:"GRÜN tööriistad",en:"GRÜN equipment",fi:"GRÜN-laitteet",lv:"GRÜN iekārtas",lt:"GRÜN įranga"}, ds:{et:"Bituumenikatlad ja paigaldusseadmed vuugiliimile ning praomastiksile.",en:"Bitumen boilers and applicators for joint adhesive and crack mastic."}}
];

/* ============ Probleemid → lahendused ============ */
const SPOTS = [
  {id:"katus", layer:"L-katus", label:{et:"Katus laseb vett läbi",en:"The roof leaks",fi:"Katto vuotaa",lv:"Jumts tek",lt:"Stogas praleidžia vandenį"},
   sym:{et:"Vana katusekate on pragunenud, ühenduskohad lekivad, aga lammutamine ei tule kõne alla.",en:"The old covering is cracked and the joints leak, but tearing it off is not an option."},
   sol:{et:"Bituumenvõõbad ja pakskihtmassid uuendavad katusekatte kohapeal, ilma vana kihti eemaldamata.",en:"Bitumen coatings renew the roof in place, without removing the old layer."},
   items:{et:["Külmalt paigaldatav — leegita","Sobib bituumen-, betoon- ja plekkalusele","Elastne ka miinuskraadidel"],en:["Cold-applied, no open flame","Works on bitumen, concrete and metal","Stays elastic below zero"]},
   cat:0},
  {id:"fassaad", layer:"L-fassaad", label:{et:"Sokkel imab niiskust",en:"The plinth draws damp",fi:"Sokkeli imee kosteutta",lv:"Cokols uzsūc mitrumu",lt:"Cokolis traukia drėgmę"},
   sym:{et:"Sokli värv koorub ja seina alumine osa jääb pidevalt tumedaks.",en:"Paint peels off the plinth and the bottom of the wall stays dark."},
   sol:{et:"Bituumenvõõp ja kaitsekiht maapinnaga kokkupuutuvale pinnale katkestavad niiskuse liikumise.",en:"A bitumen primer plus protection layer on the below-grade surface stops moisture rising."},
   items:{et:["Krunt, võõp ja kaitseplaat ühest majast","Kannatab pinnase survet","Ühildub olemasoleva soojustusega"],en:["Primer, coating and board from one supplier","Withstands soil pressure","Compatible with existing insulation"]},
   cat:0},
  {id:"vundament", layer:"L-vundament", label:{et:"Keldriseinad on märjad",en:"Basement walls are wet",fi:"Kellarin seinät ovat märät",lv:"Pagraba sienas ir mitras",lt:"Rūsio sienos šlapios"},
   sym:{et:"Vesi tuleb keldrisse läbi seina või põrandaliite, sees on hallituse lõhn.",en:"Water comes through the wall or the floor joint and the basement smells of mould."},
   sol:{et:"Pakskihtmass või membraan vundamendi välispinnale, koos vuugitäidete ja mineraalse seguga sisepinnal.",en:"Thick-layer compound or membrane outside, with joint fillers and a mineral mix inside."},
   items:{et:["Lahendus nii uus- kui renoveerimisobjektile","Kulunormid arvutame joonise järgi","Vajadusel paigaldame ise"],en:["For both new build and renovation","We calculate consumption from your drawing","We can install it ourselves"]},
   cat:0},
  {id:"vuuk", layer:"L-vuuk", label:{et:"Betoonvuugid lekivad",en:"Concrete joints leak",fi:"Betonisaumat vuotavat",lv:"Betona šuves tek",lt:"Betono siūlės praleidžia"},
   sym:{et:"Elementide vahed avanevad, vuuk ei pea vett ega liikumist.",en:"Gaps open between elements and the joint holds neither water nor movement."},
   sol:{et:"Vuugilindid, vuugitäited ja tihendusmassid, mis püsivad elastsed ka liikuvas vuugis.",en:"Joint tapes, fillers and sealants that stay elastic in a moving joint."},
   items:{et:["Töö- ja liikumisvuukidele","Püsib elastne temperatuurikõikumisel","Sobib ka veesurve alla"],en:["For construction and movement joints","Elastic through temperature swings","Suitable under water pressure"]},
   cat:2},
  {id:"pragu", layer:"L-pragu", label:{et:"Asfaldis on praod",en:"Cracks in the asphalt",fi:"Asfaltissa on halkeamia",lv:"Asfaltā ir plaisas",lt:"Asfalte yra įtrūkimų"},
   sym:{et:"Praod laienevad iga talvega, servad murenevad ja augud tulevad tagasi.",en:"Cracks widen every winter, edges crumble and the potholes come back."},
   sol:{et:"Praosaneerimismastiks, vuugiliim ja külm asfaltsegu — paranda enne, kui kahjustus läheb aluskihti.",en:"Crack mastic, joint adhesive and cold asphalt — repair before the damage reaches the base."},
   items:{et:["Kasutatav ka väljaspool asfaldihooaega","Paigaldusseade müügiks ja rendiks","Sobib teele, parklale ja platsile"],en:["Usable outside the paving season","Applicator for sale and for hire","For roads, car parks and yards"]},
   cat:1},
  {id:"margistus", layer:"L-margistus", label:{et:"Märgistus on kulunud",en:"Markings have worn off",fi:"Merkinnät ovat kuluneet",lv:"Marķējums ir nodilis",lt:"Ženklinimas nusitrynęs"},
   sym:{et:"Parkla jooned ja nooled ei paista enam, trassid vajavad märkimist.",en:"Bay lines and arrows have faded, and utility runs need marking."},
   sol:{et:"Püsiv teekattemärgistus objektidele ja kiirkuivavad markeerimisvärvid ajutiseks tähistamiseks.",en:"Durable road markings for finished sites, fast-drying sprays for temporary marking."},
   items:{et:["Parklad, teed ja tööstusalad","Kiirkuivavad värvid kaevetöödele","Paigaldame kogu Eestis"],en:["Car parks, roads, industrial areas","Fast-drying sprays for excavation","We apply across Estonia"]},
   cat:7},
  {id:"porand", layer:"L-porand", label:{et:"Tööstuspõrand vajab katet",en:"Industrial floor needs a coating",fi:"Teollisuuslattia vaatii pinnoitteen",lv:"Rūpnieciskajai grīdai vajag pārklājumu",lt:"Pramoninėms grindims reikia dangos"},
   sym:{et:"Põrand kulub kiiresti, aga tootmist ei saa nädalaks seisma panna.",en:"The floor wears fast, but production cannot stop for a week."},
   sol:{et:"SILIKAL metakrülaatvaigud kivistuvad umbes tunniga — pind on samal päeval kasutatav.",en:"SILIKAL methacrylate resins cure in about an hour — the floor is usable the same day."},
   items:{et:["Kivistub ka madalal temperatuuril","Keemia- ja kulumiskindel","Sobib ka sillakatenditele"],en:["Cures even at low temperatures","Chemical and abrasion resistant","Also used on bridge decks"]},
   cat:4},
  {id:"pollumajandus", layer:"L-siilo", label:{et:"Silo söövitab betooni",en:"Silage is eating the concrete",fi:"Rehu syövyttää betonia",lv:"Skābbarība grauž betonu",lt:"Silosas ėda betoną"},
   sym:{et:"Silo- ja sõnnikuhoidla seinad murenevad käärimishapete ja soola mõjul.",en:"Silage and manure store walls crumble under fermentation acids and salt."},
   sol:{et:"Eritooted pinnakaitseks, mis peavad vastu hapetele, soolale ja pidevale niiskusele.",en:"Special coatings that withstand acids, salt and constant moisture."},
   items:{et:["Põllumajandushoonetele ja loomapidamisele","Kaitseb betooni söövituse eest","Uuendatav ka kasutuses olevas hoones"],en:["For farm buildings and livestock housing","Protects concrete from corrosion","Can be renewed in a building in use"]},
   cat:5}
];

/* ============ Tõlked ============ */
const T = {
  et:{}, /* HTML on eesti keeles — vaikimisi */
  en:{nav1:"Find a solution",nav2:"Products",nav3:"Services",nav4:"Projects",nav5:"BORNIT®",nav6:"Contact",ctaTop:"Get a quote",
      h1a:"Materials that keep",h1b:"water out and the road",h1c:"together.",
      heroP:"Official BORNIT® representative in the Baltics and Finland. Project sales of bituminous materials to road builders, contractors and property owners — with technical advice and installation.",
      heroBtn1:"Show me where the problem is",heroBtn2:"Get a quote",
      m1:"BORNIT® factory in Zwickau",m2:"markets: Estonia, Latvia, Lithuania, Finland",m3:"product groups in stock and to order",m4:"we answer within one working day",
      ey1:"Find a solution",ey2:"Product groups",ey3:"Services",ey4:"Projects",ey5:"Manufacturer",ey6:"Request a quote",
      "f-h2":"Show us where the problem is. We'll name the material.",
      "f-lede":"Pick the spot on the drawing that leaks, cracks or needs protection. You get a material recommendation and can add it straight to your enquiry.",
      "f-or":"Or pick a situation from the list:",
      "p-h2":"The full BORNIT® range, sorted by the job",
      "p-lede":"Each group holds technical data sheets, consumption rates and application instructions. Product content is editable from the CMS.",
      "s-h2":"We sell the material and install it ourselves",
      s1h:"Project sales",s1p:"We pick the right material for the site, calculate consumption and deliver to the yard.",
      s2h:"Installation",s2p:"We install what we sell: waterproofing, joints, crack repair and markings.",
      s3h:"Equipment",s3p:"Applicators for joint adhesive and crack mastic, and bitumen boilers — for sale and hire.",
      s4h:"Technical advice",s4p:"Data sheets, consumption rates and instructions in your language, before you order.",
      "w-h2":"Sites where the material is already at work",
      w1h:"Shopping centre car park",w1m:"Joint adhesive, crack repair and markings — Harju county",
      w2h:"Apartment building basement",w2m:"Foundation waterproofing with thick-layer compound — Tartu",
      w3h:"Viaduct deck waterproofing",w3m:"Bitumen membrane and joint sealing — Ida-Viru county",
      "b-h2":"Five generations of bitumen from Zwickau",
      "b-p1":"BORNIT-Werk Aschenborn GmbH began in 1868 as a roofing felt and asphalt factory founded by Alwin Aschenborn. Today it is a modern construction chemicals manufacturer whose products rest mainly on its own research and development.",
      "b-p2":"Bornit Baltic OÜ represents BORNIT® in Estonia, Latvia, Lithuania and Finland — the same range, local stock and technical support in your language.",
      "b-f1":"Year the factory was founded",'b-f2':"generations of family production",'b-f3':"made in Zwickau, Germany",'b-f4':"representative for the Baltics and Finland",
      "k-h2":"Describe the site, we'll send a price",
      "k-lede":"The type of site and a rough quantity is enough. If you need it, we help choose the material and calculate consumption.",
      "l-nm":"Name","l-co":"Company","l-em":"Email","l-ph":"Phone","l-ob":"Site and approximate quantity","l-ms":"Message","l-send":"Send enquiry",
      "ph-ob":"e.g. 340 m² of basement wall, work in August",
      "f-about":"Bornit Baltic OÜ — representative of the BORNIT® brand in the Baltics and Finland.",
      "f-t1":"Products","f-t2":"Company","f-t3":"Contact",
      "f-legal":"BORNIT® is a registered trademark of BORNIT-Werk Aschenborn GmbH.",
      aAdd:"Add to enquiry",aAdded:"Added",aView:"View products",aPick:"Pick a spot on the drawing",
      aPickP:"Choose the place that leaks, cracks or needs protection — we'll show the material that belongs there.",
      doneH:"Enquiry sent",doneP:"We'll come back to you within one working day. For anything urgent, call +372 526 5087."},
  fi:{nav1:"Etsi ratkaisu",nav2:"Tuotteet",nav3:"Palvelut",nav4:"Referenssit",nav5:"BORNIT®",nav6:"Yhteystiedot",ctaTop:"Pyydä tarjous",
      heroBtn1:"Näytä missä ongelma on",heroBtn2:"Pyydä tarjous",
      ey1:"Ratkaisun haku",ey2:"Tuoteryhmät",ey3:"Palvelut",ey4:"Referenssit",ey5:"Valmistaja",ey6:"Tarjouspyyntö",
      "f-or":"Tai valitse tilanne listasta:","l-send":"Lähetä pyyntö","f-t1":"Tuotteet","f-t2":"Yritys","f-t3":"Yhteystiedot",
      aAdd:"Lisää pyyntöön",aAdded:"Lisätty",aView:"Katso tuotteet",aPick:"Valitse kohta piirroksesta"},
  lv:{nav1:"Atrast risinājumu",nav2:"Produkti",nav3:"Pakalpojumi",nav4:"Objekti",nav5:"BORNIT®",nav6:"Kontakti",ctaTop:"Pieprasīt cenu",
      heroBtn1:"Parādi, kur ir problēma",heroBtn2:"Pieprasīt cenu",
      ey1:"Risinājuma meklēšana",ey2:"Produktu grupas",ey3:"Pakalpojumi",ey4:"Objekti",ey5:"Ražotājs",ey6:"Cenu pieprasījums",
      "f-or":"Vai izvēlies situāciju no saraksta:","l-send":"Nosūtīt pieprasījumu","f-t1":"Produkti","f-t2":"Uzņēmums","f-t3":"Kontakti",
      aAdd:"Pievienot pieprasījumam",aAdded:"Pievienots",aView:"Skatīt produktus",aPick:"Izvēlies vietu zīmējumā"},
  lt:{nav1:"Rasti sprendimą",nav2:"Produktai",nav3:"Paslaugos",nav4:"Objektai",nav5:"BORNIT®",nav6:"Kontaktai",ctaTop:"Gauti kainą",
      heroBtn1:"Parodyk, kur problema",heroBtn2:"Gauti kainą",
      ey1:"Sprendimo paieška",ey2:"Produktų grupės",ey3:"Paslaugos",ey4:"Objektai",ey5:"Gamintojas",ey6:"Kainos užklausa",
      "f-or":"Arba pasirink situaciją iš sąrašo:","l-send":"Siųsti užklausą","f-t1":"Produktai","f-t2":"Įmonė","f-t3":"Kontaktai",
      aAdd:"Pridėti prie užklausos",aAdded:"Pridėta",aView:"Žiūrėti produktus",aPick:"Pasirink vietą brėžinyje"}
};
const ET_DEFAULTS = {aAdd:"Lisa päringusse",aAdded:"Lisatud",aView:"Vaata tooteid",aPick:"Vali jooniselt koht",
  aPickP:"Vali koht, mis lekib, praguneb või vajab kaitset — näitame, milline materjal sinna kuulub.",
  doneH:"Päring saadetud",doneP:"Vastame tööpäeva jooksul. Kiire asja korral helista +372 526 5087."};

let LANG = "et";
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
  buildIndex(); buildSymptoms(); renderAnswer(current); renderChips();
}

/* ---------- product index ---------- */
function buildIndex(){
  const host = document.getElementById("idx");
  if(host) host.innerHTML = CATEGORIES.map(c=>`
    <a href="${c.href}">
      <span class="ico"><svg><use href="#${c.icon}"/></svg></span>
      <span class="nm">${loc(c.nm)}</span>
      <span class="ds">${loc(c.ds)}</span>
      <span class="go"><svg><use href="#i-arrow"/></svg></span>
    </a>`).join("");
  const fCats = document.getElementById("fCats");
  if(fCats) fCats.innerHTML =
    CATEGORIES.slice(0,5).map(c=>`<li><a href="${c.href}">${loc(c.nm)}</a></li>`).join("");
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
      <a class="btn btn-primary" href="${cat.href}">${t("aView")}</a>
      <button class="btn btn-ghost" data-add="${s.id}">${picked.has(s.id)?t("aAdded"):t("aAdd")}</button>
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

/* ---------- chips carried into the form ---------- */
const picked = new Set();
function renderChips(){
  const host = document.getElementById("chips");
  if(!host) return;
  host.innerHTML = [...picked].map(id=>{
    const s = SPOTS.find(x=>x.id===id);
    return `<span class="chip">${loc(s.label)}<button type="button" data-drop="${id}" aria-label="Eemalda">&times;</button></span>`;
  }).join("");
}
document.getElementById("answer")?.addEventListener("click",e=>{
  const b = e.target.closest("[data-add]"); if(!b) return;
  picked.add(b.dataset.add); renderChips(); b.textContent = t("aAdded");
  const ms = document.getElementById("ms");
  const lines = [...picked].map(id=>"- "+loc(SPOTS.find(x=>x.id===id).label));
  ms.value = lines.join("\n");
});
document.getElementById("chips")?.addEventListener("click",e=>{
  const b = e.target.closest("[data-drop]"); if(!b) return;
  picked.delete(b.dataset.drop); renderChips();
  const ms = document.getElementById("ms");
  ms.value = [...picked].map(id=>"- "+loc(SPOTS.find(x=>x.id===id).label)).join("\n");
  renderAnswer(current);
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
        productTitle: "Avalehe hinnaparing", sourceUrl: location.pathname
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
  lang.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{setLang(b.dataset.lang);lang.classList.remove("open");}));
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

/* ---- */

