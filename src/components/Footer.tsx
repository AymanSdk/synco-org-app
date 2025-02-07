export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#213555] py-1">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-600/20 to-transparent" />
      <div className="container mx-auto px-4">
        <p className="text-center text-xs text-gray-300">
          © {currentYear} syncro Org. All rights reserved
        </p>
      </div>
    </footer>
  );
}
