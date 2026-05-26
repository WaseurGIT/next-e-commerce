import axiosSecure from "../auth/axiosSecure";

const getWatches = async () => {
  try {
    const response = await axiosSecure.get("/products?category=watch");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching watches:", error);
    throw error;
  }
};

const getWatchesById = async (id: string) => {
  try {
    const response = await axiosSecure.get(`/products/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching watch by ID:", error);
    throw error;
  }
};

const getFans = async () => {
  try {
    const response = await axiosSecure.get("/products?category=fan");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching fans:", error);
    throw error;
  }
};

const getFansById = async (id: string) => {
  try {
    const response = await axiosSecure.get(`/products/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching fan by ID:", error);
    throw error;
  }
};

const getClocks = async () => {
  try {
    const response = await axiosSecure.get("/products?category=clock");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching clocks:", error);
    throw error;
  }
};

const getClocksById = async (id: string) => {
  try {
    const response = await axiosSecure.get(`/products/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching clock by ID:", error);
    throw error;
  }
};

const getTrendings = async () => {
  try {
    const response = await axiosSecure.get("/products?category=trending");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching trending products:", error);
    throw error;
  }
};

const getTrendingById = async (id: string) => {
  try {
    const response = await axiosSecure.get(`/products/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching trending product by ID:", error);
    throw error;
  }
};

export {
  getWatches,
  getWatchesById,
  getFans,
  getFansById,
  getClocks,
  getClocksById,
  getTrendings,
  getTrendingById,
};
