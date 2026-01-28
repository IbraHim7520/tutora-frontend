import { SignupForm } from '@/components/signup-form';

const Signuppage = () => {
    return (
    <div className="bg-sky-50 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
    );
};

export default Signuppage;