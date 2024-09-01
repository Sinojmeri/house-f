import { useLoaderData } from "react-router-dom";

async function loader({ params }) {
    const id = params.propertyId
    return id;
}

export function HouseDetails() {
    const id = useLoaderData();

    return (
        <div className="flex flex-col">
            <h1 className="self-center font-bold text-blue-500 text-2xl">House title</h1>
            <div className="flex flex-col my-2">
                <div className="my-2 flex gap-2 items-center">
                    <p className="font-bold">Basic House Details</p>
                    <button className="p-1 font-bold text-blue-500 border-2 border-gray-200 rounded-md hover:bg-gray-200">Edit</button>
                </div>
                <div className="my-2">
                    <p>House Title</p>
                    <p className="rounded-md  text-2xl text-blue-500 underline">House title</p>
                </div>
                <div>
                    <p>House Address</p>
                    <address>House address</address>
                </div>

            </div>
            {id}
        </div>
    )
}

HouseDetails.loader = loader