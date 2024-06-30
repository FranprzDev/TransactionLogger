import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Select, Radio } from "antd";
import { categories } from "../../js/constants";
import { addTransaction } from "../../slice/transactionSlice";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'

function AddTransaction({ buttonText = "Add Transaction", fields = {} }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {

    const transaction = {
      id: Math.floor(Math.random() * 1000),
      description: values.description,
      amount: values.amount,
      type: values.type == 1 ? "+" : "-",
      category: values.category,
      date: values.date.format("YYYY-MM-DD"),
    };
    
    dispatch(addTransaction(transaction));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your transaction has been added!",
      showConfirmButton: false,
      timer: 1500
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="addTransactionForm"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        description: fields?.description || "",
        amount: fields?.amount || "",
        type: fields?.type || "+",
        category: fields?.category || "",
        date: fields?.date || "",
      }}
    >
      <Form.Item
        name="description"
        label="Description"
        required
        tooltip="What did you spend on?"
        rules={[
          {
            required: true,
            message: "Please add a description!",
          },
        ]}
      >
        <Input placeholder="A cookie" maxLength="100" type="text" />
      </Form.Item>
      <Form.Item
        name="amount"
        label="Amount"
        required
        tooltip="How much did you spend on this?"
        rules={[
          {
            required: true,
            message: "Please add $ you spend on this!",
          },
        ]}
      >
        <Input placeholder="$1000" maxLength="10" type="number" />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[
          {
            required: true,
            message: "Please add type of your transaction!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="1">Income</Radio>
          <Radio value="2">Expense</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        required
        tooltip="What is the category of the product?"
      >
        <Select
          defaultValue="Food"
          style={{
            width: 150,
          }}
          options={categories.map((category) => {
            return { value: category.value, label: category.label };
          })}
        />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        tooltip={{
          title: "The default date is the current date",
          icon: <InfoCircleOutlined />,
        }}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddTransaction;
