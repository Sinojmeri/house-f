import { useLoaderData } from "react-router-dom";

async function loader({ params }) {
    const id = params.propertyId
    return id;
}

export function HouseDetails() {
    const id = useLoaderData();
    
    return (
        <div>
            {id}
        </div>
    )
}

HouseDetails.loader = loader