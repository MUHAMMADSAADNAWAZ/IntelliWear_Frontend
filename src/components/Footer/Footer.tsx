const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">IntelliWear</h3>
          <p className="text-sm">Your go-to for smart fashion choices.</p>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/" className="hover:text-yellow-500">Home</a>
          <a href="/men" className="hover:text-yellow-500">Men's Clothing</a>
          <a href="/women" className="hover:text-yellow-500">Women's Clothing</a>
          <a href="/children" className="hover:text-yellow-500">Children's Clothing</a>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} IntelliWear. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
