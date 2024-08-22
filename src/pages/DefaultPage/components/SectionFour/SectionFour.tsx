import React, { useEffect, useState, useCallback, useMemo, ChangeEvent, ReactNode } from 'react';
import { Row, Col, InputNumber, InputNumberProps, Button, Spin } from 'antd';
import './SectionFour.scss';

type BaseChoiceItem = {
  id: number | string,
  name: string
}

type ConcatChoiceItem = BaseChoiceItem & {
  parent: number,
}

type Choices = {
  category: ConcatChoiceItem[]
  [key: string]: BaseChoiceItem[] | ConcatChoiceItem[]
}

interface Form {
  supplier: string;
  category: number | null,
  product: number | null,
  status: string;
  count: number,
  comment: string;
  email: string;
}

type NonNullProperties<T> = {
  [K in keyof T]: T[K] extends number | string ? T[K] : never;
}[keyof T];

interface ErrorMessage {
  // supplier: string;
  // category: string,
  // product: string,
  // status: string;
  // count: string,
  // comment: string;
  // email: string;
  [key: string]: string
}

interface RuleItem<T = string | number | null> {
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
  supplier: BaseRuleObject<string>;
  status: BaseRuleObject<string>;
  product: BaseRuleObject<number>;
  category: BaseRuleObject<number>;
  count: BaseRuleObject<number>;
  comment: BaseRuleObject<string>;
  email: BaseRuleObject<string>;
}

interface RenderFieldFactoryProps {
  children: ReactNode;
  fieldKey: keyof Rules;
  rules: Rules,
  errors: ErrorMessage
}

type ElInputNumberProps = InputNumberProps;

const RenderFieldFactory:React.FC<RenderFieldFactoryProps> = ({ children, fieldKey, rules, errors  }): ReactNode => {
  const renderLabel = (key: keyof Rules) => {
    return (
      rules[key] && (
        <label className="text-xl dark:text-white inline-block mt-4">
          {rules[key].name}
        </label>
      )
    );
  };
  const renderErrorMessage = (key: keyof ErrorMessage): ReactNode => {
    return errors[key] ? <p className="text-red-600">{errors[key]}</p> : null;
  };
  return (
    <>
      {renderLabel(fieldKey)}
      {children}
      {renderErrorMessage(fieldKey)}
    </>
  );
};

const ElInputNumber:React.FC<ElInputNumberProps> = (props) => {
  const { value, onChange } = props;
  const newValue = value ? parseInt(value.toString(), 10) : 1;
  const handleIncrease = () => {
    if(onChange){
      onChange(newValue + 1);
    }
  };
  const handleDecrease = () => {
    if(onChange){
      onChange(newValue - 1);
    }
  };
  return (
    <div className="flex items-center">
      <Button className="flex rounded-r-none h-[46px]" onClick={handleDecrease}>-</Button>
      <InputNumber
        rootClassName="omega"
        {...props}
      />
      <Button className="flex  rounded-l-none h-[46px]" onClick={handleIncrease}>+</Button>
    </div>
  );
};

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
          { id: 3, name: 'G05' },
          { id: 4, name: 'J9' },
        ],
      };
      resolve(data);
    }, 3000);
  });
};

const delayThreeSeconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

const rules: Rules = {
  supplier: {
    name: '供應商名稱',
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
  product: {
    name: '產品',
    ruleList: [],
  },
  category: {
    name: '類型',
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

const renderOptions = (options: BaseChoiceItem[] | ConcatChoiceItem[]): ReactNode => {
  return options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));
};

const SectionFour:React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [choices, setChoices] = useState<Choices>({
    product:[],
    category:[],
    status: [],
  });

  const [formValues, setFormValues] = useState<Form>({
    supplier: '',
    status: 'disable',
    product: null,
    category: null,
    count: 0,
    comment: '',
    email: '',
  });

  const [errors, setErrors] = useState<ErrorMessage>({
    supplier: '',
    category: '',
    product: '',
    status: '',
    count: '',
    comment: '',
    email: '',
  });

  const [categoryChoice, setCategoryChoice] = useState<ConcatChoiceItem[]>([]);

  const toggleLoading = useCallback(() => {
    setLoading((prevLoading) => !prevLoading);
  }, []);

  type HandleBaseChangeEvent = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type HandleValueChangeEvent = (value: number | null | string) => void;
  type HandleProductChangeEvent = (e: ChangeEvent<HTMLSelectElement>) => void;

  const handleTargetChange = useCallback<HandleBaseChangeEvent>((e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    setErrors((prevErrors)=>({ ...prevErrors, [name]: '' }));
  }, []);

  const valueOnChangeHandler = useCallback((name: string):HandleValueChangeEvent => (value) => {
    if (['number', 'string'].includes(typeof value ) || value === null) {
      // 處理 InputNumber 輸入
      setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
      setErrors((prevErrors)=>({ ...prevErrors, [name]: '' }));
    }
  }, []);

  const handleProductChange = useCallback<HandleProductChangeEvent>((e) => {
    handleTargetChange(e);
    setFormValues((prevFormValues) =>({ ...prevFormValues, category: null }));
    const { value } = e.target;
    if(value){
      console.log(value, choices.category.filter(item => item.parent === parseInt(value, 10)));
      setCategoryChoice(choices.category.filter(item => item.parent === parseInt(value, 10)));
    }

  }, [categoryChoice, choices]);

  const handleSubmit = () => {
    setFormValues({ ...formValues, product: 1 });
    setFormValues({ ...formValues, category: 2 });
    setFormValues((prevFormValues) =>({ ...prevFormValues, count: 4 }));

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

    validate().then((valid) => {
      if (valid) {
        console.log('post api');
        toggleLoading();
        delayThreeSeconds().finally(()=> {
          toggleLoading();
        });
      }
    });
  };

  useEffect(() => {
    toggleLoading();
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
    }).finally(()=>{
      toggleLoading();
    });
  }, []);

  const renderField = useCallback((
    span: number,
    fieldKey: keyof Rules,
    value: NonNullProperties<Form>,
    fieldType: 'input' | 'select' | 'textarea' | 'inputNumber',
    options: BaseChoiceItem[] | ConcatChoiceItem[] | undefined = undefined,
    onchange: HandleBaseChangeEvent | HandleValueChangeEvent | HandleProductChangeEvent = handleTargetChange,
  ) => {
    const memoizedOptions = useMemo(() => {
      return options ? renderOptions(options) : null;
    }, [options]);

    return (
      <Col span={span}>
        <RenderFieldFactory fieldKey={fieldKey} rules={rules} errors={errors}>
          {
            fieldType === 'input' && <input
              name={fieldKey}
              type="text"
              value={value}
              className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
              onChange={onchange as HandleBaseChangeEvent}
            />
          }
          {
            fieldType === 'select' && options && <select
              name={fieldKey}
              value={value}
              className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
              onChange={onchange as HandleProductChangeEvent}
            >
              <option key={`${fieldKey}_empty`} value={''}>請選擇</option>
              {memoizedOptions}
            </select>
          }
          {
            fieldType === 'inputNumber' && <ElInputNumber
              name={fieldKey}
              value={value}
              className="w-full bg-white p-2 rounded border border-gray-300 dark:bg-gray-900  dark:border-gray-700"
              onChange={valueOnChangeHandler(fieldKey)}
            />
          }
          {
            fieldType === 'textarea' && <textarea
              name={fieldKey}
              value={value}
              rows={4}
              className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"
              onChange={onchange as HandleBaseChangeEvent}
            />
          }
        </RenderFieldFactory>
      </Col>
    );
  }, [categoryChoice, errors]);

  return (
    <Spin spinning={loading} tip="加载中...">
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
            <Row gutter={[16, 16]}>
              { renderField(12, 'supplier', formValues.supplier, 'input') }
              { renderField(12, 'status', formValues.status, 'select', choices.status) }
              { renderField(12, 'product', formValues.product || '', 'select', choices.product, handleProductChange) }
              { renderField(12, 'category', formValues.category || '', 'select', categoryChoice) }
              { renderField(24, 'count', formValues.count, 'inputNumber') }
              { renderField(24, 'email', formValues.email, 'input') }
              { renderField(24, 'comment', formValues.comment, 'textarea') }
              {/*<Col span={12}>*/}
              {/*  <RenderFieldFactory fieldKey="supplier" rules={rules} errors={errors}>*/}
              {/*    <input*/}
              {/*      name="supplier"*/}
              {/*      type="text"*/}
              {/*      value={formValues.supplier}*/}
              {/*      className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"*/}
              {/*      onChange={handleTargetChange}*/}
              {/*    />*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
              {/*<Col span={12}>*/}
              {/*  <RenderFieldFactory fieldKey="status" rules={rules} errors={errors}>*/}
              {/*    <select*/}
              {/*      name="status"*/}
              {/*      value={formValues.status}*/}
              {/*      className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"*/}
              {/*      onChange={handleTargetChange}*/}
              {/*    >*/}
              {/*      {renderOptions(choices.status)}*/}
              {/*    </select>*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
              {/*<Col span={12}>*/}
              {/*  <RenderFieldFactory fieldKey="product" rules={rules} errors={errors}>*/}
              {/*    <select*/}
              {/*      name="product"*/}
              {/*      value={formValues.product || ''}*/}
              {/*      className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"*/}
              {/*      onChange={handleProductChange}*/}
              {/*    >*/}
              {/*      <option key="product_empty" value={''}>請選擇</option>*/}
              {/*      {renderOptions(choices.product)}*/}
              {/*    </select>*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
              {/*<Col span={12}>*/}
              {/*  <RenderFieldFactory fieldKey="category" rules={rules} errors={errors}>*/}
              {/*    <select*/}
              {/*      name="category"*/}
              {/*      value={formValues.category || ''}*/}
              {/*      className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"*/}
              {/*      onChange={handleTargetChange}*/}
              {/*    >*/}
              {/*      <option key="category_empty" value={''}>請選擇</option>*/}
              {/*      {renderOptions(categoryChoice)}*/}
              {/*    </select>*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
              {/*<Col span={24}>*/}
              {/*  <RenderFieldFactory fieldKey="count" rules={rules} errors={errors}>*/}
              {/*    <ElInputNumber*/}
              {/*      name="count"*/}
              {/*      value={formValues.count}*/}
              {/*      className="w-full bg-white p-2 rounded border border-gray-300 dark:bg-gray-900  dark:border-gray-700"*/}
              {/*      onChange={valueOnChangeHandler('count')}*/}
              {/*    />*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
              {/*<Col span={24}>*/}
              {/*  <RenderFieldFactory fieldKey="comment" rules={rules} errors={errors}>*/}
              {/*    <textarea*/}
              {/*      name="comment"*/}
              {/*      rows={4}*/}
              {/*      value={formValues.comment}*/}
              {/*      className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"*/}
              {/*      onChange={handleTargetChange}*/}
              {/*    />*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
              {/*<Col span={24}>*/}
              {/*  <RenderFieldFactory fieldKey="email" rules={rules} errors={errors}>*/}
              {/*    <input*/}
              {/*      name="email"*/}
              {/*      type="text"*/}
              {/*      value={formValues.email}*/}
              {/*      className="w-full bg-white text-black p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700"*/}
              {/*      onChange={handleTargetChange}*/}
              {/*    />*/}
              {/*  </RenderFieldFactory>*/}
              {/*</Col>*/}
            </Row>
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
    </Spin>
  );
};
SectionFour.propTypes = {
  // children: PropTypes.node,
};
export default SectionFour;
