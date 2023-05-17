import './style.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup';

function App() {
  Yup.addMethod(Yup.string, 'endWithCode', function () {
    return this.test('endWithCode', 'Domain shouls end with @code.edu.az', function (value) {
      if (!value) return true;
      const codeEduAxPattern = /^[A-Za-z0-9._%+-]+@code\.edu\.az$/;
      return codeEduAxPattern.test(value);
    });
  });
  Yup.addMethod(Yup.string, 'capitalFirstLetter', function () {
    return this.test('capitalFirstLetter', 'First letter must be capitalized', function (value) {
      if (!value) return true;

      const capitalFirstLetterPattern = /^[A-Z]/;

      return capitalFirstLetterPattern.test(value);
    });
  });
  const formValidation = Yup.object().shape({
    name: Yup.string()
      .required("Please enter your name").max(50, "Name should be less than 50 chatacters"),
    email: Yup.string().required('You should enter email').email().endWithCode(),
    password: Yup.string().required('Enter password').min(8, 'Password shoul have at least 8 symbols').capitalFirstLetter(),
    confirmPass: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')


  })
  const formik = useFormik({
    initialValues: {

      gender: 'Female',


    },
    validationSchema: formValidation,
    onSubmit: values => {
      console.log(values);


    }
  })
  return (
    <div className="App">
      <div className='container'>
        <h1>Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <>
            <div className='formChild'>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
              <p style={{ color: 'red' }}>{formik.errors?.name}</p>
            </div>
            <div className='formChild'>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
              <p style={{ color: 'red' }}>{formik.errors?.email}</p>
            </div>
            <div className='radioGroup'>
              <label htmlFor="gender">Gender :</label>
              <input type='radio' name='gender' value='Male' checked={formik.values.gender === 'Male'}
                onChange={formik.handleChange} />Male
              <input type='radio' name='gender' value='Female' checked={formik.values.gender === 'Female'}
                onChange={formik.handleChange} />Female


            </div>
            <div className='formChild'>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
              <p style={{ color: 'red' }}>{formik.errors?.password}</p>
            </div>
            <div className='formChild'>
              <label htmlFor="confirmPass">Confirm password</label>
              <input id="confirmPass" name="confirmPass" type="password" onChange={formik.handleChange} value={formik.values.confirmPass} />
              <p style={{ color: 'red' }}>{formik.errors?.confirmPass}</p>
            </div>
            <div>

              <input type="submit" value="Submit" />
            </div>
          </>

        </form>


      </div>

    </div>
  );
}

export default App;
