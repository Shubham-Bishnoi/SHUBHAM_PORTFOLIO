export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  tags?: string[]
  content: Array<{ type: 'p' | 'h2'; text: string }>
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'my-story',
    title: 'My story',
    date: '2026-02-14',
    excerpt:
      'Learn a little bit more about me, how I got into building AI systems, and how I’ve built my career as an Analyst / AI Full-Stack Engineer.',
    coverImage: '/images/blog/my-story.jpg',
    tags: ['career', 'ai', 'behind-the-scenes'],
    content: [
      {
        type: 'p',
        text: 'This is placeholder content you can replace later. I’ll use this post to share how I got into building AI systems, the projects that shaped my approach, and the decisions I made along the way.',
      },
      { type: 'h2', text: 'What I care about' },
      {
        type: 'p',
        text: 'Clarity, reliability, and measurable outcomes. I like systems that are explainable, maintainable, and grounded in real constraints.',
      },
      { type: 'h2', text: 'Behind the scenes' },
      {
        type: 'p',
        text: 'I’ll document trade-offs, architecture choices, and lessons learned from shipping enterprise systems—what worked, what broke, and what I’d do differently.',
      },
    ],
  },
  {
    slug: 'adaptive-deception-mesh-behind-the-scenes',
    title: 'Adaptive deception mesh (behind the scenes)',
    date: '2026-01-28',
    excerpt:
      'A behind-the-scenes look at design choices, constraints, and the system thinking that shaped this project.',
    coverImage: '/images/blog/adaptive-deception.jpg',
    tags: ['security', 'systems', 'enterprise'],
    content: [
      {
        type: 'p',
        text: 'Placeholder content. This post will cover the motivation, threat model assumptions, and how I structured the approach for safe iteration and measurement.',
      },
      { type: 'h2', text: 'Key decisions' },
      {
        type: 'p',
        text: 'I’ll outline the biggest architectural trade-offs—what I optimized for and what I intentionally left out.',
      },
    ],
  },
  {
    slug: 'building-enterprise-agentic-systems',
    title: 'Building enterprise agentic systems',
    date: '2026-01-12',
    excerpt:
      'How I approach agentic systems in enterprise environments: guardrails, evaluation, and integration realities.',
    coverImage: '/images/blog/agentic-systems.jpg',
    tags: ['agents', 'evaluation', 'platform'],
    content: [
      {
        type: 'p',
        text: 'Placeholder content. This post will cover planning, tool design, observability, and the evaluation loops needed for production-grade agentic systems.',
      },
      { type: 'h2', text: 'Guardrails & evaluation' },
      {
        type: 'p',
        text: 'I’ll describe practical guardrails (policy, permissions, rate limits) and how I measure correctness and usefulness over time.',
      },
    ],
  },
]

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS.slice().sort((a, b) => b.date.localeCompare(a.date))
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

