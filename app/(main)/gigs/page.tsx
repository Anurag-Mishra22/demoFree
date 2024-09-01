"use client"
import React, { useState, useCallback } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import newRequest from '@/features/auth/newRequest';
import EmptyState from '@/components/gigProducts/empty-state';
import GigProductSkeleton from '@/components/gigProducts/gig-product-skeleton';
import GigProduct from '@/components/gigProducts/gig-product';
import debounce from "lodash.debounce";
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';


const SUBCATEGORIES = [
    { name: 'T-Shirts', selected: true, href: '#' },
    { name: 'Hoodies', selected: false, href: '#' },
    { name: 'Sweatshirts', selected: false, href: '#' },
    { name: 'Accessories', selected: false, href: '#' },
]
const SUBCATEGORIES1_FILTERS = {
    id: 'subCategory',
    name: 'Sub Category',
    options: [
        { value: 'websiteDevelopment', label: 'Website Development' },
        { value: 'mobileAppDevelopment', label: 'Mobile App Development' },
        { value: 'dataScience&ML', label: 'Data Science & ML' },

    ] as const,
}

const PRICE_FILTERS = {
    id: 'price',
    name: 'Price',
    options: [
        { value: [0, 15000], label: 'Any price' },
        {
            value: [0, 20],
            label: 'Under 20₹',
        },
        {
            value: [0, 40],
            label: 'Under 40₹',
        },
        // custom option defined in JSX
    ],
} as const


const DEFAULT_CUSTOM_PRICE = [0, 15000] as [number, number];
const GigsPage = () => {

    const [filter, setFilter] = useState({
        subCat: ["mobileAppDevelopment", "websiteDevelopment", "dataScience&ML"],
        price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },

        sort: 'none',
    })

    console.log(filter)


    const { data: gigsProducts, refetch } = useQuery({
        queryKey: ["gigsProducts"],
        queryFn: async () => {
            const { data } = await newRequest.post('/gigs/filters', {
                filter: {
                    cat: 'programmingAndTech',
                    subCat: filter.subCat,
                    price: filter.price.range
                }
            })
            return data;
        }
    })

    const onSubmit = () => refetch();
    const debouncedSubmit = debounce(onSubmit, 400);
    const _debouncedSubmit = useCallback(debouncedSubmit, [])

    const applyArrayFilter = ({
        category, value
    }: {
        category: keyof Omit<typeof filter, 'price' | "sort">
        value: string
    }) => {
        const isFilterApplied = filter[category].includes(value as never);

        if (isFilterApplied) {
            setFilter((prev) => ({
                ...prev,
                [category]: prev[category].filter((val) => val !== value)
            }))
        } else {
            setFilter((prev) => ({
                ...prev,
                [category]: [...prev[category], value]
            }))
        }

        _debouncedSubmit()
    }

    const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
    const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <div className='flex flex-col gap-y-2'>
                    <h1 className="text-4xl font-bold tracking-tight">
                        YuvaWork Gigs® Directory
                    </h1>
                    <p className="text-gray-500">
                        One stop shop for all your needs
                    </p>
                </div>
            </div>
            <section className="pb-24 pt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <div className="">
                        <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                            {
                                SUBCATEGORIES.map((category) => (
                                    <li key={category.name}>
                                        <button disabled={!category.selected} className="disabled:cursor-not-allowed disabled:opacity-60">
                                            {category.name}
                                        </button>
                                    </li>

                                ))
                            }
                        </ul>
                        <Accordion type='multiple' className="animate-none">
                            {/* SubCategory */}
                            <AccordionItem value="color">
                                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">Sub Category</span>
                                </AccordionTrigger>
                                <AccordionContent className="pt-6 animate-none">
                                    <ul className="space-y-4">
                                        {
                                            SUBCATEGORIES1_FILTERS.options.map((option, optionIdx) => (
                                                <li key={option.value} className="flex items-center">
                                                    <input
                                                        onChange={() => {
                                                            applyArrayFilter({
                                                                category: "subCat",
                                                                value: option.value
                                                            })
                                                        }}
                                                        checked={filter.subCat.includes(option.value as never)}
                                                        type="checkbox" id={`color-${optionIdx}`} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor={`color-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                        {option.label}
                                                    </label>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Price Filter */}
                            <AccordionItem value="price">
                                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">Price</span>
                                </AccordionTrigger>
                                <AccordionContent className="pt-6 animate-none">
                                    <ul className="space-y-4">
                                        {
                                            PRICE_FILTERS.options.map((option, optionIdx) => (
                                                <li key={option.label} className="flex items-center">
                                                    <input onChange={() => {
                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            price: {
                                                                isCustom: false,
                                                                range: [...option.value]
                                                            }
                                                        }))
                                                        _debouncedSubmit()
                                                    }}
                                                        checked={!filter.price.isCustom && filter.price.range[0] === option.value[0] && filter.price.range[1] === option.value[1]}
                                                        type="radio" id={`price-${optionIdx}`} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor={`price-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                        {option.label}
                                                    </label>
                                                </li>
                                            ))
                                        }
                                        <li className="flex justify-center flex-col gap-2">
                                            <div>
                                                <input onChange={() => {
                                                    setFilter((prev) => ({
                                                        ...prev,
                                                        price: {
                                                            isCustom: true,
                                                            range: [0, 100]
                                                        }
                                                    }))
                                                    _debouncedSubmit()
                                                }}
                                                    checked={filter.price.isCustom}
                                                    type="radio" id={`price-${PRICE_FILTERS.options.length}`} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label htmlFor={`price-${PRICE_FILTERS.options.length}`} className="ml-3 text-sm text-gray-600">
                                                    Custom
                                                </label>
                                            </div>

                                            {/* Slider......... */}
                                            <div className="flex justify-between">
                                                <p className="font-medium">Price</p>
                                                <div>
                                                    {
                                                        filter.price.isCustom ? minPrice.toFixed(0) :
                                                            filter.price.range[0].toFixed(0)} ₹ - {' '}
                                                    {
                                                        filter.price.isCustom ? maxPrice.toFixed(0) : filter.price.range[1].toFixed(0)
                                                    } ₹
                                                </div>
                                            </div>
                                            <Slider className={cn(
                                                { "opacity-50": !filter.price.isCustom }
                                            )}
                                                disabled={!filter.price.isCustom}
                                                onValueChange={(range) => {
                                                    const [newMin, newMax] = range;

                                                    setFilter((prev) => ({
                                                        ...prev,
                                                        price: {
                                                            isCustom: true,
                                                            range: [newMin, newMax]
                                                        }
                                                    }
                                                    ))
                                                    _debouncedSubmit()
                                                }}
                                                value={filter.price.isCustom ? filter.price.range : DEFAULT_CUSTOM_PRICE}
                                                min={DEFAULT_CUSTOM_PRICE[0]}
                                                defaultValue={DEFAULT_CUSTOM_PRICE}
                                                max={DEFAULT_CUSTOM_PRICE[1]}
                                                step={5}
                                            />
                                        </li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </div>
                    {/* Product Grid */}
                    <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {gigsProducts && gigsProducts.length === 0 ? (<EmptyState />) : gigsProducts ? (
                            gigsProducts?.map((product: any, index: any) => (
                                <GigProduct key={index} gig={product} />

                            ))) :
                            Array.from({ length: 12 }).map((_, i) => (
                                <GigProductSkeleton key={i} />
                            ))
                        }
                    </ul>
                </div>
            </section>
        </main>
    )
}

export default GigsPage