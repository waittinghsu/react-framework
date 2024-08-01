import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
const DayOne = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    setMessage((prevMessage) => [...prevMessage, 1234]);
  }, []);
  const renderRecord = () => {
    return message.map((txt, index) => (
      <li key={index} className="p-4">
        txt
      </li>
    ));
  };
  const handleMove = () => {
    setMessage((prevMessage) => [...prevMessage, 1234]);
    console.log(message);
  };
  return (
    <div className="">
      <section className="relative h-screen">
        <div className="absolute h-screen w-full">
          <div className=" mx-40 mt-36">
            <Button className="my-2" onClick={handleMove}>
              Move
            </Button>
            <div className="flex flex-row">
              <div className="w-50 bg-amber-200">
                <ul>{renderRecord()}</ul>
              </div>
              <div className="w-50 bg-gray-600">1</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DayOne;
