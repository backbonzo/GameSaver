import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createDeviceMarker } from './API';

// call location and onClose to pass as prop to component
export const DeviceForm = ({ location, onClose }) => {
  // set state to false and once we make the POSTchange state to true
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // use react-hook-form to send data to API as POST
  const { register, handleSubmit } = useForm();

  // Func onSubmit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Assign data from DeviceForm component in app.js to variables inside of this func
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      // below use function createDeviceMarker inside of API
      await createDeviceMarker(data);
      onClose(); //this calls the function IN the PARENT
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (

  // This is the device form component we are exporting
  // ref register is the "route" to useForm()
  <form onSubmit={handleSubmit(onSubmit)} className="device-form">
    {/* Below syntax say that IF error(true) then show H3 with error ELSE show null/nothing */}
    { error ? <h3 className="error">{error}</h3> : null}
    <label htmlFor="apiKey">API KEY</label>
    <input type="password" name="apiKey" required ref={register} />
    <label htmlFor="title">Title</label>
    <input name="title" required ref={register} />
    <label htmlFor="description">Description</label>
    <textarea name="description" rows={2} ref={register}></textarea>
    <label htmlFor="image">Image</label>
    <input name="image" ref={register}/>
    {/* Disable button if we are loading */}
    <button disabled={loading} >{loading ? 'Loading...' : 'Create Device Marker'}</button>
  </form>
  );
};

export default DeviceForm;
