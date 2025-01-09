import LoginForm from "@/components/Auth/LoginForm";
import { Message } from "@/components/form-message";
export default function SignInPage(props: { searchParams: Message }) {
  const searchParams = props.searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm searchParams={searchParams} />
      </div>
    </div>
  );
}
