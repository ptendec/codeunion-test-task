import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ListItem } from '../../interfaces'

interface Props {
  selected?: ListItem[]
  options: ListItem[]
  onChange: (selected: ListItem[]) => void
}
export const Select = ({ selected, options, onChange }: Props) => {
  return (
    <Listbox
      value={selected}
      onChange={chosenItems => {
        onChange(chosenItems)
      }}
      multiple
    >
      <div className='relative my-1'>
        <Listbox.Button className='relative w-full rounded-xl bg-white py-2 pl-3 pr-10 text-left border-2 cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 sm:text-sm'>
          <span className='block truncate'>
            {Array.isArray(selected) && selected.length > 0
              ? selected.map(item => item.value).join(', ')
              : 'Выбрать'}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.value}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
