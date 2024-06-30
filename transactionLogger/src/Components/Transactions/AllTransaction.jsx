import React, { useState } from "react";
import "./transactions.css";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";
import { deleteTransaction, editTransacation } from "../../slice/transactionSlice";
import Swal from "sweetalert2";
import { categories } from "../../js/constants";

function AllTransaction() {
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
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      // filters: [
      //   {
      //     text: "Income",
      //     value: "+",
      //   },
      //   {
      //     text: "Expense",
      //     value: "-",
      //   },
      // ],
      // filterSearch: true,
      // onFilter: (value, record) => console.log(record.type.startsWith(value)),
      // Preguntar acerca de como puedo hacer este filter, ya que no me esta funcionando debido a que
      // hago una conversión de '-' y '+' para poner los tags.
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
      // filterSearch: true,
      // width: '40%',
      // filters: [
      //   {
      //     text: "Food",
      //     value: "food",
      //   },
      //   {
      //     text: "Transport",
      //     value: "transport",
      //   },
      //   {
      //     text: "Health",
      //     value: "health",
      //   },
      //   {
      //     text: "Entertainment",
      //     value: "entertainment",
      //   },
      //   {
      //     text: "Education",
      //     value: "education",
      //   },
      //   {
      //     text: "Others",
      //     value: "others",
      //   },
      // ],
      // onFilter: (value, record) => record.category.startsWith(value)
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <p className="text-edit" onClick={() => handleEdit(record)}>
            Edit
          </p>
          <p className="text-delete" onClick={() => handleDelete(record.id)}>
            Delete
          </p>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction);
  const [edit, setEdit] = useState({});

  const handleEdit = async (record) => {
    const { formValues } = await Swal.fire({
      title: "Edit Transaction",
      html: `
        <input id="swal-input1" class="swal2-input" value=${record.description}>
        <input id="swal-input2" class="swal2-input" value=${record.amount}>
        <div class=${"modal-div"}>
          <input type="radio" id="income" name="transactionType" value="1" ${
            record.type === "+" ? "checked" : ""
          }>
          <label for="income">Income</label>

          <input type="radio" id="expense" name="transactionType" value="2" ${
            record.type === "-" ? "checked" : ""
          }>
          <label for="expense">Expense</label>
        </div>

        <section class={${"sectioninputs"}}>
          <div class={${"div-modal"}}>
            <select name="category" id="category" required >
              ${categories.map((item, _) => {
                return `<option key=${_} value=${item.value} ${
                  record.category === item.value ? "selected" : ""
                }>${item.label}</option>`;
              })}
            </select>
          </div>
          
          <div class={${"div-modal"}}>
            <input type="date" id="date" name="date" value=${record.date}>
          </div>
        </section>

      `,
      focusConfirm: false,
      preConfirm: () => {
      dispatch(
        editTransacation({
          id: record.id,
          description: document.getElementById("swal-input1").value,
          amount: document.getElementById("swal-input2").value,
          type: document.getElementById("income").checked ? "+" : "-",
          category: document.getElementById("category").value,
          date: document.getElementById("date").value,
        })
      );
      },
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your transacation has been deleted.",
          icon: "success",
        });
        dispatch(deleteTransaction(id));
      }
    });
  };

  return (
    <section>
      <h2>All Transaction</h2>

      <Table
        columns={columns}
        dataSource={transactions.transaction || []}
        pagination={{
          position: ["bottomCenter"],
        }}
        // pageSizeOptions={3}
        // Preguntar como se hace una paginación con ant design
      />
    </section>
  );
}

export default AllTransaction;
