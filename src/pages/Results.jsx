import { useLoaderData } from "react-router-dom";
import useCity_dateStore from "../stores/city_dateStore";
import { searchListings } from "../controllers/listingApis";
async function loader({ request }) {
    const searchParams = new URL(request.url).searchParams;

    const { inputValue, dateRange } = useCity_dateStore.getState();

    const buildingType = searchParams.get('propertyType');
    // const params = [];

    // for (const param of searchParams) {
    //     params.push({
    //         key: param[0],
    //         value: param[1],
    //     });
    // }


    // return params;
    const response = await searchListings(inputValue, dateRange[0].setUTCHours(0,0,0,0), dateRange[1].setUTCHours(0,0,0,0), buildingType, '');
    return response;
}

export function Results() {
    // const { inputValue, setInputValue, dateRange, setDateRange } = useCity_dateStore();
    const searchParams = useLoaderData();
    // console.log(searchParams);

    return (
        <div>
           
        </div>
    )
}
Results.loader = loader;