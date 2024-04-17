import Hr from "./hr";

export default function Footer() {
  return (
    <div className="mt-4">
      <Hr />
      <footer className="text-center text-sm text-gray-500">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://jamesonhodge.com"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Jameson Hodge
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
