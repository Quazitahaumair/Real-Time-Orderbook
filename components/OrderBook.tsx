'use client';
import React, { useEffect, useState } from 'react';

interface Order {
  price: number;
  size: number;
}

const OrderBook = () => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);

  useEffect(() => {
    const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');

    const subscribeMsg = {
      op: 'subscribe',
      args: [
        {
          channel: 'books',
          instId: 'BTC-USDT',
        },
      ],
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const book = data.data?.[0];

      if (book?.asks && book?.bids) {
        setAsks(
          book.asks
            .slice(0, 10)
            .map(([price, size]: string[]) => ({ price: parseFloat(price), size: parseFloat(size) }))
        );
        setBids(
          book.bids
            .slice(0, 10)
            .map(([price, size]: string[]) => ({ price: parseFloat(price), size: parseFloat(size) }))
        );
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-xl shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Order Book: BTC/USDT</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-green-400 font-semibold">Bids</h3>
          {bids.map((order, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>${order.price.toFixed(2)}</span>
              <span>{order.size}</span>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-red-400 font-semibold">Asks</h3>
          {asks.map((order, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>${order.price.toFixed(2)}</span>
              <span>{order.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
