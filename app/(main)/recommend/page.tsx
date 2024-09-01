"use client"
import React from 'react'

import axios from 'axios';
import newRequest from '@/features/auth/newRequest';
import EmptyState from '@/components/gigProducts/empty-state';
import GigProduct from '@/components/gigProducts/gig-product';
import GigProductSkeleton from '@/components/gigProducts/gig-product-skeleton';
import aiSearchData from '@/hooks/aiSearch-data';
import airecommendationData from '@/hooks/airecommendationData';
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const RecommendPage = () => {
    const searchQuery = airecommendationData((state) => state.item)
    const searchBudget = airecommendationData((state) => state.budget)
    const clearData = airecommendationData((state) => state.clearFileItem)

    // Fetch recommended gig IDs
    const { data: gigsDisplayId, refetch } = useQuery<any, Error>({
        queryKey: ["gigsRecommendedId"],
        queryFn: async () => {
            const { data } = await axios.post('http://127.0.0.1:8000/recommend', {
                description: searchQuery,
                budget: searchBudget
            });
            return data;
        },

    });
    console.log(gigsDisplayId);

    if (gigsDisplayId) {
        clearData();
    }

    // Fetch gigs display data only if gigsDisplayId is available
    const { data: gigsDisplay } = useQuery({
        queryKey: ["gigsDisplayData"],
        queryFn: async () => {
            const { data } = await newRequest.post('/gigs/filters', {
                filter: {
                    gigIds: gigsDisplayId
                }
            });
            return data;
        },
        enabled: !!gigsDisplayId // Only run this query if gigsDisplayId is available
    });
    console.log(gigsDisplay);

    return (
        <div>
            {/* Product Grid */}
            <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {gigsDisplay && gigsDisplay.length === 0 ? (<EmptyState />) : gigsDisplay ? (
                    gigsDisplay?.map((product: any, index: any) => (
                        <GigProduct key={index} gig={product} />

                    ))) :
                    Array.from({ length: 12 }).map((_, i) => (
                        <GigProductSkeleton key={i} />
                    ))
                }
            </ul>
        </div>
    )
}

export default RecommendPage;
