export const getQuery =
  "query { allProducts { _id, name, price, description, image_url } }";

export const createQuery =
  "mutation CreateProduct($name:String!, $price:Float!, $description:String!, $image_url:String!) {CreateProduct(name:$name, price:$price, description:$description, image_url:$image_url) {name}}";

export const editQuery =
  "mutation EditProduct($_id:ID!, $name:String!, $price:Float!, $description:String!, $image_url:String!) {EditProduct(_id:$_id, name:$name, price:$price, description:$description, image_url:$image_url) {name}}";

  export const deleteQuery =
  "mutation DeleteProduct($_id:ID!) {DeleteProduct(_id:$_id)}";