import { Link } from "react-router-dom";
import Header from "../components/header";

export default function About() {
  return (
    <>
      <Header />
      <div className="my-10">
        <p>
          <span className="zilla-slab text-lg">NotesForThe.Day</span> is your
          daily organizer. Every day, your template is applied and you can fill
          out your notes, reflections, to-do items, and scheduled events. You
          can{" "}
          <Link to="/edit-template" className="underline">
            edit your template
          </Link>{" "}
          to suit your preferences. You can even use{" "}
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            className="underline"
          >
            Markdown
          </a>{" "}
          to format your notes with images, links, and more.
        </p>
        <p className="mt-10">
          Currently, your data never leaves your device and is stored inside
          your browser only.
        </p>
        <p className="mt-10">Coming soon: </p>
        <ul className="list-disc ml-5">
          <li>Sync your data across devices</li>
          <li>Label your checkbox items with words, colors, and times</li>
          <li>
            Calendar features (calendar view, import, export, sync with Google
            Calendar, etc.)
          </li>
          <li>Analytics to track your moods, habits, and productivity</li>
          <li>Pinned notes</li>
          <li>Sharing</li>
          <li>More themes</li>
          <li>...and more!</li>
        </ul>
      </div>
    </>
  );
}
