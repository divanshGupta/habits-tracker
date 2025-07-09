import { useState, useEffect, useRef } from 'react';
import { CgProfile } from "react-icons/cg";

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div ref={menuRef} className="relative flex items-center gap-4">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <CgProfile size={42}/>
      </div>

      {isOpen && (
        <ul className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-md text-sm font-medium overflow-hidden z-50">
          <li>
            <a
              href="/profile"
              className="block px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="/signout"
              className="block px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign out
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderMenu;