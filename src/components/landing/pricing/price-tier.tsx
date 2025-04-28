
export interface Tier {
    name: string;
    id: 'starter' | 'Professional' | 'Enterprise';
    icon: string;
    description: string;
    features: string[];
    featured: boolean;
    priceId: Record<string, string>;
}

        

  //     name: 'Starter',
  //     id: 'starter',
  //     icon: '/assets/icons/price-tiers/free-icon.svg',
  //     description: 'Ideal for individuals who want to get started with simple design tasks.',
  //     features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
  //     featured: false,
  //     priceId: { month: 'pri_01hsxyh9txq4rzbrhbyngkhy46', year: 'pri_01hsxyh9txq4rzbrhbyngkhy46' },
  //   },

export const PricingTier = [
    {
      name: "Starter",
      id: "Starter",
      icon: '/assets/icons/price-tiers/free-icon.svg',
      description: "Perfect for small farms just getting started with digital management.",
      features: [ "Up to 5,000 birds", "Basic production tracking", "Environmental monitoring", "Feed management", "Email support", "1 user account",],
      featured: false,
      priceId: { month: 'pri_01jshyaw8bch9t619b083zf53s', year: 'pri_01jshydntqcx20q01h6jngvwes' },
    },
    {
      name: "Pro",
      id: "pro",
      icon: '/assets/icons/price-tiers/free-icon.svg',
      description: "Ideal for medium-sized farms looking to optimize operations.",
      features: [ "Up to 20,000 birds", "Advanced production analytics", "Health tracking system", "Inventory management", "AI-powered insights", "Priority email support", "5 user accounts" ],
      featured: false,
      priceId: { month: 'pri_01jshygddhw7hnzqd9avj4apjq', year: 'pri_01jshykqpceh8jfdbspw7fg811' },
      price: { monthly: 99, annually: 79, },
    },
    {
      name: "Advanced",
      id: "Advanced",
      icon: '/assets/icons/price-tiers/free-icon.svg',
      description: "For large operations with complex management needs.",
      features: [ "Unlimited birds", "Custom reporting", "Advanced AI predictions", "Multi-farm management", "API access", "24/7 phone & email support", "Unlimited user accounts", "Dedicated account manager",],
      featured: true,
      priceId: { month: 'pri_01jshypbff1gkmwve9k0ysfynt', year: 'pri_01jshyra01t2wdy2m0kn3b1bba' },
    },
]


// export const PricingTier: Tier[] = [
  //   {
  //     name: 'Starter',
  //     id: 'starter',
  //     icon: '/assets/icons/price-tiers/free-icon.svg',
  //     description: 'Ideal for individuals who want to get started with simple design tasks.',
  //     features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
  //     featured: false,
  //     priceId: { month: 'pri_01hsxyh9txq4rzbrhbyngkhy46', year: 'pri_01hsxyh9txq4rzbrhbyngkhy46' },
  //   },
  //   {
  //     name: 'Pro',
  //     id: 'pro',
  //     icon: '/assets/icons/price-tiers/basic-icon.svg',
  //     description: 'Enhanced design tools for scaling teams who need more flexibility.',
  //     features: ['Integrations', 'Unlimited workspaces', 'Advanced editing tools', 'Everything in Starter'],
  //     featured: true,
  //     priceId: { month: 'pri_01hsxycme6m95sejkz7sbz5e9g', year: 'pri_01hsxyeb2bmrg618bzwcwvdd6q' },
  //   },
  //   {
  //     name: 'Advanced',
  //     id: 'advanced',
  //     icon: '/assets/icons/price-tiers/pro-icon.svg',
  //     description: 'Powerful tools designed for extensive collaboration and customization.',
  //     features: [
  //       'Single sign on (SSO)',
  //       'Advanced version control',
  //       'Assets library',
  //       'Guest accounts',
  //       'Everything in Pro',
  //     ],
  //     featured: false,
  //     priceId: { month: 'pri_01hsxyff091kyc9rjzx7zm6yqh', year: 'pri_01hsxyfysbzf90tkh2wqbfxwa5' },
  //   },
  // ];
