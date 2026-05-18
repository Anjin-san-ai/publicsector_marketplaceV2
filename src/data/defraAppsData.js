import { Leaf, Map, CloudRain, Tractor, Trees, Fish } from 'lucide-react';

export const defraApps = [
  {
    id: 'defra-multi-agent-triage',
    name: 'Defra Multi-Agent Triage System',
    category: 'AI Operations',
    provider: 'Cognizant',
    description: 'Multi-agent AI platform that automatically classifies, prioritises, and routes incoming environmental enquiries, regulatory cases, and citizen queries to the appropriate Defra teams and workflows.',
    features: [
      'Intelligent case routing',
      'Multi-agent orchestration',
      'Query classification'
    ],
    responsibleAIScore: 93,
    users: '1,600',
    rating: '4.7',
    status: 'Available',
    externalUrl: 'https://red-tree-09db09203.7.azurestaticapps.net',
    icon: Leaf,
  },
  {
    comingSoon: true,
    id: 'rural-land-use-planner',
    name: 'Rural Land Use Planner',
    category: 'Land Management',
    provider: 'Esri UK',
    description: 'Geospatial AI tool that analyses satellite imagery and soil data to optimise land use decisions for sustainable farming and conservation outcomes.',
    features: [
      'Satellite analysis',
      'Soil classification',
      'Sustainability scoring'
    ],
    responsibleAIScore: 90,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Map,
  },
  {
    comingSoon: true,
    id: 'flood-risk-intelligence',
    name: 'Flood Risk Intelligence',
    category: 'Risk & Safety',
    provider: 'IBM',
    description: 'Predictive flood modelling system that combines weather forecasts, river gauge data, and terrain analysis to provide early warning risk assessments.',
    features: [
      'Predictive modelling',
      'Early warning alerts',
      'Impact mapping'
    ],
    responsibleAIScore: 95,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: CloudRain,
  },
  {
    comingSoon: true,
    id: 'agricultural-subsidy-advisor',
    name: 'Agricultural Subsidy Advisor',
    category: 'Farming & Payments',
    provider: 'Capita',
    description: 'Intelligent eligibility and payment adviser that guides farmers through Sustainable Farming Incentive applications, reducing processing errors and appeal volumes.',
    features: [
      'Eligibility assessment',
      'Application guidance',
      'Payment forecasting'
    ],
    responsibleAIScore: 91,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Tractor,
  },
  {
    comingSoon: true,
    id: 'woodland-carbon-monitor',
    name: 'Woodland Carbon Monitor',
    category: 'Forestry & Carbon',
    provider: 'Cognizant',
    description: 'Combines satellite imagery and ground sensor data to estimate carbon sequestration across UK woodlands, supporting net-zero reporting and Woodland Carbon Code verification.',
    features: [
      'Biomass estimation',
      'Carbon reporting',
      'Sensor fusion'
    ],
    responsibleAIScore: 94,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Trees,
  },
  {
    comingSoon: true,
    id: 'fisheries-quota-tracker',
    name: 'Fisheries Quota Tracker',
    category: 'Marine & Fisheries',
    provider: 'Microsoft',
    description: 'Real-time vessel and catch-data analytics for the Marine Management Organisation, predicting quota burndown by stock and flagging at-risk fisheries for early intervention.',
    features: [
      'Quota forecasting',
      'Vessel tracking',
      'Stock risk alerts'
    ],
    responsibleAIScore: 92,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Fish,
  },
];
