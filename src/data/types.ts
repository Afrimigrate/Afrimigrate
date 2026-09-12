// Shared shape every country data file (src/data/countries/*.ts) implements.
// One shared type + one shared renderer (src/components/CountryProfile.astro)
// means adding a new country is a content task, not a rebuild.

export type PRPath = 'yes' | 'no' | 'conditional';
export type RouteStatus = 'open' | 'paused' | 'seasonal' | 'closed';

export interface VisaRoute {
  name: string;
  summary: string;
  eligibility: string[];
  cost: string;
  timeline: string;
  documents: string[];
  leadsToPR: PRPath;
  status: RouteStatus;
  statusNote?: string; // required context when status isn't 'open', e.g. why it's paused
}

export interface VisaCategory {
  category: string; // e.g. "Points-Based / Highly Skilled"
  icon: string; // emoji, consistent with the rest of the site's icon style
  intro: string; // one or two sentences framing this category for this country
  routes: VisaRoute[];
}

export interface CareerPathway {
  field: string;
  description: string;
  inDemandRoles: string[];
}

export interface CultureNote {
  title: string;
  description: string;
}

export interface TouristSite {
  name: string;
  description: string;
}

export interface CostOfLivingCity {
  city: string;
  rentOneBed: string;
  groceries: string;
  transport: string;
  notes?: string;
}

export interface ChecklistItem {
  title: string;
  description: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface RelatedTool {
  label: string;
  href: string;
}

export type RatingTier = 'budget' | 'mid' | 'expensive';
export type PresenceTier = 'low' | 'moderate' | 'high';

export interface Neighbourhood {
  name: string;
  affordability: RatingTier;
  diasporaPresence: PresenceTier;
  safety: PresenceTier;
  commute: string; // short, concrete, e.g. "40 min by train to the CBD"
  description: string;
}

export interface AreaGuide {
  city: string; // the flagship city this guide covers
  neighbourhoods: Neighbourhood[];
  officialHousingPlatform: { name: string; url: string }; // link out, never scraped/hosted listings
}

export interface StudentHousingGuidance {
  universityPortalNote: string; // how university housing offices/portals typically work
  trustedPlatforms: string[]; // named platforms/approaches, not scraped listings
}

export interface AccommodationGuidance {
  guidance: string; // what visa officers look for in proof of accommodation for a visit
  platformName: string;
  platformUrl: string;
}

export interface CountryProfile {
  slug: string;
  name: string;
  flag: string;
  heroTagline: string;
  heroDescription: string;
  quickFacts: QuickFact[];
  relatedTools: RelatedTool[]; // links to existing bespoke tool pages, e.g. CRS calculator
  visaCategories: VisaCategory[]; // work/study/family/etc. routes — NOT tourist visas, see visitingVisas
  visitingVisas: VisaRoute[]; // kept explicitly separate from visaCategories per product requirement:
  // every country must show a clearly distinct "visiting/tourist visa" section, paired with touristSites
  careerPathways: CareerPathway[];
  culture: CultureNote[];
  costOfLiving: CostOfLivingCity[];
  first30Days: ChecklistItem[];
  touristSites: TouristSite[];
  areaGuide: AreaGuide;
  studentHousing: StudentHousingGuidance;
  touristAccommodation: AccommodationGuidance;
  sourceNote: string; // disclaimer about figures changing / verify officially
}
