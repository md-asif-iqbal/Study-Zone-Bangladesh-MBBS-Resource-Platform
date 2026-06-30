import type { College } from "@/lib/types";

// Comprehensive list of Bangladeshi medical colleges (government, private and
// armed forces). Affiliated university is set to the regional medical
// university by division. This is editable seed data — names/affiliations can
// be refined as official BMDC records are updated.

export const COLLEGES: College[] = [
  // =====================================================================
  // GOVERNMENT MEDICAL COLLEGES
  // =====================================================================
  { id: "dmc", name: "Dhaka Medical College", type: "government", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "smc", name: "Sir Salimullah Medical College", type: "government", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "ssmc", name: "Shaheed Suhrawardy Medical College", type: "government", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "mugda", name: "Mugda Medical College", type: "government", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "mmc", name: "Mymensingh Medical College", type: "government", location: "Mymensingh", affiliatedUniversity: "University of Dhaka" },
  { id: "stamc", name: "Shaheed Tajuddin Ahmad Medical College", type: "government", location: "Gazipur", affiliatedUniversity: "University of Dhaka" },
  { id: "ssnimc", name: "Shaheed Syed Nazrul Islam Medical College", type: "government", location: "Kishoreganj", affiliatedUniversity: "University of Dhaka" },
  { id: "pahmc", name: "President Abdul Hamid Medical College", type: "government", location: "Kishoreganj", affiliatedUniversity: "University of Dhaka" },
  { id: "shmc-jamalpur", name: "Sheikh Hasina Medical College, Jamalpur", type: "government", location: "Jamalpur", affiliatedUniversity: "University of Dhaka" },
  { id: "mbmc-tangail", name: "Mawlana Bhashani Medical College", type: "government", location: "Tangail", affiliatedUniversity: "University of Dhaka" },
  { id: "netrokona-mc", name: "Netrokona Medical College", type: "government", location: "Netrokona", affiliatedUniversity: "University of Dhaka" },
  { id: "sherpur-mc", name: "Sherpur Medical College", type: "government", location: "Sherpur", affiliatedUniversity: "University of Dhaka" },
  { id: "manikganj-mc", name: "Manikganj Medical College", type: "government", location: "Manikganj", affiliatedUniversity: "University of Dhaka" },
  { id: "shmc-narsingdi", name: "Sheikh Hasina Medical College, Narsingdi", type: "government", location: "Narsingdi", affiliatedUniversity: "University of Dhaka" },
  { id: "faridpur-mc", name: "Faridpur Medical College", type: "government", location: "Faridpur", affiliatedUniversity: "University of Dhaka" },
  { id: "shskmc-gopalganj", name: "Sheikh Sayera Khatun Medical College", type: "government", location: "Gopalganj", affiliatedUniversity: "University of Dhaka" },
  { id: "madaripur-mc", name: "Madaripur Medical College", type: "government", location: "Madaripur", affiliatedUniversity: "University of Dhaka" },
  { id: "shaheed-mc-rajbari", name: "Shaheed Abdur Rab Serniabat Medical College", type: "government", location: "Barishal", affiliatedUniversity: "University of Dhaka" },
  { id: "sbmc-barishal", name: "Sher-e-Bangla Medical College", type: "government", location: "Barishal", affiliatedUniversity: "University of Dhaka" },
  { id: "patuakhali-mc", name: "Patuakhali Medical College", type: "government", location: "Patuakhali", affiliatedUniversity: "University of Dhaka" },
  { id: "bhola-mc", name: "Bhola Medical College", type: "government", location: "Bhola", affiliatedUniversity: "University of Dhaka" },
  { id: "pirojpur-mc", name: "Pirojpur Medical College", type: "government", location: "Pirojpur", affiliatedUniversity: "University of Dhaka" },

  { id: "cmc", name: "Chittagong Medical College", type: "government", location: "Chattogram", affiliatedUniversity: "Chittagong Medical University" },
  { id: "comc", name: "Cumilla Medical College", type: "government", location: "Cumilla", affiliatedUniversity: "Chittagong Medical University" },
  { id: "coxs-mc", name: "Cox's Bazar Medical College", type: "government", location: "Cox's Bazar", affiliatedUniversity: "Chittagong Medical University" },
  { id: "noakhali-mc", name: "Abdul Malek Ukil Medical College", type: "government", location: "Noakhali", affiliatedUniversity: "Chittagong Medical University" },
  { id: "feni-mc", name: "Feni Medical College", type: "government", location: "Feni", affiliatedUniversity: "Chittagong Medical University" },
  { id: "bbaria-mc", name: "Brahmanbaria Medical College", type: "government", location: "Brahmanbaria", affiliatedUniversity: "Chittagong Medical University" },
  { id: "chandpur-mc", name: "Chandpur Medical College", type: "government", location: "Chandpur", affiliatedUniversity: "Chittagong Medical University" },
  { id: "rangamati-mc", name: "Rangamati Medical College", type: "government", location: "Rangamati", affiliatedUniversity: "Chittagong Medical University" },
  { id: "khagrachari-mc", name: "Khagrachari Medical College", type: "government", location: "Khagrachari", affiliatedUniversity: "Chittagong Medical University" },

  { id: "somc", name: "Sylhet MAG Osmani Medical College", type: "government", location: "Sylhet", affiliatedUniversity: "Sylhet Medical University" },
  { id: "shmc-sylhet", name: "Sheikh Hasina Medical College, Habiganj", type: "government", location: "Habiganj", affiliatedUniversity: "Sylhet Medical University" },
  { id: "sunamganj-mc", name: "Sunamganj Medical College", type: "government", location: "Sunamganj", affiliatedUniversity: "Sylhet Medical University" },
  { id: "moulvibazar-mc", name: "Moulvibazar Medical College", type: "government", location: "Moulvibazar", affiliatedUniversity: "Sylhet Medical University" },

  { id: "rmc", name: "Rajshahi Medical College", type: "government", location: "Rajshahi", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "szrmc-bogura", name: "Shaheed Ziaur Rahman Medical College", type: "government", location: "Bogura", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "pabna-mc", name: "Pabna Medical College", type: "government", location: "Pabna", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "smmamc-sirajganj", name: "Shaheed M Monsur Ali Medical College", type: "government", location: "Sirajganj", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "naogaon-mc", name: "Naogaon Medical College", type: "government", location: "Naogaon", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "joypurhat-mc", name: "Joypurhat Medical College", type: "government", location: "Joypurhat", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "chapainawabganj-mc", name: "Chapainawabganj Medical College", type: "government", location: "Chapainawabganj", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "natore-mc", name: "Natore Medical College", type: "government", location: "Natore", affiliatedUniversity: "Rajshahi Medical University" },

  { id: "rpmc", name: "Rangpur Medical College", type: "government", location: "Rangpur", affiliatedUniversity: "Rangpur Medical University" },
  { id: "dinajpur-mc", name: "M Abdur Rahim Medical College", type: "government", location: "Dinajpur", affiliatedUniversity: "Rangpur Medical University" },
  { id: "nilphamari-mc", name: "Nilphamari Medical College", type: "government", location: "Nilphamari", affiliatedUniversity: "Rangpur Medical University" },
  { id: "gaibandha-mc", name: "Gaibandha Medical College", type: "government", location: "Gaibandha", affiliatedUniversity: "Rangpur Medical University" },
  { id: "kurigram-mc", name: "Kurigram Medical College", type: "government", location: "Kurigram", affiliatedUniversity: "Rangpur Medical University" },
  { id: "lalmonirhat-mc", name: "Lalmonirhat Medical College", type: "government", location: "Lalmonirhat", affiliatedUniversity: "Rangpur Medical University" },
  { id: "thakurgaon-mc", name: "Thakurgaon Medical College", type: "government", location: "Thakurgaon", affiliatedUniversity: "Rangpur Medical University" },
  { id: "panchagarh-mc", name: "Panchagarh Medical College", type: "government", location: "Panchagarh", affiliatedUniversity: "Rangpur Medical University" },

  { id: "kmc", name: "Khulna Medical College", type: "government", location: "Khulna", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "jashore-mc", name: "Jashore Medical College", type: "government", location: "Jashore", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "kushtia-mc", name: "Kushtia Medical College", type: "government", location: "Kushtia", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "satkhira-mc", name: "Satkhira Medical College", type: "government", location: "Satkhira", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "magura-mc", name: "Magura Medical College", type: "government", location: "Magura", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "narail-mc", name: "Narail Medical College", type: "government", location: "Narail", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "chuadanga-mc", name: "Chuadanga Medical College", type: "government", location: "Chuadanga", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "jhenaidah-mc", name: "Jhenaidah Medical College", type: "government", location: "Jhenaidah", affiliatedUniversity: "Rajshahi Medical University" },

  // =====================================================================
  // =====================================================================
  // ARMED FORCES MEDICAL COLLEGES
  // =====================================================================
  { id: "afmc", name: "Armed Forces Medical College", type: "armed_forces", location: "Dhaka", affiliatedUniversity: "Bangladesh University of Professionals" },
  { id: "afmc-bogura", name: "Army Medical College, Bogura", type: "armed_forces", location: "Bogura", affiliatedUniversity: "Bangladesh University of Professionals" },
  { id: "afmc-cumilla", name: "Army Medical College, Cumilla", type: "armed_forces", location: "Cumilla", affiliatedUniversity: "Bangladesh University of Professionals" },
  { id: "afmc-jashore", name: "Army Medical College, Jashore", type: "armed_forces", location: "Jashore", affiliatedUniversity: "Bangladesh University of Professionals" },
  { id: "afmc-chattogram", name: "Army Medical College, Chattogram", type: "armed_forces", location: "Chattogram", affiliatedUniversity: "Bangladesh University of Professionals" },
  { id: "afmc-rangpur", name: "Army Medical College, Rangpur", type: "armed_forces", location: "Rangpur", affiliatedUniversity: "Bangladesh University of Professionals" },

  // =====================================================================
  // PRIVATE MEDICAL COLLEGES
  // =====================================================================
  // -- Dhaka division --
  { id: "bmc", name: "Bangladesh Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "hfrcmc", name: "Holy Family Red Crescent Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "immc", name: "Ibrahim Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "zhsmc", name: "Z. H. Sikder Women's Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "dnmc", name: "Dhaka National Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "mcw-uttara", name: "Medical College for Women & Hospital", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "akmmc", name: "Anwer Khan Modern Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "glmc", name: "Green Life Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "popular-mc", name: "Popular Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "ewmc", name: "East West Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "smamc-uttara", name: "Shaheed Monsur Ali Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "uamc", name: "Uttara Adhunik Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "addin-women", name: "Ad-din Women's Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "nimc", name: "Northern International Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "ibn-sina-mc", name: "Ibn Sina Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "delta-mc", name: "Delta Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "aichi-mc", name: "Aichi Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "dsimc", name: "Dr. Sirajul Islam Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "shahabuddin-mc", name: "Shahabuddin Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "marks-mc", name: "Marks Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "universal-mc", name: "Universal Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "ad-din-basundhara", name: "Ad-din Basundhara Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "ashiyan-mc", name: "Ashiyan Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "bihs-mc", name: "BIHS General Hospital & Medical College", type: "private", location: "Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "enam-mc", name: "Enam Medical College", type: "private", location: "Savar, Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "gono-mc", name: "Gonoshasthaya Samaj Vittik Medical College", type: "private", location: "Savar, Dhaka", affiliatedUniversity: "University of Dhaka" },
  { id: "kumudini-mc", name: "Kumudini Women's Medical College", type: "private", location: "Mirzapur, Tangail", affiliatedUniversity: "University of Dhaka" },
  { id: "city-mc-gazipur", name: "City Medical College", type: "private", location: "Gazipur", affiliatedUniversity: "University of Dhaka" },
  { id: "tmmc-gazipur", name: "Tairunnessa Memorial Medical College", type: "private", location: "Gazipur", affiliatedUniversity: "University of Dhaka" },
  { id: "usb-mc", name: "US-Bangla Medical College", type: "private", location: "Narayanganj", affiliatedUniversity: "University of Dhaka" },
  { id: "bbmc-munshiganj", name: "Bikrampur Bhuiyan Medical College", type: "private", location: "Munshiganj", affiliatedUniversity: "University of Dhaka" },
  { id: "monno-mc", name: "Monno Medical College", type: "private", location: "Manikganj", affiliatedUniversity: "University of Dhaka" },
  { id: "damc-faridpur", name: "Diabetic Association Medical College", type: "private", location: "Faridpur", affiliatedUniversity: "University of Dhaka" },

  // -- Chattogram division --
  { id: "cmosh-mc", name: "Chattagram Maa-O-Shishu Hospital Medical College", type: "private", location: "Chattogram", affiliatedUniversity: "Chittagong Medical University" },
  { id: "southern-mc-ctg", name: "Southern Medical College", type: "private", location: "Chattogram", affiliatedUniversity: "Chittagong Medical University" },
  { id: "iiuc-mc", name: "International Islamic University Chittagong Medical College", type: "private", location: "Chattogram", affiliatedUniversity: "Chittagong Medical University" },
  { id: "bgc-trust-mc", name: "BGC Trust Medical College", type: "private", location: "Chattogram", affiliatedUniversity: "Chittagong Medical University" },
  { id: "marine-city-mc", name: "Marine City Medical College", type: "private", location: "Chattogram", affiliatedUniversity: "Chittagong Medical University" },
  { id: "central-mc-cumilla", name: "Central Medical College", type: "private", location: "Cumilla", affiliatedUniversity: "Chittagong Medical University" },
  { id: "eastern", name: "Eastern Medical College", type: "private", location: "Cumilla", affiliatedUniversity: "Chittagong Medical University" },
  { id: "mainamoti-mc", name: "Mainamoti Medical College", type: "private", location: "Cumilla", affiliatedUniversity: "Chittagong Medical University" },

  // -- Sylhet division --
  { id: "jrrmc-sylhet", name: "Jalalabad Ragib-Rabeya Medical College", type: "private", location: "Sylhet", affiliatedUniversity: "Sylhet Medical University" },
  { id: "nemc-sylhet", name: "North East Medical College", type: "private", location: "Sylhet", affiliatedUniversity: "Sylhet Medical University" },
  { id: "swmc-sylhet", name: "Sylhet Women's Medical College", type: "private", location: "Sylhet", affiliatedUniversity: "Sylhet Medical University" },
  { id: "parkview-mc-sylhet", name: "Parkview Medical College", type: "private", location: "Sylhet", affiliatedUniversity: "Sylhet Medical University" },
  { id: "durdana-mc-sylhet", name: "Durre Samad Rahman Women's Medical College", type: "private", location: "Sylhet", affiliatedUniversity: "Sylhet Medical University" },

  // -- Rajshahi division --
  { id: "islami-bank-mc-rajshahi", name: "Islami Bank Medical College", type: "private", location: "Rajshahi", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "barind-mc", name: "Barind Medical College", type: "private", location: "Rajshahi", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "tmss-mc-bogura", name: "TMSS Medical College", type: "private", location: "Bogura", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "kyamc-sirajganj", name: "Khwaja Yunus Ali Medical College", type: "private", location: "Sirajganj", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "nbmc-sirajganj", name: "North Bengal Medical College", type: "private", location: "Sirajganj", affiliatedUniversity: "Rajshahi Medical University" },

  // -- Rangpur division --
  { id: "prime-mc-rangpur", name: "Prime Medical College", type: "private", location: "Rangpur", affiliatedUniversity: "Rangpur Medical University" },
  { id: "rcmc-rangpur", name: "Rangpur Community Medical College", type: "private", location: "Rangpur", affiliatedUniversity: "Rangpur Medical University" },
  { id: "npmc-rangpur", name: "Northern Private Medical College", type: "private", location: "Rangpur", affiliatedUniversity: "Rangpur Medical University" },
  { id: "nimc-dinajpur", name: "Nightingale Medical College", type: "private", location: "Dinajpur", affiliatedUniversity: "Rangpur Medical University" },

  // -- Khulna division --
  { id: "gazi-mc-khulna", name: "Gazi Medical College", type: "private", location: "Khulna", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "kcmc-khulna", name: "Khulna City Medical College", type: "private", location: "Khulna", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "addin-akij-khulna", name: "Ad-din Akij Medical College", type: "private", location: "Khulna", affiliatedUniversity: "Rajshahi Medical University" },
  { id: "addin-sakina-jashore", name: "Ad-din Sakina Medical College", type: "private", location: "Jashore", affiliatedUniversity: "Rajshahi Medical University" },

  // -- Mymensingh division --
  { id: "cbmc-mymensingh", name: "Community Based Medical College Bangladesh", type: "private", location: "Mymensingh", affiliatedUniversity: "University of Dhaka" },
  { id: "jic-mc-kishoreganj", name: "Jahurul Islam Medical College", type: "private", location: "Kishoreganj", affiliatedUniversity: "University of Dhaka" },
];

export const COLLEGE_COUNT = COLLEGES.length;
