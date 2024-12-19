import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import FormField from "../moleculs/FormField";
import axiosInstance from "@/axiosInstance";

const SupplierTableTransaction = () => {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get("access_token");
  const userId = token ? jwtDecode(token).userID : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/api/orders`, {
          headers: {
            Authorization: `${token}`,
          },
        });
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
      await axiosInstance.put(
        `/api/orders/status`,
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
    <div className="">
      <Card className="overflow-x-auto">
        <table className="min-w-full">
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
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-6 py-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  QR Code
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  <Typography
                    variant="small"
                    color="red"
                    className="font-normal"
                  >
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
                      id={"status-${order.orderID}"}
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
                    <div className="flex items-center justify-center">
                      {order.qr_code ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${order.qr_code}`}
                          alt=""
                          className="h-12 w-12"
                        />
                      ) : (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          -
                        </Typography>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SupplierTableTransaction;
