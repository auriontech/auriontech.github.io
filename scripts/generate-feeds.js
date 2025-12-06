const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');

async function generateFeeds() {
  try {
    console.log('🔄 Generating RSS feeds...');
    console.log(
      `🌍 Environment: NODE_ENV=${process.env.NODE_ENV || 'undefined'}`
    );
    console.log(`🏗️  CI: ${process.env.CI || 'false'}`);
    console.log(`🚀 GitHub Actions: ${process.env.GITHUB_ACTIONS || 'false'}`);

    // Ensure the out directory exists
    const outDir = path.join(process.cwd(), 'out');
    if (!fs.existsSync(outDir)) {
      console.log(
        '⚠️  Out directory not found. Make sure to run "pnpm run build" first.'
      );
      return;
    }

    // Site configuration
    const siteURL = 'https://adol.tech';
    const author = {
      name: 'Adol',
      email: 'adol@adol.tech',
      link: siteURL,
    };

    // Create the feed
    const feed = new Feed({
      title: "Adol's Blog",
      description: 'Personal blog about technology and science',
      id: siteURL,
      link: siteURL,
      language: 'en',
      image: `${siteURL}/og_image.png`,
      favicon: `${siteURL}/favicon-32x32.png`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Adol`,
      updated: new Date(),
      generator: 'Next.js + Feed',
      feedLinks: {
        rss2: `${siteURL}/rss.xml`,
        atom: `${siteURL}/atom.xml`,
        json: `${siteURL}/feed.json`,
      },
      author,
    });

    // Read blog posts from the content directory
    const postsDir = path.join(process.cwd(), 'src', 'content', 'posts');
    if (fs.existsSync(postsDir)) {
      const postFiles = fs
        .readdirSync(postsDir)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

      // Process each post file
      for (const file of postFiles) {
        try {
          const filePath = path.join(postsDir, file);
          const content = fs.readFileSync(filePath, 'utf8');

          // Simple frontmatter parsing (basic implementation)
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/title:\s*(.+)/);
            const dateMatch = frontmatter.match(/date:\s*(.+)/);
            const descriptionMatch = frontmatter.match(/description:\s*(.+)/);
            const draftMatch = frontmatter.match(/draft:\s*(.+)/);

            // Skip draft posts in production
            // Check if we're in a production build (GitHub Actions or production deployment)
            const isProduction =
              process.env.NODE_ENV === 'production' ||
              process.env.CI === 'true' ||
              process.env.GITHUB_ACTIONS === 'true';

            if (isProduction && draftMatch && draftMatch[1].trim() === 'true') {
              console.log(`⏭️  Skipping draft post: ${file}`);
              continue;
            }

            if (titleMatch && dateMatch) {
              const title = titleMatch[1].trim();
              const date = new Date(dateMatch[1].trim());
              const description = descriptionMatch
                ? descriptionMatch[1].trim()
                : '';
              const slug = file.replace(/\.mdx?$/, '');
              const url = `${siteURL}/blog/${slug}`;
              const isDraft = draftMatch && draftMatch[1].trim() === 'true';

              console.log(
                `📝 Processing post: ${title}${isDraft ? ' (DRAFT)' : ''}`
              );

              feed.addItem({
                title,
                id: url,
                link: url,
                description,
                content: description,
                author: [author],
                contributor: [author],
                date,
              });
            }
          }
        } catch (error) {
          console.warn(
            `⚠️  Warning: Could not process post ${file}:`,
            error.message
          );
        }
      }
    }

    // Generate feeds
    const rssXML = feed.rss2();
    const atomXML = feed.atom1();
    const jsonFeed = feed.json1();

    // Write RSS feeds to the out directory
    fs.writeFileSync(path.join(outDir, 'rss.xml'), rssXML);
    fs.writeFileSync(path.join(outDir, 'atom.xml'), atomXML);
    fs.writeFileSync(path.join(outDir, 'feed.json'), jsonFeed);

    console.log('✅ RSS feeds generated successfully:');
    console.log(`   📄 rss.xml (${feed.items.length} posts)`);
    console.log('   📄 atom.xml');
    console.log('   📄 feed.json');
  } catch (error) {
    console.error('❌ Error generating RSS feeds:', error);
    process.exit(1);
  }
}

// Run the script
generateFeeds();
