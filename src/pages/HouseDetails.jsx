import { Link, useLoaderData } from "react-router-dom";
import { getOneListing } from "../controllers/listingApis";

async function loader({ params }) {
    const id = params.propertyId;
    const property = await getOneListing(id);
    return property;
}

export function HouseDetails() {
    const property = useLoaderData();

    return (
        <div className="flex flex-col">
            <h1 className="self-center font-bold text-blue-500 text-2xl">House title</h1>
            <div className="flex flex-col my-2">
                <div className="my-2 flex gap-2 items-center">
                    <p className="font-bold">Basic House Details</p>
                    <Link to={`/properties/${property._id}/edit`}>
                        <button className='p-1 font-bold text-blue-500 border-2 border-gray-200 rounded-md hover:bg-gray-200'>
                            Edit
                        </button>
                    </Link>
                </div>
                <div className="my-2">
                    <p className="underline">House Title</p>
                    <p className="rounded-md text-2xl text-blue-500 ">{property.title}</p>
                </div>
                <div className="my-2">
                    <p className="underline">House Address</p>
                    <address>{property.address}</address>
                </div>
                <div className="my-2">
                    <p className="underline">House Price</p>
                    <p>{property.price} Euro</p>
                </div>
            </div>
        </div>
    );
}

HouseDetails.loader = loader;
