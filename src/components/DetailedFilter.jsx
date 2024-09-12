import { Form } from "react-router-dom";
import { useState } from "react";
export function DetailedFilter() {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [propertyType, setPropertyType] = useState();
    const [houseAmenities, setHouseAmenities] = useState({
        Netflix: false,
        Wi_Fi: false,
        Free_Parking: false,
        Pool: false,
        Air_Conditioning: false,
        Laundry: false,
        Balcony: false,
    });
    const [hotelAmenities, setHotelAmenities] = useState({
        Swimming_pool: false,
        Fitness_center: false,
        Spa_treatments: false,
        Restaurant_and_bar: false,
        Room_service: false,
        Laundry_service: false,
        Wi_Fi: false,
        Rooftop_pool: false,
        Private_beach_access: false,
        In_room_dining: false,
        Number_of_Beds: 1,
        Number_of_Rooms: 1,
    });
    const [villasAmenities, setVillasAmenities] = useState({
        Private_pool: false,
        Kitchen: false,
        Laundry_facilities: false,
        Garden: false,
        Barbecue_grill: false,
        Parking: false,
        Home_Theater: false,
        Game_room: false,
        Wine_cellar: false,
        Personal_chef: false,
        Guest_house: false,
        Panoramic_View: false,
        Number_of_Bathrooms: 1,
        Number_of_Rooms: 1,
    });
    const [officeAmenities, setOfficeAmenities] = useState({
        Meeting_rooms: false,
        Conference_rooms: false,
        Shared_workspace: false,
        Kitchenette: false,
        Wi_Fi: false,
        Copie_printer_scanner: false,
        Reception_area: false,
        Panoramic_views: false,
        Café_or_restaurant: false,
        Rooftop_terrace: false,
        Secure_parking: false,
        Number_of_Bathrooms: 1,
    });

    const amenities = propertyType === "house"
        ? houseAmenities
        : propertyType === "hotel"
            ? hotelAmenities
            : propertyType === "villa"
                ? villasAmenities
                : propertyType === "office"
                    ? officeAmenities
                    : {};

    return (
        <div className="">
            <Form method="get" action="/">
                <p className="mt-4">
                    {`Price: ${minPrice} - ${maxPrice} €`}
                </p>
                {/* Min and Max Price Fields */}
                <div className="mt-4">
                    <label className="block">Min Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-4">
                    <label className="block">Max Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                {/* Select Property Div */}
                <div className="mt-4">
                    <label className="block">Select a property type</label>
                    <select
                        name="propertyType"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="house">House</option>
                        <option value="hotel">Hotel</option>
                        <option value="villa">Villa</option>
                        <option value="office">Office</option>
                    </select>
                </div>
                {/* Amenities according to property type */}
                {propertyType && (
                    <div className="mt-4">
                        <label className="block">Property Amenities</label>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.keys(amenities).map((amenity) => (
                                <div key={amenity} className="flex items-center">
                                    <input type="checkbox" name={amenity} />
                                    <label className="ml-2">{amenity.replace(/_/g, " ")}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </Form>
        </div>
    )
}