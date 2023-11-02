import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getsingleProduct } from "../../store/product/Action";
import { Container } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addToCart, getCarts, updatecart } from "../../store/cart/Action";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import Accordion from "react-bootstrap/Accordion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./style.css";

const SingleProduct = () => {
  const [image, setImage] = useState();
  const { product_id } = useParams();
  console.log(product_id);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getsingleProduct(product_id));
  }, [product_id]);
  const row = useSelector((state) => state.product.product);
  console.log(row?.data?.name);
  //   const row = data.products;
  console.log(row.path);

  const changeImage = (index) => {
    setImage(index);
  };

  const data = useSelector((state) => state.cart);
  const row1 = data.carts;

  const incrementquantity = (id) => {
    let type = "increment";
    dispatch(updatecart({ id, type })).then(() => {
      dispatch(getCarts());
      console.log(id);
    });
  };

  const decrementquantity = (id) => {
    let type = "decrement";
    dispatch(updatecart({ id, type })).then(() => {
      dispatch(getCarts());
    });
  };

  const addTocart = (item) => {
    dispatch(addToCart(item)).then(() => {
      dispatch(getCarts());
    });
  };

  return (
    <>
      <div className="mt-8 ">
        <Container>
          <div className="mb-4">
            <p className="text-start text-black uppercase text-sm">
              <span>
                {" "}
                <Link
                  className="no-underline text-slate-400 hover:text-black"
                  to={"/"}
                >
                  Home{" "}
                </Link>{" "}
              </span>{" "}
              / {row?.data?.name}
            </p>
          </div>
          <Row>
         

            <Col sm={5}>
              <div className=" bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 ">
                {image === 0 || image ? (
                  <img
                    alt=""
                    className="img1"
                    src={`${row?.path}/${row?.data?.images[image]}`}
                  />
                ) : (
                  <img
                    src={`${row?.path}/${row?.data?.thumbnail}`}
                    className="img1"
                    alt=""
                  />
                )}
              </div>
              <div className="mt-2 flex  flex-row overflow-x-scroll  sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1   ">
                {row?.data?.images &&
                  row?.data?.images.map((elem, index) => {
                    return (
                      <img
                        src={`${row?.path}/${elem}`}
                        className="mb-4 object-cover object-center"
                        width={80}
                        alt=""
                        key={index}
                        onClick={() => changeImage(index)}
                      />
                    );
                  })}
              </div>
            </Col>
            <Col sm={7}>
              <div className="text-start">
                <h2 className="font-normal tracking-wide">{row?.data?.name}</h2>
                <h5 className="font-medium tracking-wide mt-4">
                  ₹ {row?.data?.price}
                </h5>
              

                   
                <div className="w-full  bg-[#e9d0ba] text-white text-center mt-4 ">
                  <button
                    className="py-3 tracking-wide text-sm"
                    onClick={() => addTocart(row?.data?._id)}
                  >
                    ADD TO CART
                  </button>
                </div>


                <div className="w-full   bg-[#e9d0ba] text-white text-center mt-3">
                  <button className="py-3 tracking-wide text-sm">
                    ADD TO WISHLIST
                  </button>
                </div>

                <div className="mt-20">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="">
                        <h6 className="text-sm tracking-wide">DETAILS</h6>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{row?.data?.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="mt-2">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        <h6 className="text-sm tracking-wide">RETURN</h6>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <p>
                          We want you to be completely satisfied with your
                          online purchase. If you change your mind for any
                          reason, we’ll gladly accept a return of any full
                          priced items for a STORE CREDIT returned within 14
                          days of receiving your parcel. This is extended to 30
                          days for International customers. Please note this
                          does not include items that are marked at a discounted
                          price.
                        </p>
                        <br></br>
                        <p>
                          We also offer an alternate returns policy for our
                          brides. If you have purchased 3 or more of the same
                          dress from our Ever After Collection in one
                          transaction you will be eligible to return these
                          dresses for a full refund should they not suit
                          (postage not included). This is a strict 14 day policy
                          for residents in Australia and 30 days for
                          International orders. If your items arrive outside
                          this time frame a credit will be issued. The timeframe
                          begins from when you receive the dresses. Please note
                          this excludes items that are marked at a discounted
                          price. Please contact our customer service team should
                          you wish to lodge a return for a refund on your
                          bridesmaid dresses. customerservice@billyj.com.au
                        </p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion className="mt-2">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="">
                        <h6 className="text-sm tracking-wide ">DELIVERY</h6>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <p>
                          Indian Orders - (typically the next business day,
                          remote 2-3 business days) Free Express Delivery within
                          india for all orders over ₹1500.
                        </p>
                        <br></br>
                        <p>
                          International Orders petal & pup delivers
                          internationally. For more info on delivery locations{" "}
                          <Link>click here</Link>
                        </p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SingleProduct;
