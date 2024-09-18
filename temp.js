// <div>
//   <div
//     className="house-info flex flex-col bg-white ml-1 items-center md:items-start"
//     ref={houseInfo}
//     tabIndex={-1}
//   >
//     <h1 className="font-bold text-2xl text-blue-500">
//       Enter house information:
//     </h1>
//     {Object.keys(houseInformation).map((info) =>
//       info === 'location' ? (
//         <div
//           className="flex gap-2 items-center justify-between w-[300px] my-2"
//           key={info}
//         >
//           <p className="w-[100%]">
//             {`${info[0].toUpperCase()}${info.slice(1)}`}:
//           </p>
//           <div className="flex flex-col w-[200px] gap-1">
//             <input
//               name="lat"
//               type="number"
//               className="p-1 text-start border-2 border-gray-200 rounded-lg "
//               placeholder="Lat"
//               onBlur={() => checkFormCompletion()}
//               value={houseInformation.location[0]}
//               onChange={handleHouseInformation}
//             />
//             <input
//               name="long"
//               type="number"
//               className="p-1 text-start border-2 border-gray-200 rounded-lg "
//               placeholder="Long"
//               onBlur={() => checkFormCompletion()}
//               onChange={handleHouseInformation}
//               value={houseInformation.location[1]}
//             />
//             <button
//               type="number"
//               className="p-1 text-center border-2 border-gray-200 rounded-lg hover:bg-gray-100"
//               onClick={() => {
//                 setHouseInformation((prev) => {
//                   return {
//                     ...prev,
//                     location: [myLocation.lat, myLocation.lng],
//                   };
//                 });
//               }}
//             >
//               Get Current Location
//             </button>
//           </div>
//         </div>
//       ) : info === 'property_type' ? (
//         <div
//           className="flex justify-between gap-2 items-center w-[300px] my-2"
//           key={info}
//         >
//           <p className="shrink">
//             {`${info.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}`}
//             :
//           </p>
//           <select
//             name="property_type"
//             className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px] box-content md:box-border"
//             onChange={(e) => {
//               handleHouseInformation(e);
//               checkFormCompletion();
//               setPhotos([]);
//             }}
//             value={houseInformation.property_type}
//           >
//             <option value="House">House</option>
//             <option value="Hotel">Hotel</option>
//             <option value="Villa">Villa</option>
//             <option value="Office">Office</option>
//           </select>
//         </div>
//       ) : (
//         <div
//           className="flex justify-between gap-2 items-center w-[300px] my-2"
//           key={info}
//         >
//           <p className="w-[100%]">
//             {`${info.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}`}
//             :
//           </p>
//           <input
//             name={`${info}`}
//             type="text"
//             className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px]"
//             onBlur={() => checkFormCompletion()}
//             onChange={handleHouseInformation}
//             value={houseInformation.info}
//           />
//         </div>
//       ),
//     )}
//   </div>

//   {formCompleted && (
//     <div className="relative flex flex-col bg-white ml-1 my-3 items-center md:items-start transition-opacity duration-700 ease-in-out opacity-100">
//       <h1 className="font-bold text-2xl text-blue-500">
//         Enter {houseInformation.property_type} Amenities:
//       </h1>
//       {Object.keys(getAmenities()).map((amenity) => (
//         <div
//           className="flex gap-2 items-center justify-between w-[300px] my-2"
//           key={amenity}
//         >
//           <p className="p-1 w-[250px]">{amenity.replace(/_/g, ' ')}</p>
//           {
//             ['Number_of_Rooms', 'Number_of_Beds', 'Number_of_Bathrooms'].includes(amenity) ?
//             (
//               <input
//                 type='number'
//                 name={amenity}
//                 className='border-2 border-black cursor-pointer mt-[2px]'
//                 onChange={(e) =>
//                   handleAmenities(e, houseInformation.property_type)}
//               />
//             )
//             :
//             (
//               <input
//                 type="checkbox"
//                 name={amenity}
//                 className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
//                 checked={getAmenities()[amenity]}
//                 onChange={(e) =>
//                   handleAmenities(e, houseInformation.property_type)
//                 }
//               />
//             )
//           }
//         </div>
//       ))}

//       <input
//         value={price}
//         type="number"
//         className="cursor-pointer border-2 border-gray-400 rounded-lg w-[300px] p-1 "
//         placeholder="Price: €"
//         step={0.1}
//         title="Price in €"
//         max={1500}
//         onChange={(e) => setPrice(+e.target.value)}
//       />
//       <div className="md:absolute md:right-5 md:top-5 my-7 md:my-0 p-2 bg-gray-100 border border-gray-300 rounded-lg">
//         <h1 className="font-bold text-2xl text-blue-500">
//           Upload Property Photos
//         </h1>
//         <input
//           type="file"
//           className="my-3 cursor-pointer"
//           multiple
//           onChange={handlePhotoUpload}
//           style={{ color: 'transparent' }}
//         />
//         <div className="grid grid-cols-3 grid-rows-2">
//           {photos.slice(0, 5).map((photo, index) => (
//             <div key={URL.createObjectURL(photo)} className="p-1">
//               <button
//                 onClick={() => {
//                   setPhotos((prevPhotos) =>
//                     prevPhotos.filter((_, i) => i !== index),
//                   );
//                 }}
//               >
//                 X
//               </button>
//               <img
//                 key={index}
//                 src={URL.createObjectURL(photo)}
//                 alt="Uploded photo"
//                 className="w-[70px] h-[70px]"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <button className="self-center p-1 hover:bg-gray-200 border-2 border-black rounded-md text-blue-500 text-xl font-bold"
//         onClick={() => {
//           createListing({
//             auth_token: token,
//             coordinates: houseInformation.location,
//             title: houseInformation.house_name,
//             address: houseInformation.address,

//           })
//         }}
//       >
//         Upload House
//       </button>
//     </div>
//   )}
// </div>
