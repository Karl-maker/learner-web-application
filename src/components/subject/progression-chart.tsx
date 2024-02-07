import React from 'react';

// Define the type for the profile avatar options
export type ProgressionChartType = {
    height?: number;
    width?: number;
    alt?: string; // Alt text for the avatar image
    title: string;
    description: string;
    values: {
        date: Date;
        grade: number; // expect to be decimal 0.20 as in 20%
    }[];
}

const ProgressionChartDefault: Partial<ProgressionChartType> = {
    height: 20,
    width: 20,
}

/**
 * ProgressionChart Component
 * @desc Renders progression card
 * @todo complete implementation 
 * @hint use Card component in from ../general/card.tsx
 * @param option ProgressionChartType
 * @example 
 * const values = [
 *      { date: new Date('2023-01-01'), grade: 0.30 },
 *      { date: new Date('2023-01-03'), grade: 0.50 }
 * ]
 * 
 * <ProgressionChart title='Mathematics' values={values}/>
 */
const ProgressionChart: React.FC<ProgressionChartType> = (option: ProgressionChartType) => {
    // Merge default options with provided options
    const progressionChartOptions = { ...ProgressionChartDefault, ...option };

    return (
        <div>
            {/* JSX content */}
        </div>
    );
}

export default ProgressionChart;

