import { create } from "zustand";
import axios from "axios";
import useAuthStore from "@/utils/authStore";
import { jwtDecode } from "jwt-decode";

const useStore = create((set) => ({
  product: null,
  loading: false,
  error: null,
  fetchProducts: async (url) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      const decodedToken = jwtDecode(token);
      const supplierId = decodedToken.userID;
      const res = await axios.get(`${url}?userId=${supplierId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      set({ product: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
