import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RollingBall from './components/RollingBall';
import {
  fetchMenuData,
  addItem,
  removeItem,
  updateItem,
} from '@/store/slices/menuSlice.js';
import { fetchAuthData } from '@/store/slices/authSlice.js';
import { Button, Table } from 'antd';
import { gsap } from 'gsap';
import './DefaultPage.scss';

const DefaultPage = () => {
  const [balls, setBalls] = useState([]);
  const yellowBox = useRef(null);
  const [yellowBoxWidth, setYellowBoxWidth] = useState(0);
  const [yellowBoxHeight, setYellowBoxHeight] = useState(0);

  const dispatch = useDispatch();
  const { data: menuData, status, error } = useSelector((state) => state.menu);
  const {
    data: { token },
  } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchMenuData());
    dispatch(fetchAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (yellowBox.current) {
      setYellowBoxWidth(yellowBox.current.offsetWidth);
      setYellowBoxHeight(yellowBox.current.offsetHeight);
    }
  }, [balls]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            className="custom-red-button"
            onClick={() => handleRemove(record.id)}
          >
            Delete
          </Button>
          <Button
            className="custom-green-button mx-2"
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
        </>
      ),
    },
  ];

  const handleAdd = () => {
    const newItem = { id: Date.now(), name: `Menu ${menuData.length + 1}` };
    dispatch(addItem(newItem));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdate = (item) => {
    const updatedItem = { ...item, name: `${item.name} (Updated)` };
    dispatch(updateItem(updatedItem));
  };

  const handleSignUp = () => {
    dispatch(fetchAuthData());
  };
  const handleMakeBalls = () => {
    setBalls((prevBalls) => [...prevBalls, prevBalls.length + 1]);
  };
  const handleClearBalls = () => {
    setBalls([]);
  };

  return (
    <div className="default-page">
      <div className="block-layout h-screen">
        <section className="one-page relative">
          <div className="absolute inset-0 h-screen">
            <picture className="">
              <img
                src="https://images.pexels.com/photos/1249545/pexels-photo-1249545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Beautiful scenery"
                className="inset-0 w-full h-full object-cover"
              />
            </picture>
          </div>
          <div className="absolute inset-0 flex  justify-center">
            <div className="text-white text-4xl font-bold mt-48">
              <div className="uppercase">泳渡人生 Swimming Life</div>
            </div>
          </div>
        </section>
      </div>
      <div className="block-layout h-screen">
        <section className="one-page relative h-full w-full">
          <div className="full-image absolute inset-0 h-screen">
            <picture className="">
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-SolarPanels-01-Mobile.jpg"
                media="(max-width: 599px)"
              />
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-SolarPanels-01-Desktop"
                media="(min-width: 600px)"
              />
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-SolarPanels-01-Mobile.jpg"
                media="(min-width: 600px) and (orientation:portrait)"
              />
              <img
                src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-SolarPanels-01-Desktop"
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-SolarPanels-01-Desktop"
                alt="Ranch style home powered by Tesla solar panels and Powerwall"
                className="inset-0 w-full h-full object-cover"
              />
            </picture>
          </div>
          <div className="cover-info absolute inset-0 flex flex-col">
            <div className="text-white font-bold mt-48">
              <div className="text-center">
                <span className="text-8xl">AIR BNB</span>
              </div>
            </div>
            <div className="mt-36 mx-40">
              <Button type="primary" className="mb-4" onClick={handleAdd}>
                Add Item
              </Button>
              {status === 'loading' && <p>Loading...</p>}
              {status === 'succeeded' && (
                <Table
                  className="w-full"
                  columns={columns}
                  dataSource={menuData}
                  rowKey="id"
                />
              )}
              {status === 'failed' && <p>{error}</p>}
            </div>
          </div>
        </section>
      </div>
      <div className="block-layout h-screen">
        <section className="one-page relative h-full w-full">
          <div className="full-image absolute inset-0 h-screen">
            <picture className="tcl-react-image tcl-react-media dx-hero-media">
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Hedgehog-Mobile.jpg"
                media="(max-width: 599px) and (orientation: portrait)"
              />
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Hedgehog-Mobile-Landscape.jpg"
                media="(max-height: 599px) and (orientation: landscape)"
              />
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Hedgehog-Tablet.jpg"
                media="(min-width: 600px) and (orientation: portrait)"
              />
              <source
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Hedgehog-Desktop.png"
                media="(min-width: 900px) and (orientation: landscape)"
              />
              <img
                src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Hedgehog-Desktop.png"
                className="inset-0 w-full h-full object-cover"
                alt="Cybertruck"
              />
            </picture>
          </div>
          <div className="cover-info absolute inset-0 flex flex-col items-center">
            <div className="text-white text-4xl font-bold mt-48">
              <label htmlFor="Cybertruck">Cybertruck</label>
            </div>
            <div className="text-center">
              <button
                className="my-4 w-24 h-12 text-white bg-blue-600 rounded-full"
                onClick={handleSignUp}
              >
                Sign In
              </button>
            </div>
            <div className="flex flex-wrap w-full p-24">
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="w-[33.33%]">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-500">
                      <span>2</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="text-center">
              <button
                className="my-4 w-24 h-12 text-white bg-blue-600 rounded-full"
                onClick={handleMakeBalls}
              >
                Make Ball
              </button>
              <button
                className="my-4 w-24 h-12 text-white bg-blue-600 rounded-full"
                onClick={handleClearBalls}
              >
                Kill Ball
              </button>
            </div>
            <div className="yellow-box relative w-full px-72 py-24 bg-yellow-100">
              {balls.map((_, index) => (
                <RollingBall
                  key={index}
                  containerWidth={yellowBoxWidth}
                  containerHeight={yellowBoxHeight}
                />
              ))}
              <div ref={yellowBox} className="flex flex-wrap w-full">
                {Array(9)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="w-[33.33%]">
                      <div className="relative bg-amber-200 pb-[100%]">
                        <div
                          className={`absolute flex items-center justify-center inset-0 ${index === 4 ? 'animate-blink' : ''}`}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <h2 className="text-2xl font-bold mb-4">Default Page {token}</h2>
    </div>
  );
};

export default DefaultPage;
