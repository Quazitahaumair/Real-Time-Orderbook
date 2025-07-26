import { useState } from "react";

type OrderType = "Market" | "Limit";
type Side = "Buy" | "Sell";
type Delay = 0 | 5 | 10 | 30;

export default function OrderForm() {
  const [venue, setVenue] = useState("OKX");
  const [symbol, setSymbol] = useState("BTC-USDT");
  const [type, setType] = useState<OrderType>("Market");
  const [side, setSide] = useState<Side>("Buy");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [delay, setDelay] = useState<Delay>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      venue,
      symbol,
      type,
      side,
      price,
      quantity,
      delay,
    });

    // TODO: Simulate order placement
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md mt-6 space-y-3">
      <h2 className="text-xl font-semibold mb-2">Simulate Order</h2>

      <div className="grid grid-cols-2 gap-4">
        <label>
          Venue:
          <select className="w-full" value={venue} onChange={(e) => setVenue(e.target.value)}>
            <option>OKX</option>
            <option>Bybit</option>
            <option>Deribit</option>
          </select>
        </label>

        <label>
          Symbol:
          <input className="w-full" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        </label>

        <label>
          Order Type:
          <select className="w-full" value={type} onChange={(e) => setType(e.target.value as OrderType)}>
            <option>Market</option>
            <option>Limit</option>
          </select>
        </label>

        <label>
          Side:
          <select className="w-full" value={side} onChange={(e) => setSide(e.target.value as Side)}>
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </label>

        {type === "Limit" && (
          <label>
            Price:
            <input
              className="w-full"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        )}

        <label>
          Quantity:
          <input
            className="w-full"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>

        <label>
          Delay (seconds):
          <select className="w-full" value={delay} onChange={(e) => setDelay(Number(e.target.value) as Delay)}>
            <option value={0}>Immediate</option>
            <option value={5}>5s</option>
            <option value={10}>10s</option>
            <option value={30}>30s</option>
          </select>
        </label>
      </div>

      <button type="submit" className="mt-4 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
        Simulate Order
      </button>
    </form>
  );
}
 