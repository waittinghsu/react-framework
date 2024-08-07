import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
const MIN_DISK = 3;
const MAX_DISK = 6;

const DayOne = () => {
  const [message, setMessage] = useState([]);
  const [diskNum, setDiskNum] = useState(3);
  const [diskList, setDiskList] = useState({});
  const [step, setStep] = useState(0);
  const [pillar, setPillar] = useState(
    JSON.parse(`{"A":{"spaces":[3,2,1]},"B":{"spaces":[]},"C":{"spaces":[]}}`)
  );

  useEffect(() => {
    let moves = [];
    haNoiTower(diskNum, 'A', 'C', 'B', moves);
    setMessage(moves);
    setPillar(defaultPillarCalculator(diskNum));
    setDiskList(
      Array(diskNum)
        .fill(0)
        .reduce((acc, value, index) => {
          // console.log(index);
          const key = index + 1;
          const color = 900 - key * 100;
          const width = Math.round(key * (90 / diskNum));
          return {
            ...acc,
            [key]: (pillarName, spaceIndex) => (
              <div
                key={`${pillarName}_${key}`}
                className={`bg-indigo-${color} h-4 w-[${width}%] absolute bottom-${spaceIndex * 4} left-1/2 transform translate-x-[-50%]`}
                style={{
                  bottom: `${spaceIndex * 0.25 * 4}rem`,
                  width: `${width}%`,
                }}
              ></div>
            ),
          };
        }, {})
    );
  }, [diskNum]);

  const defaultPillarCalculator = (num) => {
    const spaces = `${Array(num)
      .fill('')
      .map((_, index) => num - index)}`;
    return JSON.parse(
      `{"A":{"spaces":[${spaces}]},"B":{"spaces":[]},"C":{"spaces":[]}}`
    );
  };

  // const disks = {
  //   1: (pillarName, spaceIndex) => (
  //     <div
  //       key={`${pillarName}1`}
  //       className={`bg-indigo-700 h-4 w-[33%] absolute bottom-${spaceIndex * 4} left-1/2 transform translate-x-[-50%]`}
  //     ></div>
  //   ),
  //   2: (pillarName, spaceIndex) => (
  //     <div
  //       key={`${pillarName}2`}
  //       className={`bg-indigo-800 h-4 w-[44%] absolute bottom-${spaceIndex * 4} left-1/2 transform translate-x-[-50%]`}
  //     ></div>
  //   ),
  //   3: (pillarName, spaceIndex) => (
  //     <div
  //       key={`${pillarName}3`}
  //       className={`bg-indigo-900 h-4 w-[66%] absolute bottom-${spaceIndex * 4} left-1/2 transform translate-x-[-50%]`}
  //     ></div>
  //   ),
  // };

  const renderRecord = () => {
    return message.map(([from, to], index) => (
      <li key={index} className={`p-4 ${index === step ? 'bg-amber-300' : ''}`}>
        {`${from} to ${to}`}
      </li>
    ));
  };

  const handleDiskNumChange = (dom) => {
    setDiskNum(parseInt(dom.target.value));
  };

  const handleMove = () => {
    if (step < message.length) {
      const [from, to] = message[step];
      const moveSpaces = [...pillar[from].spaces];
      const moveDisk = moveSpaces.pop();
      // console.log(`step ${step}`);
      // console.log({ [from]: moveSpaces });
      // console.log({ [to]: [...pillar[to].spaces, moveDisk] });
      setPillar((prevPillar) => ({
        ...prevPillar,
        [from]: { ...pillar[from], spaces: moveSpaces },
        [to]: { ...pillar[to], spaces: [...pillar[to].spaces, moveDisk] },
      }));
      setStep((prevStep) => prevStep + 1);
    } else {
      setStep(0);
      setPillar(defaultPillarCalculator(diskNum));
    }
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
            <Input
              className={`w-20 mx-4`}
              value={diskNum}
              type="number"
              min={MIN_DISK}
              max={MAX_DISK}
              onChange={handleDiskNumChange}
            ></Input>
            <div className="flex flex-row">
              <div
                className="w-50 bg-amber-200 overflow-y-scroll"
                style={{ height: '300px' }}
              >
                <ul>{renderRecord()}</ul>
              </div>
              <div className="w-50 flex flex-wrap" style={{ height: '300px' }}>
                <div className="bg-gray-400 w-33 h-full text-center relative">
                  <div className="bg-gray-700 h-14 w-full absolute pt-4">A</div>
                  <div className="bg-gray-700 h-full w-4 mx-auto"></div>
                  {pillar.A.spaces.map((num, index) =>
                    diskList[num] ? diskList[num]('A', index) : ''
                  )}
                </div>
                <div className="bg-gray-500 w-33 h-full text-center relative">
                  <div className="bg-gray-600 h-14 w-full absolute pt-4">C</div>
                  <div className="bg-gray-600 h-full w-4 mx-auto"></div>
                  {pillar.C.spaces.map((num, index) =>
                    diskList[num] ? diskList[num]('C', index) : ''
                  )}
                </div>
                <div className="bg-gray-400 w-33 h-full text-center relative">
                  <div className="bg-gray-700 h-14 w-full absolute pt-4">B</div>
                  <div className="bg-gray-700 h-full w-4 mx-auto"></div>
                  {pillar.B.spaces.map((num, index) =>
                    diskList[num] ? diskList[num]('B', index) : ''
                  )}
                </div>
              </div>
            </div>
            <pre className={`bg-indigo-500`}>
              {JSON.stringify(pillar, undefined, 4)}
            </pre>
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
