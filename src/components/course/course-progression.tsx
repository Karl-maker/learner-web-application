import React from 'react';

// Define the type for the profile avatar options
export type CourseProgressionType = {
    height?: number;
    width?: number;
    alt?: string; // Alt text for the avatar image
    name: string;
    index: number;
    completion: number; // 50% is 0.5
}

const CourseProgressionDefault: Partial<CourseProgressionType> = {
    height: 20,
    width: 20,
}

/**
 * CourseCard Component
 * @desc Renders course progression card
 * @todo complete implementation 
 * @hint use Card component in from ../general/card.tsx
 * @param option CourseProgressionType - Options for the course progression card.
 * @example <CourseProgression index={2} name='Math Master' height={20} width={20} completion={0.80} />
 */
const CourseProgression: React.FC<CourseProgressionType> = (option: CourseProgressionType) => {
    // Merge default options with provided options
    const courseProgressionOptions = { ...CourseProgressionDefault, ...option };

    return (
        <div>
            {/* JSX content */}
        </div>
    );
}

export default CourseProgression;

