import React, { useEffect, useState } from 'react';
import './SectionFour.scss';
// import PropTypes from 'prop-types';

const SectionFour = () => {
  const [choices, setChoices] = useState({
    status: [],
  });
  const [formValues, setFormValues] = useState({
    productName: '',
    status: 'disable',
    comment: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    productName: '',
    status: '',
    comment: '',
    email: '',
  });

  const rules = {
    productName: {
      name: '產品名稱',
      ruleList: [
        { isRequired: true, message: '請填寫產品名稱' },
        {
          validator: (rule, value, callback) => {
            const pattern = /^[A-Za-z]+-\d+$/; // 正則表達式確保格式為（產品名-產品數量）
            if (!pattern.test(value)) {
              callback(new Error(rule.message)); // 驗證失敗，觸發錯誤回調
            } else {
              callback(); // 驗證成功，無錯誤
            }
          },
          message: '格式錯誤必須遵照此格式 （產品名-產品數量）',
        },
      ],
    },
    status: {
      name: '狀態',
      ruleList: [],
    },
    comment: {
      name: '備註',
      ruleList: [{ isRequired: true, message: '請填寫備註' }],
    },
    email: {
      name: '電子信箱',
      ruleList: [
        { isRequired: true, message: '請填寫備註' },
        {
          validator: (rule, value, callback) => {
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailReg.test(value)) {
              callback();
            } else {
              callback(new Error('你格式別亂打啊！'));
            }
          },
          message: '格式錯誤',
        },
      ],
    },
  };

  const renderLabel = (key) => {
    return (
      rules[key] && (
        <label className="text-xl dark:text-white inline-block mt-4">
          {rules[key].name}
        </label>
      )
    );
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  const renderErrorMessage = (key) => {
    return errors[key] && <p className="text-red-600">{errors[key]}</p>;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = () => {
    // setErrors({ ...errors, productName: 'test' });
    validate().then((valid) => {
      if (valid) {
        console.log('post api');
      }
    });
  };

  const validate = () => {
    const newErrors = { ...errors };
    // const callback = (key) => (error) => {
    //   const isError = ['[object Error]', '[object String]'].includes(
    //     Object.prototype.toString.call(error)
    //   );
    //   if (isError) {
    //     newErrors[key] = error.message;
    //     setErrors({ ...newErrors });
    //   }
    // };
    function callback(key, error) {
      const isError = ['[object Error]', '[object String]'].includes(
        Object.prototype.toString.call(error)
      );
      if (isError) {
        newErrors[key] = error.message || '驗證失敗';
      }
    }
    Object.keys(rules).forEach((key) => {
      if (rules[key].ruleList.length > 0) {
        for (let i = 0; i < rules[key].ruleList.length; i++) {
          const rule = rules[key].ruleList[i];
          if (rule.isRequired && formValues[key] === '') {
            newErrors[key] = rule.message;
            break; // Early exit from the loop
          }
          if (rule.validator) {
            rule.validator(rule, formValues[key], callback.bind(null, key));
            break; // Early exit from the loop
          }
        }
      }
    });
    // 最後統一更新錯誤狀態
    setErrors(newErrors); // 確保狀態是最新的
    return new Promise((resolve) => {
      resolve(Object.values(newErrors).filter(Boolean).length === 0, {});
    });
  };

  useEffect(() => {
    setChoices({
      ...choices,
      status: [
        { id: 'enable', name: '啟用' },
        { id: 'disable', name: '未啟用' },
      ],
    });
  }, []);

  return (
    <div className="form-info flex flex-col items-center bg-gray-700 mt-20 rounded-lg dark">
      <div className="text-4xl font-bold my-8">
        <label
          className="section-four-title text-white"
          htmlFor="Form Validate"
        >
          Form Validate
        </label>
      </div>
      <div className="flex flex-col justify-center items-center w-full rounded-lg px-4">
        <div className="w-full p-4 bg-gray-600">
          {renderLabel('productName')}
          <input
            name="productName"
            type="text"
            value={formValues.productName}
            className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            onChange={handleChange}
          />
          {errors.productName && (
            <p className="text-red-600">{errors.productName}</p>
          )}
          {renderLabel('status')}
          <select
            name="status"
            value={formValues.status}
            className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            onChange={handleChange}
          >
            {renderOptions(choices.status)}
          </select>
          {renderErrorMessage('status')}
          {renderLabel('comment')}
          <textarea
            name="comment"
            rows="4"
            value={formValues.comment}
            className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            onChange={handleChange}
          />
          {renderErrorMessage('comment')}
          {renderLabel('email')}
          <input
            name="email"
            type="text"
            value={formValues.email}
            className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
      </div>
      <div className="flex justify-end mx-16 opacity-100 my-4">
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded transition-slow hover:bg-blue-300 hover-transition-fast"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
SectionFour.propTypes = {
  // children: PropTypes.node,
};
export default SectionFour;
