import React from "react";

export const Consumption: React.FC = () => (
  <section className="bg-white rounded-lg shadow p-6 mt-6">
    <h2 className="text-2xl font-semibold mb-6">Verbrauch & Zählerstände</h2>
    <div className="space-y-6">
      <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-medium">
        Verbrauchsdiagramm
      </div>
      <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-medium">
        Zählerstand-Diagramm
      </div>
    </div>
  </section>
);
