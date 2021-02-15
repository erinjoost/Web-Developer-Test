import products from "../../api/products/index.json"

export function productListing(item_sku){
    return products.items.find(productListing => {
        return productListing.sku === item_sku;
    });
}
export function price(item_sku){
   return productListing(item_sku).price;
}
export function stockLevel(item_sku){
    return productListing(item_sku).stockLevel;
}


