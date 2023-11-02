import React from "react"
import { useSelector ,useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import { getCategory } from "../../store/category/Action";

const CategoryComp= () => {

    const dispatch = useDispatch();
  React.useEffect(()=>{
    dispatch(getCategory())
  },[])
  const data = useSelector(state=>state.category)
  const row = data.categories;
  console.log(data)

    return (
      <div className="">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className=" sm:py-24 lg:max-w-none ">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
            <div className=" space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 ">
              {row.data && row.data.map((category,ind) => (
                <div key={category._id} className="group relative rounded-lg border mb-4">
                  <div className=" overflow-hidden  sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1  ">
                    <img
                      src={`http://localhost:8001/uploads/category/${category.image}`}
                      className="h-full w-full object-cover object-center rounded-lg"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link className="no-underline text-black" to={`/subcategory/${category._id}`}>
                      <span className="absolute inset-0 " />
                      {category.name}    
                    </Link>
                  </h3>
                </div>  
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default CategoryComp