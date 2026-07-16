/**
 * Featured work, most significant first. Cards are typographic by design —
 * no screenshots to source, chase, or let go stale.
 *
 * Feeds BOTH the site's Work section and the generated résumé
 * (scripts/build-resume.mjs). The résumé prints `summary` only, so keep it to a
 * sentence or two that stands on its own; `detail` is site-only depth.
 */
export const projects = [
  {
    name: 'Dynasty Futures',
    year: '2026',
    role: 'Solo build — frontend, backend, and infrastructure',
    tagline: 'Production trading platform for a futures prop firm',
    resumeBlurb:
      'Solo-built production trading platform for a futures prop firm: live account dashboards, equity and P&L curves, a payout eligibility engine, and KYC. React/TypeScript, Node/Express, Prisma, Postgres, AWS, Terraform.',
    summary:
      'A production trading platform for a futures prop firm — live account dashboards, equity and P&L curves, a payout eligibility engine, KYC, affiliate tracking, and a support desk. Built solo: React front end, typed Node API over Postgres, deployed to AWS on containerized infrastructure defined entirely in Terraform with CI/CD through GitHub Actions.',
    detail:
      'The hard part was never the UI — it was reconciling state against third-party trading APIs with no transactional guarantees, which meant idempotent sync jobs, webhook receivers that never trust their payload, and eligibility rules that fail safe.',
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'AWS', 'Terraform'],
    links: [{ label: 'Visit site', href: 'https://www.dynastyfuturesdyn.com/' }],
    href: 'dynastyfuturesdyn.com',
    featured: true,
  },
  {
    name: 'Campus Core',
    year: '2024 — Present',
    role: 'Side project — team of five, I led the backend',
    tagline: 'Multi-tenant academic advising platform',
    resumeBlurb:
      'Multi-tenant academic advising platform backed by Microsoft for Startups; led the backend across a team of five. Isolated Postgres per university, Zoom OAuth meetings, OpenAI advising assistant. React Native/Expo, Node, Prisma, Azure.',
    summary:
      'A multi-tenant academic advising platform for universities, backed by Microsoft for Startups. Each university gets an isolated PostgreSQL database resolved per request by middleware; Zoom server-to-server OAuth provisions a meeting per appointment, and an OpenAI-backed assistant answers with the student\'s profile as context. One Expo codebase ships iOS, Android, and web.',
    detail:
      'Led the backend across a team of five. Feature-complete and currently being taken to market.',
    tech: [
      'TypeScript',
      'React Native',
      'Expo',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Azure',
      'Terraform',
      'OpenAI',
    ],
    links: [{ label: 'Visit site', href: 'https://www.campus-core.com/' }],
    href: 'campus-core.com',
    featured: true,
  },
  {
    name: 'Huddle Up',
    year: '2023',
    role: 'Capstone team project — University of Utah',
    tagline: 'Team fantasy football platform',
    resumeBlurb:
      'Senior capstone at the University of Utah: a team fantasy football platform. Full TypeScript stack with Next.js server-side rendering, a Node backend, and MySQL via Prisma; Tailwind and Mantine for the interface.',
    summary:
      'A team fantasy football platform for managing and tracking teams, built as my senior capstone at the University of Utah. Full TypeScript across the stack with Next.js for server-side rendering, a Node backend, and MySQL via Prisma.',
    detail: 'Styled with Tailwind and Mantine; version control and collaboration on GitLab.',
    tech: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Prisma', 'MySQL', 'Tailwind'],
    links: [{ label: 'View on GitLab', href: 'https://capstone-cs.eng.utah.edu/fan-huddle' }],
    href: 'capstone-cs.eng.utah.edu/fan-huddle',
    featured: true,
  },
]
