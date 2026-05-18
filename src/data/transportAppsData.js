import { Car, Navigation, BarChart3, AlertCircle, Bus, Plane } from 'lucide-react';

export const transportApps = [
  {
    id: 'uk-transport-hub',
    name: 'UK Transport Hub',
    category: 'Traffic Management',
    provider: 'Siemens',
    description: 'Integrated transport intelligence platform providing real-time visibility across UK road and rail networks to support operational planning and incident response.',
    features: [
      'Network visibility',
      'Real-time data feeds',
      'Incident coordination'
    ],
    responsibleAIScore: 92,
    users: '1,400',
    rating: '4.7',
    status: 'Available',
    externalUrl: 'https://nice-dune-007077b0f.7.azurestaticapps.net/',
    icon: Car,
  },
  {
    comingSoon: true,
    id: 'rail-delay-predictor',
    name: 'Rail Delay Predictor',
    category: 'Rail Operations',
    provider: 'Network Rail Digital',
    description: 'Predictive modelling engine for train delays, combining historical performance data, weather conditions, and live network events to forecast disruption up to 90 minutes ahead.',
    features: [
      'Delay forecasting',
      'Disruption modelling',
      'Passenger communications'
    ],
    responsibleAIScore: 90,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Navigation,
  },
  {
    comingSoon: true,
    id: 'road-safety-analytics',
    name: 'Road Safety Analytics',
    category: 'Road Safety',
    provider: 'TRL',
    description: 'Machine learning analysis of accident hotspots, near-miss reports, and road condition data to prioritise safety interventions and infrastructure investment.',
    features: [
      'Hotspot identification',
      'Intervention prioritisation',
      'Infrastructure risk scoring'
    ],
    responsibleAIScore: 94,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: BarChart3,
  },
  {
    comingSoon: true,
    id: 'incident-response-coordinator',
    name: 'Incident Response Coordinator',
    category: 'Incident Management',
    provider: 'Capita',
    description: 'AI-driven triage and resource routing system for traffic incidents that minimises network disruption by coordinating emergency services, signage, and diversions in real time.',
    features: [
      'Automated triage',
      'Resource routing',
      'Diversion management'
    ],
    responsibleAIScore: 91,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: AlertCircle,
  },
  {
    comingSoon: true,
    id: 'bus-network-optimiser',
    name: 'Bus Network Optimiser',
    category: 'Public Transport',
    provider: 'TfL Digital',
    description: 'Combines patronage data, dwell times, and live traffic to continuously re-balance bus routes and frequencies, surfacing service-level recommendations to local transport authorities.',
    features: [
      'Demand modelling',
      'Frequency tuning',
      'Route re-balancing'
    ],
    responsibleAIScore: 92,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Bus,
  },
  {
    comingSoon: true,
    id: 'aviation-emissions-monitor',
    name: 'Aviation Emissions Monitor',
    category: 'Sustainability',
    provider: 'CAA Digital',
    description: 'Flight-by-flight CO₂ and contrail accounting for UK-managed airspace, blending ADS-B traces, fuel-burn models, and met data to support Jet Zero reporting and operational nudges.',
    features: [
      'Per-flight emissions',
      'Contrail modelling',
      'Compliance reporting'
    ],
    responsibleAIScore: 93,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Plane,
  },
];
