import { Input, Label, FormFeedback } from 'reactstrap';
// Utility
import { allowOnlyAlphabets } from '../../utility/commonutility';

const Form2 = ({ form2Validation }) => {
  const { firstName, lastName, address } = form2Validation.values;
  return (
    <>
      <h2>Form 2</h2>
      <Label className="required">First Name</Label>
      <Input
        name="firstName"
        type="text"
        value={firstName}
        onChange={form2Validation.handleChange}
        invalid={!!(form2Validation.touched.firstName && form2Validation.errors.firstName)}
        onKeyDown={allowOnlyAlphabets}
      />
      <FormFeedback>
        {form2Validation.touched.firstName && form2Validation.errors.firstName
          ? form2Validation.errors.firstName
          : ''}
      </FormFeedback>
      <Label>Last Name</Label>
      <Input
        name="lastName"
        type="lastName"
        value={lastName}
        onChange={form2Validation.handleChange}
        invalid={!!(form2Validation.touched.lastName && form2Validation.errors.lastName)}
        onKeyDown={allowOnlyAlphabets}
      />
      <FormFeedback>
        {form2Validation.touched.lastName && form2Validation.errors.lastName
          ? form2Validation.errors.lastName
          : ''}
      </FormFeedback>
      <Label className="required">Address</Label>
      <Input
        name="address"
        type="address"
        value={address}
        onChange={form2Validation.handleChange}
        invalid={!!(form2Validation.touched.address && form2Validation.errors.address)}
      />
      <FormFeedback>
        {form2Validation.touched.address && form2Validation.errors.address
          ? form2Validation.errors.address
          : ''}
      </FormFeedback>
    </>
  );
};

export default Form2;
