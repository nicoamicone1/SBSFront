import React, { SetStateAction } from "react"

export interface IProduct{
    _id:string,
    name:string,
    price:number,
    description:string,
    image_url:string
}

export interface IProdContext{
    products:IProduct[],
    setProducts:React.Dispatch<SetStateAction<IProduct[]>>,
    loaded:boolean
}