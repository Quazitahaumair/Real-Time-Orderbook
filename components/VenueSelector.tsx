import React from "react";

interface Props {
  selected: string;
  onChange: (v: string) => void;
}

export default function VenueSelector({ selected, onChange }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1">Select Venue:</label>
      <select
        className="bg-gray-700 text-white px-2 py-1 rounded"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="OKX">OKX</option>
        <option value="Bybit">Bybit</option>
        <option value="Deribit">Deribit</option>
      </select>
    </div>
  );
}
