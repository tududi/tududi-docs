import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quick-start',
        'getting-started/first-steps',
        'getting-started/configuration',
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/project-sharing',
        'features/telegram-integration',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/contributing',
        'community/bug-reports',
        'community/feature-requests',
        'community/code-of-conduct',
      ],
    },
  ],
};

export default sidebars;
