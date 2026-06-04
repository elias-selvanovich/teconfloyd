export default async function handler(req: any, res: any) {
  // Configure CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const feedUrl = 'https://teconfloyd.substack.com/feed';
    const response = await fetch(feedUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const xml = await response.text();

    // Find item blocks
    const items: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];

      // Extract Title
      const titleMatch = itemContent.match(/<title>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/title>/);
      const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : '';

      // Extract Link
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
      const link = linkMatch ? linkMatch[1].trim() : '';

      // Extract PubDate
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

      // Extract Description
      const descMatch = itemContent.match(/<description>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/description>/);
      const description = descMatch ? (descMatch[1] || descMatch[2] || '').trim() : '';

      // Extract Image URL (check enclosure first, then fallback to first img src in content)
      const enclosureMatch = itemContent.match(/<enclosure[^>]+url="([^"]+)"/) || itemContent.match(/<media:content[^>]+url="([^"]+)"/);
      let imageUrl = enclosureMatch ? enclosureMatch[1].trim() : null;

      if (!imageUrl) {
        const imgMatch = itemContent.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          imageUrl = imgMatch[1].trim();
        }
      }

      // Helper functions for cleaning strings
      const decodeHtmlEntities = (str: string): string => {
        if (!str) return '';
        return str
          .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
          .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&nbsp;/g, ' ');
      };

      const stripHtml = (str: string): string => {
        if (!str) return '';
        return str.replace(/<[^>]*>/g, '');
      };

      const cleanTitle = decodeHtmlEntities(stripHtml(title));
      let cleanDescription = decodeHtmlEntities(stripHtml(description));

      if (cleanDescription.length > 250) {
        cleanDescription = cleanDescription.substring(0, 247) + '...';
      }

      let dateISO = pubDate;
      try {
        if (pubDate) {
          dateISO = new Date(pubDate).toISOString();
        }
      } catch (e) {
        // Fallback to raw string
      }

      items.push({
        title: cleanTitle,
        link,
        pubDate: dateISO,
        description: cleanDescription,
        imageUrl,
      });
    }

    // Set cache-control headers (cache on edge / browser for 1 hour)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

    return res.status(200).json({ items });
  } catch (error: any) {
    console.error('Error fetching/parsing Substack feed:', error);
    return res.status(500).json({
      message: 'Failed to process Substack feed',
      error: error.message || 'Internal Server Error',
    });
  }
}
