import React from 'react';

// Define the type for the profile avatar options
export type AwardCardType = {
    height?: number;
    width?: number;
    alt?: string; // Alt text for the avatar image
    title: string;
    description: string;
    date?: Date;
    icon: {
        src: string; // src location of the image or file
    };
    points: number;
}

const AwardCardDefault: Partial<AwardCardType> = {
    height: 20,
    width: 20,
}

/**
 * AwardCard Component
 * @desc Renders award card
 * @todo complete implementation 
 * @hint use Card component in from ../general/card.tsx
 * @param option AwardCardType - Options for the award card.
 * @example <AwardCard title='Math Master' height={20} width={20} icon={{ src: 'https://icon-image.png' }} number={108} />
 */
const AwardCard: React.FC<AwardCardType> = (option: AwardCardType) => {
    // Merge default options with provided options
    const awardOptions = { ...AwardCardDefault, ...option };

    return (
        <div>
            {/* JSX content for the profile avatar */}
        </div>
    );
}

export default AwardCard;

