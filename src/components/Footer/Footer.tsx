const Footer = () => {
  return (
<footer className="footer border border-gray-200 rounded-md md:rounded-lg bg-white text-gray-800 py-6 border-t shadow-sm">
  <div className="mx-auto flex justify-between md:items-center px-2 md:px-4">

    <div className="md:mb-4">
      <h3 className="text-base md:text-lg font-semibold text-blue-600">IntelliWear</h3>
      <p className="text-sm text-gray-600">Your go-to for smart fashion choices.</p>
    </div>

    <div className="text-sm text-gray-600">
      &copy; {new Date().getFullYear()} IntelliWear. All rights reserved.
    </div>
    
  </div>
</footer>
  );
};

export default Footer;