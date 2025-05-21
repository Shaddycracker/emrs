import React from 'react'

interface DataItemProps {
    count: string
    label: string
    secondaryCount?: string
    secondaryLabel?: string
}

const DataItem: React.FC<DataItemProps> = ({ count, label, secondaryCount, secondaryLabel }) => (
    <div className="text-center p-4 w-full sm:w-1/2 md:w-1/4">
        <div className="text-3xl font-bold text-primary">{count}</div>
        <div className="mb-2 text-muted-foreground">{label}</div>
        {secondaryCount && secondaryLabel && (
            <>
                <div className="text-xl font-semibold">{secondaryCount}</div>
                <div className="text-muted-foreground">{secondaryLabel}</div>
            </>
        )}
    </div>
)

const StatsOverview: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-center md:justify-around px-4 py-8 bg-background rounded-xl shadow-sm">
            <DataItem count="400+" label="Students" secondaryCount="1" secondaryLabel="Library" />
            <DataItem count="14+" label="Class Rooms" secondaryCount="2" secondaryLabel="Separate Hostel" />
            <DataItem count="13+" label="Labs & Other Rooms" secondaryCount="1" secondaryLabel="Mess" />
            <DataItem count="16+" label="Teachers & Other Staff" secondaryCount="15+" secondaryLabel="Staff Residence" />
        </div>
    )
}

export default StatsOverview
