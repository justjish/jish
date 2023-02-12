import { Link } from '@remix-run/react';

//const featureImage = 'https://i.picsum.photos/id/1002/4312/2868.jpg?hmac=5LlLE-NY9oMnmIQp7ms6IfdvSUQOzP_O3DPMWmyNxwo'
const featureImage =
  'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';
const featureImage400 =
  'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';
const featureImage800 =
  'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Image Component for Cloudflare</h1>
      <p>
        This image is loaded with the standard HTML {`<img />`} tag. Note that different sized images must be provided
        in advance. Compare with <Link to="/pure">Image Component</Link> utilizing a pure JS transformer.
      </p>
      <div className="fade-in">
        <img
          src={featureImage}
          srcSet={`${featureImage400} 400w, ${featureImage800} 800w`}
          sizes="(max-width: 640px) 400px, 800px"
          width={2156}
          height={1434}
          alt="Featured"
          decoding="async"
          style={{
            backgroundSize: 'cover',
            backgroundColor: '#eee',
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
}
