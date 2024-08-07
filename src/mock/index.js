export default [
  {
    url: '/react-framework/api/v1/auth',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          token: 'Xytgo56o@Tgghw',
        },
      };
    },
    timeout: 3000, // 特定请求的延迟（毫秒）
  },
  {
    url: '/react-framework/api/v1/userInfo',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          role: 'admin',
        },
      };
    },
  },
  {
    url: '/react-framework/api/v1/demo/menu',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [
          { id: 1, name: 'Menu 1' },
          { id: 2, name: 'Menu 2' },
          { id: 3, name: 'Menu 3' },
        ],
      };
    },
    timeout: 3000, // 特定请求的延迟（毫秒）
  },
  {
    url: '/react-framework/api/v1/demo/menu',
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
    url: '/react-framework/api/v1/demo/menu/:id',
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
    url: '/react-framework/api/v1/demo/menu/:id',
    method: 'delete',
    response: ({ query }) => {
      return {
        code: 0,
        data: { id: query.id },
      };
    },
  },
];
