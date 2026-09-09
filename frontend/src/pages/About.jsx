import { Carousel, Container, Row, Col } from 'react-bootstrap';
import '../style.css'
import { aboutData, carouselData, sections } from '../utils/data';
import FAQ from '../components/FAQ';

const About = () => {
    return (
        <>
            <Carousel >
                {carouselData.map((item, index) => (
                    <Carousel.Item key={item.id} >
                        <img src={item.image} alt="" className='d-block w-100' />
                        <Carousel.Caption className='d-flex flex-column align-items-center justify-content-center gap-4 h-100 ' >
                            <h2 className='fs-1 heading-style'>{item.title}</h2>
                            <p className='fs-5 w-75'>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))
                }
            </Carousel>

            <div className='py-5 my-4'>
                <Container >
                    <h1 className='text-center mb-5'>Who We Are</h1>
                    <div className='fs-5 text-justify text-indent'>
                        {aboutData.map((item, index) => (
                            <p key={item.id}>{item.content}</p>
                        ))
                        }
                    </div>
                </Container>
            </div>

            <div className='py-5 bg-warning bg-opacity-25'>
                <Container className='d-grid px-4 '>
                    <h1 className='text-center mb-4'>What is Eatzio?</h1>
                    {sections.map(({ id, title, description, image, imageLeft }) => (
                        <Row key={id} className="align-items-center my-4">

                            {imageLeft ? (
                                <>
                                    <div className="col-md-5 order-2 order-md-1">
                                        <img src={image} alt={title} className="img-fluid rounded"/>
                                    </div>

                                    <div className="col-md-7 order-1 order-md-2">
                                        <h2>{title}</h2>
                                        <p className="fs-5 mt-4">{description}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-md-7">
                                        <h2>{title}</h2>
                                        <p className="fs-5 mt-4">{description}</p>
                                    </div>

                                    <div className="col-md-5">
                                        <img src={image} alt={title} className="img-fluid rounded"/>
                                    </div>
                                </>
                            )}
                        </Row>
                    ))}
                </Container>
            </div>
            <FAQ />
        </>
    )
}
export default About;