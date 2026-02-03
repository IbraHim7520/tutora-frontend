"use client"
import { SignupForm } from '@/components/signup-form';
import { useSearchParams } from 'next/navigation';

const CreateAccountPage = () => {
      const searchParams = useSearchParams();
  const role = searchParams.get("role"); 
  console.log(role)
  return (
    <div className="bg-sky-50 flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm role={role as string}/>
      </div>
    </div>
  );
};

export default CreateAccountPage;
