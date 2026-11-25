export type Element = {
  atomicNumber: number;
  name: string;
  symbol: string;
  valency: string;
  valenceElectrons: string;
  // Electronic configuration as comma-separated shell electrons
  // e.g. "2, 8, 1" = K=2, L=8, M=1
  shells: string;
  shellsArr: number[];
  // optional category for color theming
  category:
    | "alkali-metal"
    | "alkaline-earth"
    | "nonmetal"
    | "halogen"
    | "noble-gas"
    | "metalloid"
    | "post-transition"
    | "transition"
    | "lanthanide";
};

// First 20 elements with full K L M N shell config (Class 10 Bohr model)
export const first20Elements: Element[] = [
  {
    atomicNumber: 1,
    name: "Hydrogen",
    symbol: "H",
    valency: "1",
    valenceElectrons: "1",
    shells: "1",
    shellsArr: [1],
    category: "nonmetal",
  },
  {
    atomicNumber: 2,
    name: "Helium",
    symbol: "He",
    valency: "0",
    valenceElectrons: "2",
    shells: "2",
    shellsArr: [2],
    category: "noble-gas",
  },
  {
    atomicNumber: 3,
    name: "Lithium",
    symbol: "Li",
    valency: "1",
    valenceElectrons: "1",
    shells: "2, 1",
    shellsArr: [2, 1],
    category: "alkali-metal",
  },
  {
    atomicNumber: 4,
    name: "Beryllium",
    symbol: "Be",
    valency: "2",
    valenceElectrons: "2",
    shells: "2, 2",
    shellsArr: [2, 2],
    category: "alkaline-earth",
  },
  {
    atomicNumber: 5,
    name: "Boron",
    symbol: "B",
    valency: "3",
    valenceElectrons: "3",
    shells: "2, 3",
    shellsArr: [2, 3],
    category: "metalloid",
  },
  {
    atomicNumber: 6,
    name: "Carbon",
    symbol: "C",
    valency: "4",
    valenceElectrons: "4",
    shells: "2, 4",
    shellsArr: [2, 4],
    category: "nonmetal",
  },
  {
    atomicNumber: 7,
    name: "Nitrogen",
    symbol: "N",
    valency: "3",
    valenceElectrons: "5",
    shells: "2, 5",
    shellsArr: [2, 5],
    category: "nonmetal",
  },
  {
    atomicNumber: 8,
    name: "Oxygen",
    symbol: "O",
    valency: "2",
    valenceElectrons: "6",
    shells: "2, 6",
    shellsArr: [2, 6],
    category: "nonmetal",
  },
  {
    atomicNumber: 9,
    name: "Fluorine",
    symbol: "F",
    valency: "1",
    valenceElectrons: "7",
    shells: "2, 7",
    shellsArr: [2, 7],
    category: "halogen",
  },
  {
    atomicNumber: 10,
    name: "Neon",
    symbol: "Ne",
    valency: "0",
    valenceElectrons: "8",
    shells: "2, 8",
    shellsArr: [2, 8],
    category: "noble-gas",
  },
  {
    atomicNumber: 11,
    name: "Sodium",
    symbol: "Na",
    valency: "1",
    valenceElectrons: "1",
    shells: "2, 8, 1",
    shellsArr: [2, 8, 1],
    category: "alkali-metal",
  },
  {
    atomicNumber: 12,
    name: "Magnesium",
    symbol: "Mg",
    valency: "2",
    valenceElectrons: "2",
    shells: "2, 8, 2",
    shellsArr: [2, 8, 2],
    category: "alkaline-earth",
  },
  {
    atomicNumber: 13,
    name: "Aluminium",
    symbol: "Al",
    valency: "3",
    valenceElectrons: "3",
    shells: "2, 8, 3",
    shellsArr: [2, 8, 3],
    category: "post-transition",
  },
  {
    atomicNumber: 14,
    name: "Silicon",
    symbol: "Si",
    valency: "4",
    valenceElectrons: "4",
    shells: "2, 8, 4",
    shellsArr: [2, 8, 4],
    category: "metalloid",
  },
  {
    atomicNumber: 15,
    name: "Phosphorus",
    symbol: "P",
    valency: "3, 5",
    valenceElectrons: "5",
    shells: "2, 8, 5",
    shellsArr: [2, 8, 5],
    category: "nonmetal",
  },
  {
    atomicNumber: 16,
    name: "Sulphur",
    symbol: "S",
    valency: "2, 4, 6",
    valenceElectrons: "6",
    shells: "2, 8, 6",
    shellsArr: [2, 8, 6],
    category: "nonmetal",
  },
  {
    atomicNumber: 17,
    name: "Chlorine",
    symbol: "Cl",
    valency: "1",
    valenceElectrons: "7",
    shells: "2, 8, 7",
    shellsArr: [2, 8, 7],
    category: "halogen",
  },
  {
    atomicNumber: 18,
    name: "Argon",
    symbol: "Ar",
    valency: "0",
    valenceElectrons: "8",
    shells: "2, 8, 8",
    shellsArr: [2, 8, 8],
    category: "noble-gas",
  },
  {
    atomicNumber: 19,
    name: "Potassium",
    symbol: "K",
    valency: "1",
    valenceElectrons: "1",
    shells: "2, 8, 8, 1",
    shellsArr: [2, 8, 8, 1],
    category: "alkali-metal",
  },
  {
    atomicNumber: 20,
    name: "Calcium",
    symbol: "Ca",
    valency: "2",
    valenceElectrons: "2",
    shells: "2, 8, 8, 2",
    shellsArr: [2, 8, 8, 2],
    category: "alkaline-earth",
  },
];

// 10 important heavy elements (atomic number > 20) commonly used in Class 10
export const importantHeavyElements: Element[] = [
  {
    atomicNumber: 26,
    name: "Iron",
    symbol: "Fe",
    valency: "2, 3",
    valenceElectrons: "2",
    shells: "2, 8, 14, 2",
    shellsArr: [2, 8, 14, 2],
    category: "transition",
  },
  {
    atomicNumber: 29,
    name: "Copper",
    symbol: "Cu",
    valency: "1, 2",
    valenceElectrons: "1",
    shells: "2, 8, 18, 1",
    shellsArr: [2, 8, 18, 1],
    category: "transition",
  },
  {
    atomicNumber: 30,
    name: "Zinc",
    symbol: "Zn",
    valency: "2",
    valenceElectrons: "2",
    shells: "2, 8, 18, 2",
    shellsArr: [2, 8, 18, 2],
    category: "transition",
  },
  {
    atomicNumber: 35,
    name: "Bromine",
    symbol: "Br",
    valency: "1",
    valenceElectrons: "7",
    shells: "2, 8, 18, 7",
    shellsArr: [2, 8, 18, 7],
    category: "halogen",
  },
  {
    atomicNumber: 47,
    name: "Silver",
    symbol: "Ag",
    valency: "1",
    valenceElectrons: "1",
    shells: "2, 8, 18, 18, 1",
    shellsArr: [2, 8, 18, 18, 1],
    category: "transition",
  },
  {
    atomicNumber: 53,
    name: "Iodine",
    symbol: "I",
    valency: "1",
    valenceElectrons: "7",
    shells: "2, 8, 18, 18, 7",
    shellsArr: [2, 8, 18, 18, 7],
    category: "halogen",
  },
  {
    atomicNumber: 56,
    name: "Barium",
    symbol: "Ba",
    valency: "2",
    valenceElectrons: "2",
    shells: "2, 8, 18, 18, 8, 2",
    shellsArr: [2, 8, 18, 18, 8, 2],
    category: "alkaline-earth",
  },
  {
    atomicNumber: 79,
    name: "Gold",
    symbol: "Au",
    valency: "1, 3",
    valenceElectrons: "1",
    shells: "2, 8, 18, 32, 18, 1",
    shellsArr: [2, 8, 18, 32, 18, 1],
    category: "transition",
  },
  {
    atomicNumber: 80,
    name: "Mercury",
    symbol: "Hg",
    valency: "1, 2",
    valenceElectrons: "2",
    shells: "2, 8, 18, 32, 18, 2",
    shellsArr: [2, 8, 18, 32, 18, 2],
    category: "transition",
  },
  {
    atomicNumber: 82,
    name: "Lead",
    symbol: "Pb",
    valency: "2, 4",
    valenceElectrons: "4",
    shells: "2, 8, 18, 32, 18, 4",
    shellsArr: [2, 8, 18, 32, 18, 4],
    category: "post-transition",
  },
];

export const SHELL_NAMES = ["K", "L", "M", "N", "O", "P", "Q"];

export const categoryColors: Record<
  Element["category"],
  { bg: string; text: string; label: string }
> = {
  "alkali-metal": {
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
    label: "Alkali Metal",
  },
  "alkaline-earth": {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
    label: "Alkaline Earth",
  },
  nonmetal: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Non-metal",
  },
  halogen: {
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    text: "text-sky-600 dark:text-sky-400",
    label: "Halogen",
  },
  "noble-gas": {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    text: "text-violet-600 dark:text-violet-400",
    label: "Noble Gas",
  },
  metalloid: {
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    text: "text-teal-600 dark:text-teal-400",
    label: "Metalloid",
  },
  "post-transition": {
    bg: "bg-slate-500/10 dark:bg-slate-500/15",
    text: "text-slate-600 dark:text-slate-300",
    label: "Post-transition",
  },
  transition: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    text: "text-orange-600 dark:text-orange-400",
    label: "Transition Metal",
  },
  lanthanide: {
    bg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/15",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    label: "Lanthanide",
  },
};
