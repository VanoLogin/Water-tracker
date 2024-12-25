import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../redux/auth/operations'
import AuthForm from '../../components/AuthFrom/AuthForm'

import css from './SignUpPage.module.css'
import { Section } from '../../components/Section/Section'
import { Container } from '../../components/Container/Container'

export default function SignUpPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = (values, { setSubmitting }) => {
    const { repeatPassword, ...signupData } = values

    dispatch(register(signupData)).then((result) => {
      if (register.fulfilled.match(result)) {
        navigate('/signin')
      }
      setSubmitting(false)
    })
  }

  return (
    <Section className={css.section}>
      <Container className={css.container}>
        <div className={css.block}>
          <h2 className={css.title}>Sign Up</h2>
          <AuthForm type="signup" onSubmit={handleSignup} />
        </div>
      </Container>
      <div className={css.bottle}></div>
    </Section>
  )
}