/* =========================================================
  DATA.JS – INHALTSVERZEICHNIS
  =========================================================
  GLOBAL – IMMOBILIEN-DATEN
  GLOBAL – STORAGE / STORE
  GLOBAL – FORMATIERUNG
  ========================================================= */

/* =========================================================
  GLOBAL – IMMOBILIEN-DATEN / STORAGE / FORMATIERUNG – START
  ========================================================= */

const STORAGE_KEY = "makaan_properties_v1";

const SEED_PROPERTIES = [
  {
    id: "p1",
    title: "Lichtdurchflutete Altbauwohnung am Stadtpark",
    type: "Wohnung",
    status: "sale",
    price: 389000,
    city: "Berlin",
    address: "Musterstraße 12",
    zip: "10115",
    size: 92,
    bedrooms: 3,
    bathrooms: 1,
    yearBuilt: 1908,
    description:
      "Diese charmante Altbauwohnung besticht durch hohe Decken, Dielenboden und einen Südbalkon mit Blick ins Grüne. Die Wohnung wurde 2021 saniert, verfügt über eine offene Einbauküche und liegt in ruhiger, dennoch zentraler Lage nur wenige Gehminuten vom Stadtpark entfernt.",
    features: [
      "Balkon",
      "Einbauküche",
      "Dielenboden",
      "Keller",
      "Fahrradkeller",
      "ÖPNV in Laufnähe",
    ],
    images: ["img/property-1.jpg", "img/property-2.jpg", "img/property-3.jpg"],
    featured: true,
    agent: {
      name: "Sofia Brandt",
      role: "Immobilienmaklerin",
      phone: "030 1234 567",
      email: "sofia.brandt@makaan-immobilien.de",
      photo: "img/team-1.jpg",
    },
    createdAt: "2026-05-02",
  },
  {
    id: "p2",
    title: "Freistehende Villa mit Garten und Pool",
    type: "Villa",
    status: "sale",
    price: 1290000,
    city: "München",
    address: "Seestraße 5",
    zip: "81675",
    size: 240,
    bedrooms: 5,
    bathrooms: 3,
    yearBuilt: 2016,
    description:
      "Repräsentative Villa in bevorzugter Wohnlage mit großzügigem Garten, beheiztem Außenpool und Doppelgarage. Hochwertige Ausstattung mit Fußbodenheizung, Kaminofen und offenem Wohn-Essbereich, der sich zur Terrasse hin öffnet.",
    features: [
      "Pool",
      "Garten",
      "Doppelgarage",
      "Fußbodenheizung",
      "Kaminofen",
      "Alarmanlage",
      "Gäste-WC",
    ],
    images: ["img/property-2.jpg", "img/property-4.jpg", "img/property-1.jpg"],
    featured: true,
    agent: {
      name: "Jonas Weller",
      role: "Senior Makler",
      phone: "089 9876 543",
      email: "jonas.weller@makaan-immobilien.de",
      photo: "img/team-2.jpg",
    },
    createdAt: "2026-04-18",
  },
  {
    id: "p3",
    title: "Modernes Büro im Businesspark",
    type: "Büro",
    status: "rent",
    price: 2450,
    city: "Hamburg",
    address: "Hafenallee 88",
    zip: "20457",
    size: 180,
    bedrooms: 0,
    bathrooms: 2,
    yearBuilt: 2019,
    description:
      "Repräsentative Büroflächen im 4. OG eines modernen Businessparks mit Hafenblick. Flexible Grundrissgestaltung, Klimaanlage, Glasfaseranschluss und Tiefgaragenstellplätze inklusive.",
    features: [
      "Klimaanlage",
      "Tiefgarage",
      "Glasfaser",
      "Aufzug",
      "Konferenzraum",
      "Barrierefrei",
    ],
    images: ["img/property-3.jpg", "img/property-5.jpg", "img/property-6.jpg"],
    featured: true,
    agent: {
      name: "Sofia Brandt",
      role: "Immobilienmaklerin",
      phone: "030 1234 567",
      email: "sofia.brandt@makaan-immobilien.de",
      photo: "img/team-1.jpg",
    },
    createdAt: "2026-06-01",
  },
  {
    id: "p4",
    title: "Gepflegtes Reihenhaus mit Garten",
    type: "Reihenhaus",
    status: "rent",
    price: 1450,
    city: "Köln",
    address: "Ahornweg 21",
    zip: "50823",
    size: 128,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 1998,
    description:
      "Familienfreundliches Reihenhaus in kinderfreundlicher Wohnsiedlung. Drei Kinderzimmer, ein separates Arbeitszimmer, Terrasse mit Garten sowie eine Einzelgarage. Kitas und Grundschule sind fußläufig erreichbar.",
    features: [
      "Garten",
      "Terrasse",
      "Garage",
      "Kellerausbau",
      "Kita in Laufnähe",
    ],
    images: ["img/property-4.jpg", "img/property-6.jpg", "img/property-2.jpg"],
    featured: false,
    agent: {
      name: "Jonas Weller",
      role: "Senior Makler",
      phone: "089 9876 543",
      email: "jonas.weller@makaan-immobilien.de",
      photo: "img/team-2.jpg",
    },
    createdAt: "2026-03-22",
  },
  {
    id: "p5",
    title: "Neubau-Eigentumswohnung mit Loggia",
    type: "Eigentumswohnung",
    status: "sale",
    price: 465000,
    city: "Frankfurt am Main",
    address: "Rosenweg 3",
    zip: "60311",
    size: 78,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2024,
    description:
      "Erstbezug in energieeffizientem Neubau (KfW 40) mit Fußbodenheizung, bodentiefen Fenstern und großzügiger Loggia. Die Wohnung überzeugt durch ein durchdachtes Grundrisskonzept und hochwertige Markenausstattung im Bad.",
    features: [
      "Loggia",
      "KfW-40-Standard",
      "Aufzug",
      "Tiefgaragenstellplatz",
      "Fußbodenheizung",
    ],
    images: ["img/property-5.jpg", "img/property-1.jpg", "img/property-3.jpg"],
    featured: true,
    agent: {
      name: "Sofia Brandt",
      role: "Immobilienmaklerin",
      phone: "030 1234 567",
      email: "sofia.brandt@makaan-immobilien.de",
      photo: "img/team-1.jpg",
    },
    createdAt: "2026-06-20",
  },
  {
    id: "p6",
    title: "Helles Ladenlokal in Bestlage",
    type: "Büro",
    status: "rent",
    price: 1890,
    city: "Leipzig",
    address: "Marktgasse 9",
    zip: "04109",
    size: 95,
    bedrooms: 0,
    bathrooms: 1,
    yearBuilt: 1962,
    description:
      "Ladenfläche mit großer Schaufensterfront in belebter Innenstadtlage. Ideal für Einzelhandel oder Showroom, mit separatem Lager- und Sozialraum sowie direkter Kundenlaufzone.",
    features: ["Schaufensterfront", "Lagerraum", "Sozialraum", "Zentrale Lage"],
    images: ["img/property-6.jpg", "img/property-3.jpg", "img/property-4.jpg"],
    featured: false,
    agent: {
      name: "Jonas Weller",
      role: "Senior Makler",
      phone: "089 9876 543",
      email: "jonas.weller@makaan-immobilien.de",
      photo: "img/team-2.jpg",
    },
    createdAt: "2026-05-15",
  },
  {
    id: "p7",
    title: "Charmantes Haus am Waldrand",
    type: "Haus",
    status: "sale",
    price: 620000,
    city: "Stuttgart",
    address: "Waldweg 14",
    zip: "70191",
    size: 165,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 1985,
    description:
      "Ruhig gelegenes Einfamilienhaus direkt am Waldrand mit großzügigem Grundstück. Lichtdurchflutetes Wohnzimmer mit Kaminanschluss, ausgebautes Dachgeschoss und eine sonnige Terrasse zum naturnahen Garten.",
    features: [
      "Garten",
      "Terrasse",
      "Kaminanschluss",
      "Ausgebautes Dachgeschoss",
      "Carport",
    ],
    images: ["img/property-1.jpg", "img/property-5.jpg", "img/property-2.jpg"],
    featured: false,
    agent: {
      name: "Sofia Brandt",
      role: "Immobilienmaklerin",
      phone: "030 1234 567",
      email: "sofia.brandt@makaan-immobilien.de",
      photo: "img/team-1.jpg",
    },
    createdAt: "2026-02-11",
  },
  {
    id: "p8",
    title: "Kompakte 2-Zimmer-Wohnung für Pendler",
    type: "Wohnung",
    status: "rent",
    price: 890,
    city: "Hannover",
    address: "Bahnhofstraße 44",
    zip: "30159",
    size: 54,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2005,
    description:
      "Praktisch geschnittene Wohnung in Bahnhofsnähe, ideal für Berufspendler. Vollausgestattete Küche, Laminatboden und ein kleiner Balkon zum Innenhof. Sofort beziehbar.",
    features: ["Balkon", "Einbauküche", "Bahnhofsnähe", "Aufzug"],
    images: ["img/property-3.jpg", "img/property-2.jpg", "img/property-6.jpg"],
    featured: false,
    agent: {
      name: "Jonas Weller",
      role: "Senior Makler",
      phone: "089 9876 543",
      email: "jonas.weller@makaan-immobilien.de",
      photo: "img/team-2.jpg",
    },
    createdAt: "2026-01-30",
  },
  {
    id: "p9",
    title: "Elegante Villa mit Seeblick",
    type: "Villa",
    status: "rent",
    price: 4200,
    city: "Konstanz",
    address: "Uferpromenade 2",
    zip: "78462",
    size: 210,
    bedrooms: 5,
    bathrooms: 3,
    yearBuilt: 2011,
    description:
      "Exklusive Mietvilla mit direktem Seeblick und privatem Bootssteg. Großzügige Wohnflächen über zwei Etagen, Wintergarten und eine parkähnliche Gartenanlage runden das Angebot ab.",
    features: [
      "Seeblick",
      "Bootssteg",
      "Wintergarten",
      "Garten",
      "Doppelgarage",
      "Sauna",
    ],
    images: ["img/property-4.jpg", "img/property-1.jpg", "img/property-5.jpg"],
    featured: true,
    agent: {
      name: "Sofia Brandt",
      role: "Immobilienmaklerin",
      phone: "030 1234 567",
      email: "sofia.brandt@makaan-immobilien.de",
      photo: "img/team-1.jpg",
    },
    createdAt: "2026-06-10",
  },
];

const PROPERTY_TYPES = [
  { key: "Wohnung", icon: "img/icon-apartment.png" },
  { key: "Haus", icon: "img/icon-house.png" },
  { key: "Villa", icon: "img/icon-villa.png" },
  { key: "Büro", icon: "img/icon-building.png" },
  { key: "Eigentumswohnung", icon: "img/icon-condominium.png" },
  { key: "Reihenhaus", icon: "img/icon-housing.png" },
];

const Store = {
  _read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROPERTIES));
        return [...SEED_PROPERTIES];
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error("Store read error", e);
      return [...SEED_PROPERTIES];
    }
  },
  _write(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },
  getAll() {
    return this._read();
  },
  getById(id) {
    return this._read().find((p) => p.id === id) || null;
  },
  add(property) {
    const list = this._read();
    const id = "p" + Date.now();
    const record = Object.assign(
      { id, createdAt: new Date().toISOString().slice(0, 10) },
      property,
    );
    list.unshift(record);
    this._write(list);
    return record;
  },
  update(id, changes) {
    const list = this._read();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], changes, { id });
    this._write(list);
    return list[idx];
  },
  remove(id) {
    const list = this._read().filter((p) => p.id !== id);
    this._write(list);
  },
  resetToSeed() {
    this._write(SEED_PROPERTIES);
  },
  count() {
    return this._read().length;
  },
  countByStatus(status) {
    return this._read().filter((p) => p.status === status).length;
  },
  countByType(type) {
    return this._read().filter((p) => p.type === type).length;
  },
};

function formatPrice(property) {
  const amount = new Intl.NumberFormat("de-DE").format(property.price);
  return property.status === "rent"
    ? `${amount} €<span>/ Monat</span>`
    : `${amount} €`;
}
function formatPriceShort(property) {
  const amount = new Intl.NumberFormat("de-DE").format(property.price);
  return property.status === "rent" ? `${amount} € / Monat` : `${amount} €`;
}
function statusLabel(status) {
  return status === "rent" ? "Zur Miete" : "Zum Verkauf";
}

/* =========================================================
  GLOBAL – IMMOBILIEN-DATEN / STORAGE / FORMATIERUNG – ENDE
  ========================================================= */
