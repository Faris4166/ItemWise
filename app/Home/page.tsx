import ChartUi from "@/components/chart/page";
import React from "react";

export default function page() {
  return (
    <div className="px-2">
      <h1 className="font-serif text-2xl">Home</h1>
      <hr />
      <p className="font-serif">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
        maxime. Numquam officiis minima voluptas illum unde amet, nemo
        cupiditate recusandae iste. Asperiores fugit vero perspiciatis quam,
        iusto tempora architecto animi, eos neque alias labore saepe commodi
        ipsam. Aut animi voluptatem officiis vitae corrupti. Tempora nemo natus
        quibusdam, facilis soluta sapiente.
      </p>
      <ChartUi />
    </div>
  );
}
