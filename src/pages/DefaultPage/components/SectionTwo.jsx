import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
// import PropTypes from 'prop-types';
import {
  fetchMenuData,
  addItem,
  removeItem,
  updateItem,
} from '@/store/slices/menuSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SectionOne = () => {
  const dispatch = useDispatch();
  const { data: menuData, status, error } = useSelector((state) => state.menu);
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

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

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

  return (
    <div className="mt-36 mx-40 w-fill-available">
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
  );
};
SectionOne.propTypes = {
  // children: PropTypes.node,
};
export default SectionOne;
