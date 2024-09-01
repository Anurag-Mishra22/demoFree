import { ChartOne } from '@/components/charts/chartOne'
import { DataGrid } from '@/components/DataGrid '
import React from 'react'



const DashBoardPage = () => {
    return (
        <div>
            <DataGrid />
            <div>
                <ChartOne />
            </div>
        </div>
    )
}

export default DashBoardPage


