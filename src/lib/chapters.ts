export type Chapter = {
  number: number;
  name: string;
  punjabi?: string;
};

export type SubSubject = {
  id: string;
  name: string;
  punjabi: string;
  icon: string;
  chapters: Chapter[];
};

export type Subject = {
  id: "math" | "science" | "social";
  name: string;
  punjabi: string;
  short: string;
  color: string;
  accent: string;
  icon: string;
  subSubjects?: SubSubject[];
  chapters?: Chapter[];
};

// ---- MATH (14 chapters) ----
const mathChapters: Chapter[] = [
  { number: 1, name: "Real Numbers" },
  { number: 2, name: "Polynomials" },
  {
    number: 3,
    name: "Pair of Linear Equations in Two Variables",
  },
  { number: 4, name: "Quadratic Equations" },
  { number: 5, name: "Arithmetic Progressions" },
  { number: 6, name: "Triangles" },
  { number: 7, name: "Coordinate Geometry" },
  { number: 8, name: "Introduction to Trigonometry" },
  { number: 9, name: "Some Applications of Trigonometry" },
  { number: 10, name: "Circles" },
  { number: 11, name: "Areas Related to Circles" },
  { number: 12, name: "Surface Areas and Volumes" },
  { number: 13, name: "Statistics" },
  { number: 14, name: "Probability" },
];

// ---- SCIENCE (13 chapters) ----
const scienceChapters: Chapter[] = [
  {
    number: 1,
    name: "Chemical Reactions and Equations",
    punjabi: "ਰਸਾਇਣਕ ਵਿਕਿਰਆਂ ਅਤੇ ਸਮੀਕਰਨਾਂ",
  },
  {
    number: 2,
    name: "Acids, Bases and Salts",
    punjabi: "ਤੇਜ਼ਾਬ, ਖਾਰ ਅਤੇ ਲੂਣ",
  },
  {
    number: 3,
    name: "Metals and Non-metals",
    punjabi: "ਧਾਤ ਅਤੇ ਅਧਾਤ",
  },
  {
    number: 4,
    name: "Carbon and its Compounds",
    punjabi: "ਕਾਰਬਨ ਅਤੇ ਇਸ ਦੇ ਮਿਸ਼ਰਣ",
  },
  {
    number: 5,
    name: "Life Processes",
    punjabi: "ਜੀਵਨ ਪ੍ਰਕਿਰਿਆਵਾਂ",
  },
  {
    number: 6,
    name: "Control and Coordination",
    punjabi: "ਨਿਅੰਤਰ ਅਤੇ ਤਾਲਮੇਲ",
  },
  {
    number: 7,
    name: "How Do Organisms Reproduce?",
    punjabi: "ਜੀਵ ਪ੍ਰਜਣਨ ਕਿਵੇਂ ਕਰਦੇ ਹਨ?",
  },
  {
    number: 8,
    name: "Heredity and Evolution",
    punjabi: "ਅਨੁਵੰਸ਼ਤਾ ਅਤੇ ਵਿਕਾਸ",
  },
  {
    number: 9,
    name: "Light – Reflection and Refraction",
    punjabi: "ਪ੍ਰਕਾਸ਼ – ਪਰਾਵਰਤਨ ਅਤੇ ਅਪਵਰਤਨ",
  },
  {
    number: 10,
    name: "The Human Eye and The Colourful World",
    punjabi: "ਮਨੁੱਖੀ ਅੱਖ ਅਤੇ ਰੰਗਾਂ ਭਰਪੂਰ ਸੰਸਾਰ",
  },
  {
    number: 11,
    name: "Electricity",
    punjabi: "ਬਿਜਲੀ",
  },
  {
    number: 12,
    name: "Magnetic Effects of Electric Current",
    punjabi: "ਬਿਜਲਈ ਧਾਰਾ ਦੇ ਚੁੰਬਕੀ ਪ੍ਰਭਾਵ",
  },
  {
    number: 13,
    name: "Our Environment",
    punjabi: "ਸਾਡਾ ਵਾਤਾਵਰਣ",
  },
];

// ---- SOCIAL SCIENCE ----
const historyChapters: Chapter[] = [
  {
    number: 1,
    name: "Physical Features of Punjab and their Influence on History",
    punjabi: "ਪੰਜਾਬ ਦੀਆਂ ਭੂਗੋਲਿਕ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਅਤੇ ਇਸਦੇ ਇਤਿਹਾਸ ਉੱਤੇ ਇਸਦਾ ਪ੍ਰਭਾਵ",
  },
  {
    number: 2,
    name: "Political and Social Conditions of Punjab before Guru Nanak Dev Ji",
    punjabi: "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਤੋਂ ਪਹਿਲਾਂ ਪੰਜਾਬ ਦੀ ਰਾਜਨੀਤਿਕ ਅਤੇ ਸਮਾਜਿਕ ਵਵਸਥਾ",
  },
  {
    number: 3,
    name: "Guru Nanak Dev Ji and His Teachings",
    punjabi: "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੀਆਂ ਸਿਖਿਆਵਾਂ",
  },
  {
    number: 4,
    name: "Contribution of Sikh Gurus from Guru Angad Dev Ji to Guru Tegh Bahadur Ji",
    punjabi:
      "ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਤੋਂ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਤੱਕ ਸਿੱਖ ਗੁਰੂਆਂ ਦਾ ਯੋਗਦਾਨ",
  },
  {
    number: 5,
    name: "Guru Gobind Singh Ji's Life, Creation of Khalsa, and Personality",
    punjabi:
      "ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦਾ ਜੀਵਨ, ਖਾਲਸੇ ਦੀ ਸਿਰਜਣਾ ਅਤੇ ਸ਼ਖਸ਼ੀਅਤ",
  },
  {
    number: 6,
    name: "Banda Singh Bahadur and the Sikh Misals",
    punjabi: "ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਅਤੇ ਸਿੰਘ ਮਿਸਲਾਂ",
  },
  { number: 7, name: "Ranjit Singh", punjabi: "ਰਣਜੀਤ ਸਿੰਘ" },
  {
    number: 8,
    name: "Anglo-Sikh Wars and Annexation of Punjab",
    punjabi: "ਐਂਗਲੋ-ਸਿੱਖ ਯੁੱਧ ਅਤੇ ਪੰਜਾਬ ਦੀ ਅਨੀਕਸ਼ਨ",
  },
  {
    number: 9,
    name: "Punjab's Contribution toward Struggle for Freedom",
    punjabi: "ਅਜ਼ਾਦੀ ਦੀ ਲੜਾਈ ਵਿੱਚ ਪੰਜਾਬ ਦਾ ਯੋਗਦਾਨ",
  },
];

const geographyChapters: Chapter[] = [
  { number: 1, name: "India — An Introduction", punjabi: "ਭਾਰਤ — ਇੱਕ ਜਾਣ-ਪਛਾਣ" },
  { number: 2, name: "Land", punjabi: "ਭੂ-ਭਾਗ" },
  { number: 3, name: "Climate", punjabi: "ਜਲਵਾਯੂ" },
  { number: 4, name: "Natural Vegetation", punjabi: "ਕੁਦਰਤੀ ਬਨਸਪਤੀ" },
  {
    number: 5,
    name: "Natural Vegetation, Wildlife and Soils",
    punjabi: "ਕੁਦਰਤੀ ਵਨਸਪਤੀ, ਜੀਵ-ਜੰਤੂ ਅਤੇ ਮਿੱਟੀਆਂ",
  },
  {
    number: 6,
    name: "Land Utilization and Agriculture",
    punjabi: "ਭੂ-ਵਰਤੋਂ ਅਤੇ ਖੇਤੀਬਾੜੀ",
  },
  {
    number: 7,
    name: "Minerals and Power Resources",
    punjabi: "ਖਣਿਜ ਪਦਾਰਥ ਅਤੇ ਸ਼ਕਤੀ ਸਾਧਨ",
  },
  { number: 8, name: "Population", punjabi: "ਆਬਾਦੀ" },
];

const economicsChapters: Chapter[] = [
  {
    number: 1,
    name: "Basic Concepts",
    punjabi: "ਅਰਥ-ਸ਼ਾਸਤਰ ਦੀਆਂ ਮੁਢਲੀਆਂ ਧਾਰਨਾਵਾਂ",
  },
  {
    number: 2,
    name: "The Infrastructure of the Indian Economy",
    punjabi: "ਭਾਰਤੀ ਅਰਥ-ਵਵਸਥਾ ਦੀ ਅਧਾਰਿਕ ਸਰੰਚਨਾ",
  },
  {
    number: 3,
    name: "Industrial Development",
    punjabi: "ਉਦਯੋਗਿਕ ਵਿਕਾਸ",
  },
  {
    number: 4,
    name: "Agricultural Development in India",
    punjabi: "ਖੇਤੀਬਾਡ਼ੀ ਵਿੱਚ ਵਿਕਾਸ",
  },
];

const civicsChapters: Chapter[] = [
  {
    number: 1,
    name: "Features of the Indian Constitution",
    punjabi: "ਭਾਰਤੀ ਸੰਵਿਧਾਨ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
  },
  { number: 2, name: "Central Government", punjabi: "ਕੇਂਦਰੀ ਸਰਕਾਰ" },
  { number: 3, name: "State Government", punjabi: "ਰਾਜ ਸਰਕਾਰ" },
  {
    number: 4,
    name: "Indian Foreign Policy & United Nations",
    punjabi: "ਭਾਰਤੀ ਵਿਦੇਸ਼ ਨੀਤੀ ਅਤੇ ਯੂਨਾਈਟੇਡ ਨੈਸ਼ਨਜ਼",
  },
  {
    number: 5,
    name: "Indian Democracy at Work",
    punjabi: "ਭਾਰਤੀ ਲੋਕਤੰਤਰ",
  },
];

export const subjects: Subject[] = [
  {
    id: "math",
    name: "Mathematics",
    punjabi: "ਗਣਿਤ",
    short: "Math",
    color: "text-emerald-600 dark:text-emerald-400",
    accent: "data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400",
    icon: "Calculator",
    chapters: mathChapters,
  },
  {
    id: "science",
    name: "Science",
    punjabi: "ਵਿਗਿਆਨ",
    short: "Science",
    color: "text-rose-600 dark:text-rose-400",
    accent: "data-[state=active]:border-rose-500 data-[state=active]:text-rose-600 dark:data-[state=active]:text-rose-400",
    icon: "FlaskConical",
    chapters: scienceChapters,
  },
  {
    id: "social",
    name: "Social Science",
    punjabi: "ਸਮਾਜ ਵਿਗਿਆਨ",
    short: "Social",
    color: "text-amber-600 dark:text-amber-400",
    accent: "data-[state=active]:border-amber-500 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400",
    icon: "Globe2",
    subSubjects: [
      {
        id: "history",
        name: "History",
        punjabi: "ਇਤਿਹਾਸ",
        icon: "ScrollText",
        chapters: historyChapters,
      },
      {
        id: "geography",
        name: "Geography",
        punjabi: "ਭੂਗੋਲ",
        icon: "Mountain",
        chapters: geographyChapters,
      },
      {
        id: "economics",
        name: "Economics",
        punjabi: "ਅਰਥ-ਸ਼ਾਸਤਰ",
        icon: "Coins",
        chapters: economicsChapters,
      },
      {
        id: "civics",
        name: "Political Science",
        punjabi: "ਨਾਗਰਿਕ ਸ਼ਾਸਤਰ",
        icon: "Scale",
        chapters: civicsChapters,
      },
    ],
  },
];

export function getSubject(id: string) {
  return subjects.find((s) => s.id === id);
}

export function totalChapters(): number {
  return subjects.reduce((acc, s) => {
    if (s.chapters) return acc + s.chapters.length;
    if (s.subSubjects)
      return acc + s.subSubjects.reduce((a, ss) => a + ss.chapters.length, 0);
    return acc;
  }, 0);
}

// All subjects flattened into "scope" keys for storage.
export type Scope = {
  subjectId: string;
  subId?: string;
  chapterNumber: number;
};

export function allScopes(): Scope[] {
  const out: Scope[] = [];
  for (const s of subjects) {
    if (s.chapters) {
      for (const c of s.chapters) {
        out.push({ subjectId: s.id, chapterNumber: c.number });
      }
    } else if (s.subSubjects) {
      for (const ss of s.subSubjects) {
        for (const c of ss.chapters) {
          out.push({ subjectId: s.id, subId: ss.id, chapterNumber: c.number });
        }
      }
    }
  }
  return out;
}

export function scopeKey(s: Scope): string {
  return s.subId
    ? `${s.subjectId}:${s.subId}:${s.chapterNumber}`
    : `${s.subjectId}:${s.chapterNumber}`;
}
