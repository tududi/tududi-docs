import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Self-hosted task management that puts you in control. Organize your life with hierarchical tasks, smart recurring tasks, and Telegram integration.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🗂️ Hierarchical Organization</Heading>
                  <p>
                    Manage tasks, projects, areas, notes, and tags in a clear hierarchical structure.
                    Break down complex tasks into subtasks with progress tracking.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🔄 Smart Recurring Tasks</Heading>
                  <p>
                    Comprehensive recurring task system with multiple patterns, completion-based recurrence,
                    and intelligent parent-child relationships.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">📱 Telegram Integration</Heading>
                  <p>
                    Create tasks directly from Telegram messages. Quick capture ideas on the go
                    and receive daily task digests.
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: '2rem'}}>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🌍 24 Languages</Heading>
                  <p>
                    Full multi-language support with localization in 24 languages for
                    a truly global productivity experience.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🤝 Project Collaboration</Heading>
                  <p>
                    Share projects with team members and collaborate effectively on tasks,
                    notes, and deliverables.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🔒 Self-Hosted & Private</Heading>
                  <p>
                    Host on your own infrastructure. Your data stays under your control,
                    ensuring maximum privacy and security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.philosophy}>
          <div className="container">
            <div className="row">
              <div className="col col--12 text--center">
                <Heading as="h2">Philosophy</Heading>
                <p style={{maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem'}}>
                  Tududi is designed as a life management system that doesn't fight back.
                  Read about the thinking behind tududi:
                </p>
                <div style={{marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <Link
                    className="button button--outline button--primary"
                    href="https://medium.com/@chrisveleris/designing-a-life-management-system-that-doesnt-fight-back-2fd58773e857">
                    Designing a System That Doesn't Fight Back
                  </Link>
                  <Link
                    className="button button--outline button--primary"
                    href="https://medium.com/@chrisveleris/from-task-to-table-how-i-finally-got-to-the-korean-burger-01245a14d491">
                    From Task to Table
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
