const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full z-[800] top-0 fixed inset-0 align-middle backdrop-blur-sm">
      <div className="loader border-8 border-[#e5e7eb] border-l-blue-500 w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
