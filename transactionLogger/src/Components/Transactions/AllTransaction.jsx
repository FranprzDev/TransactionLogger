import React from "react";
import "./transactions.css";
import { useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    filters: [
      {
        text: 'Income',
        value: 'income',
      },
      {
        text: 'Expense',
        value: 'expense',
      },
    ],
    render: (text) => {
      return text == "+" ? (
        <Tag color="green">Income</Tag>
      ) : (
        <Tag color="red">Expense</Tag>
      );
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function AllTransaction() {
  const transactions = useSelector((state) => state.transaction);

  return (
    <section>
      <h2>All Transaction</h2>

      <Table columns={columns} dataSource={transactions.transaction || []} />
    </section>
  );
}

export default AllTransaction;
