import React from 'react'
import ProductList from '../allProducts'

const Shop = () => {
  return (
    <div className="h-screen w-full">
      <div className="h-3/5 bg-ashGray flex flex-col pt-36 items-center gap-4 md:gap-8">
        <h1 className='text-5xl'>Shop your favourite products</h1>
        <div className="h-7 bg-slate-300 w-1/2">Search Bar</div>
      </div>
      <div className="h-10 bg-outerSpace">sort filter heading</div>
      <div className="w-full flex gap-0">
        <div className="hidden md:block w-[20%] lg:w-[15%]">Filter bar</div>
        <div className="w-full md:w-[80%] lg:w-[85%]">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Shop
