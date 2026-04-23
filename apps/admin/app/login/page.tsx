import { Card } from '@vortx/ui/card'
import { LoginForm } from './form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your VX Admin account
            </p>
          </div>

          <LoginForm onSuccess={() => {
            // TODO: Redirect to dashboard on successful login
            console.log('Login successful')
          }} />
        </div>
      </Card>
    </div>
  )
}
