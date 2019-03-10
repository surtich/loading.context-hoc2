import React from "react";
import { LoadingContext } from "./loadingContext";
import { switchMap, tap, takeUntil } from "rxjs/operators";
import { from } from "rxjs";

const withLoadingConsumer = (
  action = "mutate"
) => WrappedComponent => ownProps => {
  return (
    <LoadingContext.Consumer>
      {({ setLoading, loading, cancel$ }) => {
        const props = {
          ...ownProps,
          [action]: (...args) => {
            setLoading(true);
            return from(ownProps[action](...args))
              .pipe(
                tap(result => {
                  setLoading(false);
                })
              )
              .pipe(takeUntil(cancel$));
          }
        };

        return <WrappedComponent {...props} />;
      }}
    </LoadingContext.Consumer>
  );
};

export default withLoadingConsumer;
