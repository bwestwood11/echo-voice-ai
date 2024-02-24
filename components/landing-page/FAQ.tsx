import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Can I use these voices for commercial projects?",
    answer:
      "Yes! You can use these voices for commercial projects. We have a free plan that allows you to generate 1000 characters per month. If you need more than that, you can upgrade to a paid plan.",
  },
  {
    question: "Can I use these voices for commercial projects?",
    answer:
      "Yes! You can use these voices for commercial projects. We have a free plan that allows you to generate 1000 characters per month. If you need more than that, you can upgrade to a paid plan.",
  },
  {
    question: "Can I use these voices for commercial projects?",
    answer:
      "Yes! You can use these voices for commercial projects. We have a free plan that allows you to generate 1000 characters per month. If you need more than that, you can upgrade to a paid plan.",
  },
  {
    question: "Can I use these voices for commercial projects?",
    answer:
      "Yes! You can use these voices for commercial projects. We have a free plan that allows you to generate 1000 characters per month. If you need more than that, you can upgrade to a paid plan.",
  },
  {
    question: "Can I use these voices for commercial projects?",
    answer:
      "Yes! You can use these voices for commercial projects. We have a free plan that allows you to generate 1000 characters per month. If you need more than that, you can upgrade to a paid plan.",
  },
]

export default function FAQ() {
  return (
    <div className= "relative">
      <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(255,131,3,0.5)] opacity-50 blur-[80px]"></div></div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}