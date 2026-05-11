const getWatches = async () => {
  try {
    const response = await fetch("http://localhost:5000/watches");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching watches:", error);
    throw error;
  }
};

const getWatchesById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/watches/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching watch by ID:", error);
    throw error;
  }
};

const getFans = async () => {
  try {
    const response = await fetch("http://localhost:5000/fans");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fans:", error);
    throw error;
  }
};

const getFansById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/fans/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fan by ID:", error);
    throw error;
  }
};

const getClocks = async () => {
  try {
    const response = await fetch("http://localhost:5000/clocks");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clocks:", error);
    throw error;
  }
};

const getClocksById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/clocks/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clock by ID:", error);
    throw error;
  }
};

export { getWatches, getWatchesById, getFans, getFansById, getClocks, getClocksById };
