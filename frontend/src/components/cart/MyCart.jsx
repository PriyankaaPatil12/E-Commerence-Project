import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { getCarts, removefromCart, updatecart } from "../../store/cart/Action";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {loadStripe} from '@stripe/stripe-js';


const MyCart = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);
  const data = useSelector((state) => state.cart);
  const row = data.carts;
  console.log(data);
  console.log(row);

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

  const removefromcart = (id) => {
    dispatch(removefromCart(id)).then(() => {
      dispatch(getCarts());
    });
  };

  const makepayment = async() =>{
    const stripe = await loadStripe("pk_test_51NlxoSSEauZqEu7zccvOLpuHf51PnISYIvEkrGzuG9iTMuRBBYChIqINpa8Rbr1y4r5wo4WWdtPdWcyAXEdUlERD00RBitslnC")
    
    const body = {
      product:row.data
    }
    const headers = {
      "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:8001/api/create-checkout-session", {
      method: "POST",
      headers:headers,
      body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })

    if(result.error){
      console.log(result.error);
    }
  
  }



  return (
    <Container>
      <div className="mt-8">
        <h1 className="text-2xl  text-start font-normal border-b py-4">My Cart</h1>
        {row?.result ?
          <Row className="g-3 mt-8">
          {/* {row.data && row.data.map((carts,ind)=>{ */}          
          <Col sm={7}>
            {row.data &&
              row.data.map((cart) => (
                <Row className="">
                  <Col sm={8}>
                    <div className="mt-8">
                      <div className="flow-root">
                        <li className="flex ">
                          <div className="h-25 w-24 flex-shrink-0 overflow-hidden  border border-gray-200">
                            <img

                              src={`${row.path}/${cart.thumbnail}`}
                              alt="img"
                              className=""
                            />
                          </div>

                          <div className="ml-4 flex flex-col">
                            <div className="flex  justify-between text-base  text-gray-900 font-medium	">
                              <h3 className="font-normal text-start">{cart.name}</h3>
                            </div>
                            <div className="mt-4 text-start ">
                              <button
                                onClick={() => removefromcart(cart._id)}
                                className="border color-black border-slate-400 px-2 py-1 text-xs font-normal	"
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  </Col>

                  <Col sm={4}>
                    <div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <li className="flex">
                          
                            <div className=" w-24 overflow-hidden rounded-md border border-gray-200">
                              <div className="flex justify-center items-center  ">
                                <span
                                  className="text-xs"
                                  onClick={() => incrementquantity(cart._id)}
                                >
                                  <AiOutlinePlus />
                                </span>

                                <h5 className="mb-0 px-4 py-1 text-base text-canter font-normal ">
                                  {cart.quantity}
                                </h5>
                                <span
                                  className="text-xs"
                                  onClick={() => decrementquantity(cart._id)}
                                >
                                  <AiOutlineMinus />
                                </span>
                              </div>
                            </div>

                            <div className="ml-8  flex flex-1 flex-col">
                              <div className="flex  justify-between  text-base font-medium text-gray-900">
                                <span className="font-normal">
                                  ₹ {cart.price}
                                </span>
                              </div>
                            </div>
                          </li>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}
          </Col>
          <Col sm={4} className="">
           <div className=" py-6 sm:px-6 subtotal">
              <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                <h5 className="font-normal">SUBTOTAL:</h5>
                <h5>₹ {row?.total}</h5>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 text-start mt-4">
                Tax included and shipping calculated at checkout
              </p>
              <div className="mt-8 " onClick={makepayment}>
                <Link
                  href="#"
                  className="flex items-center justify-center bg-[#e9d0ba] rounded-md border border-transparent no-underline	 px-6 py-3 text-xl font-medium "
                >
                  <button className="text-[#30292a] font-normal ">
                    CHECK OUT
                  </button>
                </Link>
              </div>
            </div>
        
          
          </Col>
             
           
        </Row>
        : <div>
          your cart is empty
        </div>
         }
       
      </div>
    </Container>
  );
};

export default MyCart;
