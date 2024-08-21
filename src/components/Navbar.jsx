import { Instagram, Github } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-end py-6 px-10 md:px-40 lg:px-64">
      <div className="flex justify-between items-center space-x-4">
        <a
          href="https://www.instagram.com/aman_z445/"
          target="_blank"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
        <a
          href="https://github.com/AmanuelCrafts/"
          target="_blank"
          aria-label="Github"
        >
          <Github className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
