import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import constants from './util/constants';

const ProductDetails = ({product}) => {
    // following code will take the product details and split by new lines as well as remove
    // strings which length is <= 1 so
    // you can enter paragraph like (into text area)
    // [start]
    // hello asdf
    //
    // i am best
    // [end]
    // and it will transform into ['hello asdf', 'i am best']
    let productDetailsSeparated = product.productDetails.split('\n');
    productDetailsSeparated = productDetailsSeparated.filter(detail=> detail.length > 1);
    productDetailsSeparated = productDetailsSeparated.map(detail=>
        detail.replace('\r', '')
    );
    

    return (
        <ul className='productCardDetails d-flex flex-column text-left'>
            {productDetailsSeparated.map((detail, index) => (
                    <li key={index}>{detail}</li> // use the index as the key and trim the bullet point text
            ))}
        </ul>
    );
}

const Product = ({product}) => {
    return (
    <>
        <Card className='productCard col-xs-3'>
            <img className='card-img-top' src={product.imageUrl} style={{marginTop:10, marginBottom:0}}/>
            <div className='card-body'>
                <h6 className='card-title truncated-text'>{product.title}</h6>
                <ProductDetails product={product}/>

                <div className='product-footer d-flex justify-content-between'>
                    <h6 className='card-text price-text'>
                        {`${product.price}${constants.CURRENCY_CHARACTER}`}
                    </h6>
                    <div className='btn btn-primary w-25'>
                        <FontAwesomeIcon className='product-shopping-cart-icon' icon={solid('cart-shopping')}/>
                    </div>
                </div>

            </div>
        </Card>
    </>
    );
}

export default Product