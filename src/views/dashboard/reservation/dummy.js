import React, { useState } from 'react';

function MyForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // submit form data here
    setIsSubmitted(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input field:
        <input type="text" disabled={isSubmitted} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}



<Col md='6' sm='12' className='mb-1'>
<div className="mb-1">
  <Label className="form-label" for="negotiated">
  Negotiated ID
  </Label>
  <Controller
    id="negotiated"
    control={control}
    name="negotiated"
    render={({ field }) => (
      <Select
        required
        isClearable
        options={negotiated}
        classNamePrefix="select"
        theme={selectThemeColors}
        className={classnames("react-select", {
          "is-invalid": data !== null && data.negotiated === null,
        })}
        {...field}
      />
    )}
  />
</div>
</Col>


