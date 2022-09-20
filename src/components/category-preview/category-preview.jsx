import './category-preview.scss';
import ProductsCard from '../products-card/products-card';


const CategoryPreview = ({title, products}) => {

    return(
        <div className='category-preview-container'>
            <h2><span className='title'> {title.toUpperCase()} </span></h2>

            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                    .map((product) => 
                    <ProductsCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;