/**
 * 7th Ave - Inbox Model
 *
 * This is the User's Inbox model for the application
 * All activity and DM's state is managed here
 */
import { io } from "socket.io-client";
import {
  searchUser,
  getRequestedConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
} from "../../network/requests";
const initState = {
  tabBarFocus: false,
  focusedUser: {},
  loadingUser: false,
  loadingActivity: false,
  focusedUserModal: false,
  focusedUserIsConnection: false,
  focusedUserIsPending: false,
  focusedUserIsRequested: false,
  error: "",
  conversations: [
    {
      username: "",
      userImage: "",
      messages: [
        {
          body: "",
          timestamp: Date.now(),
        },
      ],
    },
    {
      username: "",
      userImage: "",
      messages: [
        {
          body: "",
          timestamp: Date.now(),
        },
      ],
    },
    {
      username: "",
      userImage: "",
      messages: [
        {
          body: "",
          timestamp: Date.now(),
        },
      ],
    },
  ],
  activity: [],
  pendingConnectionRequests: [],
  requestedConnections: [],
};

export default {
  namespace: "inbox",
  state: initState,
  //   socket: io(""),
  reducers: {
    toggleTabFocus(state: any, { payload }: any) {
      return {
        ...state,
        tabBarFocus: payload,
      };
    },
    setFocusedUserLoading(state: any, { payload }: any) {
      return {
        ...state,
        loadingUser: payload,
      };
    },
    openFocusedUserModal(state: any, { payload }: any) {
      return {
        ...state,
        focusedUserModal: true,
      };
    },
    closeFocusedUserModal(state: any, { payload }: any) {
      return {
        ...state,
        focusedUserModal: false,
      };
    },
    setFocusedUser(state: any, { payload }: any) {
      return {
        ...state,
        focusedUser: payload,
      };
    },
    setError(state: any, { payload }: any) {
      return {
        ...state,
        error: payload,
      };
    },
    setloadingActivity(state: any, { payload }: any) {
      return {
        ...state,
        loadingActivity: payload,
      };
    },
    setActivity(state: any, { payload }: any) {
      return {
        ...state,
        activity: payload,
      };
    },
    setRequestedConnections(state: any, { payload }: any) {
      return {
        ...state,
        requestedConnections: payload,
      };
    },
    setIsConnection(state: any, { payload }: any) {
      return {
        ...state,
        focusedUserIsConnection: payload,
      };
    },
  },
  effects: {
    *searchUser({ payload }: any, { call, put, select }: any): any {
      const request = yield call(searchUser, payload);
      const { userId } = yield select((state: any) => state.user);
      yield put({ type: "setFocusedUserLoading", payload: true });
      yield put({ type: "openFocusedUserModal", payload: null });

      if (request.error) {
        put({ type: "setError", payload: request.error });
        yield put({ type: "closeFocusedUserModal", payload: null });
      } else {
        yield put({
          type: "setFocusedUser",
          payload: { ...request.success },
        });
        const checkConnection = yield request.success.connections.find(
          (item: string) => {
            if (item === userId) {
              return true;
            }
          }
        );
        yield put({
          type: "setIsConnection",
          payload: checkConnection ? true : false,
        });
        yield put({ type: "setFocusedUserLoading", payload: false });
      }
    },
    *getConnectionRequests({ payload }: any, { call, put, select }: any): any {
      yield put({ type: "setloadingActivity", payload: true });
      const username = yield select((state: any) => state.user.username);
      const request = yield call(getRequestedConnections, username);
      if (request.error) {
        put({ type: "setError", payload: request.error });
      } else {
        yield put({
          type: "setActivity",
          payload: request.success.pendingConnections,
        });
        yield put({
          type: "setRequestedConnections",
          payload: request.success.requestedConnections,
        });
      }
      yield put({ type: "setloadingActivity", payload: false });
    },
    *requestConnection({ payload }: any, { call, put, select }: any): any {
      const { username, token } = yield select((state: any) => state.user);
      const request = yield call(sendConnectionRequest, {
        username,
        token,
        reciever: payload,
      });
      if (request.error) {
        put({ type: "setError", payload: request.error });
      } else {
        console.warn("Successfully Requested Connection");
        yield put({ type: "getConnectionRequests" });
      }
    },
    *acceptConnection({ payload }: any, { call, put, select }: any): any {
      const { username, token } = yield select((state: any) => state.user);
      const request = yield call(acceptConnectionRequest, {
        username,
        token,
        waiter: payload,
      });
      if (request.error) {
        put({ type: "setError", payload: request.error });
      } else {
        console.warn("Successfully Accepted Connection");
      }
    },

    *recievedActivityNotification(
      { payload }: any,
      { call, put, select }: any
    ): any {
      console.log(payload);
    },
  },
};
