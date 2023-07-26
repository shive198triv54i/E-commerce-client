import "./Products.scss";
import Product from "./Product/Product"
const Products = ({products,innerPage,headingText}) => {
    return <div className="products-container">
      {!innerPage &&  <div className="sec-heading">{headingText}</div>}
            <div className="products">
                {products?.data?.map((item)=>(
                    <Product 
                    key={item.id}
                    id={item.id}
                    data={item.attributes}
                    />
                ))}
        </div>
    </div>;
};

export default Products;


// f59a4088ed9be5251b088aa8a2c8f7107efa40a349f94a3b4844c6bbfda46f1c9d141f0d2b506b9e074893b0119b6c2edc19b004efdb61acb0fdf6040ba50e2da7754e28238a81c25d95554be0be0ca465d44136b8f7d0b91e25e94bb13d4a63d25bb5cfb9681df5c5d38189d9f6c932719a8bc5c998385d77ef1e891605019c
