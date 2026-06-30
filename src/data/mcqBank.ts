import type { MCQ } from "@/lib/types";

// Additional original MCQ bank (medically accurate, authored content) spread
// across the seeded topics. Merged into the main MCQS export.
export const EXTRA_MCQS: MCQ[] = [
  // ---------------- Anatomy ----------------
  {
    id: "mb-ana-1",
    topicId: "ana-upper-limb",
    subjectId: "anatomy",
    question: "The 'anatomical snuffbox' is bounded medially by the tendon of:",
    options: [
      "Extensor pollicis longus",
      "Extensor pollicis brevis",
      "Abductor pollicis longus",
      "Flexor carpi radialis",
    ],
    correctIndex: 0,
    explanation:
      "The anatomical snuffbox is bounded medially by extensor pollicis longus and laterally by extensor pollicis brevis and abductor pollicis longus. The scaphoid lies in its floor.",
  },
  {
    id: "mb-ana-2",
    topicId: "ana-thorax",
    subjectId: "anatomy",
    question: "The thoracic duct usually drains into the venous system at the:",
    options: [
      "Right brachiocephalic vein",
      "Junction of left subclavian and left internal jugular veins",
      "Superior vena cava",
      "Azygos vein",
    ],
    correctIndex: 1,
    explanation:
      "The thoracic duct drains lymph from most of the body into the junction of the left subclavian and left internal jugular veins.",
  },
  {
    id: "mb-ana-3",
    topicId: "ana-thorax",
    subjectId: "anatomy",
    question: "Which structure passes through the diaphragm at the level of T10?",
    options: ["Inferior vena cava", "Aorta", "Oesophagus", "Thoracic duct"],
    correctIndex: 2,
    explanation:
      "The oesophagus passes through the diaphragm at T10 (with the vagus nerves). The IVC passes at T8 and the aorta at T12.",
  },
  {
    id: "mb-ana-4",
    topicId: "ana-abdomen",
    subjectId: "anatomy",
    question: "The structure that forms the portal triad does NOT include:",
    options: [
      "Hepatic portal vein",
      "Hepatic artery proper",
      "Bile duct",
      "Hepatic vein",
    ],
    correctIndex: 3,
    explanation:
      "The portal triad consists of the hepatic portal vein, hepatic artery proper and the bile duct. The hepatic veins drain into the IVC and are not part of the triad.",
  },
  {
    id: "mb-ana-5",
    topicId: "ana-head-neck",
    subjectId: "anatomy",
    question: "Which cranial nerve is responsible for the motor supply of the muscles of mastication?",
    options: [
      "Facial nerve (VII)",
      "Mandibular division of trigeminal (V3)",
      "Glossopharyngeal nerve (IX)",
      "Hypoglossal nerve (XII)",
    ],
    correctIndex: 1,
    explanation:
      "The muscles of mastication are supplied by the mandibular division (V3) of the trigeminal nerve.",
  },
  {
    id: "mb-ana-6",
    topicId: "ana-neuro",
    subjectId: "anatomy",
    question: "The neurotransmitter released by most preganglionic autonomic neurons is:",
    options: ["Noradrenaline", "Acetylcholine", "Dopamine", "GABA"],
    correctIndex: 1,
    explanation:
      "All preganglionic autonomic neurons (sympathetic and parasympathetic) release acetylcholine acting on nicotinic receptors.",
  },

  // ---------------- Physiology ----------------
  {
    id: "mb-phy-1",
    topicId: "phy-cvs",
    subjectId: "physiology",
    question: "The pacemaker of the heart is the:",
    options: ["AV node", "SA node", "Bundle of His", "Purkinje fibres"],
    correctIndex: 1,
    explanation:
      "The sinoatrial (SA) node has the fastest intrinsic rate (~70-80/min) and acts as the normal pacemaker.",
  },
  {
    id: "mb-phy-2",
    topicId: "phy-blood",
    subjectId: "physiology",
    question: "The universal donor blood group is:",
    options: ["AB positive", "O negative", "A negative", "O positive"],
    correctIndex: 1,
    explanation:
      "O negative red cells lack A, B and Rh D antigens, making them the universal donor for packed red cells.",
  },
  {
    id: "mb-phy-3",
    topicId: "phy-respiratory",
    subjectId: "physiology",
    question: "The amount of air that can be inspired forcefully after a normal inspiration is called:",
    options: [
      "Tidal volume",
      "Inspiratory reserve volume",
      "Expiratory reserve volume",
      "Residual volume",
    ],
    correctIndex: 1,
    explanation:
      "Inspiratory reserve volume (IRV) is the additional air that can be inspired beyond a normal tidal inspiration (~3000 mL).",
  },
  {
    id: "mb-phy-4",
    topicId: "phy-renal",
    subjectId: "physiology",
    question: "The hormone primarily responsible for water reabsorption in the collecting duct is:",
    options: ["Aldosterone", "Antidiuretic hormone (ADH)", "Renin", "ANP"],
    correctIndex: 1,
    explanation:
      "ADH (vasopressin) increases water permeability of the collecting duct by inserting aquaporin-2 channels.",
  },
  {
    id: "mb-phy-5",
    topicId: "phy-git",
    subjectId: "physiology",
    question: "Intrinsic factor, required for vitamin B12 absorption, is secreted by:",
    options: ["Chief cells", "Parietal cells", "G cells", "Mucous neck cells"],
    correctIndex: 1,
    explanation:
      "Parietal (oxyntic) cells secrete both HCl and intrinsic factor; the latter is essential for vitamin B12 absorption in the terminal ileum.",
  },
  {
    id: "mb-phy-6",
    topicId: "phy-endocrine",
    subjectId: "physiology",
    question: "Which hormone lowers blood glucose levels?",
    options: ["Glucagon", "Insulin", "Cortisol", "Growth hormone"],
    correctIndex: 1,
    explanation:
      "Insulin, secreted by pancreatic beta cells, is the principal hypoglycaemic hormone; the others are hyperglycaemic.",
  },
  {
    id: "mb-phy-7",
    topicId: "phy-nerve-muscle",
    subjectId: "physiology",
    question: "The neurotransmitter at the neuromuscular junction is:",
    options: ["Dopamine", "Acetylcholine", "Glutamate", "Glycine"],
    correctIndex: 1,
    explanation:
      "Acetylcholine is released at the neuromuscular junction and acts on nicotinic receptors of the motor end plate.",
  },
  {
    id: "mb-phy-8",
    topicId: "phy-cns",
    subjectId: "physiology",
    question: "The main inhibitory neurotransmitter in the adult central nervous system is:",
    options: ["Glutamate", "GABA", "Acetylcholine", "Noradrenaline"],
    correctIndex: 1,
    explanation:
      "GABA (gamma-aminobutyric acid) is the principal inhibitory neurotransmitter in the brain.",
  },

  // ---------------- Biochemistry ----------------
  {
    id: "mb-bio-1",
    topicId: "bio-lipid",
    subjectId: "biochemistry",
    question: "The rate-limiting enzyme of cholesterol biosynthesis is:",
    options: [
      "HMG-CoA reductase",
      "HMG-CoA synthase",
      "Acetyl-CoA carboxylase",
      "Citrate lyase",
    ],
    correctIndex: 0,
    explanation:
      "HMG-CoA reductase catalyses the rate-limiting step of cholesterol synthesis and is the target of statin drugs.",
  },
  {
    id: "mb-bio-2",
    topicId: "bio-protein",
    subjectId: "biochemistry",
    question: "Which of the following is a ketogenic amino acid only?",
    options: ["Leucine", "Alanine", "Valine", "Methionine"],
    correctIndex: 0,
    explanation:
      "Leucine and lysine are purely ketogenic. Most others are glucogenic or both.",
  },
  {
    id: "mb-bio-3",
    topicId: "bio-vitamins",
    subjectId: "biochemistry",
    question: "Deficiency of vitamin C leads to:",
    options: ["Beriberi", "Scurvy", "Pellagra", "Rickets"],
    correctIndex: 1,
    explanation:
      "Vitamin C (ascorbic acid) deficiency causes scurvy due to defective collagen synthesis (impaired prolyl/lysyl hydroxylation).",
  },
  {
    id: "mb-bio-4",
    topicId: "bio-vitamins",
    subjectId: "biochemistry",
    question: "Which vitamin acts as a coenzyme in the form of FAD?",
    options: ["Thiamine (B1)", "Riboflavin (B2)", "Niacin (B3)", "Pyridoxine (B6)"],
    correctIndex: 1,
    explanation:
      "Riboflavin (B2) is the precursor of FAD and FMN, coenzymes in many redox reactions.",
  },
  {
    id: "mb-bio-5",
    topicId: "bio-molecular",
    subjectId: "biochemistry",
    question: "The process of synthesizing RNA from a DNA template is called:",
    options: ["Replication", "Transcription", "Translation", "Reverse transcription"],
    correctIndex: 1,
    explanation:
      "Transcription is the synthesis of RNA from a DNA template by RNA polymerase.",
  },

  // ---------------- Pathology ----------------
  {
    id: "mb-pat-1",
    topicId: "pat-inflammation",
    subjectId: "pathology",
    question: "The most abundant cell in acute inflammation is the:",
    options: ["Lymphocyte", "Neutrophil", "Macrophage", "Eosinophil"],
    correctIndex: 1,
    explanation:
      "Neutrophils are the predominant cells in the first 24 hours of acute inflammation.",
  },
  {
    id: "mb-pat-2",
    topicId: "pat-neoplasia",
    subjectId: "pathology",
    question: "Which of the following is a tumour suppressor gene?",
    options: ["RAS", "MYC", "TP53", "HER2"],
    correctIndex: 2,
    explanation:
      "TP53 (p53) is a key tumour suppressor gene; RAS, MYC and HER2 are proto-oncogenes/oncogenes.",
  },

  // ---------------- Pharmacology ----------------
  {
    id: "mb-pha-1",
    topicId: "pha-antimicrobial",
    subjectId: "pharmacology",
    question: "Which antibiotic class inhibits bacterial cell wall synthesis?",
    options: ["Aminoglycosides", "Beta-lactams", "Macrolides", "Fluoroquinolones"],
    correctIndex: 1,
    explanation:
      "Beta-lactams (penicillins, cephalosporins) inhibit cell wall synthesis by binding penicillin-binding proteins.",
  },
  {
    id: "mb-pha-2",
    topicId: "pha-ans",
    subjectId: "pharmacology",
    question: "Propranolol is a:",
    options: [
      "Non-selective beta-blocker",
      "Selective beta-1 blocker",
      "Alpha-1 blocker",
      "Muscarinic agonist",
    ],
    correctIndex: 0,
    explanation:
      "Propranolol is a non-selective beta-adrenergic antagonist (blocks both beta-1 and beta-2 receptors).",
  },

  // ---------------- Microbiology ----------------
  {
    id: "mb-mic-1",
    topicId: "mic-bacteriology",
    subjectId: "microbiology",
    question: "Gram-positive bacteria appear which colour after Gram staining?",
    options: ["Pink/red", "Purple/violet", "Green", "Colourless"],
    correctIndex: 1,
    explanation:
      "Gram-positive bacteria retain the crystal violet-iodine complex and appear purple; Gram-negative appear pink due to the counterstain.",
  },

  // ---------------- Community Medicine ----------------
  {
    id: "mb-com-1",
    topicId: "com-epidemiology",
    subjectId: "community-medicine",
    question: "The most appropriate measure of central tendency for skewed data is the:",
    options: ["Mean", "Median", "Mode", "Range"],
    correctIndex: 1,
    explanation:
      "The median is least affected by extreme values, making it the best measure of central tendency for skewed distributions.",
  },
];
