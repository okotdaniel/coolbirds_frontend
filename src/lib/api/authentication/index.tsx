import continueWithSocialAuth from '../../../app/utils/continue-with-social-auth.ts.js';

export const continueWithGoogle = () => continueWithSocialAuth('google-oauth2', 'google');
export const continueWithFacebook = () => continueWithSocialAuth('facebook', 'facebook');