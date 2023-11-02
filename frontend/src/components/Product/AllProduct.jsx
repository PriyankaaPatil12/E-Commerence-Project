import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { Container } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../store/product/Action";
import { getCarts, addToCart } from "../../store/cart/Action";


const AllProduct = () => {
  const { product_id } = useParams();
  console.log(product_id);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProduct(product_id));
  }, [product_id]);
  const data = useSelector((state) => state.product);
  console.log(data);
  const row = data.products;
  console.log(row);

  
  const addTocart = (item) => {
    dispatch(addToCart(item)).then(() => {
      dispatch(getCarts());
    });
  };
  

  return (
    <div className="">
      <div className=" ">
        <div className="  ">
          <div className=" space-y-12 grid sm:grid-cols-2 lg:grid-cols-4  lg:gap-x-6 lg:space-y-0">
            {row.data &&
              row.data.map((product, ind) => (
                <div key={ind} className="group relative mb-6">
                  <div className=" bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-80">
                    <Link
                      to={`/singleproduct/${product._id}`}
                      className="no-underline text-inherit "
                    >
                      <img
                        src={`${row?.path}/${product.thumbnail}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </Link>
                  </div>
                  <div className="flex justify-between mb-2 my-2">
                    <h3 className=" text-start  text-base ">
                      <Link
                        to={`/singleproduct/${product._id}`}
                        className="no-underline text-inherit "
                      >
                        <span className="" />
                        {product.name}
                      </Link>
                    </h3>
                    <h3 className="text-base text-right">₹{product.price}</h3>
                  </div>
                  <div className="w-full text-sm  bg-[#e9d0ba] text-white text-center py-2 mt-4">
                    <Link to={`/singleproduct/${product._id}`} className="no-underline text-white">
                      BUY NOW
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
