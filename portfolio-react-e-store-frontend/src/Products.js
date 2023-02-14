import { Container } from 'react-bootstrap';
import Product from './Product';
import productImagePlaceholder from './graphic/product1.webp'

const ProductsList = [{
    title: "Sony PlayStation 4 Slim 500 Gt + Call of Duty Modern Warfare II -pelikonsolipaketti, musta",
    image: productImagePlaceholder,
    details: ["Päivitetty versio konsolista","Päivitetty versio konsolista","Päivitetty versio konsolista","Päivitetty versio konsolista", "3 pelitapaa: TV, tabletop ja handheld", "Pelaa missä haluat ja milloin haluat", "Joy-Con-peliohjaimet", "Kehittynyt lapsilukko"],
    price:299.99,
    rating: 4.5,
    inStock: true,
},
{
    title: "Sony PlayStation 4 Slim 500 Gt + Call of Duty Modern Warfare II -pelikonsolipaketti, musta",
    image: productImagePlaceholder,
    details: ["Päivitetty versio konsolista", "3 pelitapaa: TV, tabletop ja handheld", "Pelaa missä haluat ja milloin haluat", "Joy-Con-peliohjaimet", "Kehittynyt lapsilukko"],
    price:299.99,
    rating: 4.5,
    inStock: true,
},
{
    title: "Sony PlayStation 4 Slim 500 Gt + Call of Duty Modern Warfare II -pelikonsolipaketti, musta",
    image: productImagePlaceholder,
    details: ["Päivitetty versio konsolista", "3 pelitapaa: TV, tabletop ja handheld", "Pelaa missä haluat ja milloin haluat", "Joy-Con-peliohjaimet", "Kehittynyt lapsilukko"],
    price:299.99,
    rating: 4.5,
    inStock: true,
},
{
    title: "Sony PlayStation 4 Slim 500 Gt + Call of Duty Modern Warfare II -pelikonsolipaketti, musta",
    image: productImagePlaceholder,
    details: ["Päivitetty versio konsolista", "3 pelitapaa: TV, tabletop ja handheld", "Pelaa missä haluat ja milloin haluat", "Joy-Con-peliohjaimet", "Kehittynyt lapsilukko"],
    price:299.99,
    rating: 4.5,
    inStock: true,
},
{
    title: "Sony PlayStation 4 Slim 500 Gt + Call of Duty Modern Warfare II -pelikonsolipaketti, musta",
    image: productImagePlaceholder,
    details: ["Päivitetty versio konsolista", "3 pelitapaa: TV, tabletop ja handheld", "Pelaa missä haluat ja milloin haluat", "Joy-Con-peliohjaimet", "Kehittynyt lapsilukko"],
    price:299.99,
    rating: 4.5,
    inStock: true,
},
{
    title: "Sony PlayStation 4 Slim 500 Gt + Call of Duty Modern Warfare II -pelikonsolipaketti, musta",
    image: productImagePlaceholder,
    details: ["Päivitetty versio konsolista", "3 pelitapaa: TV, tabletop ja handheld", "Pelaa missä haluat ja milloin haluat", "Joy-Con-peliohjaimet", "Kehittynyt lapsilukko"],
    price:299.99,
    rating: 4.5,
    inStock: true,
}
]

const Products = () => {
    return (
    <>
        <Container className='product-container extra-top-margin'>
            <h5 style={{marginTop:10, marginLeft:10}}>
                Trendaavia tuotteita
            </h5>
            <div className="row">
                {ProductsList.map((item, index)=> (
                    <Product product={item}/>
                ))}
            </div>
        </Container>

        </>
    );
}

export default Products