const Banner = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 flex items-center justify-around px-6 md:px-12 lg:px-20 py-2 overflow-hidden relative">
      {/* Content */}
      <div className="text-white max-w-xl space-y-8 relative z-10">
        <div>
          <span className="inline-block text-md font-bold text-[#4D8EFF] bg-opacity-20 rounded-full mb-4">
            Exclusive Experience
          </span>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            Timeless Elegance, 30% Off Selected Watches
          </h1>
        </div>

        <p className="text-gray-300 text-md leading-relaxed max-w-md">
          Discover our curated collection of luxury timepieces where precision
          engineering meets sophisticated design. Limited time offer for the
          discerning collector.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
            Shop The Collection
            {/* <MdArrowForward className="group-hover:translate-x-1 transition-transform" /> */}
          </button>
          <button className="w-full sm:w-auto border-2 border-blue-400 text-blue-300 hover:text-white hover:border-blue-300 font-bold py-2 px-8 rounded-full transition-all duration-300 hover:bg-blue-500 hover:bg-opacity-20 backdrop-blur-sm">
            View Details
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex items-center justify-center relative z-10 rotate-6">
        <div className="relative h-full flex items-center">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-30"></div>
          <img
            src="/images/banner.png"
            alt="Luxury Watch"
            className="relative h-[600px] w-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
