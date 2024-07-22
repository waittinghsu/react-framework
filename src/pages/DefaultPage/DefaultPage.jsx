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
import swimming from '@/assets/DefaultPage/sport/swimming.jpeg';
import housingDes from '@/assets/DefaultPage/housing/housing-desktop.webp';
const sportImages = import.meta.glob('@/assets/DefaultPage/sport/*.jpeg');
const housingImages = import.meta.glob('@/assets/DefaultPage/housing/*.webp');
const carImages = import.meta.glob('@/assets/DefaultPage/car/*.avif');

const DefaultPage = () => {
  const [balls, setBalls] = useState([]);
  const [imageSrcObj, setImageSrcObj] = useState({
    sport: {},
    housing: {},
    car: {},
  });
  const yellowBox = useRef(null);
  const dispatch = useDispatch();
  const { data: menuData, status, error } = useSelector((state) => state.menu);
  const {
    data: { token },
  } = useSelector((state) => state.auth);
  const getImagePath = (category, imageName) => {
    return `/src/assets/DefaultPage/${category}/${imageName}`;
  };

  // 通用函数：加载图片路径并返回对象
  const loadImages = async (imageFiles) => {
    const entries = await Promise.all(
      Object.keys(imageFiles).map(async (path) => {
        const [fileName] = path.split('/').pop().split('.'); // 获取无扩展名的文件名
        const imgModule = await imageFiles[path]();
        return [fileName, imgModule.default];
      })
    );
    return Object.fromEntries(entries);
  };

  useEffect(() => {
    const loadAllImage = async () => {
      const sportImagesObj = await loadImages(sportImages);
      const housingImagesObj = await loadImages(housingImages);
      const carImagesObj = await loadImages(carImages);
      // 获取并存储住房类图片
      setImageSrcObj({
        sport: sportImagesObj,
        housing: housingImagesObj,
        car: carImagesObj,
      });
    };
    loadAllImage().then();
  }, []);

  useEffect(() => {}, [imageSrcObj]);

  useEffect(() => {
    dispatch(fetchMenuData());
    dispatch(fetchAuthData());
  }, [dispatch]);

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
                src={imageSrcObj.sport['swimming']}
                alt="Beautiful scenery"
                className="inset-0 w-full h-full object-cover"
              />
            </picture>
          </div>
          <div className="absolute inset-0 flex flex-col items-center">
            <div className="text-white text-4xl font-bold mt-48">
              <div className="uppercase">泳渡人生 Swimming Life</div>
            </div>
            <div className="text-center my-4">
              <button
                className="mx-4 w-24 h-8 text-white bg-blue-600 rounded-full"
                onClick={handleMakeBalls}
              >
                Make Ball
              </button>
              <button
                className="w-24 h-8 text-white bg-red-600 rounded-full"
                onClick={handleClearBalls}
              >
                Kill Ball
              </button>
            </div>
            <div className="yellow-box relative w-full py-10">
              <div className="w-50vw mx-auto">
                {balls.map((_, index) => (
                  <RollingBall key={index} containerRef={yellowBox} />
                ))}
                <div ref={yellowBox} className="flex flex-wrap">
                  {Array(9)
                    .fill(null)
                    .map((_, index) => (
                      <div key={index} className="w-[33.33%]">
                        <div
                          className={`relative bg-amber-${index + 1}00 pb-[100%]`}
                        >
                          <div
                            className={`absolute flex items-center justify-center inset-0 ${index === 4 ? 'animate-blink' : ''}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="block-layout h-screen">
        <section className="one-page relative h-full w-full">
          <div className="full-image absolute inset-0 h-screen">
            <picture className="">
              <source
                srcSet={imageSrcObj.housing['housing-mobile']}
                media="(max-width: 599px)"
              />
              <source
                srcSet={imageSrcObj.housing['housing-desktop']}
                media="(min-width: 600px)"
              />
              <source
                srcSet={imageSrcObj.housing['housing-mobile-l']}
                media="(min-width: 600px) and (orientation:portrait)"
              />
              <img
                src={imageSrcObj.housing['housing-desktop']}
                srcSet={imageSrcObj.housing['housing-desktop']}
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
                srcSet={imageSrcObj.car['Cybertruck-Mobile']}
                media="(max-width: 599px) and (orientation: portrait)"
              />
              <source
                srcSet={imageSrcObj.car['Cybertruck-Mobile-Landscape']}
                media="(max-height: 599px) and (orientation: landscape)"
              />
              <source
                srcSet={imageSrcObj.car['Cybertruck-Desktop-Tablet']}
                media="(min-width: 600px) and (orientation: portrait)"
              />
              <source
                srcSet={imageSrcObj.car['Cybertruck-Desktop']}
                media="(min-width: 900px) and (orientation: landscape)"
              />
              <img
                src={imageSrcObj.car['Cybertruck-Desktop']}
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
            <div className="flex flex-wrap w-50vw">
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
          </div>
        </section>
      </div>

      <h2 className="text-2xl font-bold mb-4">Default Page {token}</h2>
    </div>
  );
};

export default DefaultPage;
