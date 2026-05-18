import { Radar, FileSearch, ShieldCheck, Globe, Crosshair, Ship } from 'lucide-react';

export const defenceApps = [
  {
    id: 'compass-maintenance',
    name: 'COMPASS',
    category: 'Aviation Maintenance',
    provider: 'Leidos',
    description: 'COgnitive Maintenance, Parts, And Scheduling System — an AI-powered command centre that optimises aircraft fleet scheduling, parts inventory, and maintenance operations across defence aviation assets in real time.',
    features: [
      'Smart scheduling',
      'Parts & inventory management',
      'Fleet status monitoring'
    ],
    responsibleAIScore: 94,
    users: '2,100',
    rating: '4.8',
    status: 'Available',
    externalUrl: 'https://mango-mushroom-033be7b03.6.azurestaticapps.net/',
    icon: Radar,
  },
  {
    id: 'sentry-ai-a400',
    name: 'Sentry AI — A400 Fleet Monitor',
    category: 'Predictive Maintenance',
    provider: 'RAF Digital',
    description: 'Holographic fleet health and predictive maintenance platform for the RAF A400 fleet, combining real-time component monitoring, 60-day maintenance scheduling, and an AI intelligence assistant to reduce unplanned downtime.',
    features: [
      'Component health monitoring',
      'Predictive maintenance scheduling',
      'AI maintenance intelligence'
    ],
    responsibleAIScore: 95,
    users: '1,800',
    rating: '4.9',
    status: 'Available',
    externalUrl: 'https://a400-webapp-ercscuhvf3h7ftdw.uksouth-01.azurewebsites.net/',
    icon: FileSearch,
  },
  {
    id: 'mbt-warship-simulation',
    name: 'MBT Naval Design Simulator',
    category: 'Model-Based Simulation',
    provider: 'BAE Systems',
    description: 'Hydrodynamic and aerodynamic simulation platform for warship design validation, generating real-time wind and water flow analysis, force vectors, pressure zones, and hull integrity assessments against custom 3D vessel models.',
    features: [
      'Hydrodynamic flow simulation',
      'Aerodynamic wind modelling',
      'Hull stress & stability analysis'
    ],
    responsibleAIScore: 96,
    users: '980',
    rating: '4.9',
    status: 'Available',
    externalUrl: 'https://purple-ground-04395f603.7.azurestaticapps.net/',
    icon: ShieldCheck,
  },
  {
    comingSoon: true,
    id: 'geospatial-intelligence-ai',
    name: 'Geospatial Intelligence AI',
    category: 'Geospatial',
    provider: 'Maxar',
    description: 'Satellite imagery analysis and geospatial data processing platform supporting operational planning with automated change detection and terrain classification.',
    features: [
      'Change detection',
      'Terrain classification',
      'Operational mapping'
    ],
    responsibleAIScore: 93,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Globe,
  },
  {
    comingSoon: true,
    id: 'soldier-readiness-tracker',
    name: 'Soldier Readiness Tracker',
    category: 'Personnel & Training',
    provider: 'IBM',
    description: 'Integrates medical, training, and qualifications records to give commanding officers a single readiness score per soldier and unit, with AI-driven recommendations for upcoming deployments.',
    features: [
      'Readiness scoring',
      'Training gap analysis',
      'Deployment planning'
    ],
    responsibleAIScore: 90,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Crosshair,
  },
  {
    comingSoon: true,
    id: 'fleet-logistics-orchestrator',
    name: 'Fleet Logistics Orchestrator',
    category: 'Logistics & Supply',
    provider: 'Babcock',
    description: 'Optimises spares, fuel, and munitions distribution across Royal Navy task groups using real-time consumption forecasts and route risk modelling.',
    features: [
      'Demand forecasting',
      'Route risk scoring',
      'Supply pre-positioning'
    ],
    responsibleAIScore: 91,
    users: '—',
    rating: '—',
    status: 'Coming Soon',
    icon: Ship,
  },
];
