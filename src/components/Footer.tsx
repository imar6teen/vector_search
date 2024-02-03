import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 flex w-full items-center justify-center border border-t-secondary">
      <div className="p-8">
        <span>Copyrights &copy;{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default Footer;
