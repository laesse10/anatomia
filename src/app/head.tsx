export default function Head() {
  return (
    <>
      {/* Fonts and meta only — scripts should be loaded via next/script in layout.tsx */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
