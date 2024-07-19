import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addItem, removeItem, updateItem } from '@/store/slices/defaultSlice';
import { Button, Table } from 'antd';

const DefaultPage = () => {
	const dispatch = useDispatch();
	const { data, status, error } = useSelector((state) => state.default);

	useEffect(() => {
		dispatch(fetchData());
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
						<Button onClick={() => handleRemove(record.id)}>Delete</Button>
						<Button onClick={() => handleUpdate(record)}>Update</Button>
					</>
			),
		},
	];

	const handleAdd = () => {
		const newItem = { id: Date.now(), name: `Menu ${data.length + 1}` };
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
			<div className="p-4">
				<h2 className="text-2xl font-bold mb-4">Default Page</h2>
				<Button type="primary" className="mb-4" onClick={handleAdd}>
					Add Item
				</Button>
				{status === 'loading' && <p>Loading...</p>}
				{status === 'succeeded' && <Table columns={columns} dataSource={data} rowKey="id" />}
				{status === 'failed' && <p>{error}</p>}
			</div>
	);
};

export default DefaultPage;
