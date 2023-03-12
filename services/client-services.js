const listProducts = () => fetch("./db.json").then((resp) => resp.json());

const createProduct = (name, price, image, category, description) => {
  return fetch("./db.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      image,
      category,
      description,
      id: id++,
    }),
  });
};

const deleteProduct = (id) => {
  return fetch(`./db.json/${id}`, {
    method: "DELETE",
  });
};

const detailProduct = async (id) => {
  return fetch(`./db.json/${id}`).then((resp) => resp.json());
};

const updateProduct = (name, price, image, category, description, id) => {
  return fetch(`./db.json/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, image, category, description }),
  })
    .then((resp) => resp)
    .catch((err) => console.log(err));
};

export const clientServices = {
  listProducts,
  createProduct,
  deleteProduct,
  detailProduct,
  updateProduct,
};
