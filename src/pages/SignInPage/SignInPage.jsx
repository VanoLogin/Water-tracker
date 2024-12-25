import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthFrom/AuthForm'
import { logIn } from '../../redux/auth/operations'

import css from './SignInPage.module.css'
import { Section } from '../../components/Section/Section'
import { Container } from '../../components/Container/Container'

export default function SignInPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignin = (values, { setSubmitting }) => {
    dispatch(logIn(values)).then((result) => {
      if (logIn.fulfilled.match(result)) {
        navigate('/home') 
      }
      setSubmitting(false)
    })
  }

  return (
    <Section className={css.section}>
      <Container className={css.container}>
        <div className={css.block}>
          <h2 className={css.title}>Sign In</h2>
          <AuthForm type="signin" onSubmit={handleSignin} />
        </div>
      </Container>
      <div className={css.bottle}></div>
    </Section>
  )
}