export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-[#213555] py-1 z-50">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/20 to-transparent" />
      <div className="container mx-auto px-4">
        <p className="text-gray-300 text-sm text-center">
          © {currentYear} Synco.Org. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
