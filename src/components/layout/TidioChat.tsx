// src/components/layout/TidioChat.tsx
import Script from "next/script";

// Tidio is a hosted chat service: the WordPress plugin only prints this project key + script tag, so we do the same here.
export default function TidioChat() {
  const key = process.env.NEXT_PUBLIC_TIDIO_KEY;
  if (!key) return null;

  return (
    <>
      <link rel="preconnect" href="https://code.tidio.co" />
      {/* lazyOnload = after the page is interactive, same as the plugin's async mode; key is set before the widget script runs */}
      <Script id="tidio-key" strategy="lazyOnload">{`document.tidioChatCode = "${key}";`}</Script>
      <Script src={`https://code.tidio.co/${key}.js`} strategy="lazyOnload" />
    </>
  );
}
