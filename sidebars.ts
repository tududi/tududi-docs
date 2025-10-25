import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/configuration',
        'getting-started/first-steps',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/task-management',
        'features/hierarchical-organization',
        'features/multi-language',
        'features/telegram-integration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/docker-deployment',
        'guides/database-setup',
        'guides/backup-restore',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/authentication',
        'api/tasks',
        'api/users',
      ],
    },
  ],
};

export default sidebars;
