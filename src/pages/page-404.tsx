import Header from "../components/header";

export default function Page404() {
  return (
    <>
      <Header />
      <div className="my-20 text-center">
        <p>404 - Page Not Found</p>
        <p>
          <a className="underline" href="/">
            Go to today
          </a>
        </p>
      </div>
    </>
  );
}
