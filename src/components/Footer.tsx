export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#213555] py-1 relative">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/20 to-transparent" />
      <div className="container mx-auto px-4">
        <p className="text-gray-300 text-sm text-center">
          © {currentYear} Synco.Org. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
