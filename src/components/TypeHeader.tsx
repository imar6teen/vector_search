"use client";
import TypeIt from "typeit-react";

const TypeHeader = () => {
  return (
    <TypeIt
      as="h1"
      options={{
        speed: 50,
        startDelay: 900,
        // loop: true,
      }}
      getBeforeInit={(instance) => {
        instance
          .type("aak")
          .pause(750)
          .delete(2, { delay: 750 })
          .type("sk", { delay: 750 })
          .move(null, { to: "START", instant: true, delay: 750 })
          .move(1, { delay: 350 })
          .delete(1, { delay: 350 })
          .type("A")
          .move(null, { to: "END", instant: true, delay: 750 })
          .type(" What You <span class='place italic'>Collected</span>", {
            delay: 2000,
          })
          .delete(".place", { instant: true, delay: 750 })
          .type("<span class='font-extrabold underline'>Scraped</span>", {
            delay: 3000,
          })
          .type(".")
          .go();
        return instance;
      }}
    />
  );
};

export default TypeHeader;
