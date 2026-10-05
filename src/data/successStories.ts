// Homepage "Success Stories" section — a simple structured data file so
// Augustine can add real stories later by editing this array, no developer
// needed. Per CLAUDE.md: starts with clearly-labelled placeholder examples
// (isPlaceholder: true) until real ones are supplied — never presented as
// genuine testimonials. Keep that flag on every entry until it's replaced
// with a real, consented story.
export interface SuccessStory {
  id: string;
  isPlaceholder: boolean;
  fromCountry: string;
  toCountrySlug: string;
  toCountryName: string;
  flag: string;
  pathway: string;
  quote: string;
}

export const successStories: SuccessStory[] = [
  {
    id: 'placeholder-1',
    isPlaceholder: true,
    fromCountry: 'Nigeria',
    toCountrySlug: 'canada',
    toCountryName: 'Canada',
    flag: '🇨🇦',
    pathway: 'Express Entry',
    quote: 'This space is reserved for a real AfriMigrate success story — someone who used the free tools here to plan and complete their move. Example placeholder only.',
  },
  {
    id: 'placeholder-2',
    isPlaceholder: true,
    fromCountry: 'Ghana',
    toCountrySlug: 'uk',
    toCountryName: 'United Kingdom',
    flag: '🇬🇧',
    pathway: 'Skilled Worker Visa',
    quote: 'This space is reserved for a real AfriMigrate success story — someone who used the free tools here to plan and complete their move. Example placeholder only.',
  },
  {
    id: 'placeholder-3',
    isPlaceholder: true,
    fromCountry: 'Kenya',
    toCountrySlug: 'australia',
    toCountryName: 'Australia',
    flag: '🇦🇺',
    pathway: 'Skilled Independent Visa',
    quote: 'This space is reserved for a real AfriMigrate success story — someone who used the free tools here to plan and complete their move. Example placeholder only.',
  },
];
