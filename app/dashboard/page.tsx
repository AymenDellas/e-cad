// app/dashboard/page.tsx
import MainContent from "@/components/MainContent";

const Page = () => (
  <main className="font-poppins ">
    <div className="relative mb-20 lg:mb-8">
      <div className="absolute inset-0 opacity-50 -z-10">
        <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>
      <MainContent />
    </div>
  </main>
);
export default Page;
