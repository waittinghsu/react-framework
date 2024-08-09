import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col } from 'antd';

interface BlockItem {
  id: string;
  title: string;
  value: string;
}

const IconPage: React.FC = () => {
  const blockList: BlockItem[] = [
    { title: 'FMP首屏耗时(中位值)', id: uuidv4(), value: '200ms' },
    { title: 'FMP数量', id: uuidv4(), value: '300' },
    { title: 'LCP最大耗时(中位值)', id: uuidv4(), value: '500ms' },
    { title: 'LCP数量', id: uuidv4(), value: '150' },
    { title: 'FMP、LCP耗时平均', id: uuidv4(), value: '350ms' },
    { title: 'FMP、LCP数量平均', id: uuidv4(), value: '225' },
    { title: 'HTML下载', id: uuidv4(), value: '100ms' },
    { title: '页面渲染', id: uuidv4(), value: '800ms' },
    { title: '页面加载', id: uuidv4(), value: '2s' },
    { title: '总样本数 (PV)', id: uuidv4(), value: '2000' },
    { title: '总访客数 (UV)', id: uuidv4(), value: '1800' },
    { title: 'IP 地址', id: uuidv4(), value: '192.168.0.1' }
  ];

  return (
    <div className="bg-blue-200 h-full w-full p-4">
      <Row>
        <Col xs={24} sm={12}>
          <Row>
            {blockList.map(block => (
              <Col key={block.id} className="mb-2" xs={12} sm={8}>
                <div className="mx-2 rounded-lg bg-gradient-to-br from-indigo-600 via-indigo-800 to-indigo-950 p-4">
                  <label className="text-white font-medium text-center w-full inline-block">{block.title}</label>
                  <p className="text-white text-center text-lg font-semibold">{block.value}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} sm={12}>

        </Col>
      </Row>
    </div>
  );
};

export default IconPage;
