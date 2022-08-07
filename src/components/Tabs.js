/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({ handleClick, tabs }) {
    return (
        <div className="pb-5 border-b border-gray-200 sm:pb-0">
            <div className="mt-3 sm:mt-4">
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab, idx) => (
                            <div
                                id={idx}
                                onClick={() => handleClick(idx)}
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? "border-pink-500 text-pink-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                    "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                {tab.name}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
