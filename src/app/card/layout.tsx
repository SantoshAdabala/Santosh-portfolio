export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        header, footer, .fixed.bottom-6, .fixed.bottom-24.right-6, .fixed.bottom-24.left-6, .fixed.top-6.left-6 {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
