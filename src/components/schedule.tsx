import { useState } from "react";
import InputText from "./input-text";

const border: string = "border-b px-4 py-2 border-backgroundPrimaryDark";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DSFy730pDYn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Schedule() {
  const [newEvent, setNewEvent] = useState<string>("");

  return (
    <div>
      <p className="mt-6 mb-12 text-center">
        This is a mockup. Coming soon: events from your notes will show up in
        here. On this page, you'll be able to create new events for any of your
        checkboxes sections.
      </p>
      <div className="flex justify-between grow mt-4 mb-1">
        <InputText
          placeholder="Add new event..."
          value={newEvent}
          onChange={(e) => setNewEvent(e)}
        />
        <button className="ml-1 w-26 flex-none text-sm btn bg-backgroundPrimaryDark rounded p-2 mr-1 shadow">
          Set section
        </button>
        <button className="w-20 flex-none text-sm btn bg-backgroundPrimaryDark rounded p-2 mr-1 shadow">
          Set time
        </button>
        <button className="w-20 flex-none text-sm btn bg-backgroundPrimaryDark rounded p-2 shadow">
          Set color
        </button>
      </div>
      <div className="w-full mb-2">
        <button className="w-full btn bg-backgroundPrimaryDark rounded p-3 shadow">
          Add new event
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className={border}>12:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>1:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>2:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>3:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>4:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>5:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>6:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>7:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>8:00 AM</td>
              <td>
                <div
                  className={`${border} bg-green-100 dark:bg-green-600 rounded-md`}
                >
                  <div className="text-white">Morning Standup</div>
                  <div className="text-sm text-gray-300">8:00 AM - 9:00 AM</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className={border}>9:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>10:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>11:00 AM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>12:00 PM</td>
              <td
                className={`${border} bg-yellow-100 dark:bg-yellow-300 rounded-md`}
              >
                <div className="text-black">Lunch Break</div>
                <div className="text-sm text-gray-600">12:00 PM - 1:00 PM</div>
              </td>
            </tr>
            <tr>
              <td className={border}>1:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>2:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>3:00 PM</td>
              <td
                className={`${border} bg-blue-100 dark:bg-blue-700 rounded-md`}
              >
                <div className="text-white">Team Meeting</div>
                <div className="text-sm text-gray-300">3:00 PM - 4:00 PM</div>
              </td>
            </tr>
            <tr>
              <td className={border}>4:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>5:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>6:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>7:00 PM</td>
              <td
                className={`${border} bg-pink-100 dark:bg-pink-600 rounded-md`}
              >
                <div className="text-white">Dinner with Friends</div>
                <div className="text-sm text-gray-300">7:00 PM - 9:00 PM</div>
              </td>
            </tr>
            <tr>
              <td className={border}>8:00 PM</td>
              <td
                className={`${border} bg-pink-100 dark:bg-pink-600 rounded-md`}
              >
                <div className="text-white">Dinner with Friends</div>
                <div className="text-sm text-gray-300">7:00 PM - 9:00 PM</div>
              </td>
            </tr>
            <tr>
              <td className={border}>9:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>10:00 PM</td>
              <td className={border} />
            </tr>
            <tr>
              <td className={border}>11:00 PM</td>
              <td className={border} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
