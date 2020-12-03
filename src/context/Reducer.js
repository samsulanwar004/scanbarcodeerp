export const Auth = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          accessToken: action.token,
          isLoading: false,
          expired: action.expired
        };
      case 'LOG_IN':
        return {
          ...prevState,
          isSignout: false,
          accessToken: action.token,
          expired: action.expired
        };
      case 'LOG_OUT':
        return {
          ...prevState,
          isSignout: true,
          accessToken: null,
          isLoading: false,
          expired: null
        };
      default: return prevState;
    }
};

export const Account = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_PROFILE':
        return {
          ...prevState,
          profile: action.profile
        };
      default: return prevState;
    }
};