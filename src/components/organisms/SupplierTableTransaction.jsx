import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../atoms/Button";
import { jwtDecode } from "jwt-decode";
import FormField from "../moleculs/FormField";

const SupplierTableTransaction = () => {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get("access_token");
  const userId = jwtDecode(token).userID;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        const data = response.data.data;

        const filteredOrders = data.filter(
          (order) => order.product.userID === userId,
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token, userId]);

  const statusOptions = [
    { value: "PENDING", label: "PENDING" },
    { value: "ON_PROGRESS", label: "ON_PROGRESS" },
    { value: "SUCCESS", label: "SUCCESS" },
    { value: "REJECT", label: "REJECT" },
  ];

  const handleStatusChange = async (orderID, newStatus) => {
    try {
      console.log("orderID:", orderID);
      console.log("newStatus:", newStatus);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/status`,
        { orderID, status: newStatus },
        { headers: { Authorization: `${token}` } },
      );

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order.orderID === orderID) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        return updatedOrders;
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Card className="h-full w-full overflow-visible">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                ID
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Product
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Quantity
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Status
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                <Typography variant="small" color="red" className="font-normal">
                  DATA KOSONG
                </Typography>
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index}>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order.orderID}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order.user.username}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order.product.name}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order.quantity}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <FormField
                    id={"status"}
                    type={"select"}
                    name={"status"}
                    value={order.status}
                    options={statusOptions}
                    onChange={(value) =>
                      handleStatusChange(order.orderID, value)
                    }
                  />
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Button onClick={() => handleDelete(order.orderID)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default SupplierTableTransaction;
