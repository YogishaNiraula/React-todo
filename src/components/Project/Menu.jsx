import { Menu, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-router-dom";
import ProjectEdit from "./Edit";

export default function ProjectMenu({ project }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-56 text-right">
      <Menu
        as="div"
        id={project.id}
        className="relative inline-block text-left"
      >
        <Menu.Button className="z-5 inline-flex w-full justify-center rounded-md">
          <BiDotsHorizontalRounded
            className="ml-2 -mr-1 h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="z-20 absolute -right-12 mt-2 w-56"
        >
          <Menu.Items className="origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <ProjectEdit projectData={project} active={active} />
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Form replace method="post">
                    <input
                      type="text"
                      hidden
                      value={project.id}
                      name="delete_id"
                      readOnly
                    />
                    <button
                      type="submit"
                      name="_type"
                      value="deleteProject"
                      className={`${
                        active ? "bg-red text-white" : "text-gray-900"
                      } group flex w-full items-center rounded p-2 text-sm`}
                    >
                      <MdDeleteOutline className="mr-2 h-4 w-4" /> Delete
                    </button>
                  </Form>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
