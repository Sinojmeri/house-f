import { useLoaderData, useNavigate, Form } from 'react-router-dom';
import { useState } from 'react';
import { addPhotosForListing, getOneListing, updateListing } from '../controllers/listingApis';
import { BackButton } from '../components/BackButton';

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
    price: property.price,
  });
  const [photos, setPhotos] = useState([]);

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
        const data = await addPhotosForListing({ listingId: property._id, photos });
        console.log('Photos submitted:', data);
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
          action="/list-your-properties/manage-properties"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name='photos'
            className="block w-full mb-3 cursor-pointer border border-gray-300 p-3 rounded-lg"
            multiple
            onChange={handlePhotoUpload}
          />

          <div className="grid grid-cols-3 gap-4">
            {photos.slice(0, 5).map((photo, index) => (
              <div key={index} className="relative group">
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full group-hover:scale-110 transition-transform"
                  style={{ transform: 'translate(0%, -50%)' }}
                  onClick={() =>
                    setPhotos((prevPhotos) =>
                      prevPhotos.filter((_, i) => i !== index),
                    )
                  }
                >
                  X
                </button>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={handlePhotoSubmit}
          >
            Submit Photos
          </button>
        </Form>
      </div>
    </div>
  );
}

EditHouse.loader = loader;
