import { Package, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Activeuser() {

  // 🔢 INITIAL VALUES (from localStorage or default)
  const [totalUsers, setTotalUsers] = useState(
    () => Number(localStorage.getItem("totalUsers")) || 41000
  );

  const [activeUsers, setActiveUsers] = useState(
    () => Number(localStorage.getItem("activeUsers")) || 23500
  );

  const [todayOrders, setTodayOrders] = useState(
    () => Number(localStorage.getItem("todayOrders")) || 21800
  );

  // 🔒 LIMITS
  const TOTAL_USERS_MAX = 60000;

  const ACTIVE_MIN = 21000;
  const ACTIVE_MAX = 30000;

  const ORDERS_MIN = 20000;
  const ORDERS_MAX = 30000;

  // 🔄 AUTO UPDATE
  useEffect(() => {
    const interval = setInterval(() => {

      // ✅ TOTAL USERS (sirf increase, 50-50 me)
      setTotalUsers(prev => {
        if (prev >= TOTAL_USERS_MAX) return TOTAL_USERS_MAX;

        const step = [20, 30, 45][Math.floor(Math.random() * 3)];
        const next = Math.min(prev + step, TOTAL_USERS_MAX);

        localStorage.setItem("totalUsers", next);
        return next;
      });

      // 🔁 ACTIVE USERS (fluctuate freely)
      setActiveUsers(prev => {
        const next = fluctuate(prev, ACTIVE_MIN, ACTIVE_MAX);
        localStorage.setItem("activeUsers", next);
        return next;
      });

      // 🔁 TODAY ORDERS (50-50 steps, but fluctuate)
      setTodayOrders(prev => {
        const step = [50, -50, 100, -100][Math.floor(Math.random() * 4)];
        let next = prev + step;

        if (next < ORDERS_MIN) next = ORDERS_MIN + 50;
        if (next > ORDERS_MAX) next = ORDERS_MAX - 50;

        localStorage.setItem("todayOrders", next);
        return next;
      });

    }, 2500); // every 2.5 sec

    return () => clearInterval(interval);
  }, []);

  // 🔁 Fluctuation helper
  const fluctuate = (value, min, max) => {
    const change = Math.floor(Math.random() * 1000) - 500;
    let newValue = value + change;

    if (newValue < min) newValue = min + 200;
    if (newValue > max) newValue = max - 200;

    return newValue;
  };

  const format = (num) => num.toLocaleString();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-0 max-w-7xl mx-auto px-4 my-10">

        {/* TOTAL USERS */}
        <div
          style={{ backgroundImage: "url(/home/ticket.png)" }}
          className="group relative bg-cover bg-no-repeat bg-center p-4 sm:p-6 lg:p-[20px] text-center h-48 sm:h-52 lg:h-[200px] overflow-hidden"
        >
          <div className="flex items-center justify-center mx-auto mb-2 sm:mb-4 relative z-10">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 relative z-10 text-white">
            {format(totalUsers)}
          </div>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 relative z-10 text-white">
            Total Users
          </div>
          <div className="text-xs text-white/90 font-medium relative z-10">
            Growing
          </div>
        </div>

        {/* ACTIVE USERS */}
        <div
          style={{ backgroundImage: "url(/home/ticket.png)" }}
          className="group relative bg-cover bg-no-repeat bg-center p-4 sm:p-6 lg:p-[20px] text-center h-48 sm:h-52 lg:h-[200px] overflow-hidden"
        >
          <div className="flex items-center justify-center mx-auto mb-2 sm:mb-4 relative z-10">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 relative z-10 text-white">
            {format(activeUsers)}
          </div>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 relative z-10 text-white">
            Active Users
          </div>
          <div className="text-xs text-white/90 font-medium relative z-10">
            Live Now
          </div>
        </div>

        {/* TODAY ORDERS */}
        <div
          style={{ backgroundImage: "url(/home/ticket.png)" }}
          className="group relative bg-cover bg-no-repeat bg-center p-4 sm:p-6 lg:p-[20px] text-center h-48 sm:h-52 lg:h-[200px] overflow-hidden"
        >
          <div className="flex items-center justify-center mx-auto mb-2 sm:mb-4 relative z-10">
            <Package className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 relative z-10 text-white">
            {format(todayOrders)}
          </div>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 relative z-10 text-white">
            Today Orders
          </div>
          <div className="text-xs text-white/90 font-medium relative z-10">
            Live Updates
          </div>
        </div>

      </div>
    </>
  );
}