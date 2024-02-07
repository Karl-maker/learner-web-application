import React from 'react';

// Define the type for the profile avatar options
export type ProfileAvatarType = {
    height?: number;
    width?: number;
    src: string; // Source URL for the avatar image
    alt: string; // Alt text for the avatar image
    badge?: { // Optional badge configuration
        content: React.FC<any>; // Badge content (a React component)
        position: { // Badge position
            vertical: 'bottom' | 'top' | 'center'; // Vertical position of the badge
            horizontal: 'right' | 'left' | 'center'; // Horizontal position of the badge
        };
    };
}

// Define default values for optional properties
const ProfileAvatarDefault: Partial<ProfileAvatarType> = {
    height: 20,
    width: 20,
}

/**
 * ProfileAvatar Component
 * @desc Renders a profile avatar with optional badge.
 * @todo complete implementation
 * @param option ProfileAvatarType - Options for the profile avatar.
 * @example 
 * <ProfileAvatar 
 *      height={20} width={20} 
 *      src='https://profile-image.png' 
 *      alt={`Joshua's Profile Image`} 
 *      badge={{ 
 *          content: <span>Hello World</span>, 
 *          position: { vertical: 'center', horizontal: 'right' } 
 *      }} 
 * />
 */
const ProfileAvatar: React.FC<ProfileAvatarType> = (option: ProfileAvatarType) => {
    // Merge default options with provided options
    const profileAvatarOptions = { ...ProfileAvatarDefault, ...option };

    return (
        <div>
            {/* JSX content for the profile avatar */}
        </div>
    );
}

export default ProfileAvatar;

