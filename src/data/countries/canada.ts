import type { CountryProfile } from '../types';

export const canada: CountryProfile = {
  slug: 'canada',
  name: 'Canada',
  flag: '🇨🇦',
  heroTagline: 'The most transparent points-based system in the world',
  heroDescription:
    "Canada runs more legal migration routes than almost any other country on this list — from a no-job-offer points system to provincial nomination, family sponsorship, and seasonal work. Here's every realistic route, in one place.",
  quickFacts: [
    { label: 'Population', value: '~41 million' },
    { label: 'Capital', value: 'Ottawa' },
    { label: 'Official languages', value: 'English & French' },
    { label: 'Currency', value: 'Canadian Dollar (CAD)' },
    { label: 'Fastest route to PR', value: 'Express Entry, ~6–18 months' },
  ],
  relatedTools: [
    { label: 'CRS Score Calculator', href: '/canada/crs-calculator' },
    { label: 'Express Entry Guide', href: '/canada/express-entry' },
    { label: 'PNP Finder', href: '/canada/pnp' },
    { label: 'Document Checklist', href: '/canada/document-checklist' },
    { label: 'Cost of Moving to Canada', href: '/canada/cost-of-moving' },
    { label: 'PR Timeline Estimator', href: '/canada/pr-timeline' },
  ],
  visaCategories: [
    {
      category: 'Points-Based / Highly Skilled',
      icon: '🧮',
      intro: "Canada's flagship system — no job offer required. Your profile is scored and ranked against everyone else in the pool.",
      routes: [
        {
          name: 'Express Entry (FSW, CEC, FST)',
          summary:
            'Manages Canada\'s three main economic programs — Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades. Candidates are scored by the Comprehensive Ranking System (CRS) and the highest scorers are invited to apply for PR.',
          eligibility: [
            'At least 1 year of skilled work experience (FSW/FST) or Canadian work experience (CEC)',
            'Language test result (IELTS/CELPIP for English, TEF for French)',
            'Educational Credential Assessment for foreign degrees (FSW)',
            'Proof of settlement funds unless exempt',
          ],
          cost: '~$1,600–2,500 CAD per applicant (processing fee, RPRF, biometrics)',
          timeline: '~6–18 months from profile submission to landing',
          documents: ['Passport', 'Language test results', 'ECA report', 'Police clearance', 'Proof of funds', 'Work reference letters'],
          leadsToPR: 'yes',
          status: 'open',
        },
      ],
    },
    {
      category: 'Provincial / Regional Nomination',
      icon: '🗺️',
      intro: 'Every province except Quebec and Nunavut runs its own nominee program. A nomination adds 600 CRS points — enough to guarantee an invitation.',
      routes: [
        {
          name: 'Provincial Nominee Program (PNP)',
          summary:
            "11 separate provincial streams (Saskatchewan's SINP is especially accessible to African applicants) targeting specific occupations, students, or entrepreneurs the province wants to attract.",
          eligibility: ['Varies by province and stream — commonly an in-demand occupation, a job offer, or a genuine connection to the province'],
          cost: 'Provincial application fee ($250–$1,500 CAD depending on province) plus standard federal PR fees',
          timeline: '~8–24 months total, including provincial assessment and federal processing',
          documents: ['Same core documents as Express Entry', 'Provincial application form', 'Proof of provincial connection where required'],
          leadsToPR: 'yes',
          status: 'open',
          statusNote: 'See our full PNP Finder for a province-by-province breakdown.',
        },
      ],
    },
    {
      category: 'Employer-Sponsored',
      icon: '💼',
      intro: "Canada's main temporary route for employers who can't fill a role locally.",
      routes: [
        {
          name: 'LMIA-Based Work Permit',
          summary:
            'A Canadian employer proves, via a Labour Market Impact Assessment, that no Canadian worker was available for the role, then hires you on a closed work permit tied to that employer.',
          eligibility: ['A genuine job offer from a Canadian employer willing to complete the LMIA process', 'Meet the qualifications listed for the specific role'],
          cost: '$1,000 CAD LMIA fee (usually paid by the employer) + $155 CAD work permit fee',
          timeline: '~2–4 months for LMIA approval, plus work permit processing',
          documents: ['Job offer letter', 'LMIA approval letter', 'Proof of qualifications', 'Passport'],
          leadsToPR: 'conditional',
          status: 'open',
          statusNote: 'Doesn\'t grant PR directly, but a year of Canadian work experience opens the Canadian Experience Class.',
        },
      ],
    },
    {
      category: 'Intra-Company Transfer',
      icon: '🏢',
      intro: 'For employees of multinational companies moving to a Canadian branch, parent, or affiliate — no LMIA required.',
      routes: [
        {
          name: 'Intra-Company Transferee (ICT) Work Permit',
          summary:
            'Executives, managers and specialized-knowledge staff can transfer to a Canadian office of the same corporate group without going through the LMIA process, under exemption codes C61–C63.',
          eligibility: [
            'At least 1 continuous year of employment with the company in the past 3 years',
            'A qualifying relationship between the foreign and Canadian entities (parent, subsidiary, branch, or affiliate)',
            'Role must be executive, managerial, or specialized-knowledge',
          ],
          cost: '$230 CAD employer compliance fee + $155 CAD work permit fee',
          timeline: '~2–4 weeks for straightforward cases; 8–12 weeks for complex managerial/executive transfers',
          documents: ['Offer of employment', 'Proof of corporate relationship', 'Proof of 1 year prior employment', 'Passport'],
          leadsToPR: 'conditional',
          status: 'open',
          statusNote: 'A common bridge into Canadian work experience that later supports a Canadian Experience Class application.',
        },
      ],
    },
    {
      category: 'Startup / Entrepreneur / Investor',
      icon: '🚀',
      intro: 'Routes for founders and self-employed professionals — currently in flux, so check status carefully before committing time or money.',
      routes: [
        {
          name: 'Start-up Visa Program',
          summary:
            'Designed for entrepreneurs with a qualifying business idea backed by a designated Canadian venture capital fund, angel investor group, or business incubator.',
          eligibility: ['At least 10% voting rights in the qualifying business', 'A letter of support from a designated organization', 'CLB 5 in English or French', 'Settlement funds'],
          cost: 'Government fees from ~$2,385 CAD processing, plus substantial investment/operating capital typically well into six figures',
          timeline: 'Historically ~12–40 months; recent reports suggest significantly longer',
          documents: ['Letter of support', 'Business plan', 'Proof of funds', 'Language test results'],
          leadsToPR: 'yes',
          status: 'paused',
          statusNote:
            'Multiple reports indicate the program was paused to new applicants from January 2026, with a June 2026 cut-off for applicants who already held a 2025 letter of support. This is a fast-moving situation — confirm current status directly on IRCC\'s website before making any plans around it.',
        },
        {
          name: 'Self-Employed Persons Program',
          summary: 'A federal route for people with relevant experience in cultural activities, athletics, or farm management who intend to be self-employed in Canada.',
          eligibility: ['At least 2 years of relevant self-employed or world-class experience in a qualifying field', 'Intention and ability to be self-employed in Canada'],
          cost: '~$2,300 CAD in federal processing and right of permanent residence fees',
          timeline: '~24–36 months',
          documents: ['Evidence of relevant experience', 'Business/self-employment plan', 'Proof of funds'],
          leadsToPR: 'yes',
          status: 'open',
        },
      ],
    },
    {
      category: 'Working Holiday',
      icon: '🎒',
      intro: 'A youth-mobility route for citizens of countries with a bilateral agreement with Canada.',
      routes: [
        {
          name: 'International Experience Canada (IEC) Working Holiday',
          summary: 'Lets young people from 36 partner countries live and work in Canada temporarily, largely visa-restriction-free once the permit is issued.',
          eligibility: ['Citizen of a country with an active IEC agreement', 'Usually aged 18–30 (up to 35 for some countries)', 'Proof of funds and a return ticket or the means to buy one'],
          cost: 'Participation fee plus a $100 CAD open work permit holder fee (total typically $250–$350 CAD)',
          timeline: 'Pool-based selection; once invited, permit issuance usually takes a few weeks',
          documents: ['Passport', 'Proof of funds', 'Medical exam if staying over 6 months', 'Police certificate for some countries'],
          leadsToPR: 'no',
          status: 'open',
          statusNote: 'Currently very few African countries hold an active IEC agreement — check the current partner list carefully before applying.',
        },
      ],
    },
    {
      category: 'Family / Spousal / Partner',
      icon: '💍',
      intro: 'For spouses, common-law partners, and other close family of Canadian citizens or permanent residents.',
      routes: [
        {
          name: 'Spousal / Partner Sponsorship',
          summary: 'A Canadian citizen or PR sponsors their spouse, common-law, or conjugal partner directly for permanent residence — no points test involved.',
          eligibility: ['Genuine, ongoing relationship with a Canadian citizen or PR', 'Sponsor meets eligibility requirements (no income test for a straightforward spousal case)'],
          cost: '~$1,345 CAD total government fees for a spouse with no children (sponsorship + processing + RPRF + biometrics)',
          timeline: '~15–16 months (outland) or ~21–25 months (inland, with an open work permit available while you wait)',
          documents: ['Proof of relationship', 'Marriage/civil status documents', 'Sponsor eligibility forms', 'Police clearance', 'Medical exam'],
          leadsToPR: 'yes',
          status: 'open',
        },
      ],
    },
    {
      category: 'Digital Nomad',
      icon: '💻',
      intro: 'Canada has no dedicated digital nomad visa — but remote workers do have a real, if narrower, option.',
      routes: [
        {
          name: 'Remote Work Under Visitor Status',
          summary:
            'Someone employed by, and paid entirely by, a foreign company can typically work remotely from Canada under regular visitor status, since this isn\'t considered "entering the Canadian labour market."',
          eligibility: ['Employment and full income from a company outside Canada', 'No intention to work for a Canadian employer or client', 'Meets standard visitor visa/eTA requirements'],
          cost: 'Same as a standard visitor visa: ~$100 CAD (TRV) or $7 CAD (eTA), depending on nationality',
          timeline: 'Standard visitor visa/eTA processing, typically days to a few weeks',
          documents: ['Proof of foreign employment/income', 'Proof of sufficient funds', 'Evidence of intent to leave Canada when the stay ends'],
          leadsToPR: 'no',
          status: 'open',
          statusNote:
            'IRCC tightened documentation requirements for remote workers on visitor status in 2026 — officers may ask for clear proof your income and employer are both outside Canada. This is not a long-term settlement route.',
        },
      ],
    },
    {
      category: 'Seasonal / Agricultural',
      icon: '🌾',
      intro: 'Canada relies heavily on foreign seasonal labour for its farming sector.',
      routes: [
        {
          name: 'Seasonal Agricultural Worker Program (SAWP)',
          summary: 'Matches workers from participating countries with Canadian farm employers for seasonal work, typically January through December, for up to 8 months per year.',
          eligibility: ['At least 18 years old', 'Citizen of a participating country', 'Relevant farming experience', 'Employer must hold an approved LMIA'],
          cost: 'Minimal cost to the worker — the employer covers the LMIA; workers typically pay only standard work permit fees (~$155 CAD)',
          timeline: 'Seasonal — recruitment runs through home-country government partners ahead of each growing season',
          documents: ['Passport', 'Proof of farming experience', 'Medical exam', 'Employment contract'],
          leadsToPR: 'no',
          status: 'seasonal',
          statusNote: 'A recognised route to Canadian work experience, but not a direct path to PR on its own.',
        },
      ],
    },
    {
      category: 'Graduate / Post-Study Work',
      icon: '🎓',
      intro: 'For international students who complete a Canadian credential.',
      routes: [
        {
          name: 'Post-Graduation Work Permit (PGWP)',
          summary: 'An open work permit for graduates of eligible Canadian institutions, giving Canadian work experience that feeds directly into the Canadian Experience Class.',
          eligibility: [
            'Graduated from an eligible program at a Designated Learning Institution',
            'A valid language test result (required for all applicants since November 2024)',
            'Diploma/certificate graduates must have studied in an approved field of study; degree graduates are exempt from this list',
          ],
          cost: '~$255 CAD (permit + biometrics)',
          timeline: 'Apply before your study permit expires; processing is usually a few weeks to a few months',
          documents: ['Final transcript and confirmation of completion', 'Language test results', 'Valid study permit', 'Passport'],
          leadsToPR: 'conditional',
          status: 'open',
          statusNote: 'Doesn\'t grant PR itself, but is the most common bridge from "studied in Canada" to "PR via Canadian Experience Class."',
        },
      ],
    },
    {
      category: 'Student',
      icon: '📚',
      intro: 'Canada remains one of the most popular study destinations for African students.',
      routes: [
        {
          name: 'Study Permit',
          summary: 'Required for any program longer than 6 months at a Designated Learning Institution.',
          eligibility: ['Acceptance letter from a Designated Learning Institution', 'Proof of sufficient funds for tuition, travel and living costs', 'A valid passport', 'Intent to leave Canada when studies end (though PGWP is a common, legitimate next step)'],
          cost: '$235 CAD (permit + biometrics), plus tuition and living costs',
          timeline: 'Weeks to a few months, depending on country of application',
          documents: ['Acceptance letter', 'Proof of funds (~$23,000+ CAD/year for living costs alone, outside Quebec)', 'Passport', 'Statement of purpose'],
          leadsToPR: 'no',
          status: 'open',
          statusNote: 'Not a PR route on its own, but pairs naturally with the PGWP above.',
        },
      ],
    },
    {
      category: 'Tourist / Visitor',
      icon: '🧳',
      intro: 'For short visits — holidays, family visits, or conferences.',
      routes: [
        {
          name: 'Temporary Resident Visa (TRV) / eTA',
          summary: 'Most African travellers need a Temporary Resident Visa; citizens of a short list of visa-exempt countries only need the cheaper eTA.',
          eligibility: ['Valid passport', 'Proof of funds for the visit', 'Ties to home country (job, family, property) showing intent to return', 'Clean immigration/criminal history'],
          cost: '~$100 CAD (TRV) or $7 CAD (eTA) — most African travellers will need the TRV',
          timeline: 'A few weeks, longer during peak season or if biometrics are required',
          documents: ['Passport', 'Bank statements', 'Invitation letter if visiting family', 'Travel itinerary'],
          leadsToPR: 'no',
          status: 'open',
        },
      ],
    },
  ],
  careerPathways: [
    {
      field: 'Healthcare',
      description: "Canada's most acute shortage. Nurses, family physicians, pharmacy technicians and dental assistants are all in high demand, and Express Entry ran dedicated healthcare draws in 2026.",
      inDemandRoles: ['Registered Nurse', 'Family Physician', 'Personal Support Worker', 'Pharmacy Technician'],
    },
    {
      field: 'STEM & Cybersecurity',
      description: 'Software engineering, data analysis and cybersecurity remain priority categories for targeted Express Entry draws.',
      inDemandRoles: ['Software Engineer', 'Cybersecurity Specialist', 'Data Analyst'],
    },
    {
      field: 'Skilled Trades',
      description: 'Construction and industrial trades face a persistent shortage as a generation of tradespeople retires.',
      inDemandRoles: ['Construction Electrician', 'Welder', 'Heavy-Duty Equipment Mechanic'],
    },
    {
      field: 'Transport & Logistics',
      description: 'A new Express Entry category added in 2026, reflecting a national shortage of qualified drivers and logistics staff.',
      inDemandRoles: ['Long-Haul Truck Driver', 'Logistics Coordinator'],
    },
    {
      field: 'Early Childhood Education',
      description: 'Expanding childcare programs across provinces have driven steady demand for qualified educators.',
      inDemandRoles: ['Early Childhood Educator'],
    },
  ],
  culture: [
    { title: 'Politely indirect communication', description: '"Sorry" is often just a social smoothing word, not necessarily an apology. Canadians tend to imply rather than state things bluntly — pay attention to tone as much as words.' },
    { title: 'Punctuality matters', description: 'Arrive on time for meetings and appointments. Being even a few minutes late without notice can read as disrespectful.' },
    { title: 'Conflict avoided in public', description: 'Disagreements are usually handled privately, not in front of a group. Feedback is normal and expected — try to receive it without becoming defensive.' },
    { title: 'Networking is relationship-first', description: 'Canadians generally build trust before discussing business. A LinkedIn message pitching something immediately can land poorly — invest in the relationship first.' },
    { title: 'Work-life balance is respected', description: 'Sending work messages very late at night or over weekends is uncommon in most workplaces, and DEI (diversity, equity, inclusion) is a widely held workplace value.' },
  ],
  costOfLiving: [
    { city: 'Toronto, Ontario', rentOneBed: '~$2,400 CAD/month', groceries: '~$450–550 CAD/month', transport: '~$156 CAD/month (TTC pass)', notes: "Canada's largest job market, especially for finance, tech and healthcare." },
    { city: 'Vancouver, British Columbia', rentOneBed: '~$2,600 CAD/month', groceries: '~$450–550 CAD/month', transport: '~$110 CAD/month (TransLink pass)', notes: 'Highest rents in the country, offset for some by mild winters and a strong tech scene.' },
    { city: 'Calgary, Alberta', rentOneBed: '~$1,490–1,800 CAD/month', groceries: '~$350–400 CAD/month', transport: '~$90–115 CAD/month', notes: 'Meaningfully cheaper than Toronto or Vancouver, with a growing tech and energy job market.' },
  ],
  first30Days: [
    { title: 'Apply for your Social Insurance Number (SIN)', description: 'Do this first — you need it for almost everything else, including payroll and opening some accounts. Apply within 30 days of receiving your eCOPR or work/study permit.' },
    { title: 'Open a Canadian bank account', description: "Bring your passport and immigration document. Most banks offer newcomer accounts with waived fees for the first year, and won't always require your SIN on day one." },
    { title: 'Register for provincial health coverage', description: 'Apply on day one even where there\'s a waiting period — most provinces impose about 3 months before coverage starts, but a few (New Brunswick, Saskatchewan, Newfoundland) have none.' },
    { title: 'Get a SIM card', description: 'Prepaid plans from providers like Koodo, Public Mobile, Fizz or Lucky Mobile need no credit check and typically cost $15–35 CAD/month.' },
    { title: 'Secure temporary then permanent housing', description: 'Many newcomers start in short-term accommodation while apartment-hunting — landlords commonly ask for a credit history you won\'t have yet, so a Canadian guarantor or extra deposit can help.' },
    { title: 'Keep your address consistent everywhere', description: 'Small mismatches between your IRCC file, tax account, health registration and bank details (like "Street" vs "St.") can delay things for months — use the exact same format everywhere.' },
  ],
  touristSites: [
    { name: 'Niagara Falls, Ontario', description: 'One of the most visited natural landmarks in North America, an easy day trip from Toronto.' },
    { name: 'Banff National Park, Alberta', description: 'Turquoise glacial lakes and Rocky Mountain peaks — Canada\'s most famous national park.' },
    { name: 'Old Québec, Quebec City', description: 'A UNESCO World Heritage old town with cobblestone streets and European architecture.' },
    { name: 'Stanley Park, Vancouver', description: 'A massive urban rainforest park with ocean views, minutes from downtown Vancouver.' },
    { name: 'CN Tower, Toronto', description: 'An iconic skyline landmark with a glass floor observation deck.' },
  ],
  sourceNote:
    'Immigration programs, fees and processing times change frequently and without notice. Figures above are indicative and current as of our last research pass — always confirm details directly on IRCC\'s official website (canada.ca) before making decisions or payments.',
};
