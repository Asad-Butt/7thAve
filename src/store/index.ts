/**
 * 7th Ave - App Model
 *
 * This is the basic model for the application
 * it can hold things like themes, loaders, translations, notifications and much more
 */
import CONFIG from "../../configuration";
import { asyncDelay } from "../utils/algorithms";
import { storePatchCache } from "../utils/storage";

interface Notification {
  title: string;
  message: string;
  action: string;
  interactive: boolean;
  icon: string;
  data: any;
  type: "error" | "management" | "action";
}

const initState = {
  loading: false,
  darkModeEnabled: false,
  bottomsTabs: true,
  firstDownload: false,
  showPatchNotes: false,
  patchNotesViewed: false,
  themes: {
    light: {
      primary: "#F1C772",
      secondary: "#057176",
      element: "#1984F0",
      warning: "#E74C3C",
      background: "#FFFFFF",
      formCardBG: "#F8F9FA",
      typeface: {
        primary: "#202C23",
        secondary: "#667682",
        element: "#9CAAB4",
        warning: "#FFF",
      },
    },
    dark: {
      primary: "#057176",
      secondary: "#F2762F",
      element: "#1984F0",
      warning: "#E74C3C",
      background: "#FFFFFF",
      formCardBG: "#F8F9FA",
      typeface: {
        primary: "#202C23",
        secondary: "#667682",
        element: "#9CAAB4",
        warning: "#FFF",
      },
    },
  },
  // In App Notifications
  showInAppNotification: false,
  activeNotification: {
    title: "This can't be done",
    message: "You have entered an incorrect password",
    action: "none",
    icon: "circle-slash",
    interactive: false,
    type: "error",
    data: {},
  },
  notifications: [
    {
      title: "This can't be done",
      message: "You have entered an incorrect password",
      action: "none",
      icon: "circle-slash",
      interactive: false,
      data: {},
    },
  ],
};
export default {
  namespace: "app",
  state: initState,
  reducers: {
    showLoading(state: any) {
      return { ...state, loading: true };
    },
    hideLoading(state: any) {
      return { ...state, loading: false };
    },
    toggleTheme(state: any) {
      return { ...state, darkModeEnabled: !state.darkModeEnabled };
    },
    hideTabs(state: any, { payload }: any) {
      return {
        ...state,
        bottomsTabs: false,
      };
    },
    showTabs(state: any, { payload }: any) {
      return {
        ...state,
        bottomsTabs: true,
      };
    },
    versionCache(state: any, { payload }: any) {
      return {
        ...state,
        firstDownload: payload.firstDownload,
        showPatchNotes: payload.showPatchNotes,
      };
    },
    welcomeOrPatchAcknowledged(state: any, { payload }: any) {
      return {
        ...state,
        firstDownload: false,
        showPatchNotes: false,
        patchNotesViewed: true,
      };
    },
    // In App Notifications
    showNotification(state: any, { payload }: any) {
      return {
        ...state,
        showInAppNotification: true,
      };
    },
    hideNotification(state: any, { payload }: any) {
      return {
        ...state,
        showInAppNotification: false,
      };
    },
    setActiveNotification(state: any, { payload }: any) {
      return {
        ...state,
        activeNotification: {
          title: payload.title,
          message: payload.message,
          action: "none",
          icon: "circle-slash",
          interactive: false,
          type: payload.type || "error",
          data: {},
        },
      };
    },
  },
  effects: {
    *welcomeViewed({ payload }: any, { call, put, select }: any): any {
      // Sets patch cache to the current version
      yield call(storePatchCache, CONFIG.version);
      // Removes modal
      yield put({ type: "welcomeOrPatchAcknowledged" });
    },
    *newInAppNotification({ payload }: any, { call, put, select }: any): any {
      // Sets new notification in state
      yield put({ type: "setActiveNotification", payload: { ...payload } });
      // Shows notification
      yield put({ type: "showNotification", payload: null });
      // Delays for 5 seconds
      yield call(asyncDelay, 5000);
      // Hides the notification
      yield put({ type: "hideNotification", payload: null });
    },
  },
  subscriptions: {},
};
