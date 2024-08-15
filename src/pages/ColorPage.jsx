import { useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react';


const ColorPage = () => {
  const [count, setCount] = useState(0);

  useInsertionEffect(() => {
    console.log('useInsertionEffect: 副作用執行', count);

    return () => {
      console.log('useInsertionEffect: 清理函數執行', count);
    };
  }, [count]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect: 副作用執行', count);

    return () => {
      console.log('useLayoutEffect: 清理函數執行', count);
    };
  }, [count]);

  useEffect(() => {
    console.log('useEffect: 副作用執行', count);

    return () => {
      console.log('useEffect: 清理函數執行', count);
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default ColorPage;
