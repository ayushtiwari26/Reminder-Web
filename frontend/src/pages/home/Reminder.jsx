import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import React from "react";
const AddReminderModal = ({
  open,
  setIsOpen,
  addReminder,
  isEdit,
  setIsEdit,
}) => {
  const [data, setData] = useState({});
  const handleDataChange = (e) => {
    if (isEdit) {
      setIsEdit({ ...isEdit, [e.target.name]: e.target.value });
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (!open && !isEdit) return null;
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="shown overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Reminder
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsEdit(false);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form action="#">
            <div className="grid gap-1 mb-4 sm:grid-cols-1">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Reminder name"
                  required=""
                  onChange={handleDataChange}
                  value={isEdit ? isEdit.title : data.title}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleDataChange}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                  defaultValue={""}
                  value={isEdit ? isEdit.description : data.description}
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Reminder name"
                  required=""
                  onChange={handleDataChange}
                  //yyyy-MM-ddThh:mm

                  value={
                    isEdit.date
                      ? isEdit.date.split("Z")[0].replace("T", " ")
                      : data.date
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    name="status"
                    onChange={handleDataChange}
                    type="checkbox"
                    value={isEdit ? isEdit.isActivated : data.isActivated}
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <button
              onClick={() => addReminder(data)}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
            >
              {!isEdit && (
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {isEdit ? "Update Reminder" : "Add new Reminder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const deleteReminder = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3000/reminder/delete/${id}`
    );
    if (data) {
      window.location.reload();
    }
  };
  const fetchReminders = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/reminder/get/${
        JSON.parse(localStorage.getItem("user"))._id
      }`
    );
    setReminders(data);
  };
  const addReminder = async ({ title, description, status, date }) => {
    if (isEdit) {
      const { data } = await axios.put(
        "http://localhost:3000/reminder/update/" + isEdit._id,
        {
          title: isEdit.title,
          description: isEdit.description,
          status: isEdit.status,
          user: JSON.parse(localStorage.getItem("user"))._id,
          date: isEdit.date,
        }
      );
      if (data) {
        window.location.reload();
      } else {
        window.alert("Something went wrong");
      }
    } else {
      const { data } = await axios.post(
        "http://localhost:3000/reminder/create",
        {
          title,
          description,
          status,
          user: JSON.parse(localStorage.getItem("user"))._id,
          date,
        }
      );
      if (data) {
        window.location.reload();
      } else {
        window.alert("Something went wrong");
      }
    }
  };
  useEffect(() => {
    fetchReminders();
  }, []);
  const makeNotification = (reminder) => {
    const now = new Date();
    const diff = new Date(reminder.date) - now;
    if (diff > 0) {
      setTimeout(() => {
        new Notification("Reminder for " + reminder.title);
      }, diff);
    }
  };
  const subscribeToNotifications = () => {
    if (Notification.permission === "granted") {
      reminders.forEach((reminder) => {
        makeNotification(reminder);
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          reminders.forEach((reminder) => {
            makeNotification(reminder);
          });
        }
      });
    }
  };

  useEffect(() => {
    subscribeToNotifications();
  }, [reminders]);
  return (
    <div className="flex-auto justify-center align-middle items-center">
      <AddReminderModal
        open={isReminderFormOpen}
        addReminder={addReminder}
        setIsOpen={setIsReminderFormOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <section className="bg-gray-50 h-screen dark:bg-gray-900 py-3 sm:py-5">
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h3>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Reminders
                  </span>
                </h3>
                <h3>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </h3>
                <h3 className="text-lg text-red-500">
                  {JSON.parse(localStorage.getItem("user")).email}
                </h3>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReminderFormOpen(true)}
                  data-modal-toggle="defaultModal"
                  id="defaultModalButton"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add new reminder
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Log out
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th> */}
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((reminder) => (
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {/* <td className="w-4 px-4 py-3">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td> */}
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {reminder.title}
                      </th>

                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {reminder.description}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {reminder.isActivated ? "Active" : "Inactive"}
                      </td>

                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date().toLocaleString([], {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          onClick={() => setIsEdit(reminder)}
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => deleteReminder(reminder._id)}
                          className="ml-2 text-red-600 hover:underline dark:text-red-500"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
