import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-center py-4 mt-10 text-gray-300">
      <p>© {new Date().getFullYear()} ABF Movies. All rights reserved.</p>
    </footer>
  );
}
