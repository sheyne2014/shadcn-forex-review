/**
 * Unsplash API helper functions
 */

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  likes: number;
  user: {
    id: string;
    username: string;
    name: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

/**
 * Get a specific photo by ID
 */
export async function getPhoto(id: string): Promise<UnsplashPhoto> {
  const apiKey = process.env.UNSPLASH_API_KEY;

  if (!apiKey) {
    throw new Error('UNSPLASH_API_KEY is not set in environment variables');
  }

  const response = await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      'Authorization': `Client-ID ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photo: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Search photos
 */
export async function searchPhotos(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashSearchResponse> {
  const apiKey = process.env.UNSPLASH_API_KEY;

  if (!apiKey) {
    throw new Error('UNSPLASH_API_KEY is not set in environment variables');
  }

  const params = new URLSearchParams({
    query,
    page: page.toString(),
    per_page: perPage.toString()
  });

  const response = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: {
      'Authorization': `Client-ID ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to search photos: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get random photos
 */
export async function getRandomPhotos(
  count: number = 1,
  query?: string
): Promise<UnsplashPhoto[]> {
  const apiKey = process.env.UNSPLASH_API_KEY;

  if (!apiKey) {
    throw new Error('UNSPLASH_API_KEY is not set in environment variables');
  }

  const params = new URLSearchParams({
    count: count.toString()
  });

  if (query) {
    params.append('query', query);
  }

  const response = await fetch(`https://api.unsplash.com/photos/random?${params}`, {
    headers: {
      'Authorization': `Client-ID ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get random photos: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a single image URL for a search query
 */
export async function getUnsplashImage(query: string): Promise<string> {
  try {
    const searchResults = await searchPhotos(query, 1, 1);

    if (searchResults.results.length > 0) {
      return searchResults.results[0].urls.regular;
    }

    // Fallback to a random photo if no search results
    const randomPhotos = await getRandomPhotos(1, query);
    if (Array.isArray(randomPhotos) && randomPhotos.length > 0) {
      return randomPhotos[0].urls.regular;
    }

    throw new Error('No images found');
  } catch (error) {
    console.error('Failed to get Unsplash image:', error);
    // Return a default placeholder image
    return `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center`;
  }
}