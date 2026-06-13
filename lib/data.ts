export const profile = {
  name: "Gautham M",
  role: "Data Analyst",
  location: "Chennai, Tamil Nadu, India",
  email: "gautham2597@gmail.com",
  phone: "+91-7092702458",
  linkedin: "https://www.linkedin.com/in/gauthamgtg",
  github: "https://github.com/gauthamgtg",
  tagline: [
    "I turn messy data into decisions.",
    "Revenue, retention & efficiency — measured.",
    "Dashboards teams actually rely on daily.",
    "5.5+ years across SaaS, Q-Commerce & Fintech.",
  ],
  summary:
    "Prevented $22K+ in revenue loss, unlocked real-time visibility into $3M+ in monthly ad spend, and cut reporting time by 90%. With 5.5+ years across SaaS, Quick Commerce, and financial services, I specialize in turning messy data into decisions that directly impact revenue, retention, and efficiency. Deep hands-on expertise in SQL, Python, Tableau, Airflow, and product-analytics tools — building automated dashboards, MIS & investor reports, internal analytics tools, cohort models, A/B testing frameworks, and data pipelines that cross-functional teams across product, marketing, and leadership rely on daily.",
};

export const metrics = [
  { value: 22, prefix: "$", suffix: "K+", label: "Revenue loss prevented" },
  { value: 3, prefix: "$", suffix: "M+", label: "Monthly ad spend visualized" },
  { value: 90, prefix: "", suffix: "%", label: "Reporting time cut" },
  { value: 5.5, prefix: "", suffix: "+ yrs", label: "Analytics experience" },
];

export type Experience = {
  company: string;
  role: string;
  context: string;
  period: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Zocket",
    role: "Data Analyst II",
    context: "SaaS · AI Marketing",
    period: "Aug 2023 – Present",
    highlights: [
      "Engineered a Tableau + Python/Streamlit dashboard ecosystem that cut daily report generation by 3+ hours (90% reduction) and gave 20+ stakeholders real-time KPI visibility.",
      "Prevented $22K+ in revenue loss by auditing wallet balances and surfacing critical Stripe & Facebook API integration issues causing duplicate entries and incorrect spend limits.",
      "Revamped revenue calculation logic, reducing discrepancies by 15% for accurate investor and executive reporting.",
      "Mapped the conversion funnel in CleverTap, identified mid-signup abandonment and payment friction, and drove a 4% lift in paid conversion.",
      "Built a PostHog analytics dashboard for Bacon — merging event, database & Meta campaign data to track DAU/MAU, ROAS, cohorts, and credit consumption, triggering automated re-engagement.",
      "Deployed Airflow pipelines for Facebook & Snapchat ad-spend ingestion, delivering real-time visibility into $4M+ monthly spend and eliminating 3+ hours of weekly manual work.",
    ],
  },
  {
    company: "Dunzo",
    role: "Analyst",
    context: "Quick Commerce · B2B",
    period: "Aug 2022 – Jul 2023",
    highlights: [
      "Designed & ran an A/B testing framework for promotional campaigns, improving merchant retention by 15% and order volume by 10%.",
      "Developed a B2B attribution model quantifying session losses from weather and curfew constraints, optimizing surge pricing for a 5% gross-margin gain.",
      "Built automated performance tracking for 30+ sales & tele-callers — a 20% productivity boost and 12 hours/week less manual reporting.",
      "Optimized Tableau dashboard queries in GCP, achieving 80% slot-time reduction and cutting query run time by 4+ hours.",
    ],
  },
  {
    company: "HDFC Bank",
    role: "Location Manager · Payment Frauds",
    context: "Financial Services",
    period: "Feb 2021 – Aug 2022",
    highlights: [
      "Examined 5,000+ historical fraud cases to help build risk-scoring models and rule-based detection, preventing losses exceeding ₹1 Crore and cutting false positives by 10%.",
      "Ran trend analysis & demographic segmentation on cybercrime incidents across South India, delivering weekly/monthly Excel dashboards to senior risk & compliance leadership.",
      "Contributed to alert mechanisms processing millions of daily transactions — 95% suspicious-activity detection accuracy, sub-2-minute response, ₹1.2+ Crore in losses prevented.",
      "Investigated daily card, NetBanking & UPI fraud via IP, device fingerprints, OTP logs and merchant trails — 100% of assigned cases resolved within TAT.",
    ],
  },
  {
    company: "HDFC Bank",
    role: "Location Manager Risk · Retail Assets",
    context: "Financial Services",
    period: "Aug 2020 – Feb 2021",
    highlights: [
      "Managed risk assessment for 10+ banking products (Personal/Auto Loans, Credit Cards) with ticket sizes up to ₹50 lakhs.",
      "Created data presentations tracking portfolio quality, early-mortality rates, and collection trends to inform risk-mitigation strategy.",
    ],
  },
];

export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "SQL & Databases",
    items: ["Window functions", "CTEs", "Query optimization", "MySQL", "PostgreSQL", "BigQuery"],
  },
  {
    title: "Python",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Streamlit", "API integration", "Web scraping"],
  },
  {
    title: "Visualization",
    items: ["Tableau", "Power BI", "DAX", "Power Query", "Looker Studio", "Metabase", "Redash"],
  },
  {
    title: "Excel",
    items: ["XLOOKUP", "INDEX-MATCH", "Pivot tables", "Power Query", "Power Pivot", "Dashboards"],
  },
  {
    title: "Product Analytics",
    items: ["PostHog", "Session replay", "User paths", "CleverTap", "Funnels", "Cohorts", "A/B testing"],
  },
  {
    title: "Data Engineering",
    items: ["Airflow", "DAG development", "Data ingestion", "Git", "GitLab", "Data modelling"],
  },
  {
    title: "AI & Automation",
    items: ["N8N", "Zapier", "Make", "Cursor", "AI Studio"],
  },
];

export const analyticalTechniques: SkillGroup[] = [
  {
    title: "SaaS & E-commerce",
    items: ["MRR / ARR movements", "Churn rate", "LTV", "AOV / GMV", "Retention cohorts", "Payback period", "NRR"],
  },
  {
    title: "Marketing",
    items: ["CPA", "ROAS", "CTR", "Attribution modeling", "Campaign optimization", "A/B testing", "CAC : LTV"],
  },
  {
    title: "Product",
    items: ["Cohort analysis", "Funnel optimization", "Segmentation", "Usage analytics", "Feature adoption", "Activation"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    title: "SaaS Revenue Analytics Platform",
    tagline: "MRR / LTV / churn, automated",
    description:
      "Most early-stage SaaS founders track revenue in spreadsheets with no visibility into churn drivers or cohort health. This platform centralizes MRR/LTV/churn tracking, automates investor-ready PDF reporting, and flags at-risk subscription segments in real time.",
    tags: ["Python", "SQL", "Streamlit", "Cohorts"],
    accent: "from-neon-cyan to-neon-violet",
  },
  {
    title: "ShareCharge — EV Charging Marketplace",
    tagline: "Idle home chargers, monetized",
    description:
      "Millions of home EV chargers sit idle 20+ hours daily while drivers struggle to find spots. ShareCharge connects private charger owners with EV drivers through integrated booking, payments, and host-earnings analytics.",
    tags: ["Marketplace", "Payments", "Analytics"],
    accent: "from-neon-mint to-neon-cyan",
  },
  {
    title: "Flash.co App — NPS Analysis",
    tagline: "Reviews → product signals",
    description:
      "App review data was being ignored as an insight source. Scraped & analyzed 1,000+ Play Store and App Store reviews with Python, applied sentiment analysis, and built a Tableau dashboard tracking NPS trends — turning unstructured reviews into actionable product signals.",
    tags: ["Python", "Sentiment", "Tableau", "NPS"],
    accent: "from-neon-violet to-neon-fuchsia",
  },
  {
    title: "GitFolio",
    tagline: "GitHub profiles that tell a story",
    description:
      "GitHub profiles don't tell a story. GitFolio automatically analyzes public repositories, identifies contribution patterns, and generates a structured, shareable portfolio with AI-driven project suggestions — removing the manual effort of portfolio curation.",
    tags: ["AI", "GitHub API", "Automation"],
    accent: "from-neon-fuchsia to-neon-cyan",
  },
];

export type Repo = {
  name: string;
  description: string;
  language: string;
  url: string;
  homepage?: string;
};

// Original repos only — forks intentionally excluded.
export const repos: Repo[] = [
  {
    name: "taxera",
    description:
      "A platform helping Indian businesses with registration & compliance — company formation, GST registration, and licensing. Live in production.",
    language: "JavaScript",
    url: "https://github.com/gauthamgtg/taxera",
    homepage: "https://taxera-dun.vercel.app",
  },
  {
    name: "Key-Account-Stats",
    description:
      "Python tooling for tracking and reporting key-account performance — turning raw account data into clean, decision-ready statistics.",
    language: "Python",
    url: "https://github.com/gauthamgtg/Key-Account-Stats",
  },
  {
    name: "mg-onboarding-sprint0",
    description:
      "A sprint-zero onboarding project automating the initial environment and workflow setup for new team members.",
    language: "Shell",
    url: "https://github.com/gauthamgtg/mg-onboarding-sprint0",
  },
];

export type Education = {
  degree: string;
  field: string;
  school: string;
  period: string;
};

export const education: Education[] = [
  {
    degree: "Master of Business Administration (MBA)",
    field: "Marketing & Finance",
    school: "Anna University",
    period: "Jul 2018 – Jun 2020",
  },
  {
    degree: "Bachelor of Engineering (B.E.)",
    field: "Mechanical Engineering",
    school: "Panimalar Engineering College",
    period: "Jul 2014 – Apr 2018",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
