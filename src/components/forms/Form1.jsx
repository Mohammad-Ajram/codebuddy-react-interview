import { Input, Label, FormFeedback } from 'reactstrap';

const Form1 = ({ form1Validation }) => {
  const { emailId, password } = form1Validation.values;
  return (
    <>
      <h2>Form1</h2>
      <Label className="required">Email Id</Label>
      <Input
        name="emailId"
        type="text"
        value={emailId}
        onChange={form1Validation.handleChange}
        invalid={!!(form1Validation.touched.emailId && form1Validation.errors.emailId)}
      />
      <FormFeedback>
        {form1Validation.touched.emailId && form1Validation.errors.emailId
          ? form1Validation.errors.emailId
          : ''}
      </FormFeedback>
      <Label className="required">Password</Label>
      <Input
        name="password"
        type="password"
        value={password}
        onChange={form1Validation.handleChange}
        invalid={!!(form1Validation.touched.password && form1Validation.errors.password)}
      />
      <FormFeedback>
        {form1Validation.touched.password && form1Validation.errors.password
          ? form1Validation.errors.password
          : ''}
      </FormFeedback>
    </>
  );
};

export default Form1;
