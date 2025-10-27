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
  ],
};

export default sidebars;
