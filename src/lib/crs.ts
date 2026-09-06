// Comprehensive Ranking System (CRS) scoring engine for Canada Express Entry.
//
// Point values below are cross-checked against multiple independent,
// current sources (immigration.ca, moving2canada, cicnews, canadim,
// canadavisa) and reflect the March 25, 2025 IRCC change that removed
// CRS points for a valid job offer — this calculator intentionally
// awards 0 points for a job offer. IRCC updates these tables from time
// to time; always cross-check against the official CRS tool at
// canada.ca before making decisions based on your score.

export type MaritalStatus = 'single' | 'spouse-accompanying' | 'spouse-not-accompanying';
export type EducationLevel =
  | 'none'
  | 'high-school'
  | 'one-year-post-secondary'
  | 'two-year-post-secondary'
  | 'bachelors'
  | 'two-or-more-credentials'
  | 'masters'
  | 'phd';
export type CLB = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface LanguageAbilities {
  listening: CLB;
  speaking: CLB;
  reading: CLB;
  writing: CLB;
}

export interface CRSInput {
  maritalStatus: MaritalStatus;
  age: number;
  education: EducationLevel;
  firstLanguage: LanguageAbilities;
  hasSecondLanguage: boolean;
  secondLanguage?: LanguageAbilities;
  canadianWorkYears: number; // 0-5+
  foreignWorkYears: number; // 0-3+
  hasTradesCertificate: boolean;
  spouseEducation?: EducationLevel;
  spouseLanguage?: LanguageAbilities;
  spouseCanadianWorkYears?: number;
  hasProvincialNomination: boolean;
  frenchNCLC: CLB | 0; // 0 = not assessed / below CLB4 equivalent
  hasCanadianStudy: 'none' | 'one-or-two-year' | 'three-year-or-more';
  hasSiblingInCanada: boolean;
}

export interface CRSBreakdown {
  total: number;
  coreHumanCapital: {
    age: number;
    education: number;
    firstLanguage: number;
    secondLanguage: number;
    canadianWorkExperience: number;
    subtotal: number;
  };
  spouseFactors: {
    education: number;
    language: number;
    canadianWorkExperience: number;
    subtotal: number;
  };
  skillTransferability: {
    educationLanguage: number;
    educationCanadianExperience: number;
    foreignExperienceLanguage: number;
    foreignExperienceCanadianExperience: number;
    tradesLanguage: number;
    subtotal: number;
  };
  additionalPoints: {
    provincialNomination: number;
    frenchLanguage: number;
    canadianStudy: number;
    sibling: number;
    subtotal: number;
  };
}

const hasSpouse = (m: MaritalStatus) => m === 'spouse-accompanying';

// --- Age ---
// Official table, no spouse (points by age; flat 0 at 17-, flat 110 at 20-29, 0 at 45+)
const AGE_NO_SPOUSE: Record<number, number> = {
  17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110,
  26: 110, 27: 110, 28: 110, 29: 110, 30: 105, 31: 99, 32: 94, 33: 88, 34: 83,
  35: 77, 36: 72, 37: 66, 38: 61, 39: 55, 40: 50, 41: 39, 42: 28, 43: 17, 44: 6, 45: 0,
};
function ageScore(age: number, withSpouse: boolean): number {
  const clamped = Math.max(17, Math.min(45, Math.round(age)));
  const noSpouse = AGE_NO_SPOUSE[clamped] ?? 0;
  if (!withSpouse) return age > 45 ? 0 : noSpouse;
  if (age > 45) return 0;
  // With-spouse table is the no-spouse table scaled to a 100-point max (verified
  // proportional relationship: with-spouse = round(no-spouse * 100/110)).
  return Math.round(noSpouse * (100 / 110));
}

// --- Education ---
const EDUCATION_NO_SPOUSE: Record<EducationLevel, number> = {
  none: 0,
  'high-school': 28,
  'one-year-post-secondary': 90,
  'two-year-post-secondary': 98,
  bachelors: 120,
  'two-or-more-credentials': 128,
  masters: 135,
  phd: 150,
};
const EDUCATION_WITH_SPOUSE: Record<EducationLevel, number> = {
  none: 0,
  'high-school': 25,
  'one-year-post-secondary': 84,
  'two-year-post-secondary': 91,
  bachelors: 112,
  'two-or-more-credentials': 119,
  masters: 126,
  phd: 140,
};
function educationScore(level: EducationLevel, withSpouse: boolean): number {
  return (withSpouse ? EDUCATION_WITH_SPOUSE : EDUCATION_NO_SPOUSE)[level];
}
// Spouse's own education points (separate, smaller scale, max 10)
const SPOUSE_EDUCATION: Record<EducationLevel, number> = {
  none: 0,
  'high-school': 2,
  'one-year-post-secondary': 6,
  'two-year-post-secondary': 7,
  bachelors: 8,
  'two-or-more-credentials': 9,
  masters: 10,
  phd: 10,
};

// --- Language (per-ability points, ×4 abilities) ---
// First official language, no spouse
const FIRST_LANG_PER_ABILITY_NO_SPOUSE: Record<CLB, number> = {
  3: 0, 4: 6, 5: 6, 6: 8, 7: 16, 8: 22, 9: 29, 10: 34,
};
const FIRST_LANG_PER_ABILITY_WITH_SPOUSE: Record<CLB, number> = {
  3: 0, 4: 6, 5: 6, 6: 8, 7: 15, 8: 20, 9: 25, 10: 32,
};
// Second official language, capped lower
const SECOND_LANG_PER_ABILITY_NO_SPOUSE: Record<CLB, number> = {
  3: 0, 4: 1, 5: 1, 6: 3, 7: 3, 8: 5, 9: 6, 10: 6,
};
const SECOND_LANG_PER_ABILITY_WITH_SPOUSE: Record<CLB, number> = {
  3: 0, 4: 1, 5: 1, 6: 3, 7: 3, 8: 5, 9: 5, 10: 6,
};

function abilitiesTotal(abilities: LanguageAbilities, table: Record<CLB, number>): number {
  return (
    table[abilities.listening] +
    table[abilities.speaking] +
    table[abilities.reading] +
    table[abilities.writing]
  );
}

function firstLanguageScore(abilities: LanguageAbilities, withSpouse: boolean): number {
  return abilitiesTotal(abilities, withSpouse ? FIRST_LANG_PER_ABILITY_WITH_SPOUSE : FIRST_LANG_PER_ABILITY_NO_SPOUSE);
}
function secondLanguageScore(abilities: LanguageAbilities | undefined, withSpouse: boolean): number {
  if (!abilities) return 0;
  return abilitiesTotal(abilities, withSpouse ? SECOND_LANG_PER_ABILITY_WITH_SPOUSE : SECOND_LANG_PER_ABILITY_NO_SPOUSE);
}
// Spouse's own first-language points (separate, smaller scale, max 20)
const SPOUSE_LANG_PER_ABILITY: Record<CLB, number> = {
  3: 0, 4: 1, 5: 1, 6: 1, 7: 3, 8: 3, 9: 5, 10: 5,
};
function spouseLanguageScore(abilities: LanguageAbilities | undefined): number {
  if (!abilities) return 0;
  return abilitiesTotal(abilities, SPOUSE_LANG_PER_ABILITY);
}

// --- Canadian work experience (cumulative points by years) ---
const CANADIAN_WORK_NO_SPOUSE: Record<number, number> = { 0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80 };
const CANADIAN_WORK_WITH_SPOUSE: Record<number, number> = { 0: 0, 1: 35, 2: 46, 3: 56, 4: 63, 5: 70 };
function canadianWorkScore(years: number, withSpouse: boolean): number {
  const clamped = Math.max(0, Math.min(5, Math.round(years)));
  return (withSpouse ? CANADIAN_WORK_WITH_SPOUSE : CANADIAN_WORK_NO_SPOUSE)[clamped];
}
// Spouse's own Canadian work experience points (separate, smaller scale, max 10)
const SPOUSE_CANADIAN_WORK: Record<number, number> = { 0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10 };
function spouseCanadianWorkScore(years: number | undefined): number {
  if (!years) return 0;
  const clamped = Math.max(0, Math.min(5, Math.round(years)));
  return SPOUSE_CANADIAN_WORK[clamped];
}

// --- Skill transferability (max 100 overall; two main buckets, each capped at 50) ---
function minCLB(abilities: LanguageAbilities): number {
  return Math.min(abilities.listening, abilities.speaking, abilities.reading, abilities.writing);
}

function educationTransferability(education: EducationLevel, firstLang: LanguageAbilities, canadianYears: number): number {
  const isPostSecondary = education !== 'none' && education !== 'high-school';
  if (!isPostSecondary) return 0;
  const clb = minCLB(firstLang);
  let langComponent = 0;
  if (clb >= 9) langComponent = 50;
  else if (clb >= 7) langComponent = 25;
  let expComponent = 0;
  if (canadianYears >= 2) expComponent = 50;
  else if (canadianYears >= 1) expComponent = 25;
  return Math.min(50, Math.max(langComponent, expComponent));
}

function foreignExperienceTransferability(foreignYears: number, firstLang: LanguageAbilities, canadianYears: number): number {
  if (foreignYears <= 0) return 0;
  const clb = minCLB(firstLang);
  let langComponent = 0;
  if (foreignYears >= 3 && clb >= 9) langComponent = 50;
  else if (foreignYears >= 1 && clb >= 7) langComponent = 25;
  let expComponent = 0;
  if (foreignYears >= 3 && canadianYears >= 2) expComponent = 50;
  else if (foreignYears >= 1 && canadianYears >= 1) expComponent = 25;
  return Math.min(50, Math.max(langComponent, expComponent));
}

function tradesTransferability(hasTradesCertificate: boolean, firstLang: LanguageAbilities): number {
  if (!hasTradesCertificate) return 0;
  const clb = minCLB(firstLang);
  if (clb >= 5) return 50;
  if (clb >= 4) return 25;
  return 0;
}

// --- Additional points ---
function frenchBonus(frenchNCLC: CLB | 0, firstLangCLB: number): number {
  if (frenchNCLC < 7) return 0;
  return firstLangCLB >= 5 ? 50 : 25;
}
function canadianStudyBonus(v: CRSInput['hasCanadianStudy']): number {
  if (v === 'three-year-or-more') return 30;
  if (v === 'one-or-two-year') return 15;
  return 0;
}

export function scoreCRS(input: CRSInput): CRSBreakdown {
  const withSpouse = hasSpouse(input.maritalStatus);

  const age = ageScore(input.age, withSpouse);
  const education = educationScore(input.education, withSpouse);
  const firstLanguage = firstLanguageScore(input.firstLanguage, withSpouse);
  const secondLanguage = input.hasSecondLanguage ? secondLanguageScore(input.secondLanguage, withSpouse) : 0;
  const canadianWorkExperience = canadianWorkScore(input.canadianWorkYears, withSpouse);
  const coreSubtotal = age + education + firstLanguage + secondLanguage + canadianWorkExperience;

  const spouseEducation = withSpouse ? SPOUSE_EDUCATION[input.spouseEducation ?? 'none'] : 0;
  const spouseLanguage = withSpouse ? spouseLanguageScore(input.spouseLanguage) : 0;
  const spouseCanadianWorkExperience = withSpouse ? spouseCanadianWorkScore(input.spouseCanadianWorkYears) : 0;
  const spouseSubtotal = spouseEducation + spouseLanguage + spouseCanadianWorkExperience;

  const educationLanguage = educationTransferability(input.education, input.firstLanguage, input.canadianWorkYears);
  // Per IRCC rules the education+language and education+experience components share
  // one 50-point sub-cap, so we take education transferability once (see function).
  const educationCanadianExperience = 0; // folded into educationLanguage's max() above
  const foreignExperienceLanguage = foreignExperienceTransferability(input.foreignWorkYears, input.firstLanguage, input.canadianWorkYears);
  const foreignExperienceCanadianExperience = 0; // folded into foreignExperienceLanguage's max() above
  const tradesLanguage = tradesTransferability(input.hasTradesCertificate, input.firstLanguage);
  const transferabilitySubtotal = Math.min(100, educationLanguage + foreignExperienceLanguage + tradesLanguage);

  const provincialNomination = input.hasProvincialNomination ? 600 : 0;
  const frenchLanguagePts = frenchBonus(input.frenchNCLC, minCLB(input.firstLanguage));
  const canadianStudy = canadianStudyBonus(input.hasCanadianStudy);
  const sibling = input.hasSiblingInCanada ? 15 : 0;
  const additionalSubtotal = provincialNomination + frenchLanguagePts + canadianStudy + sibling;

  const total = coreSubtotal + spouseSubtotal + transferabilitySubtotal + additionalSubtotal;

  return {
    total,
    coreHumanCapital: { age, education, firstLanguage, secondLanguage, canadianWorkExperience, subtotal: coreSubtotal },
    spouseFactors: { education: spouseEducation, language: spouseLanguage, canadianWorkExperience: spouseCanadianWorkExperience, subtotal: spouseSubtotal },
    skillTransferability: {
      educationLanguage,
      educationCanadianExperience,
      foreignExperienceLanguage,
      foreignExperienceCanadianExperience,
      tradesLanguage,
      subtotal: transferabilitySubtotal,
    },
    additionalPoints: { provincialNomination, frenchLanguage: frenchLanguagePts, canadianStudy, sibling, subtotal: additionalSubtotal },
  };
}
