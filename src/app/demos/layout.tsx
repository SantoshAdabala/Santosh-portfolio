export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        header, footer, .fixed.bottom-6, .fixed.bottom-24.right-6, .fixed.bottom-24.left-6, .fixed.bottom-32.left-4, .fixed.top-6.left-6, .fixed.right-4.top-16 {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
