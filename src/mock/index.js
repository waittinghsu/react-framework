export default [
	{
		url: '/api/v1/demo/menu',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: [
					{ id: 1, name: 'Menu 1' },
					{ id: 2, name: 'Menu 2' }
				],
			};
		},
	},
	{
		url: '/api/v1/demo/menu',
		method: 'post',
		response: ({ body }) => {
			const newItem = {
				id: Date.now(),
				...body,
			};
			return {
				code: 0,
				data: newItem,
			};
		},
	},
	{
		url: '/api/v1/demo/menu/:id',
		method: 'put',
		response: ({ body, query }) => {
			const updatedItem = {
				id: query.id,
				...body,
			};
			return {
				code: 0,
				data: updatedItem,
			};
		},
	},
	{
		url: '/api/v1/demo/menu/:id',
		method: 'delete',
		response: ({ query }) => {
			return {
				code: 0,
				data: { id: query.id },
			};
		},
	},
];
