import { useLoaderData, useNavigate } from "react-router-dom";
import { getOneListing } from "../controllers/listingApis";
import { useState } from "react";
import { updateListing } from "../controllers/listingApis";
async function loader({ params }) {
    const id = params.propertyId;
    const property = await getOneListing(id);
    return property;
}


export function EditHouse() {
    const property = useLoaderData();
    const [fieldValues, setFieldValues] = useState({
        title: property.title,
        address: property.address,
        price: property.price
    });

    const handleFieldData = (event) => {
        const { name, value } = event.target;
        setFieldValues((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const navigate = useNavigate();
    return (
        <div>
            <div className="my-2">
                <p className="underline">House Title</p>
                <input className="rounded-md text-2xl text-blue-500 border-2 p-1" name="title" value={fieldValues.title} onChange={handleFieldData} />
            </div>
            <div className="my-2">
                <p className="underline">House Address</p>
                <input type="text" name="address" className="border-2 p-1" value={fieldValues.address} onChange={handleFieldData} />
            </div>
            <div className="my-2">
                <p className="underline">House Price</p>
                <input type="number" name="price" className="p-1 border-2" value={fieldValues.price} onChange={handleFieldData} />
            </div>
            <button onClick={async () => {
                await updateListing(property._id, fieldValues)
                navigate('../')
            }}>Save</button>
        </div>
    )
}

EditHouse.loader = loader;