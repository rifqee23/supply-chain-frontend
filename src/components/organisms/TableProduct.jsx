import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Button from "../atoms/Button";
import Cookies from "js-cookie";
import UpdateProductModal from "./UpdateProductModal";
import AddProductModal from "./AddProductModal";
import { jwtDecode } from "jwt-decode";
import { renderTableRow } from "@/utils/renderTableRow";
import axiosInstance from "@/axiosInstance";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = Cookies.get("access_token");
  const userId = token ? jwtDecode(token).userID : null;

  // Fungsi untuk membuka modal dan mengatur produk yang dipilih
  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (productID) => {
    try {
      await axiosInstance.delete(`/api/products/${productID}`, {
        headers: { Authorization: `${token}` },
      });
      setProducts((prev) =>
        prev.filter((item) => item.productID !== productID),
      );
    } catch (error) {
      setError("Error deleting product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data produk dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/products/user/${userId}`,
          {
            headers: { Authorization: `${token}` },
          },
        );
        setProducts(response.data.data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, token]);

  // Fungsi untuk memperbarui produk
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axiosInstance.put(
        `/api/products/${selectedProduct.productID}`,
        updatedProduct,
        { headers: { Authorization: `${token}` } },
      );
      setProducts((prev) =>
        prev.map((item) =>
          item.productID === selectedProduct.productID
            ? { ...item, ...updatedProduct }
            : item,
        ),
      );
    } catch (error) {
      setError("Error updating product: " + error.message);
    } finally {
      handleClose();
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axiosInstance.post(`/api/products`, newProduct, {
        headers: { Authorization: `${token}` },
      });
      setProducts((prev) => [...prev, response.data.data]);
    } catch (error) {
      setError("Error adding product: " + error.message);
    } finally {
      handleCloseAdd();
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenAdd}
        className={"text-white font-semibold mb-4 rounded-md bg-HIJAU px-2 py-1"}
      >
        TAMBAH BARANG
      </Button>
      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-HIJAU">
              {[
                "ID",
                "Name",
                "Description",
                "Price",
                "Stock",
                "Category",
                "Unit",
                "Material",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="border-b border-HIJAU p-4"
                >
                  <Typography
                    variant="small"
                    color="HIJAU"
                    className="font-extrabold leading-none opacity-70"
                  >
                    {header}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Loading...
                  </Typography>
                </td>
              </tr>
            ) : error || products.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
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
              products.map((item) =>
                renderTableRow(item, handleOpen, handleDeleteProduct),
              ) // Menggunakan fungsi dari utils
            )}
          </tbody>
        </table>

        <AddProductModal
          open={openAdd}
          handler={handleCloseAdd}
          onClick={handleCloseAdd}
          onSubmit={handleAddProduct}
        />
        <UpdateProductModal
          open={open}
          handler={handleClose}
          onClick={handleClose}
          product={selectedProduct}
          onSubmit={handleUpdateProduct}
        />
      </Card>
    </>
  );
};

export default TableProduct;
