import React, { useEffect, useRef, useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { foodCategory, IMAGE_URL } from '../util/constants'
import { ImageUp } from 'lucide-react'

const FoodForm = ({ foodData, setFoodData, onSubmit, submitText }) => {

  const [imagePreview, setImagePreview] = useState(null); //image preview. actually stores the preview URL, not the file itself.
  const fileInputRef = useRef(null); //to open the file picker. Connect the div to the file input since it is hidden

  useEffect(() => {

    if (!foodData.image) { //when addfood page first loads, when reset the form or remove image
      setImagePreview(null);
      return;
    }

    // Existing image from server
    if (typeof foodData.image === "string") {
      setImagePreview(`${IMAGE_URL}/${foodData.image}`);
      return;
    }

    const urlImage = URL.createObjectURL(foodData.image);
    setImagePreview(urlImage);

    return () => {
      URL.revokeObjectURL(urlImage); //prevents small memory leaks if the user changes the selected image multiple times
    }
  }, [foodData.image])


  const handleUploadClick = () => {
    fileInputRef.current.click();
  }

  const handleUploadChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFoodData((prev) => ({
      ...prev,
      image: file,
    }));

  }

  const handleChange = (e) => {
    setFoodData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  return (
      <Container className='py-5'>
        <Row>
          <Col lg={8} md={10}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Upload Food Image</Form.Label>
                <div
                  className="border-dashed border-2 border-secondary-subtle rounded-2 d-flex flex-column justify-content-center align-items-center upload-image-style"
                  onClick={handleUploadClick}>
                  {
                    imagePreview ? (
                      <img src={imagePreview} alt="Image preview" className="w-100 h-100" style={{ objectFit: "cover" }} />
                    ) : (
                      <>
                        <ImageUp size={30} className="text-secondary mb-2" />
                        <small className="text-muted">
                          Click to upload
                        </small>
                      </>
                    )
                  }
                  <Form.Control type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleUploadChange} />

                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Product Name</Form.Label>
                <Form.Control type='text' placeholder='Type here' required className='border-2' name='name'
                  value={foodData.name} onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Product Description</Form.Label>
                <Form.Control as='textarea' row={4} style={{ resize: 'none' }} required placeholder='Write content here'
                  className='border-2' name='description' value={foodData.description} onChange={handleChange}></Form.Control>
              </Form.Group>
              <Row>
                <Col md={6}>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Product Category</Form.Label>
                    <Form.Select required name='category' value={foodData.category} onChange={handleChange}>
                      <option disabled value="">Select category</option>
                      {foodCategory.map((categ) => (
                        <option>{categ}</option>
                      ))
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Product Price</Form.Label>
                    <Form.Control type='number' required placeholder="₹ Enter price" name='price'
                      value={foodData.price} onChange={handleChange}></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-3 mt-3">
                <Button variant="outline-secondary" as={Link} to="/admin/foods" className="fw-semibold">
                  CANCEL
                </Button>
                <Button variant="primary" className="fw-semibold" type='submit'>
                  {submitText}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container >
  )
}

export default FoodForm