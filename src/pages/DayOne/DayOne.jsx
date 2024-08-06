import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
const DayOne = () => {
  const [message, setMessage] = useState([]);
  const [step, setStep] = useState(0);
  const [pillar, setPillar] = useState({
    A: {
      spaces: [3, 2, 1],
    },
    B: {
      spaces: [],
    },
    C: {
      spaces: [],
    },
  });
  useEffect(() => {
    let moves = [];
    haNoiTower(3, 'A', 'C', 'B', moves);
    setMessage(moves);
  }, []);

  const disks = {
    1: (pillarName, index) => (
      <div
        key={`${pillarName}1`}
        className={`bg-indigo-700 h-4 w-33 absolute bottom-${index * 4} left-1/2 transform translate-x-[-50%]`}
      ></div>
    ),
    2: (pillarName, index) => (
      <div
        key={`${pillarName}2`}
        className={`bg-indigo-800 h-4 w-50 absolute bottom-${index * 4} left-1/2 transform translate-x-[-50%]`}
      ></div>
    ),
    3: (pillarName, index) => (
      <div
        key={`${pillarName}3`}
        className={`bg-indigo-950 h-4 w-[80%] absolute bottom-${index * 4} left-1/2 transform translate-x-[-50%]`}
      ></div>
    ),
  };

  const renderRecord = () => {
    return message.map(([from, to], index) => (
      <li key={index} className="p-4">
        {`${from} to ${to}`}
      </li>
    ));
  };

  const handleMove = () => {
    if (step < message.length) {
      const [from, to] = message[step];
      const moveSpaces = [...pillar[from].spaces];
      const moveDisk = moveSpaces.pop();
      console.log(`step ${step}`);
      console.log({ [from]: moveSpaces });
      console.log({ [to]: [...pillar[to].spaces, moveDisk] });
      setPillar((prevPillar) => ({
        ...prevPillar,
        [from]: { ...pillar[from], spaces: moveSpaces },
        [to]: { ...pillar[to], spaces: [...pillar[to].spaces, moveDisk] },
      }));
      setStep((prevStep) => prevStep + 1);
    } else {
      setStep(0);
      setPillar(
        JSON.parse(
          '{"A":{"spaces":[3,2,1]},"B":{"spaces":[]},"C":{"spaces":[]}}'
        )
      );
    }
    // setMessage((prevMessage) => [...prevMessage, 1234]);
    // console.log(message);
  };

  return (
    <div className="">
      <section className="relative h-screen">
        <div className="absolute h-screen w-full">
          <div className=" mx-40 mt-36">
            <span className="mx-2">step: {step}</span>
            <Button className="my-2" onClick={handleMove}>
              Move
            </Button>
            <div className="flex flex-row">
              <div className="w-50 bg-amber-200">
                <ul>{renderRecord()}</ul>
              </div>
              <div className="w-50 flex flex-wrap" style={{ height: '300px' }}>
                <div className="bg-gray-400 w-33 h-full text-center relative">
                  <div className="bg-gray-700 h-14 w-full absolute pt-4">A</div>
                  <div className="bg-gray-700 h-full w-4 mx-auto"></div>
                  {pillar.A.spaces.map((num, index) => disks[num]('A', index))}
                </div>
                <div className="bg-gray-500 w-33 h-full text-center relative">
                  <div className="bg-gray-600 h-14 w-full absolute pt-4">C</div>
                  <div className="bg-gray-600 h-full w-4 mx-auto"></div>
                  {pillar.C.spaces.map((num, index) => disks[num]('C', index))}
                </div>
                <div className="bg-gray-400 w-33 h-full text-center relative">
                  <div className="bg-gray-700 h-14 w-full absolute pt-4">B</div>
                  <div className="bg-gray-700 h-full w-4 mx-auto"></div>
                  {pillar.B.spaces.map((num, index) => disks[num]('B', index))}
                </div>
              </div>
            </div>
            <pre>{JSON.stringify(pillar, undefined, 4)}</pre>
          </div>
        </div>
      </section>
    </div>
  );
};

const haNoiTower = (n, source, support, target, moves) => {
  //
  if (n === 1) {
    moves.push([source, target]);
    return;
  }
  // 遞歸地將 n-1 個盤子從 source 移動到 support
  haNoiTower(n - 1, source, target, support, moves);
  // 將第 n 個盤子從 source 移動到 target
  moves.push([source, target]);
  // 遞歸地將 n-1 個盤子從 support 移動到 target
  haNoiTower(n - 1, support, source, target, moves);
};

export default DayOne;
