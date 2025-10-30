export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

// Import all markdown files from the posts directory
const postModules = import.meta.glob<string>('/src/posts/*.md', { query: '?raw', import: 'default', eager: true });

function parseMarkdown(content: string): { frontmatter: any; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterString = match[1];
  const markdownContent = match[2];

  // Parse YAML-style frontmatter
  const frontmatter: any = {};
  frontmatterString.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value: any = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item: string) => item.trim().replace(/^["']|["']$/g, ''));
    }

    frontmatter[key] = value;
  });

  return { frontmatter, content: markdownContent };
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in postModules) {
    const content = postModules[path];
    const slug = path.replace('/src/posts/', '').replace('.md', '');
    const { frontmatter, content: markdownContent } = parseMarkdown(content);

    posts.push({
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || '',
      description: frontmatter.description || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      content: markdownContent,
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ slug, title, date, description, tags }) => ({
    slug,
    title,
    date,
    description,
    tags,
  }));
}
