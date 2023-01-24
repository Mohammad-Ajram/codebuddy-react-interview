import { Input, Label, FormFeedback } from 'reactstrap';
// Utility
import { allowOnlyNumerics } from '../../utility/commonutility';

const Form2 = ({ form3Validation }) => {
  const { countryCode, phoneNumber, acceptTermsAndCondition } = form3Validation.values;
  const handleTermsAndConditionChange = e => {
    form3Validation.setValues(prev => ({
      ...prev,
      acceptTermsAndCondition: e.target.checked,
    }));
  };

  return (
    <>
      <h2>Form 3</h2>
      <Label className="required">Country Code</Label>
      <Input
        name="countryCode"
        type="select"
        value={countryCode}
        onChange={form3Validation.handleChange}
        invalid={!!(form3Validation.touched.countryCode && form3Validation.errors.countryCode)}
      >
        <option value="">Select</option>
        <option>India (+91)</option>
        <option>America (+1)</option>
      </Input>
      <FormFeedback>
        {form3Validation.touched.countryCode && form3Validation.errors.countryCode
          ? form3Validation.errors.countryCode
          : ''}
      </FormFeedback>
      <Label className="required">Phone Number</Label>
      <Input
        name="phoneNumber"
        type="number"
        value={phoneNumber}
        onChange={form3Validation.handleChange}
        invalid={!!(form3Validation.touched.phoneNumber && form3Validation.errors.phoneNumber)}
        onKeyDown={allowOnlyNumerics}
        onWheel={e => e.target.blur()}
      />
      <FormFeedback>
        {form3Validation.touched.phoneNumber && form3Validation.errors.phoneNumber
          ? form3Validation.errors.phoneNumber
          : ''}
      </FormFeedback>
      <div className="d-flex align-items-center mt-2">
        <Input
          className="my-0 me-2"
          name="acceptTermsAndCondition "
          type="checkbox"
          checked={acceptTermsAndCondition}
          onChange={handleTermsAndConditionChange}
          invalid={
            !!(
              form3Validation.touched.acceptTermsAndCondition &&
              form3Validation.errors.acceptTermsAndCondition
            )
          }
        />
        <Label className="my-0">Accept Terms and Conditions</Label>
      </div>
      <FormFeedback>
        {form3Validation.touched.acceptTermsAndCondition &&
        form3Validation.errors.acceptTermsAndCondition
          ? form3Validation.errors.acceptTermsAndCondition
          : ''}
      </FormFeedback>
    </>
  );
};

export default Form2;
