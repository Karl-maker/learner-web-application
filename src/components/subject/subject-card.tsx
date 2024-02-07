import React from 'react';

// Define the type for the subject card options
export type SubjectCardType = {
    height?: number;
    width?: number;
    children: React.ReactNode;
}

// Define default values for optional properties
const SubjectCardDefault: Partial<SubjectCardType> = {
    height: 20,
    width: 20,
}

/**
 * SubjectCard Component
 * @desc Renders a card with specified content inside.
 * @todo complete implementation
 * @param option SubjectCardType - Options for the subject card.
 * @explanation children prop is designated for wrapping TSX
 * @example 
 * <SubjectCard height={20} width={20}>
 *      { 
 *          //JSX content
 *      }
 *      <p>Hello World</p>
 * </SubjectCard>
 */
const SubjectCard: React.FC<SubjectCardType> = (option: SubjectCardType) => {
    // Merge default options with provided options
    const profileAvatarOptions = { ...SubjectCardDefault, ...option };

    return (
        <div>
            {/* JSX content */}
            { option.children }
        </div>
    );
}

export default SubjectCard;

