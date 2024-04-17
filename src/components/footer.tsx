import Hr from "./hr";

export default function Footer() {
  return (
    <>
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
          . Fork me on{" "}
          <a
            href="https://github.com/jamesondh/notesforthe.day"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </>
  );
}
