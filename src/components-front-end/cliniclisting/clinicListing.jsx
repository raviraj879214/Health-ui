"use client"
import { useEffect, useState } from "react";

import Breadcrumb from "../../components-front-end/global/breadcrumb";
import Filters from "../../components-front-end/listing/filters";
import ProductCard from "../../components-front-end/global/productCard";
import ProductCardList from "../../components-front-end/global/productCardList";
import { useDispatch, useSelector } from "react-redux";
import { setSkipRedux } from "../redux/cliniclisting/store/clinicListing";
import ProductCardLoader from "../global/skeleton/productCardLoader";
import {ProductCardLoaderHorizontal} from "../global/skeleton/ProductCardLoaderHorizontal";
import { useSearchParams } from "next/navigation";


export function ClinicListing(){

    const searchParams = useSearchParams();
    const search = searchParams.get("search");



    const [view, setView] = useState("grid"); // <-- default grid
    const [maxprice,setMaxprice]  = useState(0);
    const [minprice,setMinprice]  = useState(0);
   
    const selectedSpecializations = useSelector((state) => state.clinicListing?.specializationRedux || []);
    const selectedSpecialty = useSelector((state) => state.clinicListing?.specialtyRedux || []);
    const selectedTreatment = useSelector((state) => state.clinicListing?.treatmentRedux || []);
    const selectedPlaces = useSelector((state) => state.clinicListing?.placeRedux || []);
    const skip = useSelector((state) => state.clinicListing?.skipRedux || 0);


    const dispatch = useDispatch();
    const [clinicloading,setClinicLoading] = useState(false);
    const [sortby,setSortby] = useState("0");

    // const [skip, setSkip] = useState(0);




        const limit = 12;

        const [total, setTotal] = useState(0);
        const [loading, setLoading] = useState(false);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Clinics", href: null }, // last item = current page
    ];


    const clinic = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Hospital Samaritano ${i + 1}`,
        image: `/images/product/img-${i + 1}.png`,
    }));

    const [clinics,setClinic] = useState([]);
    const [clinicbanner,setClinicBanner] = useState([]);


    useEffect(()=>{
        debugger;
         dispatch(setSkipRedux(0));
         fetchClinics();
         setSortby("");

    },[selectedSpecializations,selectedSpecialty,selectedTreatment,selectedPlaces]);





    const fetchClinics = async()=>{
       debugger;
       setClinicLoading(true);

        let payload ={
            specialization:selectedSpecializations,
            specialty: selectedSpecialty,
            treatment : selectedTreatment,
            places : selectedPlaces,
            limit : limit,
            skip : skip,
            search : search
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-listing/get-clinic-list`,{
            method : "Post",
            headers :{
              "Content-Type": "application/json"
            },
            body : JSON.stringify(payload)
        });
        if (res.ok) {
            debugger;
            const result = await res.json();
            setMaxprice(result.maxPrice);
            setMinprice(result.minPrice);


            const clinicList = result.data.map((item) => {

                const bannerImageObj = result.clinicimages.find(
                    (img) => img.clinicuuid === item.uuid && img.type === "banner"
                );

                return {
                    uuid: item.uuid,
                    name: item.name,
                    clinicbanner: bannerImageObj
                        ? bannerImageObj.Images
                        : item.imageUrl || null,
                        address : `${item.street} ,${item.complement} ${item.neighborhood} ${item.citycep}-${item.state},${item.cep}`,
                        state : item.city?.name,
                        country : item.country?.name,
                        googlerating : item.ratingSummary?.averageRating,
                        packagestartprice : item.packages.length ? Math.min(...item.packages.map(p => p.actualprice)) : 0,
                        slug:item.slug
                };

                 
            });
            setTotal(result.total);
           
           setClinic(prev => {
          
            if (skip === 0) {
              return clinicList;
            }

           
            const existing = new Set(prev.map(c => c.uuid));
            const merged = [...prev];

            clinicList.forEach(c => {
              if (!existing.has(c.uuid)) {
                merged.push(c);
              }
            });

            return merged;
          });
        }

        setTimeout(() => {
            setClinicLoading(false);
        }, 100);
        
    }



    useEffect(() => {
      fetchClinics();
      setSortby("");
  }, [skip]);


  const handleLoadMore = () => {
    dispatch(
      setSkipRedux(skip + limit)
    );
  };
  const handleResetSkip = () => {
    debugger;
    dispatch(setSkipRedux(0));
  };



    useEffect(()=>{

      onSortClick();

    },[sortby]);


    const onSortClick = async () => {
      setClinicLoading(true);
      if (!clinics || !clinics.length) return;

      let result = clinics.filter(clinic => clinic.name);

      if (sortby === "name_asc") {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortby === "name_desc") {
        result.sort((a, b) => b.name.localeCompare(a.name)); 
      } else if (sortby === "ratings_asc") {
        result.sort((a, b) => (a.googlerating || 0) - (b.googlerating || 0)); 
      } else if (sortby === "ratings_desc") {
        result.sort((a, b) => (b.googlerating || 0) - (a.googlerating || 0)); 
      }

      setClinic(result);
      setClinicLoading(false);
    };



  









    return(<>
    
     <Breadcrumb items={breadcrumbItems} />
      <div className="listing-section mb-18">
        <div className="container">
          <div className="flex gap-x-7.5 md:flex-nowrap flex-wrap">
            <div className="flex-auto lg:w-3/12 md:w-4/12 w-full">
              <Filters minPrice ={minprice} maxPrice={maxprice} />
            </div>
            <div className="flex-auto lg:w-9/12 md:w-8/12 w-full">
              
             
            
              <div className="flex items-center justify-between gap-5 mb-7.5">
                <div className="leading-none"><strong>{clinics.length}</strong> Results of <strong>{total}  </strong></div>
               
                <div className="flex gap-5">
                  <div className="flex gap-2.5 grid-list-view-toggle">
                    <button type="button" className={`btn w-[40px] h-[40px] p-2.5 ${view === "grid" ? "btn-secondary" : ""}`} onClick={() => setView("grid")}>
                      <svg width="16" height="16" className="w-full h-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.86338 0H1.36584C0.612719 0 0 0.612719 0 1.36584V5.86338C0 6.6165 0.612719 7.22922 1.36584 7.22922H5.86338C6.6165 7.22922 7.22922 6.6165 7.22922 5.86338V1.36584C7.22922 0.612719 6.6165 0 5.86338 0ZM14.6342 0H10.1366C9.3835 0 8.77078 0.612719 8.77078 1.36584V5.86338C8.77078 6.6165 9.3835 7.22922 10.1366 7.22922H14.6342C15.3873 7.22922 16 6.6165 16 5.86338V1.36584C16 0.612719 15.3873 0 14.6342 0ZM5.86338 8.77078H1.36584C0.612719 8.77078 0 9.3835 0 10.1366V14.6342C0 15.3873 0.612719 16 1.36584 16H5.86338C6.6165 16 7.22922 15.3873 7.22922 14.6342V10.1366C7.22922 9.3835 6.6165 8.77078 5.86338 8.77078ZM14.6342 8.77078H10.1366C9.3835 8.77078 8.77078 9.3835 8.77078 10.1366V14.6342C8.77078 15.3873 9.3835 16 10.1366 16H14.6342C15.3873 16 16 15.3873 16 14.6342V10.1366C16 9.3835 15.3873 8.77078 14.6342 8.77078Z" fill="currentcolor"/>
                      </svg>
                    </button>
                    <button type="button" className={`btn w-[40px] h-[40px] p-2.5 ${view === "list" ? "btn-secondary" : ""}`} onClick={() => setView("list")}>
                      <svg width="16" height="15" className="w-full h-auto" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3333 15H6C5.6 15 5.33333 14.7273 5.33333 14.3182V11.5909C5.33333 11.1818 5.6 10.9091 6 10.9091H15.3333C15.7333 10.9091 16 11.1818 16 11.5909V14.3182C16 14.7273 15.7333 15 15.3333 15ZM3.33333 15H0.666667C0.266667 15 0 14.7273 0 14.3182V11.5909C0 11.1818 0.266667 10.9091 0.666667 10.9091H3.33333C3.73333 10.9091 4 11.1818 4 11.5909V14.3182C4 14.7273 3.73333 15 3.33333 15ZM15.3333 9.54545H6C5.6 9.54545 5.33333 9.27273 5.33333 8.86364V6.13636C5.33333 5.72727 5.6 5.45455 6 5.45455H15.3333C15.7333 5.45455 16 5.72727 16 6.13636V8.86364C16 9.27273 15.7333 9.54545 15.3333 9.54545ZM3.33333 9.54545H0.666667C0.266667 9.54545 0 9.27273 0 8.86364V6.13636C0 5.72727 0.266667 5.45455 0.666667 5.45455H3.33333C3.73333 5.45455 4 5.72727 4 6.13636V8.86364C4 9.27273 3.73333 9.54545 3.33333 9.54545ZM15.3333 4.09091H6C5.6 4.09091 5.33333 3.81818 5.33333 3.40909V0.681818C5.33333 0.272727 5.6 0 6 0H15.3333C15.7333 0 16 0.272727 16 0.681818V3.40909C16 3.81818 15.7333 4.09091 15.3333 4.09091ZM3.33333 4.09091H0.666667C0.266667 4.09091 0 3.81818 0 3.40909V0.681818C0 0.272727 0.266667 0 0.666667 0H3.33333C3.73333 0 4 0.272727 4 0.681818V3.40909C4 3.81818 3.73333 4.09091 3.33333 4.09091Z" fill="currentcolor"/>
                      </svg>
                    </button>
                  </div>
                  <div className="sort-by md:block hidden">
                    <select
                     value={sortby}
                     onChange={(e)=> setSortby(e.target.value)}
                     name="sort_by" id="filter-sort" className=" w-[100%] appearance-aut btn inline-flex items-center justify-start gap-5 py-2 px-4 h-full font-medium w-40 text-start  bg-size-[14px] bg-no-repeat bg-position-[calc(100%_-_10px)_center]" defaultValue="">
                      <option value="0"  selected>Sort By</option>
                      <option value="ratings_desc">Ratings High - Low</option>
                      <option value="ratings_asc">Ratings Low - High</option>
                      <option value="name_asc">Name A - Z</option>
                      <option value="name_desc">Name Z - A</option>
                    </select>
                  </div>
                  
                </div>
              </div>


              

              {clinicloading ? (
                <>
                  <div className={`${view === "grid" ? "grid xl:grid-cols-3 md:grid-cols-2 gap-7.5" : "flex flex-col md:gap-7.5 gap-5"}`}>
                  {clinics.map((clinic) =>
                    view === "grid" ? (
                     <ProductCardLoader key={clinic.uuid}></ProductCardLoader>
                    ) : (
                    
                      <ProductCardLoaderHorizontal key={clinic.uuid}></ProductCardLoaderHorizontal>
                    )
                  )}
              </div>
                </>
              ) :(<>
                <div className={`${view === "grid" ? "grid xl:grid-cols-3 md:grid-cols-2 gap-7.5" : "flex flex-col md:gap-7.5 gap-5"}`}>
                  {clinics.map((clinic) =>
                    view === "grid" ? (
                      <ProductCard key={clinic.uuid} data={clinic} />
                    ) : (
                      <ProductCardList key={clinic.uuid} data={clinic} />
                    )
                  )}
              </div>
              </>
                
              )}




             



              <div className="mt-12 flex justify-center">
                 

                {clinics.length < total && (
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="btn btn-secondary-outline"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
              )}

              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    
    </>);
}