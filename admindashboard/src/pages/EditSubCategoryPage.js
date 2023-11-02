import { Button, Container, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditSubCategoryPage = () => {
  const navigate = useNavigate();
  const [maincategory, setMainCategory] = useState([]);
  const [scategory, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });
  const [age, setAge] = useState('');

  const categoryID = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8001/subcategory/get-singleSubCategory/${categoryID.subcategory_id}`)
      .then((res) => {
        setCategory(res.data.data);
        console.log(res.data.data);
        setFormData({
          name: res.data.data.name || '',
          image: null,
        });

        // Fetch the main categories here after setting scategory
        getSingleCategory(); // Pass the category ID to the function
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryID.subcategory_id]); // Include categoryID.subcategory_id in the dependency array

  const getSingleCategory = () => {
    axios
      .get(`http://localhost:8001/category/get-categoryAll`)
      .then((res) => {
        setMainCategory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObject = new FormData();

    formDataObject.append('name', formData.name);
    formDataObject.append('image', formData.image);

    console.log(formData.name);
    axios
      .put(`http://localhost:8001/subcategory/updateSubCategory/${categoryID.subcategory_id}`, formDataObject)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate('/dashboard/subcategory');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <h1>Edit Sub-Category</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'start', gap: 20 }}
        >
          <TextField type="text" name="Name" onChange={handleInputChange} value={formData.name} />
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            {maincategory.map((elem, ind) => (
              <MenuItem key={elem._id} value={elem._id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>

          <input type="file" name="image" onChange={handleFileChange} />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default EditSubCategoryPage;
