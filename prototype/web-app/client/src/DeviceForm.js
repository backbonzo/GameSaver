import React from 'react';

export const DeviceForm = () => {
  return (
    <form className="device-form">
      <label htmlFor="title" required>Title</label>
      <input name="title" />
      <label htmlFor="description">Description</label>
      <textarea name="description" ></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" />

    </form>
    );
};

export default DeviceForm;