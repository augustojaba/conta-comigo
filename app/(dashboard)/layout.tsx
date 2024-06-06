import Header from "@/components/header";

type Props = {
  children: React.ReactNode;
};

export default function layout({children}: Props) {
  return (
    <>
      <Header></Header>
      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>

  )
}