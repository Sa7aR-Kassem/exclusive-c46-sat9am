"use client";
export default function error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h2 className="">Something went wrong</h2>
      <p className="text-red-600 ">{error.message}</p>
    </div>
  );
}
