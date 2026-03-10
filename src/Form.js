import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup'

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
                <label htmlFor="name">Your name</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component='div'/>
                <label htmlFor="email">Your email</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className="error" name="email" component='div'/>
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component='div'/>
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
                <label htmlFor="text">Your message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
               <ErrorMessage className="error" name="text" component='div'/>
                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox" />
                    Do you agree with the privacy policy?
                </label>
                <ErrorMessage className="error" name="terms" component='div'/>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;