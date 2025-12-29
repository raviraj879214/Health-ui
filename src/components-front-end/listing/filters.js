"use client";

import { useState, useEffect } from "react";

import PriceRange from "./PriceRange";
import { useDispatch, useSelector } from "react-redux";
import { addSpecialization, addSpecialty, addTreatment, removeSpecialization, removeSpecialty, removeTreatment } from "../redux/cliniclisting/store/clinicListing";

export default function Filters(){
    
   
    const [filter, setFilter] = useState(null);
    const [specialization,setSpecialization] = useState([]);
    const [specialty,setSpecialty] = useState([]);
    const [treatment,setTreatment] = useState([]);
    const dispatch = useDispatch();


    const selectedSpecializations = useSelector((state) => state.clinicListing?.specializationRedux || []);
    const selectedSpecialty = useSelector((state) => state.clinicListing?.specialtyRedux || []);
    const selectedTreatment = useSelector((state) => state.clinicListing?.treatmentRedux || []);





    const fetchSpecilaizations = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-specialization`,{
            method : "Get",
            headers :{
                "content-type":"application/json"
            }
        });
        if(res.ok){
            const result = await res.json();
            setSpecialization(result.data);
        }
    }

     const fetchSpecialty = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-specialty`,{
            method : "Get",
            headers :{
                "content-type":"application/json"
            }
        });
        if(res.ok){
            const result = await res.json();
            setSpecialty(result.data);
        }
    }


     const fetchTreatment = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-treatment`,{
            method : "Get",
            headers :{
                "content-type":"application/json"
            }
        });
        if(res.ok){
            const result = await res.json();
            setTreatment(result.data);
        }
    }

   








    useEffect(()=>{
        if (filter == null) {
            document.body.classList.remove("overflow-hidden");
            document.documentElement.classList.remove("overflow-hidden");
        } else {
            document.body.classList.add("overflow-hidden");
            document.documentElement.classList.add("overflow-hidden");
        }
    }, [filter]);

    
    const [hideButton, setHideButton] = useState(false);

    useEffect(() => {
        fetchSpecilaizations();
        fetchSpecialty();
        fetchTreatment();
        const handler = (e) => {
            setHideButton(e.detail.visible);
        };
        window.addEventListener("footer-visibility", handler);
        return () => window.removeEventListener("footer-visibility", handler);
    }, []);














    return (
        <>
        <div className={`filters-outer ${filter === "filter" ? "active" : "" }`}>
            

            
           
            <div className="md:hidden! flex justify-between pb-5 border-b border-border mb-5">
                <h4 className="h4">Filters</h4>
                <button type="button" className="btn btn-none text-secondary!">Clear All</button>
            </div>
            <div className="mb-5">
                <input type="search" name="s" placeholder="Search..." className="border border-border rounded-full px-5 py-2.5 w-full"/>
            </div>
            <div className="filter-by-wrap pb-10">
                <div className="border border-border rounded-thm p-5 mb-5 last:mb-0 leading-[1.2]">
                    <h5 className="text-[1.4rem] font-bold mb-5 leading-none">Specialty</h5>
                    <div className="max-h-[200px] overflow-auto">
                        
                            {specialization.map((item) => {
                                const isSelected = selectedSpecializations.some(x => x.id === item.id);

                                const handleChange = () => {
                                    if (isSelected) {
                                        dispatch(removeSpecialization(item.id));
                                    } else {
                                        dispatch(addSpecialization({ id: item.id, name: item.name }));
                                    }
                                };

                                return (
                                    <label
                                        key={item.id}
                                        htmlFor={`category-${item.id}`}
                                        className="flex items-start mb-3 last:mb-0 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            name={`category[${item.id}]`}
                                            id={`category-${item.id}`}
                                            className="filter-checkbox"
                                            checked={isSelected}
                                            onChange={handleChange}
                                        />
                                        <span className="ml-2">{item.name} ({item._count.clinics})</span>
                                    </label>
                                );
                            })}

                       
                    </div>
                </div>
                <div className="border border-border rounded-thm p-5 mb-5 last:mb-0 leading-[1.2]">
                    <h5 className="text-[1.4rem] font-bold mb-5 leading-none">Sub Specialty</h5>

                    <div className="max-h-[200px] overflow-auto">

                             {specialty.map((item) => {
                                const isSelected = selectedSpecialty.some(x => x.id === item.id);

                                const handleChange = () => {
                                    if (isSelected) {
                                        dispatch(removeSpecialty(item.id));
                                    } else {
                                        dispatch(addSpecialty({ id: item.id, name: item.name }));
                                    }
                                };

                                return (
                                    <label
                                        key={item.id}
                                        htmlFor={`category-${item.id}`}
                                        className="flex items-start mb-3 last:mb-0 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            name={`category[${item.id}]`}
                                            id={`category-${item.id}`}
                                            className="filter-checkbox"
                                            checked={isSelected}
                                            onChange={handleChange}
                                        />
                                        <span className="ml-2">{item.name} ({item._count.clinicsSpecialty})</span>
                                    </label>
                                );
                            })}
                     
                    </div>
                </div>
                <div className="border border-border rounded-thm p-5 mb-5 last:mb-0 leading-[1.2]">
                    <h5 className="text-[1.4rem] font-bold mb-5 leading-none">Treatment</h5>
                    <div className="max-h-[200px] overflow-auto">
                        
                         {treatment.map((item) => {
                                const isSelected = selectedTreatment.some(x => x.id === item.id);

                                const handleChange = () => {
                                    if (isSelected) {
                                        dispatch(removeTreatment(item.id));
                                    } else {
                                        dispatch(addTreatment({ id: item.id, name: item.name }));
                                    }
                                };

                                return (
                                    <label
                                        key={item.id}
                                        htmlFor={`category-${item.id}`}
                                        className="flex items-start mb-3 last:mb-0 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            name={`category[${item.id}]`}
                                            id={`category-${item.id}`}
                                            className="filter-checkbox"
                                            checked={isSelected}
                                            onChange={handleChange}
                                        />
                                        <span className="ml-2">{item.name} ({item._count.clinicTreatments})</span>
                                    </label>
                                );
                            })}
                    </div>
                </div>
                <PriceRange
                    min={0}
                    max={1000}
                    defaultMin={299}
                    defaultMax={599}
                /> 
            </div>
            <div className="sm-bottom_head_bar md:hidden! flex">
                <button type="button" className="close_btn" onClick={() => setFilter(null)}>Close</button>
                <hr/>
                <button type="button" className="apply" onClick={() => setFilter(null)}>Apply</button>
            </div>
        </div>
        <div className={`sorting_box filter-sm-float md:hidden! ${filter === "sort" ? "active" : "" }`}>
            <div className="md:hidden flex justify-between pb-5 border-b border-border mb-5">
                <h4 className="h4">Sort By</h4>
                <button type="button" className="btn btn-none text-secondary!">Clear All</button>
            </div>
            <div className="box">
                <ul>
                    <li>
                        <input type="radio" name="sort-sm" value="best-selling" id="sm-sort-bs" /> 
                        <label htmlFor="sm-sort-bs">Best Selling</label>
                    </li>
                    <li>
                        <input type="radio" name="sort-sm" value="popular-product" id="sm-pop-prodcut" /> 
                        <label htmlFor="sm-pop-prodcut">Popular Products</label></li>
                    <li>
                        <input type="radio" name="sort-sm" value="back-in-stock" id="sm-back-stock" /> 
                        <label htmlFor="sm-back-stock">Back in Stock</label>
                    </li>
                    <li>
                        <input type="radio" name="sort-sm" value="top-rated" id="sm-top-rated" /> 
                        <label htmlFor="sm-top-rated">Top Rated</label>
                    </li>
                </ul>
            </div>
            <div className="sm-bottom_head_bar">
                <button type="button" className="close_btn" onClick={() => setFilter(null)}>Close</button>
                <hr/>
                <button type="button" className="apply" onClick={() => setFilter(null)}>Apply</button>
            </div>
        </div>
        <div className={`mobile_filter_bar md:hidden! flex ${hideButton ? "hide-footer" : "" }`}>
            <button type="button" className="mobile_sorting" onClick={() => setFilter("sort")}>Sort</button>
            <hr/>
            <button type="button" className="mobile_filter" onClick={() => setFilter("filter")}>Filters</button>
        </div>
        </>
    )
}