import { Menu, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

export interface Props {
  button: ReactNode
  children: ReactNode
}

export const Dropdown = ({ button, children }: Props) => {
  return (
    <>
      <Menu as='div' className='relative text-left'>
        {button}
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-30 right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

/*
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Delete
                </button>
              )}

*/
