import { useState, useMemo, useRef } from 'react';
import { Container, Button, Nav, NavItem, NavLink } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import Form1 from '../components/forms/Form1';
import Form2 from '../components/forms/Form2';
import Form3 from '../components/forms/Form3';

function getActiveForm(activeFormId) {
  switch (activeFormId) {
    case 1:
      return Form1;
    case 2:
      return Form2;
    case 3:
      return Form3;
    default:
      return null;
  }
}

const Home = () => {
  const [activeFormId, setActiveFormId] = useState(1);
  const navigate = useNavigate();
  const gotToNextStep = useRef(false);

  const [isFormsVisited, setIsFormsVisited] = useState({
    form1: true,
    form2: false,
    form3: false,
  });

  const form1Validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      emailId: '',
      password: '',
    },
    validationSchema: Yup.object({
      emailId: Yup.string().required('Email is required').email('Provide valid email'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[0-9]){2})(?=(.*[-+_!@#$%^&*.,?]){2})/,
          'Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
        ),
    }),
    onSubmit: () => {
      setIsFormsVisited(prev => ({ ...prev, form2: true }));
      if (gotToNextStep.current) {
        setActiveFormId(2);
      }
    },
  });

  const form2Validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First Name is required')
        .min(2, ' First Name should contain minimum 2 character')
        .max(50, 'First Name can contain maximum 50 character'),
      address: Yup.string()
        .required('Address is required')
        .min(10, 'Address should be minimum of length 10'),
    }),
    onSubmit: () => {
      setIsFormsVisited(prev => ({ ...prev, form3: true }));
      if (gotToNextStep.current) {
        setActiveFormId(3);
      }
    },
  });

  const form3Validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      countryCode: '',
      phoneNumber: '',
      acceptTermsAndCondition: true,
    },
    validationSchema: Yup.object({
      countryCode: Yup.string().required('Please select country code'),
      phoneNumber: Yup.string()
        .required('Phone Number is required')
        .min(10, 'Provide 10 digit phone number')
        .max(10, 'Provide 10 digit phone number'),
      acceptTermsAndCondition: Yup.boolean().oneOf([true], 'Please accept terms and conditions'),
    }),
    onSubmit: () => {
      const payload = {
        ...form1Validation.values,
        ...form2Validation.values,
        ...form3Validation.values,
      };
      delete payload.acceptTermsAndCondition;
      const options = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      fetch(`${process.env.REACT_APP_API_URL}/submit`, options)
        .then(data => {
          if (!data.ok) {
            throw Error(data.status);
          }

          return data.json();
        })
        .then(res => {
          if (res.message === 'Success') navigate('/posts');
        })
        .catch(() => {
          //
        });
    },
  });

  const saveClickHandler = shouldGoToNext => {
    gotToNextStep.current = shouldGoToNext;
    if (activeFormId === 1) form1Validation.handleSubmit();
    else if (activeFormId === 2) form2Validation.handleSubmit();
    else if (activeFormId === 3) form3Validation.handleSubmit();
  };

  const backClickHandler = () => {
    setActiveFormId(prev => prev - 1);
  };

  const toggleForm = id => {
    if (id === 1 && isFormsVisited.form1) setActiveFormId(1);
    else if (id === 2 && isFormsVisited.form2) setActiveFormId(2);
    else if (id === 3 && isFormsVisited.form3) setActiveFormId(3);
  };

  const ActiveForm = useMemo(() => getActiveForm(activeFormId), [activeFormId]);

  return (
    <main>
      <Container>
        <h2 className="text-center mb-4">Multi-step form</h2>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={`${classnames({
                active: activeFormId === 1,
                'show-cursor-pointer': isFormsVisited.form1,
                'show-cursor-not-allowed': !isFormsVisited.form1,
              })}`}
              onClick={() => {
                toggleForm(1);
              }}
            >
              Form 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeFormId === 2,
                'show-cursor-pointer': isFormsVisited.form2,
                'show-cursor-not-allowed': !isFormsVisited.form2,
              })}
              onClick={() => {
                toggleForm(2);
              }}
            >
              Form 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeFormId === 3,
                'show-cursor-pointer': isFormsVisited.form3,
                'show-cursor-not-allowed': !isFormsVisited.form3,
              })}
              onClick={() => {
                toggleForm(3);
              }}
            >
              Form 3
            </NavLink>
          </NavItem>
        </Nav>
        <Form className="pt-5">
          <ActiveForm
            form1Validation={form1Validation}
            form2Validation={form2Validation}
            form3Validation={form3Validation}
          />
          <div className="d-flex justify-content-center mt-4">
            <Button
              type="button"
              className="me-2"
              onClick={backClickHandler}
              disabled={activeFormId === 1}
            >
              Back
            </Button>
            <Button
              type="button"
              className="me-2"
              color="primary"
              onClick={() => saveClickHandler(false)}
            >
              Save
            </Button>
            <Button
              type="button"
              className="me-2"
              color="primary"
              onClick={() => saveClickHandler(true)}
              disabled={activeFormId === 3}
            >
              Save and Next
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default Home;
