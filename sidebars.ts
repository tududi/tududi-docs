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
        'features/api-access',
        'features/api-security',
        'features/areas',
        'features/inbox',
        'features/notes',
        'features/project-sharing',
        'features/projects',
        'features/recurring-tasks',
        'features/tags',
        'features/tasks',
        'features/telegram-integration',
        'features/today-page',
        'features/upcoming-view',
        'features/user-management',
        'features/views',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/architecture',
        'development/backend-patterns',
        'development/backups',
        'development/code-conventions',
        'development/common-tasks',
        'development/database',
        'development/development-workflow',
        'development/directory-structure',
        'development/testing',
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
