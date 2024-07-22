/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  purge: {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // 确保此路径匹配你的代码文件
    ],
    safelist: [
      ...Array.from({ length: 10 }, (_, i) => `bg-amber-${i + 1}00`),
      // 扩展其他可能的颜色
    ],
  },
  theme: {
    extend: {
      width: {
        '300px': '300px',
        '25vw': '25vw',
        '50vw': '50vw',
        '75vw': '75vw',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
