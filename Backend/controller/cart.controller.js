import CartModel from "../modal/cart.model";
import ProductModel from "../modal/product.model";

export const getCartItems = async (req, res) => {
  try {
    const productID = req.params.product_ID;
    const cartData = await CartModel.findOne({ productID: productID });

    if (cartData) {
      return res.status(200).json({
        data: cartData,
        message: "Cart Items",
        result: cartData.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getAllCartItem = async (req, res) => {
  try {
    const cartData = await CartModel.find();
    console.log(cartData);
    let total = 0;
    if (cartData) {
      cartData.map((ele) => {
        total += ele.subtotal;
      });
      // console.log("total", total);
      return res.status(200).json({
        data: cartData,
        message: "success",
        path: "http://localhost:8001/uploads/product",
        result: cartData.length,
        total: total,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const productid = req.params.product_ID;
    console.log(productid);
    const productData = await ProductModel.findOne({ _id: productid });

    const existCartItem = await CartModel.findOne({
      productID: productid,
      //userID: userid,
    });

    console.log(existCartItem);
    if (existCartItem) {
      let quantity = existCartItem.quantity + 1;
      let price = productData.price * quantity;
      console.log(quantity, "quan");
      let updatedItem = await CartModel.updateOne(
        {
          _id: existCartItem._id,
        },
        {
          $set: {
            quantity: quantity,
            subtotal: price,
          },
        }
      );

      if (updatedItem.acknowledged) {
        return res.status(200).json({
          message: "updated",
        });
      }
    }

    const cartData = new CartModel({
      //userID: userid,
      productID: productid,
      name: productData.name,
      price: productData.price,
      quantity: 1,
      subtotal: productData.price,
      thumbnail: productData.thumbnail,
    });
    cartData.save();
    if (cartData) {
      return res.status(201).json({
        data: cartData,
        message: "Successfully added",
        path: "http://localhost:8001/uploads/product",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cartId = req.params.cart_id;

    let removeCart = await CartModel.deleteOne({ _id: cartId });

    if (removeCart.acknowledged) {
      return res.status(200).json({
        data: removeCart,
        message: "deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const cartID = req.params.cart_id;
    //const { productid } = req.body;
    const { updatetype } = req.query;

    const cartData = await CartModel.findOne({ _id: cartID });
    // const productData = await ProductModel.findOne({ _id: productid });

    let quantity = cartData.quantity;
    let subtotal = cartData.price;

    if (updatetype === "increment") {
      quantity += 1;
      subtotal = subtotal * quantity;
    }
    if (updatetype === "decrement") {
      quantity -= 1;
      subtotal = subtotal * quantity;
    }

    const updatedQuantity = await CartModel.updateOne(
      { _id: cartID },
      {
        $set: {
          quantity: quantity,
          subtotal: subtotal,
        },
      }
    );
    if (updatedQuantity.acknowledged) {
      return res.status(200).json({
        message: "Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteQuantity = async (req, res) => {
  try {
    const cartId = req.params.cart_id;

    const cartData = await CartModel.findOne({ _id: cartId });

    let quantity = cartData.quantity <= 0;
    let highQuantity = cartData.quantity >= 10;
    let deleteQuantity = "";

    if (quantity) {
      deleteQuantity = await CartModel.deleteOne({ _id: cartId });
    }

    if (highQuantity) {
      return res.status(200).json({
        message: "more than",
      });
    }
    if (deleteQuantity.acknowledged) {
      return res.status(200).json({
        data: deleteQuantity,
        message: "deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
