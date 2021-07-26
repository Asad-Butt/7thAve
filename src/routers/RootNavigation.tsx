import * as React from "react";

export const navigationRef: any = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}
export function popToTop() {
  navigationRef.current?.popToTop;
}
export function goBack() {
  navigationRef.current?.goBack();
}
