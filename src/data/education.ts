// Education and Academic Background
export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  gpa: number;
  maxGpa: number;
  achievements: string[];
  coursework?: string[];
}

export const educationHistory: Education[] = [
  {
    id: 'edu-1',
    degree: 'MEng',
    field: 'Chemical Engineering (Process Control)',
    institution: 'University of Alberta',
    location: 'Edmonton, AB',
    country: 'Canada',
    startDate: '2019-09',
    endDate: '2021-04',
    gpa: 3.94,
    maxGpa: 4.0,
    achievements: [
      'Graduated with 3.94 GPA',
      'Specialized in Process Control systems',
      'Conducted research in bioprocess optimization',
      'Completed advanced coursework in manufacturing systems',
    ],
    coursework: [
      'Advanced Process Control',
      'Bioprocess Engineering',
      'Statistical Process Control',
      'Manufacturing Systems Design',
      'Process Optimization',
    ],
  },
  {
    id: 'edu-2',
    degree: 'BEng',
    field: 'Chemical Engineering',
    institution: 'Panjab University',
    location: 'Chandigarh',
    country: 'India',
    startDate: '2012-07',
    endDate: '2016-06',
    gpa: 3.52,
    maxGpa: 4.0,
    achievements: [
      'Graduated with 3.52 GPA',
      'Strong foundation in chemical engineering principles',
      'Completed internships in pharmaceutical manufacturing',
      'Active in engineering student organizations',
    ],
    coursework: [
      'Chemical Process Engineering',
      'Unit Operations',
      'Process Design',
      'Chemical Reaction Engineering',
      'Mass Transfer Operations',
    ],
  },
];

// Skills Radar Chart Data - 8 Core Competencies
export const radarSkills = [
  {
    skill: 'Scale-up & Tech Transfer',
    level: 95,
    description:
      'Expert in scaling processes from lab to commercial manufacturing',
  },
  {
    skill: 'Risk Assessment',
    level: 90,
    description: 'Advanced FMEA and process risk analysis capabilities',
  },
  {
    skill: 'Process Design',
    level: 88,
    description: 'Skilled in designing efficient manufacturing processes',
  },
  {
    skill: 'Qualification',
    level: 92,
    description: 'Expert in equipment and process qualification (IQ/OQ/PQ)',
  },
  {
    skill: 'Project Management',
    level: 85,
    description: 'Proven track record managing complex technical projects',
  },
  {
    skill: 'Data Analysis',
    level: 87,
    description: 'Statistical analysis and process optimization using data',
  },
  {
    skill: 'Statistical Control',
    level: 83,
    description: 'Implementation of SPC methods for process monitoring',
  },
  {
    skill: 'HAZOP Study',
    level: 80,
    description: 'Hazard and operability studies for process safety',
  },
];

// Tools & Technologies Grid
export const toolsAndTechnologies = [
  {
    category: 'Office & Documentation',
    tools: [
      { name: 'Excel', icon: 'FaFileExcel', proficiency: 95 },
      { name: 'Visio', icon: 'FaSitemap', proficiency: 88 },
      { name: 'Lucidchart', icon: 'FaChartLine', proficiency: 82 },
    ],
  },
  {
    category: 'Quality & Compliance',
    tools: [
      { name: 'Veeva', icon: 'FaDatabase', proficiency: 85 },
      { name: 'Trackwise', icon: 'FaClipboardList', proficiency: 87 },
    ],
  },
  {
    category: 'Project Management',
    tools: [{ name: 'Fieldwire', icon: 'FaTools', proficiency: 80 }],
  },
  {
    category: 'Analysis & Laboratory',
    tools: [
      { name: 'Statistical Tools', icon: 'FaChartBar', proficiency: 85 },
      { name: 'Laboratory Equipment', icon: 'FaMicroscope', proficiency: 90 },
    ],
  },
];

// Utility functions
export const getEducationByCountry = (country: string): Education[] => {
  return educationHistory.filter(
    edu => edu.country.toLowerCase() === country.toLowerCase()
  );
};

export const getCanadianEducation = (): Education[] => {
  return getEducationByCountry('Canada');
};

export const getIndianEducation = (): Education[] => {
  return getEducationByCountry('India');
};

export const getHighestDegree = (): Education => {
  return educationHistory[0]; // MEng is the highest
};
