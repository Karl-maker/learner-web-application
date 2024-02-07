import React from 'react';

// Define the type for the subject card options
export type CardType = {
    height?: number;
    width?: number;
    children: React.ReactNode;
}

// Define default values for optional properties
const CardDefault: Partial<CardType> = {
    height: 20,
    width: 20,
}

/**
 * Card Component
 * @desc Renders a card with specified content inside.
 * @todo complete implementation by adding styling within card
 * @param option CardType - Options for the card.
 * @explanation children prop is designated for wrapping TSX 
 * @example 
 * <Card height={20} width={20}>
 *      { 
 *          //JSX content
 *      }
 *      <p>Hello World</p>
 * </Card>
 */
const Card: React.FC<CardType> = (option: CardType) => {
    // Merge default options with provided options
    const cardOptions = { ...CardDefault, ...option };

    return (
        <div>
            {/* JSX content */}
            { option.children }
        </div>
    );
}

export default Card;

