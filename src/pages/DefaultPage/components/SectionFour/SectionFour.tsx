import React, { useEffect, useState, ChangeEvent } from 'react';
import './SectionFour.scss';

type BaseChoiceItem = {
  id: number | string,
  name: string
}

type ConnectChoiceItem = BaseChoiceItem & {
  parent: number,
}

type Choices = {
  category: ConnectChoiceItem[]
  [key: string]: BaseChoiceItem[] | ConnectChoiceItem[]
}

interface Form {
  productName: string;
  category: number | null,
  product: number | null,
  status: string;
  count: number,
  comment: string;
  email: string;
}

interface ErrorMessage {
  // productName: string;
  // category: string,
  // product: string,
  // status: string;
  // count: string,
  // comment: string;
  // email: string;
  [key: string]: string
}

interface RuleItem<T = string | number> {
  isRequired?: boolean;
  validator?: (rule: RuleItem<T>, value: T, callback: (error?: Error) => void)
    => void;
  message: string;
}

interface BaseRuleObject<T = string | number> {
  name: string;
  ruleList: RuleItem<T>[];
}

interface Rules {
  productName: BaseRuleObject<string>;
  status: BaseRuleObject<string>;
  count: BaseRuleObject<number>;
  comment: BaseRuleObject<string>;
  email: BaseRuleObject<string>;
}

const fetchData = (): Promise<Choices> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Choices = {
        category: [
          { id: 1, name: 'SA', parent: 1 },
          { id: 2, name: 'DT', parent: 1 },
          { id: 3, name: 'UAT', parent: 2 },
          { id: 4, name: 'IN_TEACH', parent: 2 },
          { id: 5, name: 'PG', parent: 2 },
          { id: 6, name: 'AG', parent: 3 },
          { id: 7, name: 'AE', parent: 3 },
          { id: 8, name: 'TG', parent: 4 },
        ],
        product: [
          { id: 1, name: 'A01' },
          { id: 2, name: 'A02' },
          { id: 3, name: 'A02' },
          { id: 4, name: 'A02' },
        ],
      };
      resolve(data);
    }, 3000);
  });
};

const SectionFour:React.FC = () => {
  const [choices, setChoices] = useState<Choices>({
    product:[],
    category:[],
    status: [],
  });

  const [formValues, setFormValues] = useState<Form>({
    productName: '',
    category: null,
    product: null,
    status: 'disable',
    count: 0,
    comment: '',
    email: '',
  });

  const [errors, setErrors] = useState<ErrorMessage>({
    productName: '',
    category: '',
    product: '',
    status: '',
    count: '',
    comment: '',
    email: '',
  });

  const rules: Rules = {
    productName: {
      name: '產品名稱',
      ruleList: [
        { isRequired: true, message: '請填寫產品名稱' },
        {
          validator: (rule: RuleItem<string>, value: string, callback: (error?: Error) => void) => {
            const pattern = /^[A-Za-z]+-\d+$/; // 正則表達式確保格式為（產品名-產品數量）
            if (!pattern.test(value)) {
              callback(new Error(rule.message)); // 驗證失敗，觸發錯誤回調
            } else {
              callback(); // 驗證成功，無錯誤
            }
          },
          message: '格式錯誤必須遵照此格式 （產品名-產品數量）',
        },
        {
          validator: (rule: RuleItem<string>, value: string, callback: (error?: Error) => void) => {
            if (!(value.length > 10)) {
              callback(new Error(rule.message)); // 驗證失敗，觸發錯誤回調
            } else {
              callback(); // 驗證成功，無錯誤
            }
          },
          message: '名稱不可太長(最長10個字)',
        },
      ],
    },
    status: {
      name: '狀態',
      ruleList: [],
    },
    count: {
      name: '數量',
      ruleList: [
        { isRequired: true, message: '請填數量' },
        {
          validator: (rule: RuleItem<number>, value: number, callback: (error?: Error) => void) => {
            if (value < 0) {
              callback(new Error('不可小於零！'));
            } else if (value > 10) {
              callback(new Error('不可大於十！'));
            }else {
              callback();
            }
          },
          message: '數量超過範圍',
        },
      ]
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
          validator: (rule: RuleItem<string>, value: string, callback:  (error?: Error) => void) => {
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

  const renderLabel = (key: keyof Rules) => {
    return (
      rules[key] && (
        <label className="text-xl dark:text-white inline-block mt-4">
          {rules[key].name}
        </label>
      )
    );
  };

  const renderOptions = (options: BaseChoiceItem[] | ConnectChoiceItem[]) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  const renderErrorMessage = (key: keyof ErrorMessage) => {
    return errors[key] && <p className="text-red-600">{errors[key]}</p>;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const newErrors: ErrorMessage = { ...errors };
    // const callback = (key) => (error) => {
    //   const isError = ['[object Error]', '[object String]'].includes(
    //     Object.prototype.toString.call(error)
    //   );
    //   if (isError) {
    //     newErrors[key] = error.message;
    //     setErrors({ ...newErrors });
    //   }
    // };
    function callback(key: keyof Rules, error: Error) {
      const isError = ['[object Error]', '[object String]'].includes(
        Object.prototype.toString.call(error)
      );
      if (isError) {
        newErrors[key] = error.message || '驗證失敗';
      }
    }
    Object.keys(rules).forEach((key) => {
      const ruleObject = rules[key as keyof Rules];
      const formValue = formValues[key as keyof Rules];
      if (ruleObject.ruleList.length > 0) {
        for (let i = 0; i < ruleObject.ruleList.length; i++) {
          const rule = ruleObject.ruleList[i] as RuleItem;
          if (rule.isRequired && formValue === '') {
            newErrors[key] = rule.message;
            break; // Early exit from the loop
          }
          if (rule.validator) {
            const callbackFunc = (error?: Error) => callback(key as keyof Rules, error as Error);
            rule.validator(rule, formValue, callbackFunc);
            break; // 提前退出循環
          }
        }
      }
    });
    // 最後統一更新錯誤狀態
    setErrors(newErrors); // 確保狀態是最新的
    return new Promise((resolve) => {
      resolve(Object.values(newErrors).filter(Boolean).length === 0);
    });
  };

  useEffect(() => {
    fetchData().then(data => {
      setChoices({
       ...choices,
        category: data.category,
        product: data.product,
        status: [
          { id: 'enable', name: '啟用' },
          { id: 'disable', name: '未啟用' },
        ],
      });
    });
  }, []);

  return (
    <div className="form-info flex flex-col items-center bg-gray-700 mt-20 rounded-lg dark">
      <div className="text-4xl font-bold my-4">
        <label
          className="section-four-title text-white"
          htmlFor="Form Validate"
        >
          Form Validate
        </label>
      </div>
      <div className="w-full rounded-lg px-4">
        <div className="w-full p-4 bg-gray-600 rounded-lg">
          {renderLabel('productName')}
          <input
            name="productName"
            type="text"
            value={formValues.productName}
            className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            onChange={handleChange}
          />
          {renderErrorMessage('productName')}
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
            rows={4}
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
