export interface TimelineItem {
  id: string
  month: number
  title: string
  description: string
  lead: string
  deliverable: string
  workPackage: string
  status: 'planned' | 'in-progress' | 'completed' | 'delayed'
}

export interface WorkPackage {
  id: string
  title: string
  lead: string
  coLead?: string
  budget: number
  duration: string
  description: string
  activities: string[]
  deliverables: string[]
  milestones: string[]
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  teamMembers: string[]
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
  contactPerson: string
  website: string
  logo?: string
}

export interface Module {
  id: string
  title: string
  leadInstitution: string
  coDevelopers: string[]
  ectsCredits: number
  description: string
  learningOutcomes: string[]
  prerequisites: string[]
  status: 'development' | 'review' | 'approved' | 'pilot-ready'
}

export interface KPI {
  name: string
  target: string
  measurement: string
  category: 'engagement' | 'knowledge' | 'application' | 'dissemination'
  currentValue?: string
  status: 'on-track' | 'at-risk' | 'behind' | 'completed'
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
  modules: Module[]
  kpis: KPI[]
  aiFactories: {
    name: string
    location: string
    accessMode: 'playground' | 'fast-lane' | 'research'
    status: 'planned' | 'established' | 'active'
  }[]
  livingLab: {
    participants: {
      students: number
      smeEmployees: number
      total: number
    }
    recruitmentStatus: 'not-started' | 'in-progress' | 'completed'
    diversityTarget: number
    currentDiversity: number
  }
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
      status: "completed"
    },
    {
      id: "t2",
      month: 3,
      title: "Project Handbook",
      description: "Complete project management documentation",
      lead: "HU Berlin",
      deliverable: "D1.1 Project Handbook",
      workPackage: "WP1",
      status: "completed"
    },
    {
      id: "t3",
      month: 5,
      title: "SME Skill Gaps Report",
      description: "Analysis of industry needs and skill gaps",
      lead: "IHK Berlin",
      deliverable: "D2.1 SME Skill Gaps Report",
      workPackage: "WP2",
      status: "completed"
    },
    {
      id: "t4",
      month: 6,
      title: "Competency Framework",
      description: "Define AIDA competency framework",
      lead: "IHK Berlin",
      deliverable: "D2.2 AIDA Competency Framework",
      workPackage: "WP2",
      status: "completed"
    },
    {
      id: "t5",
      month: 9,
      title: "Academic Curricula",
      description: "Complete curriculum architecture",
      lead: "UM & PoliMi",
      deliverable: "D3.1 Academic Curricula",
      workPackage: "WP3",
      status: "in-progress"
    },
    {
      id: "t6",
      month: 18,
      title: "Learning Materials",
      description: "Complete educational content",
      lead: "UM & PoliMi",
      deliverable: "D3.3, D3.4 Learning Materials",
      workPackage: "WP3",
      status: "planned"
    },
    {
      id: "t7",
      month: 22,
      title: "Pilot Launch",
      description: "Begin Living Lab pilot program",
      lead: "HU Berlin",
      deliverable: "D4.1 Participant Report",
      workPackage: "WP4",
      status: "planned"
    },
    {
      id: "t8",
      month: 36,
      title: "Project Completion",
      description: "Final reports and project closure",
      lead: "All Partners",
      deliverable: "Final Reports",
      workPackage: "WP6",
      status: "planned"
    },
  ],
  workPackages: [
    {
      id: "WP1",
      title: "Project Management and Quality Assurance",
      lead: "HU Berlin",
      budget: 180000,
      duration: "M1-M36",
      description: "This foundational Work Package ensures the efficient and effective execution of the entire AIDA project. Led by the coordinating institution, HU Berlin, WP1 will establish the governance, communication, and reporting structures necessary for a complex, transnational consortium.",
      activities: [
        "Establish Project Management Board (PMB) with senior representatives from each partner institution",
        "Develop comprehensive Project Handbook with operational procedures and communication protocols",
        "Implement Quality Assurance committee to review all major outputs",
        "Create detailed data management plan compliant with GDPR and FAIR principles",
        "Establish risk management framework with clear mitigation strategies",
        "Coordinate quarterly PMB meetings for strategic oversight and issue resolution",
        "Manage day-to-day operations through dedicated Project Manager",
        "Ensure transparent financial oversight and reporting to European Commission",
        "Maintain comprehensive documentation and reporting schedules",
        "Facilitate cross-partner communication and coordination"
      ],
      deliverables: [
        "D1.1 Project Handbook (Month 3): Comprehensive document detailing all management, communication, and administrative procedures",
        "D1.2 Risk Management Plan (Month 4): Living document identifying potential risks and outlining clear mitigation strategies",
        "D1.3 Periodic and Final Reports (Months 18, 36): Formal reports to the European Commission detailing project progress, financial expenditure, and achievement of milestones"
      ],
      milestones: [
        "M1: Project Management Board established and operational",
        "M3: Project Handbook completed and distributed to all partners",
        "M4: Risk Management Plan finalized and approved by PMB",
        "M6: First periodic report submitted to European Commission",
        "M18: Mid-term report with comprehensive progress assessment",
        "M36: Final project report and closure documentation"
      ],
      status: "in-progress",
      progress: 25,
      teamMembers: ["Project Manager", "Coordinator", "Senior Representatives", "Quality Assurance Officer", "Financial Controller"]
    },
    {
      id: "WP2",
      title: "Industry Needs Analysis and Dynamic Competency Framework",
      lead: "IHK Berlin",
      budget: 120000,
      duration: "M1-M6",
      description: "This Work Package forms the bedrock of the entire project, ensuring that the AIDA curriculum is rigorously demand-driven and directly addresses the real-world challenges of German SMEs. Led by IHK Berlin, WP2 will move beyond assumptions to create a data-backed blueprint for the skills that industry truly needs.",
      activities: [
        "Design and disseminate detailed questionnaire to 200+ SMEs in Berlin-Brandenburg region",
        "Conduct SME survey to identify current AI adoption levels and perceived barriers",
        "Analyze desired skills (data analytics, AI for marketing, AI ethics, etc.)",
        "Assess preferences for training formats (online vs. blended, workshops vs. courses)",
        "Convene expert workshops with CTOs, HR managers, and innovation leaders",
        "Explore specific use cases and practical challenges of AI implementation in SMEs",
        "Validate survey findings through qualitative expert insights",
        "Synthesize quantitative and qualitative data into comprehensive analysis",
        "Develop structured AIDA Competency Framework with specific knowledge domains",
        "Define practical skills and professional abilities for 'IHK-Certified AI Professional for SMEs'",
        "Validate competency framework with key stakeholders and industry representatives"
      ],
      deliverables: [
        "D2.1 Report on SME AI Skill Gaps (Month 5): Detailed report analyzing findings from survey and workshops, including current AI adoption levels, barriers, and specific skill requirements",
        "D2.2 AIDA Competency Framework (Month 6): Final, structured framework of required competencies, knowledge, and skills that will serve as the definitive guide for curriculum development"
      ],
      milestones: [
        "M2: SME survey launched with target of 200+ responses",
        "M3: Expert workshops completed with key industry stakeholders",
        "M4: Survey data analysis and preliminary findings compiled",
        "M5: Comprehensive skill gaps report finalized and validated",
        "M6: AIDA Competency Framework completed and approved by consortium"
      ],
      status: "completed",
      progress: 100,
      teamMembers: ["Industry Analyst", "SME Coordinator", "Research Support", "Survey Specialist", "Workshop Facilitator"]
    },
    {
      id: "WP3",
      title: "International Curriculum and Modular Content Development",
      lead: "UM",
      coLead: "PoliMi",
      budget: 300000,
      duration: "M7-M18",
      description: "Building directly upon the AIDA Competency Framework from WP2, this Work Package is the intellectual heart of the project, where the raw needs of industry are transformed into a world-class educational program. This WP is co-led by the University of Malta, bringing its pedagogical expertise in flexible learning, and University of Italy, providing deep scientific and ethical rigor.",
      activities: [
        "Design overall program as series of stackable modules for maximum flexibility",
        "Architect specialized learning pathways (AI for Managers, AI for Developers)",
        "Develop applied modules: AI in Business Process Automation, Applied NLP for Customer Service",
        "Create foundational modules: Foundations of Machine Learning, Ethical AI & Regulatory Compliance",
        "Design specialized modules: Data-Secure AI Systems, Human-Computer Interaction for AI",
        "Develop GenAI Foundation Model Development module with hands-on LLM experience",
        "Create AI Inference Processes module for practical deployment and optimization",
        "Design Data Science for AI module with advanced data preparation techniques",
        "Develop AI and GenAI Deployment module for real-world SME implementation",
        "Create Supercomputing for AI module with AI Factories infrastructure training",
        "Develop comprehensive learning materials including lecture notes and case studies",
        "Create practical programming exercises for HU Berlin's JupyterHub environment",
        "Produce high-quality video content for asynchronous learning",
        "Design robust assessment system with project-based evaluations",
        "Create formal examination framework and integrative capstone project requirements",
        "Map curriculum to EuroHPC Virtual Training Academy (EVITA) framework"
      ],
      deliverables: [
        "D3.1 Comprehensive Academic Curricula (Month 9): Complete academic programs and modular curricula designed for different levels (undergraduate, graduate, post-graduate) and target groups (students, SME professionals, public sector)",
        "D3.2 Modular Short-term Training Curricula (Month 12): Sector-specific training modules for SMEs and public sector, including GenAI and AI Factories integration components",
        "D3.3 Full Suite of Learning Materials (Month 18): Complete educational content including digital resources, practical exercises, and assessment frameworks",
        "D3.4 Assessment and Certification Handbook (Month 18): Detailed guide outlining all assessment procedures and criteria for achieving certification"
      ],
      milestones: [
        "M7: Curriculum architecture design initiated",
        "M9: Comprehensive academic curricula completed and validated",
        "M12: Modular short-term training curricula finalized",
        "M15: Core learning materials development completed",
        "M18: Full suite of learning materials and assessment handbook finalized"
      ],
      status: "in-progress",
      progress: 40,
      teamMembers: ["Curriculum Lead", "Research Lead", "Developers", "Technical Support", "Pedagogical Experts", "AI Factories Specialists"]
    },
    {
      id: "WP4",
      title: "The Berlin Living Lab: Piloting the Joint Curriculum",
      lead: "HU Berlin",
      budget: 240000,
      duration: "M19-M34",
      description: "This Work Package brings the AIDA curriculum to life, testing and refining it in a unique, real-world 'Living Lab' environment in Berlin. Led by HU Berlin, with strong support from IHK Berlin, this pilot phase is designed to validate the educational content and the pedagogical model with the project's dual target audience.",
      activities: [
        "Recruit cohort of 20 qualified M.Sc. students from HU Berlin Informatik programs",
        "Leverage IHK Berlin industry channels to recruit 20 employees from 10+ different SMEs",
        "Ensure diverse mix of company sizes and sectors in SME participant group",
        "Deliver curriculum in blended format to accommodate both learner groups",
        "Integrate AIDA modules into regular M.Sc. coursework for HU students",
        "Provide flexible, part-time model for SME employees with online self-study",
        "Conduct intensive, in-person workshops for SME participants",
        "Implement industry integration with SME participants as mentors for HU students",
        "Facilitate short-term, project-based internships at participating SMEs",
        "Coordinate guest lectures from senior industry experts",
        "Design and implement capstone projects with mixed student-employee teams",
        "Scope ambitious projects benefiting from German AI Factories computational power",
        "Collect continuous feedback through surveys, focus groups, and direct observation",
        "Implement iterative curriculum refinement based on pilot feedback",
        "Conduct comprehensive evaluation of learning outcomes and participant satisfaction"
      ],
      deliverables: [
        "D4.1 Pilot Participant Cohort Report (Month 22): Report detailing demographics and background of recruited student and SME participants, including diversity metrics and recruitment strategies",
        "D4.2 Mid-point Pilot Evaluation Report (Month 27): Interim report on pilot progress, participant feedback, and initial refinements to curriculum and delivery methods",
        "D4.3 Final Pilot Evaluation and Refined Curriculum (Month 34): Comprehensive evaluation of the pilot, along with fully revised and validated AIDA curriculum materials"
      ],
      milestones: [
        "M19: Participant recruitment strategy finalized",
        "M21: 40 participants (20 students + 20 SME employees) successfully recruited",
        "M22: Pilot program officially launched with blended learning delivery",
        "M27: Mid-point evaluation completed with comprehensive feedback analysis",
        "M33: Capstone projects completed and presented",
        "M34: Final evaluation completed and curriculum refinements finalized"
      ],
      status: "not-started",
      progress: 0,
      teamMembers: ["Pilot Coordinator", "Instructors", "Industry Coordinator", "Student Support", "SME Liaison", "Evaluation Specialist"]
    },
    {
      id: "WP5",
      title: "Fostering an Inclusive and Diverse AI Talent Pipeline",
      lead: "HU Berlin",
      coLead: "IHK Berlin",
      budget: 150000,
      duration: "M1-M36",
      description: "This Work Package embeds the core European value of diversity and inclusion into the very fabric of Project AIDA. Recognizing that excellence and innovation are fueled by a multiplicity of perspectives, this WP moves beyond passive statements of support to implement a concrete, evidence-based action plan to broaden the AI talent pipeline.",
      activities: [
        "Develop communication materials and campaigns targeting women and diverse backgrounds",
        "Partner with established networks and local community organizations",
        "Implement targeted outreach to underrepresented groups in technology",
        "Conduct dedicated review of all course materials for inclusive language",
        "Ensure inclusion of diverse case studies and role models in curriculum",
        "Eliminate cultural or gender-based stereotypes from educational content",
        "Provide inclusive teaching practices workshop for all instructors",
        "Establish formal mentorship program with IHK Berlin network professionals",
        "Match participants from underrepresented groups with industry mentors",
        "Provide technical guidance, career advice, and networking opportunities",
        "Implement diverse selection committees for pilot recruitment",
        "Establish clear and objective evaluation rubrics for participant selection",
        "Utilize 'blind' reviews of initial applications to minimize unconscious bias",
        "Monitor and track diversity metrics throughout project duration",
        "Assess long-term retention and advancement of diverse participants"
      ],
      deliverables: [
        "D5.1 Support and Integration Schemes (Month 6): Comprehensive support mechanisms for female students and professionals, talented young people from disadvantaged backgrounds, and people with disabilities",
        "D5.2 Mentorship Program Report (Month 36): Evaluation of mentorship program effectiveness, including participant feedback and career progression data"
      ],
      milestones: [
        "M3: Inclusive communication materials and outreach strategies developed",
        "M6: Support and integration schemes implemented and operational",
        "M12: Inclusive curriculum review completed and materials updated",
        "M18: Mentorship program launched with initial participant-mentor matches",
        "M24: Mid-term diversity impact assessment completed",
        "M36: Comprehensive diversity and inclusion impact evaluation finalized"
      ],
      status: "in-progress",
      progress: 30,
      teamMembers: ["Inclusion Coordinator", "Diversity Coordinator", "Pedagogical Support", "Mentorship Coordinator", "Community Liaison", "Evaluation Specialist"]
    },
    {
      id: "WP6",
      title: "Dissemination, Exploitation, and Long-Term Sustainability",
      lead: "IHK Berlin",
      budget: 210000,
      duration: "M7-M36",
      description: "This final Work Package is designed to maximize the project's impact far beyond the immediate consortium and to ensure its activities and benefits continue long after the EU funding period concludes. Led by IHK Berlin, whose mission is inherently focused on long-term economic development, WP6 translates the project's outputs into lasting value for Europe.",
      activities: [
        "Develop comprehensive communication and dissemination strategy",
        "Create professional project website with integrated resources",
        "Implement active social media engagement across multiple platforms",
        "Publish in high-impact academic journals and present at major conferences",
        "Create policy briefs for German and EU-level policymakers",
        "Utilize official EU channels including Horizon Results Platform",
        "Integrate with Digital Skills and Jobs Platform for maximum visibility",
        "Develop specialized training modules for university, VET, and secondary education teachers",
        "Implement teach-the-teacher training programs across Europe",
        "Execute social media campaigns targeting different audiences",
        "Conduct career orientation activities for secondary education students",
        "Organize 'Technology deep dive sessions' for the general public",
        "Establish sustainable partnerships between academia, industry, and research institutions",
        "Develop comprehensive licensing model for curriculum adoption",
        "Formalize AIDA Certification as official IHK qualification",
        "Package curriculum framework for contribution to EVITA consortium",
        "Develop detailed business plan for self-sustaining AIDA Training Center",
        "Structure joint venture between HU Berlin and IHK Berlin",
        "Create fee-for-service model for post-grant sustainability",
        "Establish permanent resource for advanced AI skills development"
      ],
      deliverables: [
        "D6.1 Communication and Dissemination Plan (Month 7): Detailed strategy document for all dissemination activities, including social media campaigns and career orientation activities",
        "D6.2 Teach-the-Teacher Training Modules (Month 15): Specialized training programs for educators at all levels to ensure sustainability and scalability",
        "D6.3 Digital Skills and Jobs Platform Integration (Month 20): Dedicated landing page and integration with EU platforms for maximum visibility",
        "D6.4 Partnership Framework Report (Month 24): Comprehensive framework for academia-industry-research collaboration to facilitate large-scale European-wide roll-out",
        "D6.5 Exploitation Plan and Licensing Model (Month 30): Comprehensive plan for commercial and academic exploitation of project results",
        "D6.6 Business Plan for Post-Project Sustainability (Month 36): Complete business plan for establishment of self-sustaining AIDA Training Center",
        "D6.7 Impact Assessment Report (Month 36): Comprehensive KPI assessment and policy recommendations for future initiatives"
      ],
      milestones: [
        "M7: Communication and dissemination plan finalized and approved",
        "M12: Project website and social media presence established",
        "M15: Teach-the-teacher training modules developed and ready for deployment",
        "M20: Digital Skills and Jobs Platform integration completed",
        "M24: Partnership framework established with key stakeholders",
        "M30: Exploitation plan and licensing model finalized",
        "M36: Business plan for sustainability and final impact assessment completed"
      ],
      status: "not-started",
      progress: 0,
      teamMembers: ["Dissemination Lead", "Exploitation Manager", "Sustainability Coordinator", "Communication Specialist", "Partnership Manager", "Business Development Officer"]
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
      contactPerson: "Prof. Dr. AI Coordinator",
      website: "https://www.hu-berlin.de",
      logo: "/logos/hu-berlin.png"
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
      contactPerson: "Dr. Industry Relations",
      website: "https://www.ihk.de/berlin",
      logo: "/logos/ihk-berlin.png"
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
      contactPerson: "Prof. Dr. Curriculum Lead",
      website: "https://www.um.edu.mt",
      logo: "/logos/um-malta.png"
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
      contactPerson: "Prof. Dr. Research Lead",
      website: "https://www.polimi.it",
      logo: "/logos/polimi.png"
    },
  ],
  modules: [
    {
      id: "M1",
      title: "Foundations of Machine Learning",
      leadInstitution: "PoliMi",
      coDevelopers: ["UM"],
      ectsCredits: 6,
      description: "Core machine learning concepts and algorithms",
      learningOutcomes: ["Understand ML fundamentals", "Implement basic algorithms", "Evaluate model performance"],
      prerequisites: ["Basic programming", "Mathematics"],
      status: "development"
    },
    {
      id: "M2",
      title: "GenAI Foundation Model Development",
      leadInstitution: "PoliMi",
      coDevelopers: ["HU Berlin"],
      ectsCredits: 8,
      description: "Understanding and working with large language models",
      learningOutcomes: ["LLM architecture", "Training strategies", "Fine-tuning techniques"],
      prerequisites: ["M1", "Deep Learning basics"],
      status: "development"
    },
    {
      id: "M3",
      title: "AI Inference Processes",
      leadInstitution: "PoliMi",
      coDevelopers: ["UM"],
      ectsCredits: 6,
      description: "Practical deployment and optimization of AI models",
      learningOutcomes: ["Model deployment", "Performance optimization", "Production pipelines"],
      prerequisites: ["M1", "Software engineering"],
      status: "development"
    },
    {
      id: "M4",
      title: "Data Science for AI",
      leadInstitution: "UM",
      coDevelopers: ["PoliMi"],
      ectsCredits: 6,
      description: "Advanced data preparation and feature engineering",
      learningOutcomes: ["Data preprocessing", "Feature engineering", "Data validation"],
      prerequisites: ["Statistics", "Python programming"],
      status: "development"
    },
    {
      id: "M5",
      title: "AI and GenAI Deployment",
      leadInstitution: "UM",
      coDevelopers: ["HU Berlin"],
      ectsCredits: 8,
      description: "Real-world implementation strategies for SMEs",
      learningOutcomes: ["SME-specific deployment", "ROI analysis", "Change management"],
      prerequisites: ["M2", "M3", "Business understanding"],
      status: "development"
    },
    {
      id: "M6",
      title: "Supercomputing for AI",
      leadInstitution: "HU Berlin",
      coDevelopers: ["PoliMi"],
      ectsCredits: 6,
      description: "Hands-on experience with AI Factories infrastructure",
      learningOutcomes: ["HPC basics", "AI Factories access", "Large-scale training"],
      prerequisites: ["M1", "Basic HPC concepts"],
      status: "development"
    },
    {
      id: "M7",
      title: "Ethical AI & Regulatory Compliance",
      leadInstitution: "PoliMi",
      coDevelopers: ["HU Berlin"],
      ectsCredits: 4,
      description: "EU AI Act compliance and ethical considerations",
      learningOutcomes: ["AI Act understanding", "Ethical frameworks", "Compliance strategies"],
      prerequisites: ["None"],
      status: "development"
    },
    {
      id: "M8",
      title: "AI Project Management",
      leadInstitution: "UM",
      coDevelopers: ["IHK Berlin"],
      ectsCredits: 4,
      description: "Managing AI projects in organizational contexts",
      learningOutcomes: ["Project planning", "Team management", "Risk assessment"],
      prerequisites: ["Basic project management"],
      status: "development"
    },
    {
      id: "M9",
      title: "Data-Secure AI Systems",
      leadInstitution: "HU Berlin",
      coDevelopers: ["PoliMi"],
      ectsCredits: 4,
      description: "Security considerations in AI system design",
      learningOutcomes: ["Data protection", "Privacy-preserving AI", "Security best practices"],
      prerequisites: ["M1", "Basic security concepts"],
      status: "development"
    },
    {
      id: "M10",
      title: "Applied NLP for SMEs",
      leadInstitution: "UM",
      coDevelopers: ["HU Berlin"],
      ectsCredits: 6,
      description: "Practical NLP applications for business contexts",
      learningOutcomes: ["NLP techniques", "Business applications", "Implementation strategies"],
      prerequisites: ["M1", "M2"],
      status: "development"
    }
  ],
  kpis: [
    {
      name: "Course Completion Rate",
      target: ">85%",
      measurement: "LMS records and final grade reports",
      category: "engagement",
      status: "on-track"
    },
    {
      name: "Diversity of Participant Cohort",
      target: ">40% women",
      measurement: "Demographic data from registration",
      category: "engagement",
      status: "on-track"
    },
    {
      name: "IHK Certification Pass Rate",
      target: ">90%",
      measurement: "Official certification records",
      category: "knowledge",
      status: "on-track"
    },
    {
      name: "Skill Application Rate",
      target: ">75%",
      measurement: "Post-training surveys",
      category: "application",
      status: "on-track"
    },
    {
      name: "Business Process Improvement",
      target: ">50%",
      measurement: "SME leadership surveys",
      category: "application",
      status: "on-track"
    },
    {
      name: "Academic Publications",
      target: "5+",
      measurement: "Peer-reviewed publications",
      category: "dissemination",
      status: "on-track"
    },
    {
      name: "Curriculum Downloads",
      target: "1000+",
      measurement: "Website analytics",
      category: "dissemination",
      status: "on-track"
    },
    {
      name: "SME Engagement Rate",
      target: ">15 companies",
      measurement: "Partnership agreements",
      category: "engagement",
      status: "on-track"
    }
  ],
  aiFactories: [
    {
      name: "Jupiter AI Factory",
      location: "Jülich, Germany",
      accessMode: "research",
      status: "established"
    },
    {
      name: "Stuttgart AI Factory",
      location: "Stuttgart, Germany",
      accessMode: "fast-lane",
      status: "planned"
    },
    {
      name: "Bologna AI Factory",
      location: "Bologna, Italy",
      accessMode: "playground",
      status: "planned"
    }
  ],
  livingLab: {
    participants: {
      students: 20,
      smeEmployees: 20,
      total: 40
    },
    recruitmentStatus: "not-started",
    diversityTarget: 40,
    currentDiversity: 0
  }
}
