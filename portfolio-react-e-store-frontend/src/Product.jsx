import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const Product = ({product}) => {
    return (
    <>
        <Card className='productCard col-xs-3'>
            <img className='card-img-top' src={product.image} style={{marginTop:10, marginBottom:0}}/>
            <div className='card-body'>
                <h6 className='card-title truncated-text'>{product.title}</h6>
                <ul className='productCardDetails d-flex flex-column text-left'>
                    {
                        product.details.map((item, index)=> ( 
                            <li>{item}</li>
                        )) 
                    }
                </ul>
                <div className='product-footer d-flex justify-content-between'>
                    <h6 className='card-text price-text'>349,99€</h6>
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