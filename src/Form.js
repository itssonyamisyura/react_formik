import { Formik, Form, ErrorMessage, Field, useField } from "formik";
import * as Yup from 'yup'


const MyTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckbox = ({children, ...props}) => {

    const [field, meta] = useField({...props, type: 'checkbox'});

    return (
        <>
            <label className="checkbox">
                <input type='checkbox' {...props} {...field}/>
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
};

// ...props = id, name.....
// field = props(onChange, onBlur, value), 
// meta = metadata with errors and if input has already been used

const CustomForm = () => {

    return (
        <Formik 
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, 'At least 2 characters')
                        .required('Required field'),
                email: Yup.string()
                        .email('Invalid email address')
                        .required('Required field'),
                amount: Yup.number()
                        .min(5, 'At least 5')
                        .required('Required field'),
                currency: Yup.string().required('Select currency'),
                text: Yup.string()
                        .min(5, 'At least 5 characters'),
                terms: Yup.boolean()
                        .required('You have to accept the privacy policy')
                        .oneOf([true], 'You have to accept the privacy policy')
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
            >
            <Form className="form">
                <h2>Send a donation</h2>
                {/* <label htmlFor="name">Your name</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component='div'/> */}
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                />
                <MyTextInput
                    label="Amount"
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Select currency</option>
                        <option value="USD">USD</option>
                        <option value="CZK">CZK</option>
                        <option value="EUR">EUR</option>
                </Field>
                <ErrorMessage className="error" name="currency" component='div'/>
               <MyTextInput
                    label="Your message"
                    id="text"
                    name="text"
                    as="textarea"
                />
                <MyCheckbox
                    name="terms">
                        Do you agree with the privacy policy?
                </MyCheckbox>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;