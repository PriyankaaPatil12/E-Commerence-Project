import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { Container } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getSubcategory } from "../../store/subcategory/Action";
import { Link, useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getProduct } from "../../store/product/Action";
import AllProduct from "../Product/AllProduct";

const Subcategory = () => {
  const { category_id } = useParams();
  console.log(category_id);
  const dispatch = useDispatch();
  const buttonHandler = (id) => {
    console.log(id);
    dispatch(getProduct(id));
  };
  React.useEffect(() => {
    dispatch(getSubcategory(category_id));
  }, [category_id]);
  const data = useSelector((state) => state.subcategory);
  console.log(data);
  const row = data.subcategories;
  console.log(row);

  return (
    <div className="mx-4">
      <Row>
        <Col sm={3}>
          {/* return ( */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Category</Typography>
            </AccordionSummary>
            {row?.data &&
              row?.data?.map((ele, index) => {
                return (
                  <AccordionDetails key={index} className="text-start">
                    {/* <Link to={`/singleproduct/${ele._id}`}>{ele.name}</Link>  */}

                    <Link
                      className="text-black no-underline"
                      onClick={() => buttonHandler(ele?._id)}
                    >
                      {ele.name}
                    </Link>
                  </AccordionDetails>
                );
              })}
          </Accordion>
          {/* ); */}
        </Col>
        <Col sm={9} className="mx-0 overflow-hidden">
          <AllProduct />
        </Col>
      </Row>
    </div>
  );
};

export default Subcategory;
