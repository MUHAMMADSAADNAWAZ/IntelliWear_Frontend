const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-row justify-between items-center px-4">

        <div className="mb-4">
          <h3 className="text-lg font-semibold">IntelliWear</h3>
          <p className="text-sm">Your go-to for smart fashion choices.</p>
        </div>
      
        <div className="text-sm">
          &copy; {new Date().getFullYear()} IntelliWear. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
