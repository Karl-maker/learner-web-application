import Image from 'next/image';
import React from 'react';

// Define the type for the profile avatar options
export type ProfileAvatarType = {
    height: number;
    width: number;
    name: string;
    src?: string; // Source URL for the avatar image
    badge?: { // Optional badge configuration
        content: React.FC<any>; // Badge content (a React component)
        position: { // Badge position
            vertical: 'bottom' | 'top' | 'center'; // Vertical position of the badge
            horizontal: 'right' | 'left' | 'center'; // Horizontal position of the badge
        };
    };
    isLoading: boolean;
}

// Define default values for optional properties
const ProfileAvatarDefault: Partial<ProfileAvatarType> = {}

/**
 * ProfileAvatar Component
 * @desc Renders a profile avatar with optional badge.
 * @FIXME Width is acting funny
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
        <>
          {
            option.isLoading ? <div className={`skeleton w-${option.width} h-${option.height} rounded-full shrink-0`}></div> :
            <>
            { option.src ?            
              <div className="avatar">
                <div className={`w-${option.width} rounded-full`}>
                  <Image src={option.src} alt={`${option.name}'s profile image`} width={option.width} height={option.height}/>
                </div>
              </div> 
              : 
              <div className="avatar placeholder">
                <div className={`bg-neutral text-neutral-content rounded-full w-${option.width}`}>
                  <span className="text-3xl">{option.name.charAt(0)}</span>
                </div>
              </div> 
            }
            </>
          }
        </>
    );
}

export default ProfileAvatar;

