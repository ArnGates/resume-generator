export default function Navbar() {
    return (
      <nav className="bg-blue-600 text-white py-3 px-6 shadow-md">
        <div className="container mx-auto flex items-center space-x-3">
          {/* Logo Icon (Using Public Folder) */}
          <img src="/logo.png" alt="Logo" className="w-13 h-10 sm:w-16 sm:h-12" />
  
          {/* Company Name (Responsive Font Size) */}
          <h1
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Sungkum
          </h1>
        </div>
      </nav>
    );
  }
  