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

// const Footer = () => {
//   return (
//     <footer className="bg-blue-900 text-white py-6">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
//         {/* Left Section */}
//         <div className="mb-4 text-center md:text-left">
//           <h3 className="text-lg font-bold text-yellow-500">IntelliWear</h3>
//           <p className="text-sm text-gray-300">Your go-to for smart fashion choices.</p>
//         </div>

//         {/* Right Section */}
//         <div className="text-sm text-center md:text-right">
//           &copy; {new Date().getFullYear()} IntelliWear. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
