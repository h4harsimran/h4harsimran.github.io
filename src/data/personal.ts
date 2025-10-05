import type {
  PersonalInfo,
  ContactInfo,
  SocialLink,
  NavigationItem,
} from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: 'Harsimranjeet Singh',
  title: 'Manufacturing Sciences & Technology Leader',
  summary:
    'Manufacturing Sciences & Technology Leader with 8+ years of biotech/biopharma experience specializing in CAR-T manufacturing, scale-up, and technology transfer. Proven track record of validating 300+ equipment, leading 10+ projects, and optimizing processes with scientific precision. Expert in TFF, chromatography, sterile filtration, and regulatory compliance (US FDA, EU GMP, Health Canada).',
  headshot: `https://ui-avatars.com/api/?name=${encodeURIComponent('Harsimranjeet Singh')}&size=160&background=1E3A8A&color=ffffff&bold=true&format=png`,
  resume: '/documents/harsimranjeet-singh-resume.pdf',
  availability: 'Open to biotech opportunities',
};

export const contactInfo: ContactInfo = {
  email: 'harsimranjeetsingh4@gmail.com',
  phone: '5879373631',
  location: 'Hamilton, ON',
  linkedin: 'http://www.linkedin.com/in/hs10',
  website: 'https://harsimranjeet-singh.dev',
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'http://www.linkedin.com/in/hs10',
    icon: 'FaLinkedin',
    label: 'Connect on LinkedIn',
  },
  {
    platform: 'Email',
    url: 'mailto:harsimranjeetsingh4@gmail.com',
    icon: 'FaEnvelope',
    label: 'Send Email',
  },
  {
    platform: 'Phone',
    url: 'tel:5879373631',
    icon: 'FaPhone',
    label: 'Call Phone',
  },
];

export const navigationItems: NavigationItem[] = [
  {
    id: 'nav-hero',
    label: 'Hero',
    href: '#hero',
    order: 1,
  },
  {
    id: 'nav-impact-metrics',
    label: 'Impact Metrics',
    href: '#impact-metrics',
    order: 2,
  },
  {
    id: 'nav-career-timeline',
    label: 'Career Timeline',
    href: '#career-timeline',
    order: 3,
  },
  {
    id: 'nav-expertise-matrix',
    label: 'Expertise Matrix',
    href: '#expertise-matrix',
    order: 4,
  },
  {
    id: 'nav-process-flow',
    label: 'Process Flow',
    href: '#process-flow',
    order: 5,
  },
  {
    id: 'nav-skills-radar',
    label: 'Skills Radar',
    href: '#skills-radar',
    order: 6,
  },
  {
    id: 'nav-current-focus',
    label: 'Current Focus',
    href: '#current-focus',
    order: 7,
  },
  {
    id: 'nav-education',
    label: 'Education',
    href: '#education',
    order: 8,
  },
  {
    id: 'nav-tools',
    label: 'Tools',
    href: '#tools',
    order: 9,
  },
  {
    id: 'nav-contact',
    label: 'Contact',
    href: '#contact',
    order: 10,
  },
];

export const achievements = [
  {
    label: 'Equipment Validated',
    value: 300,
    suffix: '+',
  },
  {
    label: 'Projects Led',
    value: 10,
    suffix: '+',
  },
  {
    label: 'Years Experience',
    value: 8,
    suffix: '',
  },
  {
    label: 'Masters GPA',
    value: 3.94,
    suffix: '',
  },
];

export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    position: 'VP of Manufacturing',
    company: 'BioTech Solutions Inc.',
    content:
      'Harsimran consistently delivers exceptional results. His process optimization work saved us millions and his attention to quality is unmatched.',
    avatar: '/images/testimonials/sarah-johnson.jpg',
  },
  {
    id: 'testimonial-2',
    name: 'Dr. Michael Chen',
    position: 'Director of Quality',
    company: 'Pharma Dynamics Corp.',
    content:
      'Working with Harsimran was a pleasure. His expertise in regulatory compliance and process validation is outstanding.',
    avatar: '/images/testimonials/michael-chen.jpg',
  },
];
