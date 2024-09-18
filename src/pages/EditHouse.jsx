import { useLoaderData, useNavigate, Form } from 'react-router-dom';
import { useState } from 'react';
import {
  addPhotosForListing,
  getOneListing,
  updateListing,
} from '../controllers/listingApis';
import { BackButton } from '../components/BackButton';

async function loader({ params }) {
  const id = params.propertyId;
  const property = await getOneListing(id);
  console.log(property);

  return property;
}

export function EditHouse() {
  const property = useLoaderData();
  const BASE_URL = "http://localhost:5000/static/";
  const [fieldValues, setFieldValues] = useState({
    title: property.title,
    address: property.address,
    price: property.price,
  });
  const [photos, setPhotos] = useState(
    property.images.map((image) => image.img),
  );

  const handleFieldData = (event) => {
    const { name, value } = event.target;
    setFieldValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPhotosForListing({ listingId: property._id, photos });
      navigate(-1);
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BackButton />
      <div className="bg-white shadow-md rounded-lg p-6 my-6">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">
          Edit Property
        </h2>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">House Title</label>
          <input
            className="w-full border-2 rounded-lg p-3 text-lg"
            name="title"
            value={fieldValues.title}
            onChange={handleFieldData}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            House Address
          </label>
          <input
            type="text"
            name="address"
            className="w-full border-2 rounded-lg p-3 text-lg"
            value={fieldValues.address}
            onChange={handleFieldData}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            House Price ($)
          </label>
          <input
            type="number"
            name="price"
            className="w-full border-2 rounded-lg p-3 text-lg"
            value={fieldValues.price}
            onChange={handleFieldData}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={async () => {
            await updateListing(property._id, fieldValues);
            navigate(-1);
          }}
        >
          Save Changes
        </button>
      </div>

      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">
          Upload New Property Photos
        </h2>
        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handlePhotoSubmit}
        >
          <input
            type="file"
            name="photos"
            className="block w-full mb-3 cursor-pointer border border-gray-300 p-3 rounded-lg"
            multiple
            onChange={handlePhotoUpload}
          />

          <div className="grid grid-cols-3 gap-4">
            {photos.slice(0, 5).map((photo, index) => (
              <div key={index} className="relative w-fit">
                <button
                  className="absolute right-0 bg-red-500 opacity-70 text-white p-1 rounded-full"
                  onClick={() =>
                    setPhotos((prevPhotos) =>
                      prevPhotos.filter((_, i) => i !== index),
                    )
                  }
                >
                  X
                </button>
                <img
                  src={photo instanceof File ? URL.createObjectURL(photo) : `${BASE_URL}${photo}`}
                  alt="Uploaded photo"
                  className=" h-[200px] object-cover rounded-lg border border-gray-300"
                />

              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
          Submit Photos
        </button>
      </Form>
    </div>
    </div >
  );
}

EditHouse.loader = loader;
