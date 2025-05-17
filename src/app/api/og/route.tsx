import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get title from query params or use default
    const title = searchParams.get('title') || siteConfig.name;
    
    // Get description from query params or use default
    const description = searchParams.get('description') || siteConfig.description;
    
    // Generate the OG image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030711',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#fff',
                marginRight: '10px',
              }}
            >
              {siteConfig.name}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '15px',
              padding: '40px',
              maxWidth: '80%',
              border: '1px solid #333',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#ccc',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {description}
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontSize: '18px',
                color: '#ccc',
              }}
            >
              {siteConfig.url}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
