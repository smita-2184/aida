export interface TimelineItem {
  id: string
  month: number
  title: string
  description: string
  lead: string
  deliverable: string
  workPackage: string
}

export interface WorkPackage {
  id: string
  title: string
  lead: string
  budget: number
  duration: string
  description: string
  activities: string[]
  deliverables: string[]
  milestones: string[]
}

export interface Partner {
  id: string
  name: string
  role: string
  country: string
  budget: number
  expertise: string[]
  leadWPs: string[]
  contributionWPs: string[]
}

export interface ProjectData {
  title: string
  subtitle: string
  duration: number
  totalBudget: number
  startDate: string
  description: string
  objectives: string[]
  timeline: TimelineItem[]
  workPackages: WorkPackage[]
  partners: Partner[]
  kpis: {
    name: string
    target: string
    measurement: string
  }[]
}

export const defaultProjectData: ProjectData = {
  title: "Project AIDA",
  subtitle: "Academic-Industrial Digital Alliance",
  duration: 36,
  totalBudget: 1200000,
  startDate: "2025-01-01",
  description:
    "A comprehensive 36-month transnational initiative designed to address Europe's critical AI skills gap by creating a sustainable ecosystem for advanced AI talent development.",
  objectives: [
    "Develop a world-class, industry-validated curriculum in advanced AI applications",
    "Pilot the curriculum in a 'Living Lab' environment with students and SME employees",
    "Establish a sustainable framework for university-industry collaboration",
    "Foster a diverse and inclusive AI talent pipeline",
  ],
  timeline: [
    {
      id: "t1",
      month: 1,
      title: "Project Kick-off",
      description: "Project setup and initial coordination",
      lead: "HU Berlin",
      deliverable: "Project Setup",
      workPackage: "WP1",
    },
    {
      id: "t2",
      month: 3,
      title: "Project Handbook",
      description: "Complete project management documentation",
      lead: "HU Berlin",
      deliverable: "D1.1 Project Handbook",
      workPackage: "WP1",
    },
    {
      id: "t3",
      month: 5,
      title: "SME Skill Gaps Report",
      description: "Analysis of industry needs and skill gaps",
      lead: "IHK Berlin",
      deliverable: "D2.1 SME Skill Gaps Report",
      workPackage: "WP2",
    },
    {
      id: "t4",
      month: 6,
      title: "Competency Framework",
      description: "Define AIDA competency framework",
      lead: "IHK Berlin",
      deliverable: "D2.2 AIDA Competency Framework",
      workPackage: "WP2",
    },
    {
      id: "t5",
      month: 9,
      title: "Academic Curricula",
      description: "Complete curriculum architecture",
      lead: "UM & PoliMi",
      deliverable: "D3.1 Academic Curricula",
      workPackage: "WP3",
    },
    {
      id: "t6",
      month: 18,
      title: "Learning Materials",
      description: "Complete educational content",
      lead: "UM & PoliMi",
      deliverable: "D3.3, D3.4 Learning Materials",
      workPackage: "WP3",
    },
    {
      id: "t7",
      month: 22,
      title: "Pilot Launch",
      description: "Begin Living Lab pilot program",
      lead: "HU Berlin",
      deliverable: "D4.1 Participant Report",
      workPackage: "WP4",
    },
    {
      id: "t8",
      month: 36,
      title: "Project Completion",
      description: "Final reports and project closure",
      lead: "All Partners",
      deliverable: "Final Reports",
      workPackage: "WP6",
    },
  ],
  workPackages: [
    {
      id: "WP1",
      title: "Project Management and Quality Assurance",
      lead: "HU Berlin",
      budget: 180000,
      duration: "M1-M36",
      description: "Overall project coordination and quality assurance",
      activities: [
        "Project setup and governance",
        "Risk management and mitigation",
        "Quality assurance processes",
        "Regular reporting to EC",
      ],
      deliverables: ["D1.1 Project Handbook", "D1.2 Risk Management Plan", "D1.3 Periodic Reports"],
      milestones: ["M3: Project Handbook completed", "M6: First periodic report", "M36: Final report submitted"],
    },
    {
      id: "WP2",
      title: "Industry Needs Analysis and Competency Framework",
      lead: "IHK Berlin",
      budget: 120000,
      duration: "M1-M6",
      description: "Analyze SME needs and develop competency framework",
      activities: [
        "SME survey design and execution",
        "Expert workshops with industry leaders",
        "Competency framework development",
        "Validation with stakeholders",
      ],
      deliverables: ["D2.1 SME Skill Gaps Report", "D2.2 AIDA Competency Framework"],
      milestones: [
        "M3: SME Survey completed (200+ responses)",
        "M5: Skill gaps analysis finalized",
        "M6: Competency framework validated",
      ],
    },
    {
      id: "WP3",
      title: "International Curriculum and Content Development",
      lead: "UM & PoliMi",
      budget: 300000,
      duration: "M7-M18",
      description: "Develop comprehensive AI curriculum and materials",
      activities: [
        "Curriculum architecture design",
        "Module development and content creation",
        "GenAI and AI Factories integration",
        "Assessment framework design",
      ],
      deliverables: [
        "D3.1 Academic Curricula",
        "D3.2 Training Curricula",
        "D3.3 Learning Materials",
        "D3.4 Assessment Handbook",
      ],
      milestones: [
        "M9: Curriculum architecture completed",
        "M12: Core modules developed",
        "M18: All learning materials finalized",
      ],
    },
    {
      id: "WP4",
      title: "Living Lab Pilot",
      lead: "HU Berlin",
      budget: 240000,
      duration: "M19-M34",
      description: "Pilot the curriculum with students and SME employees",
      activities: [
        "Participant recruitment and selection",
        "Blended learning program delivery",
        "Industry integration and mentorship",
        "Continuous evaluation and feedback",
      ],
      deliverables: ["D4.1 Participant Report", "D4.2 Mid-point Evaluation", "D4.3 Final Evaluation"],
      milestones: [
        "M22: 40 participants recruited",
        "M27: Mid-point evaluation completed",
        "M34: Pilot program concluded",
      ],
    },
    {
      id: "WP5",
      title: "Inclusive and Diverse Talent Pipeline",
      lead: "HU Berlin & IHK Berlin",
      budget: 150000,
      duration: "M1-M36",
      description: "Ensure diversity and inclusion in the program",
      activities: [
        "Targeted outreach to underrepresented groups",
        "Inclusive curriculum review",
        "Mentorship program implementation",
        "Bias-aware selection processes",
      ],
      deliverables: ["D5.1 Support and Integration Schemes", "D5.2 Mentorship Program Report"],
      milestones: [
        "M6: Inclusion strategies implemented",
        "M18: Mentorship program launched",
        "M36: Diversity impact assessed",
      ],
    },
    {
      id: "WP6",
      title: "Dissemination, Exploitation, and Sustainability",
      lead: "IHK Berlin",
      budget: 210000,
      duration: "M7-M36",
      description: "Maximize impact and ensure long-term sustainability",
      activities: [
        "Communication and dissemination strategy",
        "Teach-the-teacher training development",
        "Partnership framework establishment",
        "Business model development",
      ],
      deliverables: [
        "D6.1 Communication Plan",
        "D6.2 Teacher Training Modules",
        "D6.3 Platform Integration",
        "D6.4 Partnership Framework",
        "D6.5 Exploitation Plan",
        "D6.6 Business Plan",
      ],
      milestones: [
        "M15: Teacher training modules ready",
        "M24: Partnership framework established",
        "M36: Sustainability plan finalized",
      ],
    },
  ],
  partners: [
    {
      id: "p1",
      name: "Humboldt-Universität zu Berlin",
      role: "Academic Coordinator",
      country: "Germany",
      budget: 420000,
      expertise: ["AI Research", "HPC/AI Factories", "GenAI", "Project Management"],
      leadWPs: ["WP1", "WP4"],
      contributionWPs: ["WP2", "WP3", "WP5", "WP6"],
    },
    {
      id: "p2",
      name: "IHK Berlin",
      role: "Industry Partner",
      country: "Germany",
      budget: 300000,
      expertise: ["SME Engagement", "Certification", "Industry Relations", "Dissemination"],
      leadWPs: ["WP2", "WP6"],
      contributionWPs: ["WP1", "WP4", "WP5"],
    },
    {
      id: "p3",
      name: "University of Malta",
      role: "Curriculum Co-Lead",
      country: "Malta",
      budget: 270000,
      expertise: ["Curriculum Development", "Applied AI", "Flexible Learning", "Micro-credentials"],
      leadWPs: ["WP3"],
      contributionWPs: ["WP1", "WP4", "WP5", "WP6"],
    },
    {
      id: "p4",
      name: "Politecnico di Milano",
      role: "Research Co-Lead",
      country: "Italy",
      budget: 210000,
      expertise: ["AI Research", "GenAI", "Ethical AI", "ELLIS Network"],
      leadWPs: ["WP3"],
      contributionWPs: ["WP1", "WP4", "WP5", "WP6"],
    },
  ],
  kpis: [
    {
      name: "Course Completion Rate",
      target: ">85%",
      measurement: "LMS records and final grade reports",
    },
    {
      name: "Diversity of Participant Cohort",
      target: ">40% women",
      measurement: "Demographic data from registration",
    },
    {
      name: "IHK Certification Pass Rate",
      target: ">90%",
      measurement: "Official certification records",
    },
    {
      name: "Skill Application Rate",
      target: ">75%",
      measurement: "Post-training surveys",
    },
    {
      name: "Business Process Improvement",
      target: ">50%",
      measurement: "SME leadership surveys",
    },
  ],
}
