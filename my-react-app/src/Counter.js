import React, { useState } from 'react';

function Counter() {
  // กำหนด state 'count' เริ่มต้นที่ 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      {/* ปุ่มเพิ่มค่า count */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
