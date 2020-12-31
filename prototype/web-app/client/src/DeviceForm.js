import React from 'react';
import { useForm } from 'react-hook-form';

import { createDeviceMarker } from './API';

export const DeviceForm = ({ location }) => {
  // use react-hook-form to send data to API as POST
  const { register, handleSubmit } = useForm();

  // Func onSubmit
  const onSubmit = async (data) => {
    try {
      // Assign data from DeviceForm component in app.js to variables inside of this func
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      // below use function createDeviceMarker inside of API
      const created = await createDeviceMarker(data);
      console.log(created);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // This is the device form component we are exporting
    // ref register is the "route" to useForm()
    <form onSubmit={handleSubmit(onSubmit)} className="device-form">
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={2} ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register}/>
      <button>Create Device Marker</button>
    </form>
    );
};

export default DeviceForm;
