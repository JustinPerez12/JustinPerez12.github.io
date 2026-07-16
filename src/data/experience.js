/**
 * Employment only, most-recent first. `end: null` means current.
 * `period` is what renders; the ISO dates exist so ordering is not eyeballed.
 *
 * Side projects belong in projects.js, not here — listing one as a job reads as
 * employment that didn't happen.
 *
 * `note` is résumé-only (scope line under the role).
 *
 * This file feeds BOTH the site's Experience section and the generated résumé
 * (scripts/build-resume.mjs). Keep `highlights` tight and ordered strongest
 * first: the résumé is a one-pager and takes them from the top.
 */
export const experience = [
  {
    company: 'NICE',
    title: 'Software Engineer 2',
    location: 'Sandy, UT',
    start: '2025-06',
    end: null,
    period: 'June 2025 — Present',
    href: 'https://www.nice.com/',
    note: 'Federated retrieval platform · CXone Expert · auth library · conversational-AI integration',
    highlights: [
      'Architected a federated knowledge-retrieval service in Python from its earliest commits — owning the request/response contract, config-driven provider dispatch, and the unified contract that merges results across providers with reciprocal rank fusion. Authored four architecture decision records and drove them through review to team consensus.',
      'Own the platform\'s OIDC/SSO surface: delivered preferred-username through launch, a safe revert under incident, and a hardened re-land; hardened the multi-tenant redirector; and contributed PKCE upstream to an open-source PHP auth library before enabling it by default across the product.',
      'Led the migration of search analytics from a synchronous, request-blocking query onto an event-driven .NET 8 service on SNS/SQS — KEDA scale-to-zero, dead-letter handling, per-site feature-flag rollout — and authored the Terragrunt, CloudFormation, and Helm infrastructure behind it across nine environments.',
      'Drove a read-replica adoption program to cut primary-database load: audited ~38 services for eligibility, then moved user, tag, group, and page query paths across 7+ high-traffic tables onto replica reads.',
      'Designed a filter-group system — versioned, stored definitions with a management API (optimistic concurrency, soft-delete and restore, version history) — that became authoritative for provider selection and result scoping, replacing brittle per-request config with fail-loud validation.',
      'Closed a CWE-285 broken access-control vulnerability across the C# and PHP layers without regressing the OIDC login flow that had forced a revert of the first attempt, and fixed a prompt-injection vector found in third-party penetration testing.',
      'Shipped a conversational-AI platform extension to GA in TypeScript — typed connections, source-citation output, classified error handling with retry and backoff, and ~99% line coverage behind an 80% CI gate.',
      'Built tenant knowledge-base discovery and multi-hub fan-out, auto-discovering a tenant\'s knowledge bases from a forwarded JWT and querying them concurrently with per-source error isolation, eliminating hard-coded IDs.',
      'Root-caused production 500s on emoji search queries to a utf8mb3/utf8mb4 collation mismatch and shipped a guarded, idempotent migration across 600+ tenant databases.',
      'Raised the floor for the team: automatic API impact analysis in the dev-review workflow, a scaffolding tool that generates complete microservices with their infrastructure, and a Vitest coverage campaign across the legacy JavaScript surface.',
    ],
  },
  {
    company: 'Cox Automotive',
    title: 'Software Engineer I',
    location: 'Draper, UT',
    start: '2023-06',
    end: '2025-06',
    period: 'June 2023 — June 2025',
    href: 'https://www.coxautoinc.com/',
    highlights: [
      'Increased security adoption across company software inventory from 10% to over 45% by simplifying the upload process and building more efficient defect-retrieval methods.',
      'Designed a graph database on NeptuneDB modeling thousands of interconnected entities — vulnerabilities, software components, teams, and users — making security data queryable across the org.',
      'Built tooling that generates security status reports for more than 7,500 software components.',
      'Built reporting ETL jobs on CloudWatch Events, ECS Fargate, and Lambda.',
      'Integrated the platform with security vendors including Veracode, Wiz, and NoName.',
    ],
  },
  {
    company: 'Wavetronix',
    title: 'Software Engineering Intern',
    location: 'Salt Lake City, UT',
    start: '2022-05',
    end: '2023-01',
    period: 'May 2022 — Jan 2023',
    href: 'https://www.wavetronix.com/',
    highlights: [
      'Developed a C# application that simulated traffic patterns, letting engineers design intersections and optimize layouts.',
      'Built a companion C# tool that processed simulation output into graphed visualizations, making complex traffic data readable at a glance.',
    ],
  },
]
