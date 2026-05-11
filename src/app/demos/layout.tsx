export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide main site chrome (navbar, footer, floating elements) for demo pages.
          Using a style tag is the fastest way to prevent FOUC since it's parsed
          before the DOM renders these elements. */}
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, [data-site-chrome] {
          display: none !important;
        }
        .fixed.bottom-6,
        .fixed.bottom-24.right-6,
        .fixed.bottom-24.left-6,
        .fixed.bottom-32.left-4,
        .fixed.top-6.left-6,
        .fixed.right-4.top-16 {
          display: none !important;
        }
      `}} />
      {children}
    </>
  );
}
