export const SplitProductDetailsToArray = (productDetails) => {
    // following code will take the product details and split by new lines as well as remove
    // strings which length is <= 1 so
    // you can enter paragraph like (into text area)
    // [start]
    // "hello asdf
    //
    // i am best"
    // [end]
    // and it will transform into ['hello asdf', 'i am best']
    //console.log(`SplitProductDetailsToArray, typeof(productDetails):${typeof(productDetails)}`);
    let productDetailsSeparated = productDetails.split('\n');
    productDetailsSeparated = productDetailsSeparated.filter(detail=> detail.length > 1);
    productDetailsSeparated = productDetailsSeparated.map(detail=>
        detail.replace('\r', '')
    );

    return productDetailsSeparated
}

// cart will be array of objects and those objects will be {product, amount}
export const AddItemToShoppingCart = async (product, cart, setCart) => {
    const existingCartProduct = cart.find(cartProduct=>cartProduct.product.id === product.id);

    // if cart does not contain product, add it to the cart with amount=1
    if (!existingCartProduct)
    {
        const newCartProduct = {
            product:product,
            amount:1
        }

        setCart([...cart, newCartProduct])
    }
    else // don't add new but rather increase the amount
    {
        const newCart = [...cart]
        
        existingCartProduct.amount++

        setCart(newCart)
    }
}