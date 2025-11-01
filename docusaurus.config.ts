import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'tududi',
  tagline: 'Self-hosted task management that puts you in control',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.tududi.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domains, use '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'tududi', // GitHub org/user name.
  projectName: 'tududi-docs', // GitHub repo name.
  deploymentBranch: 'gh-pages', // Branch that GitHub Pages will deploy from
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Make docs the homepage
          routeBasePath: '/',
          // Link to edit documentation on GitHub
          editUrl:
            'https://github.com/tududi/tududi-docs/tree/master/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-VC2N7ZBPEE',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/tududi-social-card.jpg',
    navbar: {
      logo: {
        alt: 'tududi',
        src: 'img/wide-logo-dark.png',
        srcDark: 'img/wide-logo-light.png',
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/chrisvel/tududi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Installation',
              to: '/getting-started/installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/fkbeJ9CmcH',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/tududi/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/chrisvel/tududi',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Docker Hub',
              href: 'https://hub.docker.com/r/chrisvel/tududi',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} tududi`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
