import type { Subject, Topic } from "@/lib/types";

// BMDC-standardized curriculum (nationally shared across all colleges).
export const SUBJECTS: Subject[] = [
  // 1st Professional (pre-clinical)
  { id: "anatomy", name: "Anatomy", year: "1st", icon: "bone" },
  { id: "physiology", name: "Physiology", year: "1st", icon: "activity" },
  { id: "biochemistry", name: "Biochemistry", year: "1st", icon: "flask" },
  // 2nd Professional (para-clinical)
  { id: "pathology", name: "Pathology", year: "2nd", icon: "microscope" },
  { id: "pharmacology", name: "Pharmacology", year: "2nd", icon: "pill" },
  { id: "microbiology", name: "Microbiology", year: "2nd", icon: "bug" },
  {
    id: "community-medicine",
    name: "Community Medicine",
    year: "2nd",
    icon: "users",
  },
  { id: "forensic", name: "Forensic Medicine", year: "2nd", icon: "scale" },
  // 3rd Professional
  { id: "medicine", name: "Medicine", year: "3rd", icon: "stethoscope" },
  { id: "surgery", name: "Surgery", year: "3rd", icon: "scissors" },
  // 4th / Final Professional
  { id: "gynae-obs", name: "Gynaecology & Obstetrics", year: "4th", icon: "baby" },
  { id: "paediatrics", name: "Paediatrics", year: "4th", icon: "heart" },
];

export const TOPICS: Topic[] = [
  // ---- Anatomy (1st year) ----
  { id: "ana-upper-limb", subjectId: "anatomy", name: "Upper Limb", order: 1, highYield: true },
  { id: "ana-lower-limb", subjectId: "anatomy", name: "Lower Limb", order: 2, highYield: true },
  { id: "ana-thorax", subjectId: "anatomy", name: "Thorax", order: 3, highYield: true },
  { id: "ana-abdomen", subjectId: "anatomy", name: "Abdomen & Pelvis", order: 4, highYield: true },
  { id: "ana-head-neck", subjectId: "anatomy", name: "Head & Neck", order: 5, highYield: true },
  { id: "ana-neuro", subjectId: "anatomy", name: "Neuroanatomy", order: 6, highYield: true },
  { id: "ana-histology", subjectId: "anatomy", name: "General Histology", order: 7 },
  { id: "ana-embryology", subjectId: "anatomy", name: "General Embryology", order: 8 },

  // ---- Physiology (1st year) ----
  { id: "phy-blood", subjectId: "physiology", name: "Blood & Body Fluids", order: 1, highYield: true },
  { id: "phy-cvs", subjectId: "physiology", name: "Cardiovascular System", order: 2, highYield: true },
  { id: "phy-respiratory", subjectId: "physiology", name: "Respiratory System", order: 3, highYield: true },
  { id: "phy-nerve-muscle", subjectId: "physiology", name: "Nerve & Muscle", order: 4 },
  { id: "phy-git", subjectId: "physiology", name: "Gastrointestinal System", order: 5 },
  { id: "phy-renal", subjectId: "physiology", name: "Renal System", order: 6, highYield: true },
  { id: "phy-endocrine", subjectId: "physiology", name: "Endocrinology", order: 7 },
  { id: "phy-cns", subjectId: "physiology", name: "Central Nervous System", order: 8 },

  // ---- Biochemistry (1st year) ----
  { id: "bio-carbohydrate", subjectId: "biochemistry", name: "Carbohydrate Metabolism", order: 1, highYield: true },
  { id: "bio-lipid", subjectId: "biochemistry", name: "Lipid Metabolism", order: 2, highYield: true },
  { id: "bio-protein", subjectId: "biochemistry", name: "Protein & Amino Acids", order: 3 },
  { id: "bio-enzyme", subjectId: "biochemistry", name: "Enzymes", order: 4, highYield: true },
  { id: "bio-vitamins", subjectId: "biochemistry", name: "Vitamins & Minerals", order: 5 },
  { id: "bio-molecular", subjectId: "biochemistry", name: "Molecular Biology", order: 6 },

  // ---- A couple of 2nd-year topics so other years are not empty ----
  { id: "pat-inflammation", subjectId: "pathology", name: "Inflammation & Repair", order: 1, highYield: true },
  { id: "pat-neoplasia", subjectId: "pathology", name: "Neoplasia", order: 2, highYield: true },
  { id: "pha-ans", subjectId: "pharmacology", name: "Autonomic Nervous System Drugs", order: 1, highYield: true },
  { id: "pha-antimicrobial", subjectId: "pharmacology", name: "Antimicrobials", order: 2 },
  { id: "mic-bacteriology", subjectId: "microbiology", name: "General Bacteriology", order: 1 },
  { id: "com-epidemiology", subjectId: "community-medicine", name: "Epidemiology", order: 1, highYield: true },
];
