import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage({ setUser, newUser }) {
  return (
    <main>  
      <h1>AuthPage</h1>
      {
        newUser ?
          <SignUpForm setUser={ setUser } />
        :
          <LoginForm setUser={ setUser } />
      }
    </main>
  )
}
