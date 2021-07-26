/**
 * 7th Ave - User Model
 *
 * This is the User's model for the application
 * All user state is managed here
 */
import { navigate } from "../../routers/RootNavigation";
import {
  retrieveTokenCache,
  storeTokenCache,
  removeTokenCache,
} from "../../utils/storage";
import {
  loginRequest,
  signupRequest,
  updateProfileRequest,
  tokenIsValid,
  sendConnectionRequest,
} from "../../network/requests";

const initState = {
  userId: "",
  token: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  birthday: "",
  photo: "",
  whatYouDo: "",
  school: "",
  greekLife: "",
  nationality: "",
  pronouns: "",
  bio: "",
  follows: [],
  followers: [],
  interests: [],
  connections: [],
  pendingConnections: [],
  requestedConnections: [],
  connectionCount: 0,
  followerCount: 0,
  pointsCount: 0,
  link: "",
  loginError: "",
  loading: false,
};
export default {
  namespace: "user",
  state: initState,
  reducers: {
    changeUserId(state: any, { payload }: any) {
      return {
        ...state,
        userId: payload,
      };
    },
    changeUserToken(state: any, { payload }: any) {
      return {
        ...state,
        token: payload,
      };
    },
    changeUserFirstName(state: any, { payload }: any) {
      return {
        ...state,
        firstName: payload,
      };
    },
    changeUserLastName(state: any, { payload }: any) {
      return {
        ...state,
        lastName: payload,
      };
    },
    changeUserPhoneNumber(state: any, { payload }: any) {
      return {
        ...state,
        phoneNumber: payload,
      };
    },
    changeUserBirthday(state: any, { payload }: any) {
      return {
        ...state,
        phoneNumber: payload,
      };
    },
    changeUserPhoto(state: any, { payload }: any) {
      return {
        ...state,
        photo: payload,
      };
    },
    changeUser(state: any, { payload }: any) {
      return {
        ...state,
        token: payload.token,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        location: payload.location,
        birthday: payload.birthday,
        photo: payload.photo,
        username: payload.username,
        bio: payload.bio,
        greekLife: payload.greekLife,
        whatYouDo: payload.whatYouDo,
        school: payload.school,
        nationality: payload.nationality,
        pronouns: payload.pronouns,
        follows: payload.follows,
        followers: payload.followers,
        interests: payload.interests,
        connections: payload.connections,
        pendingConnections: payload.pendingConnections,
        requestedConnections: payload.requestedConnections,
        connectionCount: payload.connectionCount,
        followerCount: payload.followerCount,
        pointsCount: payload.pointsCount,
        userId: payload._id,
      };
    },
    clearUser(state: any, { payload }: any) {
      return {
        ...state,
        userId: "",
        token: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        location: "",
        birthday: "",
        photo: "",
        username: "",
        bio: "",
        greekLife: "",
        whatYouDo: "",
        school: "",
        nationality: "",
        pronouns: "",
        follows: "",
        followers: "",
        interests: "",
        connections: "",
        pendingConnections: "",
        requestedConnections: "",
        connectionCount: 0,
        followerCount: 0,
        pointsCount: 0,
      };
    },
    setLoadingStart(state: any, { payload }: any) {
      return {
        ...state,
        loading: true,
      };
    },
    setLoadingEnd(state: any, { payload }: any) {
      return {
        ...state,
        loading: false,
      };
    },
    setLoginError(state: any, { payload }: any) {
      return {
        ...state,
        loginError: payload.loginError,
      };
    },
  },
  effects: {
    *login({ payload }: any, { call, put, select }: any): any {
      // Sets the state to loading
      yield put({
        type: "setLoadingStart",
        payload: null,
      });
      // Clears the error display
      yield put({
        type: "setLoginError",
        payload: "",
      });
      // Makes the login api request
      const request = yield loginRequest(payload.username, payload.password);
      // Upon Sucess
      if (request.success) {
        // adds the user's data in state
        yield put({
          type: "changeUser",
          payload: request.success,
        });
        // adds the user's ID in state, loggin them into the app
        yield put({
          type: "changeUserId",
          payload: request.success._id,
        });
        // Adds the user to local storage
        yield call(
          storeTokenCache,
          request.success.username,
          request.success.token
        );
        yield put({
          type: "app/showTabs",
          payload: null,
        });
        // Navigates to the Main stack
        yield navigate("Main", {});
      } else {
        // sets the error display
        yield put({
          type: "app/newInAppNotification",
          payload: {
            title: request.error.title,
            message: request.error.message,
            action: "none",
            icon: "circle-slash",
            interactive: false,
            data: {},
          },
        });
      }
      // Ends states loading
      yield put({
        type: "setLoadingEnd",
        payload: null,
      });
    },
    *autoLogin({ payload }: any, { call, put, select }: any): any {
      const cache = yield call(retrieveTokenCache);
      if (cache != null) {
        let validationRequest = yield call(
          tokenIsValid,
          cache.username,
          cache.token
        );
        if (validationRequest.success) {
          // adds the user's data in state
          yield put({
            type: "changeUser",
            // payload: validationRequest.success,
            payload: { ...validationRequest.success, token: cache.token },
          });
          // adds the user's ID in state, loggin them into the app
          yield put({
            type: "changeUserId",
            payload: validationRequest.success._id,
          });
          // Navigates to the Main stack
          console.warn('SIGNUP_REQUEST1')
          //yield navigate("Main", {});
        }
      }
    },
    *register({ payload }: any, { call, put, select }: any): any {
      // Sets the state to loading
      yield put({
        type: "setLoadingStart",
        payload: null,
      });

      const signup = yield signupRequest(payload);
      if (signup.success) {
        yield call(
          storeTokenCache,
          signup.success.username,
          signup.success.token
        );
        yield put({
          type: "changeUser",
          payload: signup.success,
        });
        yield put({
          type: "changeUserId",
          payload: signup.success._id,
        });
        // Change by praveen singh 18 May 21
        //yield navigate("Main", {});

        yield navigate("TwoFA", {});
        //yield put({ type: "app/showTabs" });
      } else if (signup.error) {
        console.error(signup.error);
        yield put({
          type: "app/newInAppNotification",
          payload: {
            title: signup.error.title,
            message: signup.error.message,
            action: "none",
            icon: "circle-slash",
            interactive: false,
            data: {},
          },
        });
      }
      // Ends states loading
      yield put({
        type: "setLoadingEnd",
        payload: null,
      });
    },
    *editProfile({ payload }: any, { call, put, select }: any): any {
      // Sets the state to loading
      yield put({
        type: "setLoadingStart",
        payload: null,
      });
      const userToken = yield select((state: any) => state.user.token);
      const username = yield select((state: any) => state.user.username);
      const request = yield updateProfileRequest(payload, userToken, username);
      if (request.success) {
        yield put({
          type: "changeUser",
          payload: { ...request.success, token: userToken },
        });
      }
      // Ends states loading
      yield put({
        type: "setLoadingEnd",
        payload: null,
      });
    },
    *logout({ payload }: any, { call, put, select }: any): any {
      yield call(removeTokenCache);
      yield put({
        type: "clearUser",
        payload: {},
      });
      yield put({
        type: "changeUserId",
        payload: "",
      });
      navigate("Landing", { screen: "Login" });
    },
  },
};
