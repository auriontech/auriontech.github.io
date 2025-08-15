import { Feed } from 'feed';
import { getAllPosts } from './posts';
import { getBaseUrl } from './url';

export async function generateRSSFeed() {
  const posts = await getAllPosts();
  const siteURL = getBaseUrl();
  const author = {
    name: 'Adol',
    email: 'adol@adol.tech',
    link: siteURL,
  };

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

  // Add blog posts to the feed
  posts.forEach(post => {
    const url = `${siteURL}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description || '',
      content: post.description || '',
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  return feed;
}

export async function generateRSSXML() {
  const feed = await generateRSSFeed();
  return feed.rss2();
}

export async function generateAtomXML() {
  const feed = await generateRSSFeed();
  return feed.atom1();
}

export async function generateJSONFeed() {
  const feed = await generateRSSFeed();
  return feed.json1();
}
